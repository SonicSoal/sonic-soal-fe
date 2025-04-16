'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary/90 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
            S
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-transparent bg-clip-text">
            SonicSoal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#samples"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Samples
          </Link>
          <Link
            href="#earn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Earn $SOAL
          </Link>
          <ThemeToggle />

          <Link href="/sign-in" passHref>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Sign In</span>
            </Button>
          </Link>

          <Link href="/sign-in" passHref>
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg">
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Try for Free</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#samples"
              className="text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Samples
            </Link>
            <Link
              href="#earn"
              className="text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Earn $SOAL
            </Link>

            <Link href="/sign-in" passHref>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 relative overflow-hidden group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative">Sign In</span>
              </Button>
            </Link>

            <Link href="/sign-in" passHref>
              <Button
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative">Try for Free</span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
