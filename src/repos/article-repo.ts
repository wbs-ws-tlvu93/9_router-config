import { IArticle } from '@models/article-model';
import { getRandomInt } from '@shared/functions';
import orm from './mock-orm';

/**
 * Get on article.
 *
 * @param id
 * @returns
 */
async function getOne(id: number): Promise<IArticle | null> {
  const db = await orm.openDb();
  const articles: IArticle[] = db.articles;

  for (const article of articles) {
    if (article.id === id) return article;
  }

  return null;
}

/**
 * See if an article with the given id exists.
 *
 * @param id
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  const articles: IArticle[] = db.articles;
  for (const article of articles) {
    if (article.id === id) return true;
  }
  return false;
}

/**
 * Get all articles.
 *
 * @returns
 */
async function getAll(): Promise<IArticle[]> {
  const db = await orm.openDb();
  const articles: IArticle[] = db.articles;
  return articles;
}

/**
 * Add one article.
 *
 * @param article
 * @returns
 */
async function add(article: IArticle): Promise<void> {
  const db = await orm.openDb();
  article.id = getRandomInt();
  const articles: IArticle[] = db.articles;
  articles.push(article);
  return orm.saveDb(db);
}

/**
 * Update one article
 *
 * @param article
 * @returns
 */
async function update(article: IArticle): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.articles.length; i++) {
    if (db.articles[i].id === article.id) {
      db.articles[i] = article;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one article
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const db = await orm.openDb();
  const articles: IArticle[] = db.articles;
  for (let i = 0; i < db.articles.length; i++) {
    if (articles[i].id === id) {
      articles.splice(i, 1);
      db.articles = articles;
      return orm.saveDb(db);
    }
  }
}

// Export default
export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: deleteOne,
} as const;
