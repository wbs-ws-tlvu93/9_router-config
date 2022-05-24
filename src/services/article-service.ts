import articleRepo from '@repos/article-repo';
import { IArticle } from '@models/article-model';
import { ArticleNotFoundError } from '@shared/errors';

/**
 * Get all article.
 *
 * @returns
 */
function getAll(): Promise<IArticle[]> {
  return articleRepo.getAll();
}

/**
 * Add one article.
 */
function addOne(article: IArticle): Promise<void> {
  return articleRepo.add(article);
}

/**
 * Update one article.
 *
 * @param article
 * @returns
 */
async function updateOne(article: IArticle): Promise<void> {
  const persists = await articleRepo.persists(article.id);
  if (!persists) throw new ArticleNotFoundError();
  return articleRepo.update(article);
}

/**
 * Delete an article by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await articleRepo.persists(id);
  if (!persists) throw new ArticleNotFoundError();
  return articleRepo.delete(id);
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
