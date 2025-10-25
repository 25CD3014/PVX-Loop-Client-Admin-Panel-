import { Hono } from "hono";
import type { Env } from './core-utils';
import { ClientEntity, PickupRequestEntity, DocumentEntity, ContactInquiryEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { PickupRequest, PickupStatus, ContactInquiry, ComplianceDocument, AdminPickupRequest, AdminDashboardSummary } from "@shared/types";
let seeded = false;
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.use('*', async (c, next) => {
    if (!seeded) {
      await ClientEntity.ensureSeed(c.env);
      await PickupRequestEntity.ensureSeed(c.env);
      await DocumentEntity.ensureSeed(c.env);
      seeded = true;
    }
    await next();
  });
  // CLIENT ROUTES
  app.post('/api/login', async (c) => {
    const { email, password } = await c.req.json();
    if (email === 'client@pvxloop.com' && password === 'password') {
      return ok(c, { message: 'Login successful' });
    }
    return bad(c, 'Invalid credentials');
  });
  // ADMIN ROUTES
  app.post('/api/admin/login', async (c) => {
    const { email, password } = await c.req.json();
    if (email === 'admin@pvxloop.com' && password === 'adminpassword') {
      return ok(c, { message: 'Admin login successful' });
    }
    return bad(c, 'Invalid admin credentials');
  });
  app.get('/api/admin/dashboard', async (c) => {
    const allPickups = (await PickupRequestEntity.list(c.env)).items;
    const summary: AdminDashboardSummary = {
      totalPickups: allPickups.length,
      totalPanels: allPickups.reduce((sum, p) => sum + p.panelQuantity, 0),
      scheduled: allPickups.filter(p => p.status === PickupStatus.Scheduled).length,
      inTransit: allPickups.filter(p => p.status === PickupStatus.InTransit).length,
      processing: allPickups.filter(p => p.status === PickupStatus.Processing).length,
      completed: allPickups.filter(p => p.status === PickupStatus.Completed).length,
      cancelled: allPickups.filter(p => p.status === PickupStatus.Cancelled).length,
    };
    return ok(c, summary);
  });
  app.get('/api/inquiries', async (c) => {
    const inquiries = await ContactInquiryEntity.list(c.env);
    const sortedInquiries = inquiries.items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return ok(c, sortedInquiries);
  });
  // SHARED ROUTES
  app.get('/api/dashboard', async (c) => {
    const allPickups = (await PickupRequestEntity.list(c.env)).items;
    const summary = {
      totalPanels: allPickups.reduce((sum, p) => sum + p.panelQuantity, 0),
      upcomingPickups: allPickups.filter((p) => p.status === PickupStatus.Scheduled).length,
      docsReady: (await DocumentEntity.list(c.env)).items.length,
      completedPickups: allPickups.filter((p) => p.status === PickupStatus.Completed).length
    };
    const recentPickups = allPickups.
    sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).
    slice(0, 4);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const monthlyData: { [key: string]: { monthName: string, panels: number } } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const yearMonth = `${d.getFullYear()}-${d.getMonth()}`;
      monthlyData[yearMonth] = { monthName: monthNames[d.getMonth()], panels: 0 };
    }
    allPickups.forEach(p => {
      const pickupDate = new Date(p.createdAt);
      const pickupYearMonth = `${pickupDate.getFullYear()}-${pickupDate.getMonth()}`;
      if (monthlyData[pickupYearMonth]) {
        monthlyData[pickupYearMonth].panels += p.panelQuantity;
      }
    });
    const chartData = Object.values(monthlyData).map(data => ({ month: data.monthName, panels: data.panels }));
    return ok(c, { summary, recentPickups, chartData });
  });
  app.get('/api/pickups', async (c) => {
    const pickups = (await PickupRequestEntity.list(c.env)).items;
    const clients = (await ClientEntity.list(c.env)).items;
    const clientMap = new Map(clients.map(client => [client.id, client.name]));
    const adminPickups: AdminPickupRequest[] = pickups.map(p => ({
      ...p,
      clientName: clientMap.get(p.clientId) || 'Unknown Client'
    }));
    const sortedPickups = adminPickups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return ok(c, sortedPickups);
  });
  app.get('/api/pickups/:id', async (c) => {
    const id = c.req.param('id');
    const pickup = new PickupRequestEntity(c.env, id);
    if (!(await pickup.exists())) return notFound(c, 'Pickup not found');
    return ok(c, await pickup.getState());
  });
  app.post('/api/pickups', async (c) => {
    const body = await c.req.json();
    if (!body.panelQuantity || !body.pickupAddress || !body.preferredDate || !body.contactPerson || !body.contactPhone) {
      return bad(c, 'Missing required fields');
    }
    const newId = `PU-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const newPickup: PickupRequest = {
      id: newId,
      clientId: 'client-1',
      panelQuantity: body.panelQuantity,
      pickupAddress: body.pickupAddress,
      preferredDate: body.preferredDate,
      contactPerson: body.contactPerson,
      contactPhone: body.contactPhone,
      notes: body.notes,
      status: PickupStatus.Scheduled,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await PickupRequestEntity.create(c.env, newPickup);
    return ok(c, created);
  });
  app.post('/api/pickups/:id/status', async (c) => {
    const id = c.req.param('id');
    const { status } = await c.req.json();
    if (!status || !Object.values(PickupStatus).includes(status as PickupStatus)) {
      return bad(c, 'Invalid status provided');
    }
    const pickupEntity = new PickupRequestEntity(c.env, id);
    if (!(await pickupEntity.exists())) return notFound(c, 'Pickup not found');
    const updatedPickup = await pickupEntity.mutate((p) => ({ ...p, status, updatedAt: new Date().toISOString() }));
    if (status === PickupStatus.Completed) {
      const now = new Date().toISOString();
      const doc1: ComplianceDocument = { id: `DOC-${id}`, pickupId: id, clientId: updatedPickup.clientId, type: 'Chain-of-Custody', issuedAt: now, documentUrl: '#' };
      const doc2: ComplianceDocument = { id: `DOC-${id}-S`, pickupId: id, clientId: updatedPickup.clientId, type: 'Storage Certificate', issuedAt: now, documentUrl: '#' };
      await DocumentEntity.create(c.env, doc1);
      await DocumentEntity.create(c.env, doc2);
    }
    return ok(c, updatedPickup);
  });
  app.get('/api/documents', async (c) => {
    const docs = await DocumentEntity.list(c.env);
    const sortedDocs = docs.items.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
    return ok(c, sortedDocs);
  });
  app.post('/api/contact', async (c) => {
    const body = await c.req.json();
    if (!body.name || !body.email || !body.message) {
      return bad(c, 'Missing required fields');
    }
    const newInquiry: ContactInquiry = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      company: body.company,
      message: body.message,
      createdAt: new Date().toISOString()
    };
    const created = await ContactInquiryEntity.create(c.env, newInquiry);
    return ok(c, created);
  });
}