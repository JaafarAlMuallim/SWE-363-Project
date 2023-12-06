CREATE TABLE IF NOT EXISTS "user_bookmarks" (
	"bookmark_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"article_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_article_id_article_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
