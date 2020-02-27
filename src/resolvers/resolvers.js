const User = require('./../schemas/User');
module.exports = {
    Query:{
        saldo: (_, { conta }) => User.findOne({ conta })
    },
    
    Mutation:{
        // criando conta corrente para um usuario
        createUser: (_, { name, email,conta, saldo}) => User.create({name, email, conta, saldo})
        .then(createDocument =>{
            if(createDocument){
                console.log(`Successfully create document: ${createDocument}`)
            }else{
                console.log("No document matches the provided query.")
            }
            return createDocument;
        })
        .catch(() => {
            return new Error(`Conta corrente: ${conta} já existente`)
        }),
        

        // sacando valor de uma conta corrente
        sacar: (_, {conta, saque}) => User.findOne({ conta })
        .then(result => {
            
            if(result.saldo < saque){
                return new Error(`Saldo insuficiente.`)
            }else{
                
                let saldoNovo = result.saldo - saque;

                const updateFile = User.findOneAndUpdate({conta: result.conta}, {saldo: saldoNovo},
                    {
                        new: true
                    })

                    return updateFile
                    
                }
            }).catch(err => {
                return new Error(err)
            }),

            depositar: (_, {conta, valor}) => User.findOne({ conta })
            .then(result => {
                
                if(valor <= 0 ){
                    return new Error(`Valor ${valor} não é aceitável para depósito.`)
                }else{
                    
                    let saldoNovo = result.saldo + valor;
    
                    const updateFile = User.findOneAndUpdate({conta: result.conta}, {saldo: saldoNovo},
                        {
                            new: true
                        })
    
                        return updateFile
                        
                    }
                })
                .catch(err => {
                    return new Error(err)
                })
    }
}