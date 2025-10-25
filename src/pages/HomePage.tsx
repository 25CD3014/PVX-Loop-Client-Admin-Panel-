import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Package, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
const features = [
  {
    icon: <Zap className="h-10 w-10 text-pvx-yellow" />,
    title: 'Immediate Profitability',
    description: 'We extract high-grade aluminum for immediate sale, ensuring a rapid ~2-month payback on our low-cost processing units.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-pvx-green" />,
    title: 'EPR-as-a-Service',
    description: 'We solve your legal compliance headache by managing and storing your solar panel waste according to E-Waste (Management) Rules, 2022.',
  },
  {
    icon: <Package className="h-10 w-10 text-pvx-blue" />,
    title: 'Strategic Stockpiling',
    description: 'The remaining panel components are stored as a long-term asset, positioning us for future monetization of valuable materials like silver and silicon.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-pvx-yellow" />,
    title: 'Competitive Advantage',
    description: 'Our low-CapEx, high-margin model focuses on solving today\'s legal and logistical problems, unlike competitors focused on high-cost, full recycling technology.',
  },
];
const testimonials = [
  {
    quote: "PVX Loop transformed our waste management from a liability into a streamlined, compliant operation. Their service is indispensable for any solar producer in India.",
    author: "R. Sharma",
    company: "CEO, SunPower India",
  },
  {
    quote: "The peace of mind from their EPR compliance service is invaluable. We can now focus on our core business, knowing our waste is handled professionally and legally.",
    author: "Anjali Mehta",
    company: "Operations Head, Helios Solar",
  },
];
export function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Turn Solar Waste into Profit and Compliance
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            PVX Loop offers a revolutionary EPR-as-a-Service model, solving India's solar waste crisis by making recycling immediately profitable and legally compliant for producers.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-pvx-blue hover:bg-pvx-blue/90 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link to="/services">Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* The Problem Section */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Two-Fold Crisis: Waste & Regulation</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                India is facing a "Solar Waste Tsunami," with up to 600,000 tonnes of panel waste expected by 2030. Simultaneously, the E-Waste (Management) Rules, 2022, place a massive, unfunded legal burden on producers to store this waste until 2034-35.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-destructive/10 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">The Waste Tsunami</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">600K Tonnes</p>
                  <p className="text-sm text-muted-foreground">of solar waste by 2030.</p>
                </CardContent>
              </Card>
              <Card className="bg-amber-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-600">The EPR Burden</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">Until 2035</p>
                  <p className="text-sm text-muted-foreground">producers must store their own waste.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Our Solution Section */}
      <section className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The PVX Loop Solution</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We tackle both problems with an efficient, two-phase model that prioritizes immediate profit and legal compliance.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="items-center">
                  <div className="p-4 bg-muted rounded-full">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trusted by Industry Leaders</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="pt-6">
                  <blockquote className="text-lg text-foreground">"{testimonial.quote}"</blockquote>
                  <footer className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-pvx-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Solve Your Solar Waste Problem?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
            Partner with PVX Loop to ensure your business is profitable, compliant, and sustainable.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="bg-white text-pvx-blue hover:bg-gray-200">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}