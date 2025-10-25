import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { ContactInquiry } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function AdminInquiriesPage() {
  const { data: inquiries, isLoading, isError, error } = useQuery<ContactInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: () => api('/api/inquiries'),
  });
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Inquiries</CardTitle>
          <CardDescription>Messages submitted through the public contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="text-destructive flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load inquiries: {error.message}</p>
            </div>
          )}
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : inquiries && inquiries.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {inquiries.map((inquiry) => (
                <AccordionItem value={inquiry.id} key={inquiry.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span className="font-medium">{inquiry.name}</span>
                      <span className="text-muted-foreground">{inquiry.company || 'N/A'}</span>
                      <span className="text-sm text-muted-foreground">{new Date(inquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium">Email: <a href={`mailto:${inquiry.email}`} className="text-pvx-blue hover:underline">{inquiry.email}</a></p>
                      <p className="mt-4 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No inquiries found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}