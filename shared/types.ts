export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// PVX Loop Specific Types
export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}
export enum PickupStatus {
  Scheduled = 'Scheduled',
  InTransit = 'In Transit',
  Processing = 'Processing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
export interface PickupRequest {
  id: string;
  clientId: string;
  panelQuantity: number;
  pickupAddress: string;
  preferredDate: string; // ISO 8601 date string
  contactPerson: string;
  contactPhone: string;
  notes?: string;
  status: PickupStatus;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}
export interface AdminPickupRequest extends PickupRequest {
  clientName: string;
}
export interface ComplianceDocument {
  id: string;
  pickupId: string;
  clientId: string;
  type: 'Chain-of-Custody' | 'Storage Certificate';
  documentUrl: string;
  issuedAt: string; // ISO 8601 datetime string
}
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string; // ISO 8601 datetime string
}
export interface AdminDashboardSummary {
  totalPickups: number;
  totalPanels: number;
  scheduled: number;
  inTransit: number;
  processing: number;
  completed: number;
  cancelled: number;
}