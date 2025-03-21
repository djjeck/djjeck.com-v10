import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPostSchema, 
  insertCategorySchema, 
  insertAuthorSchema,
  insertContactFormSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
      
      const posts = await storage.getAllPosts(limit, offset);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/featured", async (req, res) => {
    try {
      const featuredPost = await storage.getFeaturedPost();
      if (!featuredPost) {
        return res.status(404).json({ message: "No featured post found" });
      }
      res.json(featuredPost);
    } catch (error) {
      console.error("Error fetching featured post:", error);
      res.status(500).json({ message: "Failed to fetch featured post" });
    }
  });

  app.get("/api/posts/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/category/:categorySlug", async (req, res) => {
    try {
      const { categorySlug } = req.params;
      
      if (categorySlug === "all") {
        const posts = await storage.getAllPosts();
        return res.json(posts);
      }
      
      const posts = await storage.getPostsByCategory(categorySlug);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const newPost = await storage.createPost(postData);
      
      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(categoryData);
      
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.post("/api/authors", async (req, res) => {
    try {
      const authorData = insertAuthorSchema.parse(req.body);
      const newAuthor = await storage.createAuthor(authorData);
      
      res.status(201).json(newAuthor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      console.error("Error creating author:", error);
      res.status(500).json({ message: "Failed to create author" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactFormSchema.parse(req.body);
      
      // In a real app, we would send an email or store the contact form data
      // For this demo, we'll just simulate a successful submission
      console.log("Contact form submission:", contactData);
      
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Valid email is required" });
      }
      
      // In a real app, we would add the email to a newsletter service
      // For this demo, we'll just simulate a successful subscription
      console.log("Newsletter subscription:", email);
      
      res.status(200).json({ message: "Subscribed to newsletter successfully" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
