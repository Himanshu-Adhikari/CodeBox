import { integer, pgTable, varchar ,json, timestamp, boolean} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points:integer().default(0),
  subscription:varchar({length:255})
});

export const CourseTable=pgTable("courses",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId:integer().notNull().unique(),
  title:varchar().notNull(),
  desc:varchar().notNull(),
  bannerImage:varchar().notNull(),
  level:varchar().default("Beginner"),
  tags:varchar()
})

export const CourseChapterTable=pgTable("courseChapters",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chapterId:integer().notNull(),
  courseId:integer().notNull(),
  name:varchar().notNull(),
  desc:varchar().notNull(),
  exercises:json(),
})


export const Enrolled_Course=pgTable("enrolled_course",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId:integer().notNull(),
  userId:varchar().notNull(),
  enrolled_date:timestamp().defaultNow(),
  xpEarned:integer().notNull().default(0),
})

export const ExerciseCompleted=pgTable("exercisecompleted",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId:varchar().notNull(),
  courseId:integer().notNull(),
  chapterId:integer().notNull(),
  exerciseId:integer().notNull()
})