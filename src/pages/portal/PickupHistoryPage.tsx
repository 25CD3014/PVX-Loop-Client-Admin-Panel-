import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { PickupRequest } from '@shared/types';
import { PickupStatus } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { PickupDetailsModal } from '@/components/PickupDetailsModal';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed': return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90">Completed</Badge>;
    case 'Processing': return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-500/90">Processing</Badge>;
    case 'Scheduled': return <Badge variant="outline" className="text-blue-500 border-blue-500">Scheduled</Badge>;
    case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};
export function PickupHistoryPage() {
  const queryClient = useQueryClient();
  const [selectedPickupId, setSelectedPickupId] = useState<string | null>(null);
  const { data: pickupHistory, isLoading, isError, error } = useQuery<PickupRequest[]>({
    queryKey: ['pickupHistory'],
    queryFn: () => api('/api/pickups'),
  });
  const { data: selectedPickup, isLoading: isLoadingDetails } = useQuery<PickupRequest>({
    queryKey: ['pickupDetails', selectedPickupId],
    queryFn: () => api(`/api/pickups/${selectedPickupId}`),
    enabled: !!selectedPickupId,
  });
  const cancelMutation = useMutation({
    mutationFn: (pickupId: string) => {
      return api(`/api/pickups/${pickupId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: PickupStatus.Cancelled }),
      });
    },
    onSuccess: () => {
      toast.success("Pickup Cancelled", { description: "The pickup request has been successfully cancelled." });
      queryClient.invalidateQueries({ queryKey: ['pickupHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
    onError: (error) => {
      toast.error("Cancellation Failed", { description: error.message });
    },
  });
  const handleViewDetails = (id: string) => setSelectedPickupId(id);
  const handleCloseModal = () => setSelectedPickupId(null);
  const handleCancelPickup = (id: string) => cancelMutation.mutate(id);
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Pickup History</CardTitle>
          <CardDescription>A complete log of all your past and pending pickup requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="text-destructive flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load pickup history: {error.message}</p>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Panel Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : (
                pickupHistory?.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.id}</TableCell>
                    <TableCell>{new Date(pickup.preferredDate).toLocaleDateString()}</TableCell>
                    <TableCell>{pickup.panelQuantity}</TableCell>
                    <TableCell>{getStatusBadge(pickup.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(pickup.id)}>View Details</DropdownMenuItem>
                          {pickup.status === 'Scheduled' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Cancel Pickup</DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently cancel the pickup request for {pickup.id}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Back</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleCancelPickup(pickup.id)} className="bg-destructive hover:bg-destructive/90">
                                    Yes, cancel pickup
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && pickupHistory?.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No pickup history found.
            </div>
          )}
        </CardContent>
      </Card>
      <PickupDetailsModal
        isOpen={!!selectedPickupId}
        onClose={handleCloseModal}
        pickup={selectedPickup}
        isLoading={isLoadingDetails}
      />
    </div>
  );
}