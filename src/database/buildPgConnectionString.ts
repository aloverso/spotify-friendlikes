type PgValues = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

export const buildPgConnectionString = (data: PgValues): string => {
  return `postgres://${data.user}:${data.password}@${data.host}:${data.port}/${data.database}`;
};
