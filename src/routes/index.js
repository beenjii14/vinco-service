import authRoutes from './auth';
import userRoutes from './user';

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/user', userRoutes);
};
