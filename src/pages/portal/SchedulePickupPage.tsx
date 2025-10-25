import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const pickupFormSchema = z.object({
  panelQuantity: z.coerce.number().int().positive({ message: "Please enter a valid quantity." }),
  pickupAddress: z.string().min(10, { message: "Address must be at least 10 characters." }),
  preferredDate: z.date(),
  contactPerson: z.string().min(2, { message: "Contact person name is required." }),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
  notes: z.string().optional(),
});
type PickupFormSchema = z.infer<typeof pickupFormSchema>;
export function SchedulePickupPage() {
  const queryClient = useQueryClient();
  const form = useForm<PickupFormSchema>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      panelQuantity: undefined,
      pickupAddress: "",
      preferredDate: undefined,
      contactPerson: "",
      contactPhone: "",
      notes: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (newPickup: PickupFormSchema) => {
      return api('/api/pickups', {
        method: 'POST',
        body: JSON.stringify({
          ...newPickup,
          preferredDate: newPickup.preferredDate.toISOString(),
        }),
      });
    },
    onSuccess: (data: any) => {
      toast.success("Pickup Scheduled!", {
        description: `Your request for pickup ID ${data.id} has been submitted.`,
      });
      queryClient.invalidateQueries({ queryKey: ['pickupHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to schedule pickup", {
        description: error.message,
      });
    },
  });
  function onSubmit(values: PickupFormSchema) {
    mutation.mutate(values);
  }
  return (
    <div className="animate-fade-in">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Schedule a New Pickup</CardTitle>
          <CardDescription>
            Fill out the form below to request a collection of your end-of-life solar panels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="panelQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Panels</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel>Preferred Pickup Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Pickup Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the full address of the solar plant or storage location." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On-site Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 12345 67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any special instructions for our pickup team?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-pvx-blue hover:bg-pvx-blue/90" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}