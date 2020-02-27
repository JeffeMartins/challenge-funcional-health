const {GraphQLServer} = require('graphql-yoga');
const path = require('path');
const resolvers = require('../resolvers/resolvers');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://admin:admin@rocketseat-q3vzx.mongodb.net/desafio_Funcional_Health?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, '../schemas/schema.graphql'),
    resolvers
});

server.start();
