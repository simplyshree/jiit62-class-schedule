import { useState, useEffect } from "react";

const POSITIVE_QUOTES = [
  "You are capable of amazing things! 🌟",
  "Every day is a fresh start! ☀️",
  "Believe in yourself! 💪",
  "You've got this! 🚀",
  "Stay positive and strong! 💙",
  "Your potential is limitless! ✨",
  "Keep shining bright! 🌈",
  "Dream big, work hard! 💫",
  "You are stronger than you think! 🦋",
  "Make today amazing! 🎯",
];

interface Bubble {
  id: number;
  quote: string;
  left: number;
  delay: number;
  duration: number;
}

export const PositiveBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const createBubble = () => {
      const newBubble: Bubble = {
        id: Date.now(),
        quote: POSITIVE_QUOTES[Math.floor(Math.random() * POSITIVE_QUOTES.length)],
        left: Math.random() * 80 + 10, // 10-90% from left
        delay: 0,
        duration: 15 + Math.random() * 5, // 15-20 seconds
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after animation completes
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, (newBubble.duration + 1) * 1000);
    };

    // Create initial bubbles
    createBubble();
    
    // Create new bubble every 5 seconds
    const interval = setInterval(createBubble, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 rounded-full px-6 py-3 shadow-lg">
            <p className="text-sm md:text-base font-medium text-primary whitespace-nowrap">
              {bubble.quote}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
