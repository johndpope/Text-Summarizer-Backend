import userRoutes from './users/user.routes';
import articleRoutes from './articles/article.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/articles', articleRoutes);
};
