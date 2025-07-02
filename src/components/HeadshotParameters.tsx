import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface HeadshotParams {
  style: string;
  background: string;
  lighting: string;
  clothing: string;
  pose: string;
  enhancement: string[];
}

interface HeadshotParametersProps {
  params: HeadshotParams;
  onParamsChange: (params: HeadshotParams) => void;
}

const STYLE_OPTIONS = [
  { id: 'business', label: 'Business Professional', desc: 'Corporate & LinkedIn' },
  { id: 'creative', label: 'Creative Professional', desc: 'Artistic & Modern' },
  { id: 'executive', label: 'Executive', desc: 'Leadership & Authority' },
  { id: 'casual', label: 'Business Casual', desc: 'Approachable & Friendly' },
  { id: 'academic', label: 'Academic', desc: 'Educational & Research' },
  { id: 'medical', label: 'Medical/Healthcare', desc: 'Healthcare Professional' }
];

const BACKGROUND_OPTIONS = [
  { id: 'studio-white', label: 'Studio White', desc: 'Clean & Professional' },
  { id: 'studio-gray', label: 'Studio Gray', desc: 'Neutral & Elegant' },
  { id: 'office', label: 'Office Environment', desc: 'Workplace Setting' },
  { id: 'outdoor', label: 'Outdoor Natural', desc: 'Natural Lighting' },
  { id: 'textured', label: 'Textured Wall', desc: 'Subtle Texture' },
  { id: 'gradient', label: 'Professional Gradient', desc: 'Modern Gradient' }
];

const LIGHTING_OPTIONS = [
  { id: 'natural', label: 'Natural Light', desc: 'Soft & Flattering' },
  { id: 'studio', label: 'Studio Lighting', desc: 'Professional Setup' },
  { id: 'dramatic', label: 'Dramatic', desc: 'Strong Contrast' },
  { id: 'soft', label: 'Soft Light', desc: 'Gentle & Warm' },
  { id: 'key-fill', label: 'Key + Fill', desc: 'Balanced Professional' }
];

const CLOTHING_OPTIONS = [
  { id: 'suit', label: 'Business Suit', desc: 'Formal Professional' },
  { id: 'blazer', label: 'Blazer & Shirt', desc: 'Smart Business' },
  { id: 'dress-shirt', label: 'Dress Shirt', desc: 'Clean & Crisp' },
  { id: 'sweater', label: 'Professional Sweater', desc: 'Approachable Style' },
  { id: 'polo', label: 'Polo Shirt', desc: 'Business Casual' },
  { id: 'blouse', label: 'Professional Blouse', desc: 'Elegant & Professional' }
];

const POSE_OPTIONS = [
  { id: 'traditional', label: 'Traditional', desc: 'Classic Head & Shoulders' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm & Approachable' },
  { id: 'confident', label: 'Confident', desc: 'Strong & Assertive' },
  { id: 'relaxed', label: 'Relaxed', desc: 'Natural & Comfortable' },
  { id: 'dynamic', label: 'Dynamic', desc: 'Energetic & Modern' }
];

const ENHANCEMENT_OPTIONS = [
  { id: 'skin-smoothing', label: 'Skin Smoothing', desc: 'Natural skin enhancement' },
  { id: 'teeth-whitening', label: 'Teeth Whitening', desc: 'Brighter smile' },
  { id: 'eye-enhancement', label: 'Eye Enhancement', desc: 'Brighter, more defined eyes' },
  { id: 'color-correction', label: 'Color Correction', desc: 'Perfect color balance' },
  { id: 'lighting-adjustment', label: 'Lighting Adjustment', desc: 'Optimal lighting' },
  { id: 'background-cleanup', label: 'Background Cleanup', desc: 'Clean background' }
];

export const HeadshotParameters: React.FC<HeadshotParametersProps> = ({
  params,
  onParamsChange
}) => {
  const updateParam = (key: keyof HeadshotParams, value: any) => {
    onParamsChange({ ...params, [key]: value });
  };

  const toggleEnhancement = (enhancement: string) => {
    const newEnhancements = params.enhancement.includes(enhancement)
      ? params.enhancement.filter(e => e !== enhancement)
      : [...params.enhancement, enhancement];
    updateParam('enhancement', newEnhancements);
  };

  const OptionGrid = ({ 
    options, 
    selected, 
    onSelect, 
    title 
  }: { 
    options: any[], 
    selected: string, 
    onSelect: (id: string) => void,
    title: string 
  }) => (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <Button
              key={option.id}
              variant={selected === option.id ? "default" : "professional"}
              onClick={() => onSelect(option.id)}
              className="h-auto p-4 text-left flex flex-col items-start justify-start"
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-xs opacity-80 mt-1">{option.desc}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <OptionGrid
        title="Professional Style"
        options={STYLE_OPTIONS}
        selected={params.style}
        onSelect={(value) => updateParam('style', value)}
      />

      <OptionGrid
        title="Background"
        options={BACKGROUND_OPTIONS}
        selected={params.background}
        onSelect={(value) => updateParam('background', value)}
      />

      <OptionGrid
        title="Lighting Setup"
        options={LIGHTING_OPTIONS}
        selected={params.lighting}
        onSelect={(value) => updateParam('lighting', value)}
      />

      <OptionGrid
        title="Clothing Style"
        options={CLOTHING_OPTIONS}
        selected={params.clothing}
        onSelect={(value) => updateParam('clothing', value)}
      />

      <OptionGrid
        title="Pose & Expression"
        options={POSE_OPTIONS}
        selected={params.pose}
        onSelect={(value) => updateParam('pose', value)}
      />

      {/* Enhancement Options */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Photo Enhancements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ENHANCEMENT_OPTIONS.map((option) => (
              <div
                key={option.id}
                onClick={() => toggleEnhancement(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                  params.enhancement.includes(option.id)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium block">{option.label}</span>
                    <span className="text-xs opacity-80 mt-1 block">{option.desc}</span>
                  </div>
                  {params.enhancement.includes(option.id) && (
                    <Badge variant="secondary" className="ml-2">✓</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};