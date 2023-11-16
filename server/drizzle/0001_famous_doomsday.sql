CREATE TABLE IF NOT EXISTS "interview_questions" (
	"question_id" uuid PRIMARY KEY NOT NULL,
	"interview_id" uuid,
	"question" text,
	"answer" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_interview_id_interviews_interview_id_fk" FOREIGN KEY ("interview_id") REFERENCES "interviews"("interview_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
