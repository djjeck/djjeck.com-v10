import { useState } from "react";
import { PostImage } from "@shared/schema";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: PostImage[];
  altText?: string;
  showFullscreen?: boolean;
}

const ImageCarousel = ({ images, altText, showFullscreen = true }: ImageCarouselProps) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const isFullscreenOpen = fullscreenIndex !== null;

  if (images.length === 0) {
    return null;
  }

  // If there's only one image, display it without carousel controls
  if (images.length === 1) {
    return (
      <div className="my-6 relative">
        <img 
          src={images[0].imageUrl} 
          alt={altText || "Post image"} 
          className="w-full h-auto rounded-lg object-cover cursor-pointer"
          onClick={() => showFullscreen && setFullscreenIndex(0)}
        />
      </div>
    );
  }

  // Sort images by display order
  const sortedImages = [...images].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <>
      <div className="my-6 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {sortedImages.map((image, index) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <img 
                    src={image.imageUrl} 
                    alt={altText ? `${altText} ${index + 1}` : `Post image ${index + 1}`} 
                    className="w-full h-auto object-cover rounded-lg cursor-pointer"
                    style={{ maxHeight: "500px" }}
                    onClick={() => showFullscreen && setFullscreenIndex(index)}
                  />
                  {image.caption && (
                    <p className="text-center text-gray-500 text-sm mt-2">{image.caption}</p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Fullscreen image viewer */}
      {isFullscreenOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setFullscreenIndex(null)}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white"
            onClick={() => setFullscreenIndex(null)}
          >
            <X className="h-8 w-8" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 text-white",
              fullscreenIndex === 0 && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (fullscreenIndex > 0) {
                setFullscreenIndex(fullscreenIndex - 1);
              }
            }}
            disabled={fullscreenIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <div className="max-w-5xl max-h-screen p-8">
            <img 
              src={sortedImages[fullscreenIndex].imageUrl} 
              alt={altText ? `${altText} ${fullscreenIndex + 1}` : `Post image ${fullscreenIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {sortedImages[fullscreenIndex].caption && (
              <p className="text-center text-white mt-4">
                {sortedImages[fullscreenIndex].caption}
              </p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute right-4 top-1/2 transform -translate-y-1/2 text-white",
              fullscreenIndex === sortedImages.length - 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (fullscreenIndex < sortedImages.length - 1) {
                setFullscreenIndex(fullscreenIndex + 1);
              }
            }}
            disabled={fullscreenIndex === sortedImages.length - 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;