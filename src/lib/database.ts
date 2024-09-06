import { addDoc, collection, getDocs } from "firebase/firestore";
import { Collections, Task } from "@/lib/types";
import { db } from "./firebase";

const { TODOS, USERS } = Collections;

export async function insertTodo(userId: string, todo: Omit<Task, "id">) {
  const ref = collection(db, USERS, userId, TODOS);

  return await addDoc(ref, todo);
}

export async function getTodos(userId: string) {
  const ref = collection(db, USERS, userId, TODOS);

  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
}
