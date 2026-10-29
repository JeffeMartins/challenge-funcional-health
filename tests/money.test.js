const { test } = require('node:test'); const assert = require('node:assert/strict');
const { toCents } = require('../src/domain/money');
const { createResolvers } = require('../src/resolvers/resolvers');
test('money is stored as integer cents and rejects invalid precision', () => { assert.equal(toCents(10.25),1025); for(const value of [-1,0,NaN,Infinity,1.001]) assert.throws(()=>toCents(value)); });
test('withdrawal performs guarded atomic decrement', async () => { let call; const api = createResolvers({findOneAndUpdate:async (...args)=>{call=args;return {saldoCentavos:500};}}); await api.Mutation.sacar(null,{conta:1,saque:5}); assert.deepEqual(call[0],{conta:1,saldoCentavos:{$gte:500}});assert.deepEqual(call[1],{$inc:{saldoCentavos:-500}}); });
test('missing account cannot be credited', async () => { const api=createResolvers({findOneAndUpdate:async()=>null}); await assert.rejects(api.Mutation.depositar(null,{conta:1,valor:1})); });
