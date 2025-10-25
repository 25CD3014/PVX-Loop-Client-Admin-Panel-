import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});
type ContactFormSchema = z.infer<typeof contactFormSchema>;
export function ContactPage() {
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (newInquiry: ContactFormSchema) => {
      return api('/api/contact', {
        method: 'POST',
        body: JSON.stringify(newInquiry),
      });
    },
    onSuccess: () => {
      toast.success("Message Sent!", {
        description: "Thank you for reaching out. We will get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: error.message,
      });
    },
  });
  function onSubmit(values: ContactFormSchema) {
    mutation.mutate(values);
  }
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions about our services or want to discuss a partnership? We'd love to hear from you.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Mail className="h-8 w-8 text-pvx-blue" />
                <div>
                  <CardTitle>Email</CardTitle>
                  <p className="text-muted-foreground">contact@pvxloop.com</p>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Phone className="h-8 w-8 text-pvx-green" />
                <div>
                  <CardTitle>Phone</CardTitle>
                  <p className="text-muted-foreground">+91 123 456 7890</p>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <MapPin className="h-8 w-8 text-pvx-yellow" />
                <div>
                  <CardTitle>Address</CardTitle>
                  <p className="text-muted-foreground">NIT Rourkela, Odisha, India</p>
                </div>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we help you?" className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-pvx-blue hover:bg-pvx-blue/90" disabled={mutation.isPending}>
                      {mutation.isPending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}