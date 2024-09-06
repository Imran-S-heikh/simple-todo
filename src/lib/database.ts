import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Collections, Task } from "@/lib/types";
import { db } from "./firebase";

const { TODOS, USERS } = Collections;

export async function insertTodo(userId: string, todo: Omit<Task, "id">) {
  const ref = collection(db, USERS, userId, TODOS);

  return await addDoc(ref, todo);
}

export async function deleteTodo(userId: string, todoId: string) {
  const ref = doc(db, USERS, userId, TODOS, todoId);
  return await deleteDoc(ref);
}

export async function updateTodo(
  userId: string,
  todoId: string,
  data: Partial<Task>
) {
  const ref = doc(db, USERS, userId, TODOS, todoId);

  return await updateDoc(ref, data);
}

export const todoRef = (userId: string, todoId: string) =>
  doc(db, USERS, userId, TODOS, todoId);
export const todosRef = (userId: string) =>
  collection(db, USERS, userId, TODOS);
export async function getTodos(userId: string) {
  const ref = todosRef(userId);

  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
}
