import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Sparkles } from 'lucide-react';
import { HeadshotParams } from './HeadshotParameters';

interface ProcessingViewProps {
  images: File[];
  params: HeadshotParams;
  onBack: () => void;
}

interface ProcessedImage {
  original: File;
  processed: string; // URL for processed image
  status: 'processing' | 'completed' | 'failed';
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  images,
  params,
  onBack
}) => {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentProcessing, setCurrentProcessing] = useState(0);

  useEffect(() => {
    // Initialize processed images
    const initialProcessed = images.map(image => ({
      original: image,
      processed: '',
      status: 'processing' as const
    }));
    setProcessedImages(initialProcessed);

    // Simulate processing
    const processImages = async () => {
      for (let i = 0; i < images.length; i++) {
        setCurrentProcessing(i);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        // For demo purposes, use the original image as "processed"
        setProcessedImages(prev => prev.map((item, index) => 
          index === i 
            ? { ...item, processed: URL.createObjectURL(item.original), status: 'completed' }
            : item
        ));
        
        setOverallProgress(((i + 1) / images.length) * 100);
      }
    };

    processImages();
  }, [images]);

  const downloadImage = (imageUrl: string, originalName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `professional_${originalName}`;
    link.click();
  };

  const downloadAll = () => {
    processedImages.forEach((item, index) => {
      if (item.status === 'completed') {
        setTimeout(() => {
          downloadImage(item.processed, item.original.name);
        }, index * 500); // Stagger downloads
      }
    });
  };

  const completedCount = processedImages.filter(img => img.status === 'completed').length;
  const isProcessingComplete = completedCount === images.length;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                AI Processing Your Headshots
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Creating professional headshots with your selected parameters
              </p>
            </div>
            <Badge variant="secondary" className="text-lg p-2">
              {completedCount}/{images.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            {!isProcessingComplete && (
              <div className="text-sm text-muted-foreground">
                Currently processing: Image {currentProcessing + 1} of {images.length}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Parameters Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Applied Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Style</span>
              <p className="font-medium capitalize">{params.style.replace('-', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Background</span>
              <p className="font-medium capitalize">{params.background.replace('-', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Lighting</span>
              <p className="font-medium capitalize">{params.lighting.replace('-', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Clothing</span>
              <p className="font-medium capitalize">{params.clothing.replace('-', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Pose</span>
              <p className="font-medium capitalize">{params.pose}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Enhancements</span>
              <p className="font-medium">{params.enhancement.length} applied</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedImages.map((item, index) => (
          <Card key={index} className="shadow-card overflow-hidden">
            <div className="aspect-[3/4] relative">
              {item.status === 'processing' ? (
                <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse" />
                    <p className="text-sm text-muted-foreground">Processing...</p>
                  </div>
                </div>
              ) : item.status === 'completed' ? (
                <div className="relative group">
                  {/* Before/After Split View */}
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(item.original)}
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/90"></div>
                    <img
                      src={item.processed}
                      alt="Processed"
                      className="absolute inset-0 w-full h-full object-cover clip-path-half"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => downloadImage(item.processed, item.original.name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-destructive/10 flex items-center justify-center">
                  <p className="text-destructive text-sm">Processing failed</p>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm truncate">{item.original.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(item.original.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <Badge 
                  variant={
                    item.status === 'completed' ? 'default' : 
                    item.status === 'processing' ? 'secondary' : 'destructive'
                  }
                >
                  {item.status === 'completed' ? '✓' : 
                   item.status === 'processing' ? '⏳' : '✗'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          ← Back to Upload
        </Button>
        
        {isProcessingComplete && (
          <Button variant="hero" size="lg" onClick={downloadAll}>
            <Download className="w-5 h-5 mr-2" />
            Download All ({completedCount} images)
          </Button>
        )}
      </div>

      <style>{`
        .clip-path-half {
          clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
        }
      `}</style>
    </div>
  );
};