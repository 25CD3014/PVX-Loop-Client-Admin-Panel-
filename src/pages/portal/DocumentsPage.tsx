import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { ComplianceDocument } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
export function DocumentsPage() {
  const { data: documents, isLoading, isError, error } = useQuery<ComplianceDocument[]>({
    queryKey: ['documents'],
    queryFn: () => api('/api/documents'),
  });
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Documents</CardTitle>
          <CardDescription>
            Access and download your chain-of-custody and storage compliance certificates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load documents: {error.message}</p>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document ID</TableHead>
                <TableHead>Related Pickup</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-28 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : (
                documents?.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.pickupId}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{new Date(doc.issuedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <a href={doc.documentUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && documents?.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No documents found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}