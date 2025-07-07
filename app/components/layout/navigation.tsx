'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  SparklesIcon,
  ThemeToggle
} from './theme-toggle';

const navigation = [
  { name: 'Product', href: '/', hasDropdown: true },
  { name: 'Playground', href: '/playground' },
  { name: 'Advanced', href: '/playground-advanced' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Status', href: '/status' },
];

export default function Navigation() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                DreamForge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/playground"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Playground
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="font-medium">{session.user?.name || 'User'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-popover-foreground hover:bg-accent transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/playground"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Try Free
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-6 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border">
                {status === 'loading' ? (
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                ) : session ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <UserCircleIcon className="h-6 w-6 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {session.user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/playground"
                      className="block text-muted-foreground hover:text-foreground transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Try Free
                    </Link>
                    <button
                      onClick={() => {
                        signIn();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 