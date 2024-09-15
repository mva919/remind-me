import { z } from "zod";

export enum TaskTypes {
  Homework,
  Reading,
  Lab,
  Project,
  Exam,
  Quiz,
}

export type TTaskSchema = z.infer<typeof TaskSchema>;

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TCourse = z.infer<typeof CourseSchema>;

export const TaskCreateFormSchema = z.object({
  name: z.string().min(1, { message: "Task name is required" }),
  description: z.string().min(0).optional(),
  course: CourseSchema,
  type: z.nativeEnum(TaskTypes, { message: "Task type is required" }),
  dueDate: z.date({ message: "Due date is required" }),
});

export type TaskCreateFormData = z.infer<typeof TaskCreateFormSchema>;

export const TaskSchema = TaskCreateFormSchema.extend({
  isDone: z.boolean(),
});
