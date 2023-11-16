"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRelations = exports.comment = exports.article_tags = exports.article = exports.orgsRelations = exports.interviewRelations = exports.interview_questions = exports.interviews = exports.org_founders = exports.orgs = exports.userPrefsRelations = exports.user_prefs = exports.users = exports.articleStatus = exports.statusEnum = exports.roleEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "reviewer"]);
exports.statusEnum = (0, pg_core_1.pgEnum)("status", ["success", "failure"]);
exports.articleStatus = (0, pg_core_1.pgEnum)("article_status", [
    "published",
    "draft",
    "deleted",
]);
exports.users = (0, pg_core_1.pgTable)("users", {
    user_id: (0, pg_core_1.uuid)("user_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }),
    username: (0, pg_core_1.varchar)("username", { length: 50 }),
    email: (0, pg_core_1.varchar)("email", { length: 50 }),
    password: (0, pg_core_1.varchar)("password", { length: 50 }),
    role: (0, exports.roleEnum)("role"),
    verified: (0, pg_core_1.boolean)("verified"),
    x_account: (0, pg_core_1.varchar)("x_account", { length: 255 }),
    linkdin_account: (0, pg_core_1.varchar)("linkding_account", { length: 255 }),
    website: (0, pg_core_1.varchar)("website", { length: 255 }),
    user_image: (0, pg_core_1.varchar)("user_image", { length: 255 }),
});
exports.user_prefs = (0, pg_core_1.pgTable)("user_prefs", {
    pref_id: (0, pg_core_1.uuid)("pref_id").primaryKey(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.user_id),
    pref: (0, pg_core_1.text)("pref_id"),
});
exports.userPrefsRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    user_prefs: many(exports.user_prefs),
}));
exports.orgs = (0, pg_core_1.pgTable)("orgs", {
    org_id: (0, pg_core_1.uuid)("org_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }),
    founding_date: (0, pg_core_1.varchar)("founding_date", { length: 50 }),
    description: (0, pg_core_1.text)("description"),
    website: (0, pg_core_1.varchar)("website", { length: 255 }),
    org_image: (0, pg_core_1.varchar)("org_image", { length: 255 }),
    hq_location: (0, pg_core_1.varchar)("hq_location", { length: 250 }),
    org_status: (0, exports.statusEnum)("org_status"),
});
exports.org_founders = (0, pg_core_1.pgTable)("org_founders", {
    org_id: (0, pg_core_1.uuid)("org_id")
        .primaryKey()
        .references(() => exports.orgs.org_id),
    founder: (0, pg_core_1.varchar)("founder", { length: 255 }),
});
exports.interviews = (0, pg_core_1.pgTable)("interviews", {
    interview_id: (0, pg_core_1.uuid)("interview_id").primaryKey(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.user_id),
    org_id: (0, pg_core_1.uuid)("org_id").references(() => exports.orgs.org_id),
    interview_date: (0, pg_core_1.varchar)("interview_date", { length: 50 }),
});
exports.interview_questions = (0, pg_core_1.pgTable)("interview_questions", {
    question_id: (0, pg_core_1.uuid)("question_id").primaryKey(),
    interview_id: (0, pg_core_1.uuid)("interview_id").references(() => exports.interviews.interview_id),
    question: (0, pg_core_1.text)("question"),
    answer: (0, pg_core_1.text)("answer"),
});
exports.interviewRelations = (0, drizzle_orm_1.relations)(exports.interviews, ({ many }) => ({
    interview_questions: many(exports.interview_questions),
}));
exports.orgsRelations = (0, drizzle_orm_1.relations)(exports.orgs, ({ many }) => ({
    org_founders: many(exports.org_founders),
    interviews: many(exports.interviews),
}));
exports.article = (0, pg_core_1.pgTable)("article", {
    article_id: (0, pg_core_1.uuid)("article_id").primaryKey(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.user_id),
    org_id: (0, pg_core_1.uuid)("org_id").references(() => exports.orgs.org_id),
    title: (0, pg_core_1.varchar)("title", { length: 255 }),
    subtitle: (0, pg_core_1.varchar)("subtitle", { length: 255 }),
    content: (0, pg_core_1.text)("content"),
    article_image: (0, pg_core_1.varchar)("article_image", { length: 50 }),
    date: (0, pg_core_1.varchar)("date", { length: 50 }),
    article_status: (0, exports.articleStatus)("article_status"),
});
exports.article_tags = (0, pg_core_1.pgTable)("article_tags", {
    tag_id: (0, pg_core_1.uuid)("tag_id").primaryKey(),
    article_id: (0, pg_core_1.uuid)("article_id").references(() => exports.article.article_id),
    tag: (0, pg_core_1.text)("tag_id"),
});
exports.comment = (0, pg_core_1.pgTable)("comment", {
    comment_id: (0, pg_core_1.uuid)("comment_id").primaryKey(),
    article_id: (0, pg_core_1.uuid)("article_id").references(() => exports.article.article_id),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.user_id),
    content: (0, pg_core_1.text)("content"),
});
exports.articleRelations = (0, drizzle_orm_1.relations)(exports.article, ({ many }) => ({
    article_tags: many(exports.article_tags),
    comment: many(exports.comment),
}));
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
