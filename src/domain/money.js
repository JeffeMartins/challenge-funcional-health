function toCents(value, allowZero = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || (!allowZero && value === 0)) throw new Error('Valor deve ser positivo.');
  const cents = Math.round(value * 100);
  if (!Number.isSafeInteger(cents) || Math.abs(value * 100 - cents) > 1e-7) throw new Error('Use ate duas casas decimais.');
  return cents;
}
function accountNumber(value) { if (!Number.isSafeInteger(value) || value <= 0) throw new Error('Conta invalida.'); return value; }
module.exports = { toCents, accountNumber };
