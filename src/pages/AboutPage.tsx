import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Handshake } from 'lucide-react';
export function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About PVX Loop</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a cleantech startup on a mission to revolutionize solar waste management in India through innovation, profitability, and unwavering commitment to compliance.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Born out of the Innovathon at NIT Rourkela, PVX Loop was founded by Team Neon Codex with a singular vision: to address the critical, yet overlooked, challenge of solar panel waste. We saw a two-sided crisis���a looming environmental problem and a crippling legal burden for producers. Instead of focusing on complex, high-cost recycling technologies, we chose a pragmatic, high-value approach.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our model is built on a simple premise: solve the most pressing problem first. For solar producers today, that problem is the EPR storage mandate. By providing "EPR-as-a-Service," we not only solve their legal headache but also create an immediate revenue stream by extracting the most accessible valuable material—the aluminum frame. This unique strategy makes us profitable from day one and builds a foundation for future resource recovery.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1509390643321-9788f5a4a5a7?q=80&w=2070&auto=format&fit=crop"
              alt="Team working on a project"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto bg-pvx-blue/10 p-4 rounded-full w-fit">
                <Target className="h-8 w-8 text-pvx-blue" />
              </div>
              <CardTitle className="mt-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide solar producers with the most efficient, profitable, and legally compliant waste management solutions, turning their liabilities into assets for a sustainable future.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto bg-pvx-green/10 p-4 rounded-full w-fit">
                <Eye className="h-8 w-8 text-pvx-green" />
              </div>
              <CardTitle className="mt-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become India's leading cleantech partner in the circular economy for solar energy, creating a vast, pre-processed stockpile of valuable materials for future generations.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto bg-pvx-yellow/10 p-4 rounded-full w-fit">
                <Handshake className="h-8 w-8 text-pvx-yellow" />
              </div>
              <CardTitle className="mt-4">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are driven by innovation, pragmatism, and partnership. We believe in creating win-win solutions that benefit our clients, the environment, and our business.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}