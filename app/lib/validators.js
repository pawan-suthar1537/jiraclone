import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is Required.")
    .max(50, "Project name must be less than 50 letters or less"),
  key: z
    .string()
    .min(2, "Project key must be atleast 2 letters.")
    .max(10, "Project key must be less than 10 letters or less"),
  description: z
    .string()
    .max(500, "Description must be less than 500 chars")
    .optional(),
});

export const sprintSchema = z.object({
  name: z.string().min(1, "Sprint name is Required."),
  startDate: z.date(),
  endDate: z.date(),
});

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required."),
  assigneeId: z.string().cuid("please select a valid Assignee"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});
