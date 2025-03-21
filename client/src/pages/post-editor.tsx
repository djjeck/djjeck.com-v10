import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertPostSchema, Post, Category, Author } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Extend the insert post schema to add client-side validation
const postFormSchema = insertPostSchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  authorId: z.coerce.number().min(1, "Author is required"),
  categoryId: z.coerce.number().min(1, "Category is required"),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function PostEditor() {
  const { user } = useAuth();
  const params = useParams();
  const postId = params?.id ? parseInt(params.id) : null;
  const isEditing = !!postId;
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Redirect if not logged in
  if (!user) {
    return <Redirect to="/auth" />;
  }

  // Fetch post if in edit mode
  const { data: post, isLoading: isLoadingPost } = useQuery<Post>({
    queryKey: ["/api/posts", postId],
    queryFn: async () => {
      if (!postId) return null;
      const res = await apiRequest("GET", `/api/posts/${postId}`);
      return res.json();
    },
    enabled: isEditing,
  });

  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/categories");
      return res.json();
    },
  });

  // Fetch authors
  const { data: authors, isLoading: isLoadingAuthors } = useQuery<Author[]>({
    queryKey: ["/api/authors"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/authors");
      return res.json();
    },
  });

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      coverImage: post?.coverImage || "",
      authorId: post?.authorId || 0,
      categoryId: post?.categoryId || 0,
      isFeatured: post?.isFeatured || false,
      publishedAt: post?.publishedAt || new Date().toISOString(),
    },
    values: post ? {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      authorId: post.authorId,
      categoryId: post.categoryId,
      isFeatured: post.isFeatured,
      publishedAt: post.publishedAt,
    } : undefined,
  });

  // Create or update post mutation
  const mutation = useMutation({
    mutationFn: async (data: PostFormValues) => {
      if (isEditing) {
        const res = await apiRequest("PATCH", `/api/posts/${postId}`, data);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/posts", data);
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "Your post has been updated successfully." 
          : "Your post has been created successfully.",
      });
      navigate("/admin");
    },
    onError: (error) => {
      toast({
        title: isEditing ? "Update failed" : "Creation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PostFormValues) => {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    mutation.mutate(data);
  };

  const isLoading = isLoadingPost || isLoadingCategories || isLoadingAuthors || mutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{isEditing ? "Edit Post" : "Create Post"}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading && !mutation.isPending ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Post" : "Create New Post"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="space-y-6">
                      {/* Title */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Post title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Slug */}
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="post-slug" {...field} />
                            </FormControl>
                            <FormDescription>
                              URL-friendly version of the title. Leave blank to auto-generate.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Content */}
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your post content here..." 
                                className="min-h-[300px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Supports Markdown formatting
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Excerpt */}
                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief summary of the post" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              A short summary displayed in post listings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="metadata" className="space-y-6">
                      {/* Cover Image */}
                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cover Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                              URL to the main image for this post
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Category */}
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem 
                                    key={category.id} 
                                    value={category.id.toString()}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Author */}
                      <FormField
                        control={form.control}
                        name="authorId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an author" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {authors?.map((author) => (
                                  <SelectItem 
                                    key={author.id} 
                                    value={author.id.toString()}
                                  >
                                    {author.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Featured */}
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Featured Post</FormLabel>
                              <FormDescription>
                                This post will be displayed in the featured section
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full md:w-auto"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isEditing ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {isEditing ? "Update Post" : "Create Post"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}