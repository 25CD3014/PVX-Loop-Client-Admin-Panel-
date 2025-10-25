import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Recycle } from 'lucide-react';
export function SiteFooter() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Recycle className="h-6 w-6 text-pvx-green" />
              <span className="font-bold text-lg">PVX Loop</span>
            </Link>
            <p className="text-sm">
              Solving India's solar waste crisis with profitable, compliant recycling solutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Client Portal</Link></li>
              <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PVX Loop. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}