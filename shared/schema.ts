import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table (from the original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Authors table
export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
});

export const insertAuthorSchema = createInsertSchema(authors);
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type Author = typeof authors.$inferSelect;

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
});

export const insertCategorySchema = createInsertSchema(categories);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  publishedAt: text("published_at").notNull(),
  authorId: integer("author_id").notNull().references(() => authors.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  coverImage: text("cover_image").notNull(),
  isFeatured: boolean("is_featured").default(false),
  readTime: integer("read_time").default(5),
  tags: text("tags").array(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(authors, {
    fields: [posts.authorId],
    references: [authors.id]
  }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id]
  })
}));

export const insertPostSchema = createInsertSchema(posts);
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect & {
  author: Author;
  category: Category;
};

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
export const insertContactFormSchema = contactFormSchema;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type NewsletterSubscription = z.infer<typeof newsletterSchema>;
export const insertNewsletterSchema = newsletterSchema;

// Define all relations after all table definitions to avoid circular dependencies
export const authorsRelations = relations(authors, ({ many }) => ({
  posts: many(posts),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
