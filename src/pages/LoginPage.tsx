import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { Recycle } from 'lucide-react';
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});
type LoginSchema = z.infer<typeof loginSchema>;
export function LoginPage() {
  const login = useAuthStore(s => s.login);
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: LoginSchema) => {
    try {
      await api('/api/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      login();
      toast.success('Login Successful', { description: 'Redirecting to your dashboard...' });
      navigate('/portal/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error('Login Failed', { description: errorMessage });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Recycle className="h-8 w-8 text-pvx-green" />
            <span className="text-2xl font-bold">PVX Loop</span>
          </div>
          <CardTitle className="text-2xl">Client Portal Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="client@pvxloop.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-pvx-blue hover:bg-pvx-blue/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Use <code className="bg-muted p-1 rounded">client@pvxloop.com</code> and <code className="bg-muted p-1 rounded">password</code> to log in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}