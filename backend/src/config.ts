export default () => ({
  appPort: parseInt(process.env.PORT, 10) || 8000,
  clientUrl: process.env.CLIENT_URL,
  jwtAT: process.env.JWT_ACCESS_SECRET,
  jwtRT: process.env.JWT_REFRESH_SECRET,
});
