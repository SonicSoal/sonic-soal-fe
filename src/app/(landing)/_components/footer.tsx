import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-muted-foreground/10 py-12 px-4">
      {/* Footer background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background to-background"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-primary/5 via-secondary/5 to-transparent opacity-30 dark:opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-[#0B0C10] font-bold text-sm">
                S
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                SonicSoal
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              SonicSoal delivers frequency-optimized audio to enhance focus,
              relaxation, and spiritual alignment through the science of sound.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#samples"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Sample Sessions
                </Link>
              </li>
              <li>
                <Link
                  href="#earn"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Earn $SOAL
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/10 mt-12 pt-6 text-center text-muted-foreground text-base">
          <p>
            &copy; 2025{' '}
            <strong>
              SonicSoal<sup>™</sup>
            </strong>
            . All rights reserved.
            <br />
            <strong>
              SonicSoal<sup>™</sup>
            </strong>{' '}
            is a registered trademark. Patent pending.
          </p>
        </div>
      </div>
    </footer>
  );
}
