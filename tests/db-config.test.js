const test = require('node:test');
const assert = require('node:assert/strict');
const { readDatabaseConfig } = require('../db-config');

test('rejects missing DB_USER and DB_PASSWORD', () => {
  assert.throws(() => readDatabaseConfig({ DB_PASSWORD: 'not-a-real-password' }), /DB_USER/);
  assert.throws(() => readDatabaseConfig({ DB_USER: 'app' }), /DB_PASSWORD/);
});

test('reads explicit database config without exposing credentials', () => {
  const config = readDatabaseConfig({
    DB_HOST: 'db.internal',
    DB_USER: 'app',
    DB_PASSWORD: 'test-only-secret',
    DB_NAME: 'tasks_test',
  });
  assert.deepEqual(config, {
    host: 'db.internal',
    user: 'app',
    password: 'test-only-secret',
    database: 'tasks_test',
  });
});

test('uses safe host/database defaults', () => {
  const config = readDatabaseConfig({ DB_USER: 'app', DB_PASSWORD: 'test-only-secret' });
  assert.equal(config.host, 'localhost');
  assert.equal(config.database, 'gestao_tarefas');
});
