CREATE TABLE IF NOT EXISTS "momentum" (
	"id" integer PRIMARY KEY NOT NULL,
	"goal" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
