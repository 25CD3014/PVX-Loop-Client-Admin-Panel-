import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, AlertCircle, Package, Truck, CheckCircle, XCircle, Clock, Cog } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { AdminPickupRequest, AdminDashboardSummary, PickupRequest } from '@shared/types';
import { PickupStatus } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { PickupDetailsModal } from '@/components/PickupDetailsModal';
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed': return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90">Completed</Badge>;
    case 'Processing': return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-500/90">Processing</Badge>;
    case 'In Transit': return <Badge variant="secondary" className="bg-orange-500 hover:bg-orange-500/90">In Transit</Badge>;
    case 'Scheduled': return <Badge variant="outline" className="text-blue-500 border-blue-500">Scheduled</Badge>;
    case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};
export function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const [selectedPickupId, setSelectedPickupId] = useState<string | null>(null);
  const { data: summary, isLoading: isLoadingSummary } = useQuery<AdminDashboardSummary>({
    queryKey: ['adminDashboardSummary'],
    queryFn: () => api('/api/admin/dashboard'),
  });
  const { data: pickups, isLoading: isLoadingPickups, isError, error } = useQuery<AdminPickupRequest[]>({
    queryKey: ['adminPickups'],
    queryFn: () => api('/api/pickups'),
  });
  const { data: selectedPickup, isLoading: isLoadingDetails } = useQuery<PickupRequest>({
    queryKey: ['pickupDetails', selectedPickupId],
    queryFn: () => api(`/api/pickups/${selectedPickupId}`),
    enabled: !!selectedPickupId,
  });
  const updateStatusMutation = useMutation({
    mutationFn: ({ pickupId, status }: { pickupId: string, status: PickupStatus }) => {
      return api(`/api/pickups/${pickupId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: (_, variables) => {
      toast.success("Pickup Status Updated", { description: `Pickup ${variables.pickupId} is now ${variables.status}.` });
      queryClient.invalidateQueries({ queryKey: ['adminPickups'] });
      queryClient.invalidateQueries({ queryKey: ['pickupHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboardSummary'] });
    },
    onError: (error) => {
      toast.error("Status Update Failed", { description: error.message });
    },
  });
  const handleStatusUpdate = (pickupId: string, status: PickupStatus) => {
    updateStatusMutation.mutate({ pickupId, status });
  };
  const handleViewDetails = (id: string) => setSelectedPickupId(id);
  const handleCloseModal = () => setSelectedPickupId(null);
  const summaryCards = [
    { title: 'Total Pickups', value: summary?.totalPickups, icon: <Package className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Scheduled', value: summary?.scheduled, icon: <Clock className="h-6 w-6 text-muted-foreground" /> },
    { title: 'In Transit', value: summary?.inTransit, icon: <Truck className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Processing', value: summary?.processing, icon: <Cog className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Completed', value: summary?.completed, icon: <CheckCircle className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Cancelled', value: summary?.cancelled, icon: <XCircle className="h-6 w-6 text-muted-foreground" /> },
  ];
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              {isLoadingSummary ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{card.value?.toLocaleString() ?? 0}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage All Pickup Requests</CardTitle>
          <CardDescription>View, track, and update the status of all client pickup requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="text-destructive flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load pickup requests: {error.message}</p>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingPickups ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : (
                pickups?.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.id}</TableCell>
                    <TableCell>{pickup.clientName}</TableCell>
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
                          <DropdownMenuItem onSelect={() => handleViewDetails(pickup.id)}>View Details</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {Object.values(PickupStatus).map(status => (
                                  <DropdownMenuItem key={status} onSelect={() => handleStatusUpdate(pickup.id, status)}>
                                    {status}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoadingPickups && pickups?.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No pickup requests found.
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