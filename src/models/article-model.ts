// Article schema

export interface IArticle {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

/**
 * Get a new Article object.
 *
 * @returns
 */
function getNew(title: string, author: string): IArticle {
  return {
    id: -1,
    title,
    content: '',
    author,
    createdAt: new Date(),
  };
}

/**
 * Copy a user object.
 *
 * @param article
 * @returns
 */
function copy(article: IArticle): IArticle {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    author: article.author,
    createdAt: article.createdAt,
  };
}

// Export default
export default {
  new: getNew,
  copy,
};
