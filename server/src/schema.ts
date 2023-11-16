import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  varchar,
  boolean,
  text,
  uuid,
} from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "reviewer"]);
export const statusEnum = pgEnum("status", ["success", "failure"]);
export const articleStatus = pgEnum("article_status", [
  "published",
  "draft",
  "deleted",
]);

export const users = pgTable("users", {
  user_id: uuid("user_id").primaryKey(),
  name: varchar("name", { length: 50 }),
  username: varchar("username", { length: 50 }),
  email: varchar("email", { length: 50 }),
  password: varchar("password", { length: 50 }),
  role: roleEnum("role"),
  verified: boolean("verified"),
  x_account: varchar("x_account", { length: 255 }),
  linkdin_account: varchar("linkding_account", { length: 255 }),
  website: varchar("website", { length: 255 }),
  user_image: varchar("user_image", { length: 255 }),
});

export const user_prefs = pgTable("user_prefs", {
  pref_id: uuid("pref_id").primaryKey(),
  user_id: uuid("user_id").references(() => users.user_id),
  pref: text("pref_id"),
});

export const userPrefsRelations = relations(users, ({ many }) => ({
  user_prefs: many(user_prefs),
}));

export const orgs = pgTable("orgs", {
  org_id: uuid("org_id").primaryKey(),
  name: varchar("name", { length: 50 }),
  founding_date: varchar("founding_date", { length: 50 }),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  org_image: varchar("org_image", { length: 255 }),
  hq_location: varchar("hq_location", { length: 250 }),
  org_status: statusEnum("org_status"),
});

export const org_founders = pgTable("org_founders", {
  org_id: uuid("org_id")
    .primaryKey()
    .references(() => orgs.org_id),
  founder: varchar("founder", { length: 255 }),
});

export const interviews = pgTable("interviews", {
  interview_id: uuid("interview_id").primaryKey(),
  user_id: uuid("user_id").references(() => users.user_id),
  org_id: uuid("org_id").references(() => orgs.org_id),
  interview_date: varchar("interview_date", { length: 50 }),
});

export const interview_questions = pgTable("interview_questions", {
  question_id: uuid("question_id").primaryKey(),
  interview_id: uuid("interview_id").references(() => interviews.interview_id),
  question: text("question"),
  answer: text("answer"),
});
export const interviewRelations = relations(interviews, ({ many }) => ({
  interview_questions: many(interview_questions),
}));

export const orgsRelations = relations(orgs, ({ many }) => ({
  org_founders: many(org_founders),
  interviews: many(interviews),
}));

export const article = pgTable("article", {
  article_id: uuid("article_id").primaryKey(),
  user_id: uuid("user_id").references(() => users.user_id),
  org_id: uuid("org_id").references(() => orgs.org_id),
  title: varchar("title", { length: 255 }),
  subtitle: varchar("subtitle", { length: 255 }),
  content: text("content"),
  article_image: varchar("article_image", { length: 50 }),
  date: varchar("date", { length: 50 }),
  article_status: articleStatus("article_status"),
});

export const article_tags = pgTable("article_tags", {
  tag_id: uuid("tag_id").primaryKey(),
  article_id: uuid("article_id").references(() => article.article_id),
  tag: text("tag_id"),
});

export const comment = pgTable("comment", {
  comment_id: uuid("comment_id").primaryKey(),
  article_id: uuid("article_id").references(() => article.article_id),
  user_id: uuid("user_id").references(() => users.user_id),
  content: text("content"),
});

export const articleRelations = relations(article, ({ many }) => ({
  article_tags: many(article_tags),
  comment: many(comment),
}));

export type Role = "admin" | "user" | "reviewer";
export type Status = "success" | "failure";
export type ArticleStatus = "published" | "draft" | "deleted";
export type User = InferSelectModel<typeof users>;
export type UserPrefs = InferSelectModel<typeof user_prefs>;
export type Org = InferSelectModel<typeof orgs>;
export type OrgFounders = InferSelectModel<typeof org_founders>;
export type Interview = InferSelectModel<typeof interviews>;
export type InterviewQuestions = InferSelectModel<typeof interview_questions>;
export type Article = InferSelectModel<typeof article>;
export type ArticleTags = InferSelectModel<typeof article_tags>;
export type Comment = InferSelectModel<typeof comment>;
// export type User = {
//   user_id: string;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   role: Role;
//   verified: boolean;
//   x_account: string;
//   linkdin_account: string;
//   website: string;
//   user_image: string;
// };
// export type UserPrefs = {
//   pref_id: string;
//   user_id: string;
//   pref: string;
// };
// export type Org = {
//   org_id: string;
//   name: string;
//   founding_date: string;
//   description: string;
//   website: string;
//
//   org_image: string;
//   hq_location: string;
//   org_status: Status;
// };
// export type OrgFounders = {
//   org_id: string;
//   founder: string;
// };
// export type Interview = {
//   interview_id: string;
//
//   user_id: string;
//   org_id: string;
//   interview_date: string;
// };
// export type InterviewQuestions = {
//   question_id: string;
//
//   interview_id: string;
//   question: string;
//   answer: string;
// };
// export type Article = {
//   article_id: string;
//
//   user_id: string;
//   org_id: string;
//   title: string;
//   subtitle: string;
//   content: string;
//   article_image: string;
//   date: string;
//   article_status: ArticleStatus;
// };
// export type ArticleTags = {
//   tag_id: string;
//   article_id: string;
//   tag: string;
// };
// export type Comment = {
//   comment_id: string;
//   article_id: string;
//   user_id: string;
//   content: string;
// };
// export type ArticleWithRelations = Article & {
//   article_tags: ArticleTags[];
//   comment: Comment[];
// };
// export type InterviewWithRelations = Interview & {
//   interview_questions: InterviewQuestions[];
// };
// export type OrgWithRelations = Org & {
//   org_founders: OrgFounders[];
//   interviews: Interview[];
// };
// export type UserWithRelations = User & {
//   user_prefs: UserPrefs[];
// };
