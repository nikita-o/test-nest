export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || 'localhost',
  dev: process.env.DEV || false,
  database: {
    host: 'localhost',
  },
});
