export enum Collections {
  USERS = "USERS",
  TODOS = "TODOS",
}

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  createdAt: number;
}

export type UserInfo = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};
