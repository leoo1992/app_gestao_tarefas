function readDatabaseConfig(env = process.env) {
  const user = env.DB_USER?.trim();
  const password = env.DB_PASSWORD;
  if (!user) throw new Error('DB_USER must be configured');
  if (!password) throw new Error('DB_PASSWORD must be configured');
  return {
    host: env.DB_HOST?.trim() || 'localhost',
    user,
    password,
    database: env.DB_NAME?.trim() || 'gestao_tarefas',
  };
}

module.exports = { readDatabaseConfig };
