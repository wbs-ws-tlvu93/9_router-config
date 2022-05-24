import { IUser } from '@models/user-model';
import { getRandomInt } from '@shared/functions';
import orm from './mock-orm';

/**
 * Get one user.
 *
 * @param email
 * @returns
 */
async function getOne(email: string): Promise<IUser | null> {
  const db = await orm.openDb();
  const users: IUser[] = db.users;
  for (const user of users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 *
 * @param id
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 *
 * @returns
 */
async function getAll(): Promise<IUser[]> {
  const db = await orm.openDb();
  const users: IUser[] = db.users;
  return users;
}

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  const users: IUser[] = db.users;
  user.id = getRandomInt();
  users.push(user);
  db.users = users;
  return orm.saveDb(db);
}

/**
 * Update a user.
 *
 * @param user
 * @returns
 */
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      db.users[i] = user;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const db = await orm.openDb();
  const users: IUser[] = db.users;
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      users.splice(i, 1);
      db.users = users;
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
