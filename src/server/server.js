require('dotenv/config');
const { createServer } = require('node:http');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { createYoga, createSchema } = require('graphql-yoga');
const mongoose = require('mongoose');
const { createResolvers } = require('../resolvers/resolvers');
async function start() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atm_demo', { serverSelectionTimeoutMS: 5000 });
  const yoga = createYoga({ schema: createSchema({ typeDefs: readFileSync(path.join(__dirname,'../schemas/schema.graphql'),'utf8'), resolvers: createResolvers() }), graphqlEndpoint: '/graphql', graphiql: process.env.NODE_ENV !== 'production', maskedErrors: true });
  const server = createServer(yoga);
  server.listen(Number(process.env.PORT || 4000), '0.0.0.0');
  const close = () => server.close(() => mongoose.disconnect().finally(() => process.exit(0)));
  process.once('SIGTERM',close);process.once('SIGINT',close);
}
start().catch(() => { console.error('Could not initialize local database/server.'); process.exitCode=1; });
