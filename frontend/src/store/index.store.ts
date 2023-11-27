import type { IAuth } from './models/Auth.model';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { IUser } from './models/Users.model';

/******************************************************************************/
/*******************************  Auth Store   ********************************/
/******************************************************************************/
export const authStore = localStorageStore<IAuth>('authStore', {} as IAuth);

/******************************************************************************/
/*******************************  Users Store    ******************************/
/******************************************************************************/
export const usersStore = localStorageStore<IUser[]>('usersStore', []);

/******************************************************************************/
/*****************************  Chatrooms Store    ****************************/
/******************************************************************************/
export const chatroomsStore = localStorageStore<any[]>('chatroomsStore', []);
