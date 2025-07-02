import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Camera, Users, Star, ArrowRight } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';
import { HeadshotParameters, HeadshotParams } from '@/components/HeadshotParameters';
import { ProcessingView } from '@/components/ProcessingView';
import heroImage from '@/assets/hero-headshot.jpg';

type Step = 'welcome' | 'upload' | 'parameters' | 'processing';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [headshotParams, setHeadshotParams] = useState<HeadshotParams>({
    style: 'business',
    background: 'studio-white',
    lighting: 'natural',
    clothing: 'blazer',
    pose: 'traditional',
    enhancement: ['skin-smoothing', 'color-correction']
  });

  const handleStartUpload = () => {
    setCurrentStep('upload');
  };

  const handleContinueToParameters = () => {
    if (uploadedImages.length > 0) {
      setCurrentStep('parameters');
    }
  };

  const handleStartProcessing = () => {
    setCurrentStep('processing');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
    setUploadedImages([]);
  };

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <ProcessingView
            images={uploadedImages}
            params={headshotParams}
            onBack={handleBackToWelcome}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">AI Headshot Pro</h1>
            </div>
            <div className="flex gap-4">
              {currentStep !== 'welcome' && (
                <Button variant="outline" onClick={handleBackToWelcome}>
                  ← Start Over
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {currentStep === 'welcome' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <div className="absolute inset-0">
                <img 
                  src={heroImage} 
                  alt="Professional headshot studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>
              <div className="relative p-8 md:p-16 text-white">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Professional AI
                    <span className="block text-primary-glow">Headshots</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">
                    Transform your photos into stunning professional headshots with advanced AI technology. 
                    Perfect for LinkedIn, corporate profiles, and personal branding.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      onClick={handleStartUpload}
                      className="text-lg px-8 py-4"
                    >
                      Create Headshots
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                      View Examples
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-card bg-gradient-card">
                <CardContent className="p-8">
                  <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Studio Quality</h3>
                  <p className="text-muted-foreground">
                    Professional-grade results with customizable lighting, backgrounds, and poses
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card bg-gradient-card">
                <CardContent className="p-8">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">AI Enhanced</h3>
                  <p className="text-muted-foreground">
                    Advanced AI technology ensures natural-looking enhancement and professional appearance
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card bg-gradient-card">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Multiple Styles</h3>
                  <p className="text-muted-foreground">
                    Choose from business, creative, executive, and casual professional styles
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Social Proof */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Trusted by Professionals</h2>
                  <p className="text-muted-foreground text-lg">Join thousands who have transformed their professional image</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                    <p className="text-muted-foreground">Headshots Created</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <p className="text-muted-foreground">Customer Satisfaction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Upload Your Photos</h2>
              <p className="text-muted-foreground text-lg">
                Upload 3-10 photos for the best results. Include various angles and expressions.
              </p>
            </div>
            
            <ImageUpload
              images={uploadedImages}
              onImagesChange={setUploadedImages}
              maxImages={10}
            />
            
            {uploadedImages.length > 0 && (
              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleContinueToParameters}
                  className="text-lg px-8"
                >
                  Continue to Customization
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}

        {currentStep === 'parameters' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Customize Your Headshots</h2>
              <p className="text-muted-foreground text-lg">
                Select your preferred style, background, and enhancements for the perfect professional look.
              </p>
            </div>
            
            <HeadshotParameters
              params={headshotParams}
              onParamsChange={setHeadshotParams}
            />
            
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4 p-6 bg-accent/50 rounded-lg">
                <Badge variant="secondary" className="text-lg p-2">
                  {uploadedImages.length} images
                </Badge>
                <span className="text-muted-foreground">×</span>
                <Badge variant="secondary" className="text-lg p-2">
                  {headshotParams.enhancement.length} enhancements
                </Badge>
                <span className="text-muted-foreground">=</span>
                <Badge variant="default" className="text-lg p-2">
                  Professional results
                </Badge>
              </div>
              
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleStartProcessing}
                className="text-lg px-12"
              >
                Generate Headshots
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
