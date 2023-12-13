ALTER TABLE "user_follow" RENAME COLUMN "follow_user_id" TO "followed_id";--> statement-breakpoint
ALTER TABLE "user_follow" DROP CONSTRAINT "user_follow_follow_user_id_users_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_followed_id_users_user_id_fk" FOREIGN KEY ("followed_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
