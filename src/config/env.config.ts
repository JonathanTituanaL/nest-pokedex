export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'DEV',
  mongodb: process.env.MONGO_DB,
  port: process.env.PORT || 3001,
  defaultlimit: +(process.env.DEFAULT_LIMIT as string) || 7,
});
