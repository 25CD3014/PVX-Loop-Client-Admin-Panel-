import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Package, Truck, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { PickupRequest } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
interface DashboardData {
  summary: {
    totalPanels: number;
    upcomingPickups: number;
    docsReady: number;
    completedPickups: number;
  };
  recentPickups: PickupRequest[];
  chartData: { month: string; panels: number }[];
}
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed': return <Badge variant="default" className="bg-green-500 hover:bg-green-500/90">Completed</Badge>;
    case 'Processing': return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-500/90">Processing</Badge>;
    case 'Scheduled': return <Badge variant="outline" className="text-blue-500 border-blue-500">Scheduled</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};
export function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: () => api('/api/dashboard'),
  });
  const summaryData = [
    { icon: <Package className="h-6 w-6 text-muted-foreground" />, title: 'Total Panels Processed', value: data?.summary.totalPanels ?? 0 },
    { icon: <Truck className="h-6 w-6 text-muted-foreground" />, title: 'Upcoming Pickups', value: data?.summary.upcomingPickups ?? 0 },
    { icon: <FileText className="h-6 w-6 text-muted-foreground" />, title: 'Compliance Docs Ready', value: data?.summary.docsReady ?? 0 },
    { icon: <CheckCircle className="h-6 w-6 text-muted-foreground" />, title: 'Completed Pickups', value: data?.summary.completedPickups ?? 0 },
  ];
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2"><AlertCircle className="text-destructive" /> Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load dashboard data.</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Panel Processing</CardTitle>
            <CardDescription>Number of panels processed over the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading ? <Skeleton className="h-[300px] w-full" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data?.chartData}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                  <Bar dataKey="panels" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Pickups</CardTitle>
              <CardDescription>An overview of your most recent pickup requests.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/portal/history">
                View All <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-48 w-full" /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Panels</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recentPickups.map((pickup) => (
                    <TableRow key={pickup.id}>
                      <TableCell className="font-medium">{pickup.id}</TableCell>
                      <TableCell>{new Date(pickup.preferredDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{pickup.panelQuantity}</TableCell>
                      <TableCell className="text-right">{getStatusBadge(pickup.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}