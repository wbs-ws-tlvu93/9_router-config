import { Router } from 'express';
import userRouter from './user-router';
import articleRouter from './article-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/articles', articleRouter);

// Export default.
export default baseRouter;
