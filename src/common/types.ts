/** Shared types matching Packaging Factory frontend lib/types.ts */

export interface Client {
  id: number | string;
  code: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export type NotificationType = 'email' | 'sms' | 'push';
export type DashboardView = 'simple' | 'progress' | 'financial';
export type ReportingFrequency = 'daily' | 'weekly' | 'monthly';
export type AccessLevel = 'viewer' | 'member' | 'full';

export interface UserPreferences {
  id: number | string;
  clientId: number | string;
  notificationType: NotificationType;
  dashboardView: DashboardView;
  reportingFrequency: ReportingFrequency;
  accessLevel: AccessLevel;
  createdAt: string;
  updatedAt: string;
}

export type JobOrderStatus =
  | 'submitted'
  | 'approved'
  | 'hr_pending'
  | 'inventory_pending'
  | 'in_production'
  | 'qc_pending'
  | 'qc_done'
  | 'ready_dispatch'
  | 'dispatched'
  | 'financial_completed';

export type ProductType = 'carton' | 'plastic' | 'flexible' | 'other';

export interface JobSpecifications {
  productType: ProductType;
  quantity: number;
  dimensions?: string;
  material?: string;
  finish?: string;
  notes?: string;
}

export interface JobOrder {
  id: number | string;
  jobId: string;
  clientId: number | string;
  status: JobOrderStatus;
  specifications: JobSpecifications;
  createdAt: string;
  approvedAt?: string;
  assignedToProduction?: boolean;
  assignedToHR?: boolean;
  hrReady?: boolean;
  inventoryReady?: boolean;
  productionStarted?: boolean;
  qcStatus?: string;
  dispatchReady?: boolean;
  dispatchedAt?: string;
  financialCompleted?: boolean;
}

export interface Employee {
  id: number | string;
  code: string;
  name: string;
  skills: string[];
  available: boolean;
  createdAt: string;
}

export interface Shift {
  id: number | string;
  name: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface LaborAssignment {
  id: number | string;
  jobOrderId: number | string;
  employeeId: number | string;
  shiftId: number | string;
  assignedAt: string;
}

export interface Material {
  id: number | string;
  code: string;
  name: string;
  unit: string;
  quantityInStock: number;
  minThreshold?: number;
  createdAt: string;
}

export interface MaterialIssue {
  id: number | string;
  jobOrderId: number | string;
  materialId: number | string;
  quantity: number;
  issuedAt: string;
}

export interface ProductionLog {
  id: number | string;
  jobOrderId: number | string;
  shiftId: number | string;
  quantityProduced: number;
  notes?: string;
  loggedAt: string;
}

export type QcResult = 'pass' | 'rework';

export interface QcRecord {
  id: number | string;
  jobOrderId: number | string;
  result: QcResult;
  notes?: string;
  checkedAt: string;
}

export type InvoiceType = 'advance' | 'full';
export type InvoiceStatus = 'pending' | 'paid';

export interface Invoice {
  id: number | string;
  jobOrderId: number | string;
  clientId: number | string;
  amount: number;
  type: InvoiceType;
  status: InvoiceStatus;
  paidAt?: string;
  createdAt: string;
}
