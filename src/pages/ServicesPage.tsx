import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Warehouse, FileText, Recycle } from 'lucide-react';
const processSteps = [
  {
    icon: <Truck className="h-8 w-8 text-pvx-blue" />,
    title: "1. Collection & Logistics",
    description: "We partner with local logistics providers for efficient 'milk runs' to collect End-of-Life (EoL) panels directly from your site, slashing transportation costs."
  },
  {
    icon: <Recycle className="h-8 w-8 text-pvx-green" />,
    title: "2. Aluminum De-framing",
    description: "At our processing unit, panels are immediately fed into our proprietary machine to cleanly and quickly remove the high-grade aluminum frame."
  },
  {
    icon: <Warehouse className="h-8 w-8 text-pvx-yellow" />,
    title: "3. Compliant Storage",
    description: "The de-framed sheets are flat-packed, barcoded, and stored in our secure facility, creating an auditable chain of custody for your EPR compliance."
  },
  {
    icon: <FileText className="h-8 w-8 text-pvx-blue" />,
    title: "4. Compliance Certification",
    description: "We provide you with a 'storage compliance' certificate, giving you the documentation needed to satisfy the E-Waste (Management) Rules, 2022."
  }
];
export function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We offer a comprehensive "EPR-as-a-Service" solution designed to eliminate your solar waste compliance burdens while unlocking immediate value.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">The PVX Loop Model: A Phased Approach</h2>
            <p className="mt-4 text-muted-foreground">
              Our innovative model is divided into two strategic phases. Phase 1 focuses on solving your immediate problems—profitability and legal compliance. Phase 2 positions us, and by extension our partners, for long-term asset monetization.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-pvx-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phase 1: Immediate Profit & Compliance (Now)</h3>
                  <p className="text-muted-foreground">Aluminum-first extraction for quick revenue and professional storage to meet EPR mandates.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-pvx-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phase 2: Future Asset Monetization (Post-2030)</h3>
                  <p className="text-muted-foreground">Leveraging our strategically acquired stockpile of pre-processed panels for future silver and silicon extraction.</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1624165220936-39668280192f?q=80&w=1974&auto=format&fit=crop"
              alt="Solar panels being recycled"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Our Operational Process Flow</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A seamless, transparent, and efficient process from collection to compliance.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <Card key={step.title} className="text-center">
                <CardHeader className="items-center">
                  <div className="p-4 bg-muted rounded-full">{step.icon}</div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}