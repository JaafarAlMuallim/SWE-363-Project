import { InferModel, relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "reviewer"]);
export const statusEnum = pgEnum("status", ["success", "failure"]);
export const articleStatus = pgEnum("article_status", [
  "published",
  "draft",
  "deleted",
  "rejected",
  "in_review",
]);

export const users = pgTable("users", {
  user_id: uuid("user_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 250 }).notNull(),
  role: roleEnum("role").notNull(),
  user_image: varchar("user_image", { length: 255 }),
  overview: text("overview"),
});

export const user_follow = pgTable("user_follow", {
  follow_id: uuid("follow_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  followed_id: uuid("followed_id")
    .references(() => users.user_id)
    .notNull(),
});

export const user_followRelations = relations(users, ({ many }) => ({
  user_follow: many(user_follow),
}));
export const userFollowRelations = relations(user_follow, ({ one }) => ({
  followed: one(users, {
    fields: [user_follow.followed_id],
    references: [users.user_id],
  }),
  user: one(users, {
    fields: [user_follow.user_id],
    references: [users.user_id],
  }),
}));

export const orgs = pgTable("orgs", {
  org_id: uuid("org_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 50 }),
  founding_date: varchar("founding_date", { length: 255 }),
  main_sector: varchar("main_sector", { length: 255 }),
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

export const orgsRelations = relations(orgs, ({ many }) => ({
  org_founders: many(org_founders),
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

export const articleOrgRelations = relations(article, ({ one }) => ({
  org: one(orgs, {
    fields: [article.org_id],
    references: [orgs.org_id],
  }),
}));

export const user_bookmarks = pgTable("user_bookmarks", {
  bookmark_id: uuid("bookmark_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  article_id: uuid("article_id")
    .references(() => article.article_id)
    .notNull(),
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
export const article_like = pgTable("article_like", {
  like_id: uuid("like_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  article_id: uuid("article_id")
    .references(() => article.article_id)
    .notNull(),
});
export const comment_like = pgTable("comment_like", {
  like_id: uuid("like_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  comment_id: uuid("comment_id")
    .references(() => comment.comment_id)
    .notNull(),
});

export const articleLikeRelations = relations(article, ({ many }) => ({
  article_like: many(article_like),
}));
export const articleUserLikesRelation = relations(article_like, ({ one }) => ({
  article: one(article, {
    fields: [article_like.article_id],
    references: [article.article_id],
  }),
  user: one(users, {
    fields: [article_like.user_id],
    references: [users.user_id],
  }),
}));

export const commentLikeRelations = relations(comment, ({ many }) => ({
  comment_like: many(comment_like),
}));

export const userLikeRelations = relations(users, ({ many }) => ({
  article_like: many(article_like),
  comment_like: many(comment_like),
}));

export const articleRelations = relations(article, ({ one, many }) => ({
  article_tags: many(article_tags),
  comment: many(comment),
  user: one(users, {
    fields: [article.user_id],
    references: [users.user_id],
  }),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  article: one(article, {
    fields: [comment.article_id],
    references: [article.article_id],
  }),
  user: one(users, {
    fields: [comment.user_id],
    references: [users.user_id],
  }),
}));
export const userRelations = relations(users, ({ one, many }) => ({
  article: many(article),
  comment: many(comment),
}));

export const orgRelations = relations(orgs, ({ many }) => ({
  org_founders: many(org_founders),
}));
export const orgFounderRelations = relations(org_founders, ({ one }) => ({
  org: one(orgs, {
    fields: [org_founders.org_id],
    references: [orgs.org_id],
  }),
}));

export const tagsRelations = relations(article_tags, ({ one }) => ({
  article: one(article, {
    fields: [article_tags.article_id],
    references: [article.article_id],
  }),
}));

export const userArticleRelations = relations(users, ({ many }) => ({
  article: many(article),
}));
export const bookmarkRelations = relations(user_bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [user_bookmarks.user_id],
    references: [users.user_id],
  }),
  article: one(article, {
    fields: [user_bookmarks.article_id],
    references: [article.article_id],
  }),
}));

export type ArticleData = InferModel<typeof article>;
export type CommentData = InferModel<typeof comment>;
export type UserData = InferModel<typeof users>;
export type OrgData = InferModel<typeof orgs>;
export type OrgFounderData = InferModel<typeof org_founders>;
export type ArticleTagData = InferModel<typeof article_tags>;
export type Role = "admin" | "user" | "reviewer";
export type Status = "success" | "failure";
export type ArticleStatus = "published" | "draft" | "deleted";
export type Org = InferModel<typeof orgs>;
export type OrgFounders = InferModel<typeof org_founders>;
export type Article = InferModel<typeof article>;
export type ArticleTags = InferModel<typeof article_tags>;
export type Comment = InferModel<typeof comment>;
export type User = InferModel<typeof users>;
export type UserFollow = InferModel<typeof user_follow>;
export type UserBookmark = InferModel<typeof user_bookmarks>;
export type UserFollowData = InferModel<typeof user_follow>;
