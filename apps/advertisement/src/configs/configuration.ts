export default () => ({
  port: +process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  dev: process.env.DEV === 'true',
  database: {
    host: 'localhost',
  },
});
