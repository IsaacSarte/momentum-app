"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { momentum } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(momentum);
  return data;
};

export const addTodo = async (id: number, goal: string) => {
  await db.insert(momentum).values({
    id: id,
    goal: goal,
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(momentum).where(eq(momentum.id, id));

  revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
  await db
    .update(momentum)
    .set({
      done: not(momentum.done),
    })
    .where(eq(momentum.id, id));

  revalidatePath("/");
};

export const editTodo = async (id: number, goal: string) => {
  await db
    .update(momentum)
    .set({
      goal: goal,
    })
    .where(eq(momentum.id, id));

  revalidatePath("/");
};