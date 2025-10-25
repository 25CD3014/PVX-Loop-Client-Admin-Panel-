import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];
const NavLinkItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
      )
    }
  >
    {label}
  </NavLink>
);
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-pvx-green" />
            <span className="font-bold text-lg text-foreground">PVX Loop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLinkItem key={link.to} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <Link to="/admin/login">Admin Login</Link>
            </Button>
            <Button asChild className="hidden md:inline-flex bg-pvx-blue hover:bg-pvx-blue/90">
              <Link to="/login">Client Login</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-10">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          'text-lg font-medium transition-colors hover:text-primary',
                          isActive ? 'text-primary' : 'text-foreground'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Button asChild className="w-full bg-pvx-blue hover:bg-pvx-blue/90">
                    <Link to="/login">Client Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/login">Admin Login</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}