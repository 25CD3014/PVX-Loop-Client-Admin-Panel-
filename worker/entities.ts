import { IndexedEntity } from "./core-utils";
import type { Client, PickupRequest, ComplianceDocument, ContactInquiry } from "@shared/types";
import { PickupStatus } from "@shared/types";
// CLIENT ENTITY
export class ClientEntity extends IndexedEntity<Client> {
  static readonly entityName = "client";
  static readonly indexName = "clients";
  static readonly initialState: Client = { id: "", name: "", email: "", address: "" };
  static seedData: Client[] = [
    { id: 'client-1', name: 'SunPower India', email: 'client@pvxloop.com', address: '123 Solar Way, Bangalore' }
  ];
}
// PICKUP REQUEST ENTITY
export class PickupRequestEntity extends IndexedEntity<PickupRequest> {
  static readonly entityName = "pickup";
  static readonly indexName = "pickups";
  static readonly initialState: PickupRequest = {
    id: "",
    clientId: "",
    panelQuantity: 0,
    pickupAddress: "",
    preferredDate: "",
    contactPerson: "",
    contactPhone: "",
    status: PickupStatus.Scheduled,
    createdAt: "",
    updatedAt: "",
  };
  static seedData: PickupRequest[] = [
    { id: 'PU-00128', clientId: 'client-1', panelQuantity: 1200, pickupAddress: '123 Solar Way, Bangalore', preferredDate: '2024-08-10T00:00:00.000Z', contactPerson: 'R. Sharma', contactPhone: '+919876543210', status: PickupStatus.Scheduled, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'PU-00127', clientId: 'client-1', panelQuantity: 300, pickupAddress: '123 Solar Way, Bangalore', preferredDate: '2024-08-05T00:00:00.000Z', contactPerson: 'R. Sharma', contactPhone: '+919876543210', status: PickupStatus.Scheduled, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'PU-00126', clientId: 'client-1', panelQuantity: 750, pickupAddress: '123 Solar Way, Bangalore', preferredDate: '2024-07-28T00:00:00.000Z', contactPerson: 'R. Sharma', contactPhone: '+919876543210', status: PickupStatus.Processing, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'PU-00125', clientId: 'client-1', panelQuantity: 500, pickupAddress: '123 Solar Way, Bangalore', preferredDate: '2024-07-15T00:00:00.000Z', contactPerson: 'R. Sharma', contactPhone: '+919876543210', status: PickupStatus.Completed, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
}
// COMPLIANCE DOCUMENT ENTITY
export class DocumentEntity extends IndexedEntity<ComplianceDocument> {
    static readonly entityName = "document";
    static readonly indexName = "documents";
    static readonly initialState: ComplianceDocument = {
        id: "",
        pickupId: "",
        clientId: "",
        type: "Chain-of-Custody",
        documentUrl: "",
        issuedAt: ""
    };
    static seedData: ComplianceDocument[] = [
        { id: 'DOC-00125', pickupId: 'PU-00125', clientId: 'client-1', type: 'Chain-of-Custody', issuedAt: '2024-07-20T00:00:00.000Z', documentUrl: '#' },
        { id: 'DOC-00125-S', pickupId: 'PU-00125', clientId: 'client-1', type: 'Storage Certificate', issuedAt: '2024-07-20T00:00:00.000Z', documentUrl: '#' },
    ];
}
// CONTACT INQUIRY ENTITY
export class ContactInquiryEntity extends IndexedEntity<ContactInquiry> {
    static readonly entityName = "inquiry";
    static readonly indexName = "inquiries";
    static readonly initialState: ContactInquiry = {
        id: "",
        name: "",
        email: "",
        message: "",
        createdAt: ""
    };
}