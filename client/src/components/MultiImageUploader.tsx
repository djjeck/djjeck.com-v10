import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Plus, MoveUp, MoveDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PostImage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface MultiImageUploaderProps {
  postId?: number;
  onChange: (images: PostImage[]) => void;
  initialImages?: PostImage[];
}

export default function MultiImageUploader({ 
  postId, 
  onChange, 
  initialImages = [] 
}: MultiImageUploaderProps) {
  const [images, setImages] = useState<PostImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // When initialImages change (e.g., when editing a post), update the local state
  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
    }
  }, [initialImages]);
  
  // When local images state changes, call the onChange callback
  useEffect(() => {
    onChange(images);
  }, [images, onChange]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      // Upload the image
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      
      const data = await response.json();
      
      // Add the new image to the list
      const newImage: PostImage = {
        id: 0, // Temporary ID until saved
        postId: postId || 0,
        imageUrl: data.imageUrl,
        caption: "",
        displayOrder: images.length,
      };
      
      setImages([...images, newImage]);
      
      toast({
        title: "Image uploaded",
        description: "The image has been added to the post.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === images.length - 1)
    ) {
      return;
    }
    
    const newImages = [...images];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newImages[index];
    
    newImages[index] = newImages[newIndex];
    newImages[newIndex] = temp;
    
    // Update display order
    newImages.forEach((img, idx) => {
      img.displayOrder = idx;
    });
    
    setImages(newImages);
  };

  const updateCaption = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, idx) => idx !== index);
    
    // Update display order after removal
    newImages.forEach((img, idx) => {
      img.displayOrder = idx;
    });
    
    setImages(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="multiple-image-upload">Upload additional images:</Label>
        <div className="flex items-center gap-2">
          <Input
            id="multiple-image-upload"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            disabled={isUploading}
            onChange={handleImageUpload}
            className="flex-1"
          />
          {isUploading && <Loader2 className="h-5 w-5 animate-spin" />}
        </div>
      </div>
      
      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-4 border rounded-md p-4">
          <h3 className="font-medium text-sm">Post Images ({images.length})</h3>
          
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={image.id || `temp-${index}`} className="border rounded-md p-3">
                <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                    <img 
                      src={image.imageUrl} 
                      alt={`Post image ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {/* Caption */}
                    <div className="grid gap-1">
                      <Label htmlFor={`image-caption-${index}`}>Caption</Label>
                      <Textarea 
                        id={`image-caption-${index}`}
                        value={image.caption || ""}
                        onChange={(e) => updateCaption(index, e.target.value)}
                        placeholder="Enter a caption for this image"
                        rows={2}
                      />
                    </div>
                    
                    {/* Image URL (read-only) */}
                    <div className="grid gap-1">
                      <Label htmlFor={`image-url-${index}`} className="text-xs text-muted-foreground">URL</Label>
                      <Input 
                        id={`image-url-${index}`}
                        value={image.imageUrl}
                        readOnly
                        className="text-xs h-8"
                      />
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex flex-col gap-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => moveImage(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8"
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => moveImage(index, "down")}
                      disabled={index === images.length - 1}
                      className="h-8 w-8"
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add image button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => document.getElementById("multiple-image-upload")?.click()}
        disabled={isUploading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Image
      </Button>
    </div>
  );
}