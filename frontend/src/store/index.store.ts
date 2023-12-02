import { localStorageStore } from '@skeletonlabs/skeleton';
import type { IUser } from './models/Users.model';
import type { IChatroom } from './models/Chatrooms.model';
import type { IAuth } from './models/Auth.model';

/******************************************************************************/
/*******************************  Users Store    ******************************/
/******************************************************************************/
export const usersStore = localStorageStore<IUser[]>('usersStore', []);

/******************************************************************************/
/*****************************  Chatrooms Store    ****************************/
/******************************************************************************/
export const chatroomsStore = localStorageStore<IChatroom[]>('chatroomsStore', []);

/******************************************************************************/
/*****************************  Chatrooms Store    ****************************/
/******************************************************************************/
export const authStore = localStorageStore<{currentUser:IUser, refreshToken:string, accessToken:string}>('authStore', {} as any);
