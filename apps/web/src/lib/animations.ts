export const animations = {
  // Fade animations
  "fade-in": "animate-in fade-in duration-300",
  "fade-in-up": "animate-in fade-in slide-in-from-bottom-4 duration-300",
  "fade-in-down": "animate-in fade-in slide-in-from-top-4 duration-300",
  "fade-in-left": "animate-in fade-in slide-in-from-left-4 duration-300",
  "fade-in-right": "animate-in fade-in slide-in-from-right-4 duration-300",
  
  // Scale animations
  "scale-in": "animate-in zoom-in duration-300",
  "scale-out": "animate-out zoom-out duration-300",
  
  // Slide animations
  "slide-up": "animate-in slide-in-from-bottom-4 duration-300",
  "slide-down": "animate-in slide-in-from-top-4 duration-300",
  "slide-left": "animate-in slide-in-from-left-4 duration-300",
  "slide-right": "animate-in slide-in-from-right-4 duration-300",
  
  // Stagger delays
  "stagger-1": "delay-100",
  "stagger-2": "delay-200",
  "stagger-3": "delay-300",
  "stagger-4": "delay-400",
  "stagger-5": "delay-500",
} as const;

export type AnimationKey = keyof typeof animations;
