import StatusCodes from 'http-status-codes';
import { Request, RequestHandler, Response, Router } from 'express';
import { IArticle } from '@models/article-model';

import articleService from '@services/article-service';
import { ParamMissingError } from '@shared/errors';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const;

/**
 * Get all articles.
 */
router.get(p.get, (async (_: Request, res: Response) => {
  const articles = await articleService.getAll();
  return res.status(OK).json({ articles });
}) as RequestHandler);

/**
 * Add one article.
 */
router.post(p.add, (async (req: Request, res: Response) => {
  const { article }: { article: IArticle } = req.body;
  // Check param
  if (!article) {
    throw new ParamMissingError();
  }
  // Fetch data
  await articleService.addOne(article);
  return res.status(CREATED).end();
}) as RequestHandler);

/**
 * Update one article.
 */
router.put(p.update, (async (req: Request, res: Response) => {
  const { article }: { article: IArticle } = req.body;
  // Check param
  if (!article) {
    throw new ParamMissingError();
  }
  // Fetch data
  await articleService.updateOne(article);
  return res.status(OK).end();
}) as RequestHandler);

/**
 * Delete one article.
 */
router.delete(p.delete, (async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }
  // Fetch data
  await articleService.delete(Number(id));
  return res.status(OK).end();
}) as RequestHandler);

// Export default
export default router;
