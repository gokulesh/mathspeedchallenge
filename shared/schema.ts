import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  totalTime: real("total_time").notNull(),
  averageTime: real("average_time").notNull(),
  completedAt: text("completed_at").notNull(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id"),
  questionNumber: integer("question_number").notNull(),
  question: text("question").notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  userAnswer: integer("user_answer"),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: real("time_spent").notNull(),
  operation: text("operation").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizSession = typeof quizSessions.$inferSelect;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
