import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileIcon, FolderIcon, SearchIcon, ShieldIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 items-center justify-between w-full">
          <div className="flex items-center gap-2 font-bold">
            <FileIcon className="h-6 w-6 text-primary" />
            <span>DocManager</span>
          </div>
          <nav className="hidden md:flex justify-between gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Manage your documents with ease
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Secure, organized, and accessible. The document management solution for modern teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/auth/register">
                  <Button size="lg" className="transition-all hover:scale-105">
                    Start for free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Everything you need to manage your documents
              </h2>
              <p className="max-w-[700px] text-muted-foreground">
                Powerful features designed to make document management simple and efficient.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Document Storage</h3>
                <p className="text-muted-foreground">
                  Upload, store, and access your documents securely from anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <FolderIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Organize Effortlessly</h3>
                <p className="text-muted-foreground">
                  Create folders, add tags, and categorize your documents for easy retrieval.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <SearchIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Find any document instantly with powerful search and filtering capabilities.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Access Control</h3>
                <p className="text-muted-foreground">
                  Control who can view, edit, or delete your documents with granular permissions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <FileIcon className="h-5 w-5 text-primary" />
            <span>DocManager</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DocManager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}