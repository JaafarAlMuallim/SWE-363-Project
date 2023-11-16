DO $$ BEGIN
 CREATE TYPE "article_status" AS ENUM('published', 'draft', 'deleted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user', 'reviewer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('success', 'failure');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article" (
	"article_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"org_id" uuid,
	"title" varchar(255),
	"subtitle" varchar(255),
	"content" text,
	"article_image" varchar(50),
	"date" varchar(50),
	"article_status" "article_status"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_tags" (
	"tag_id" text,
	"article_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" uuid PRIMARY KEY NOT NULL,
	"article_id" uuid,
	"user_id" uuid,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interviews" (
	"interview_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"org_id" uuid,
	"interview_date" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_founders" (
	"org_id" uuid PRIMARY KEY NOT NULL,
	"founder" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orgs" (
	"org_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"founding_date" varchar(50),
	"description" text,
	"website" varchar(255),
	"org_image" varchar(255),
	"hq_location" varchar(250),
	"org_status" "status"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_prefs" (
	"pref_id" text,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"username" varchar(50),
	"email" varchar(50),
	"password" varchar(50),
	"role" "role",
	"verified" boolean,
	"x_account" varchar(255),
	"linkding_account" varchar(255),
	"website" varchar(255),
	"user_image" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article" ADD CONSTRAINT "article_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article" ADD CONSTRAINT "article_org_id_orgs_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "orgs"("org_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_article_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_article_id_article_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_org_id_orgs_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "orgs"("org_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_founders" ADD CONSTRAINT "org_founders_org_id_orgs_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "orgs"("org_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_prefs" ADD CONSTRAINT "user_prefs_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
