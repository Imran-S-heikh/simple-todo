export enum Collections {
  USERS = "USERS",
  TODOS = "TODOS",
}

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  createdAt: number;
  startDate: number | null;
  endTime: number | null;
}

export type UserInfo = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};
