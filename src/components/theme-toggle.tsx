'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the button with the same dimensions to prevent layout shift
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-full cursor-pointer transition-colors "
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {!mounted ? (
        // Placeholder icon while loading - using SunMoon as a neutral option
        <SunMoon className="h-5 w-5 text-muted-foreground opacity-70" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -45, opacity: 0, y: 10 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: 45, opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-5 w-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 45, opacity: 0, y: 10 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: -45, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-5 w-5 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Button>
  );
}
