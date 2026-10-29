const User = require('../schemas/User');
const { toCents, accountNumber } = require('../domain/money');
function createResolvers(model = User) {
  return {
    User: { saldo: user => user.saldoCentavos / 100 },
    Query: { saldo: (_, { conta }) => model.findOne({ conta: accountNumber(conta) }) },
    Mutation: {
      async createUser(_, { name, email, conta, saldo }) {
        if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Nome ou email invalido.');
        try { return await model.create({ name: name.trim(), email: email.trim().toLowerCase(), conta: accountNumber(conta), saldoCentavos: toCents(saldo, true) }); }
        catch (error) { if (error.code === 11000) throw new Error('Conta ja existente.'); throw error; }
      },
      async sacar(_, { conta, saque }) {
        const cents = toCents(saque);
        const result = await model.findOneAndUpdate({ conta: accountNumber(conta), saldoCentavos: { $gte: cents } }, { $inc: { saldoCentavos: -cents } }, { new: true });
        if (!result) throw new Error('Conta inexistente ou saldo insuficiente.');
        return result;
      },
      async depositar(_, { conta, valor }) {
        const cents = toCents(valor);
        const result = await model.findOneAndUpdate({ conta: accountNumber(conta), saldoCentavos: { $lte: Number.MAX_SAFE_INTEGER - cents } }, { $inc: { saldoCentavos: cents } }, { new: true });
        if (!result) throw new Error('Conta inexistente ou limite excedido.');
        return result;
      },
    },
  };
}
module.exports = createResolvers();
module.exports.createResolvers = createResolvers;
