import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { PickupRequest } from '@shared/types';
import { Calendar, Home, Package, Phone, User, MessageSquare } from 'lucide-react';
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed': return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90">Completed</Badge>;
    case 'Processing': return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-500/90">Processing</Badge>;
    case 'Scheduled': return <Badge variant="outline" className="text-blue-500 border-blue-500">Scheduled</Badge>;
    case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};
const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="text-muted-foreground">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);
export function PickupDetailsModal({
  pickup,
  isOpen,
  onClose,
  isLoading,
}: {
  pickup: PickupRequest | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Pickup Request Details</DialogTitle>
          <DialogDescription>
            {isLoading ? <Skeleton className="h-5 w-32" /> : `Details for request ID: ${pickup?.id}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading || !pickup ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Status</p>
                {getStatusBadge(pickup.status)}
              </div>
              <DetailRow icon={<Package className="h-5 w-5" />} label="Panel Quantity" value={pickup.panelQuantity.toLocaleString()} />
              <DetailRow icon={<Calendar className="h-5 w-5" />} label="Preferred Date" value={new Date(pickup.preferredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
              <DetailRow icon={<Home className="h-5 w-5" />} label="Pickup Address" value={pickup.pickupAddress} />
              <DetailRow icon={<User className="h-5 w-5" />} label="Contact Person" value={pickup.contactPerson} />
              <DetailRow icon={<Phone className="h-5 w-5" />} label="Contact Phone" value={pickup.contactPhone} />
              {pickup.notes && <DetailRow icon={<MessageSquare className="h-5 w-5" />} label="Notes" value={pickup.notes} />}
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}