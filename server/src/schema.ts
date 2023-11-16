import { InferModel, sql, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  varchar,
  boolean,
  text,
  uuid,
  bigint,
  date,
  serial,
} from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "reviewer"]);
export const statusEnum = pgEnum("status", ["success", "failure"]);
export const articleStatus = pgEnum("article_status", [
  "published",
  "draft",
  "deleted",
]);

export const users = pgTable("users", {
  user_id: uuid("user_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 50 }).notNull(),
  role: roleEnum("role").notNull(),
  verified: boolean("verified").default(false),
  x_account: varchar("x_account", { length: 255 }),
  linkdin_account: varchar("linkding_account", { length: 255 }),
  website: varchar("website", { length: 255 }),
  user_image: varchar("user_image", { length: 255 }),
});
export const prefs = pgTable("prefs", {
  pref_id: uuid("pref_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  pref: text("pref").notNull(),
});

export const user_prefs = pgTable("user_prefs", {
  id: uuid("id").primaryKey(),
  pref_id: uuid("pref_id")
    .references(() => prefs.pref_id)
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
});

export const userPrefsRelations = relations(users, ({ many }) => ({
  user_prefs: many(user_prefs),
}));

export const orgs = pgTable("orgs", {
  org_id: uuid("org_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 50 }),
  founding_date: varchar("founding_date", { length: 50 }),
  description: text("description").notNull(),
  website: varchar("website", { length: 255 }),
  org_image: varchar("org_image", { length: 255 }),
  hq_location: varchar("hq_location", { length: 250 }),
  org_status: statusEnum("org_status").notNull(),
});

export const org_founders = pgTable("org_founders", {
  founder_id: uuid("founder_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  org_id: uuid("org_id").references(() => orgs.org_id),
  founder: varchar("founder", { length: 255 }),
});

export const interviews = pgTable("interviews", {
  interview_id: uuid("interview_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  org_id: uuid("org_id")
    .references(() => orgs.org_id)
    .notNull(),
  interview_date: varchar("interview_date", { length: 50 }),
});

export const interview_questions = pgTable("interview_questions", {
  question_id: uuid("question_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  interview_id: uuid("interview_id")
    .references(() => interviews.interview_id)
    .notNull(),
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
  article_id: uuid("article_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  org_id: uuid("org_id")
    .references(() => orgs.org_id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  content: text("content").notNull(),
  article_image: varchar("article_image", { length: 255 }),
  date: varchar("date", { length: 50 }),
  article_status: articleStatus("article_status"),
  views: bigint("views", { mode: "number" }).default(0),
  bookmarks: bigint("bookmarks", { mode: "number" }).default(0),
  likes: bigint("likes", { mode: "number" }).default(0),
});

export const article_tags = pgTable("article_tags", {
  tag_id: uuid("tag_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  article_id: uuid("article_id")
    .references(() => article.article_id)
    .notNull(),
  tag: text("tag"),
});

export const comment = pgTable("comment", {
  comment_id: uuid("comment_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  article_id: uuid("article_id")
    .references(() => article.article_id)
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  content: text("content").notNull(),
  date: date("date").notNull(),
  comment_likes: bigint("comment_likes", { mode: "number" }).default(0),
});

export const articleRelations = relations(article, ({ many }) => ({
  article_tags: many(article_tags),
  comment: many(comment),
}));

export type Role = "admin" | "user" | "reviewer";
export type Status = "success" | "failure";
export type ArticleStatus = "published" | "draft" | "deleted";
export type UserPrefs = InferModel<typeof user_prefs>;
export type Org = InferModel<typeof orgs>;
export type OrgFounders = InferModel<typeof org_founders>;
export type Interview = InferModel<typeof interviews>;
export type InterviewQuestions = InferModel<typeof interview_questions>;
export type Article = InferModel<typeof article>;
export type ArticleTags = InferModel<typeof article_tags>;
export type Comment = InferModel<typeof comment>;
export type User = InferModel<typeof users>;
export type Pref = InferModel<typeof prefs>;
