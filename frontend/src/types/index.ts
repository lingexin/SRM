// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  permissions: Permission[];
}

export type UserRole = 'admin' | 'manager' | 'buyer' | 'supplier' | 'viewer';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  industry: string;
  category: SupplierCategory;
  status: SupplierStatus;
  riskScore: number;
  certifications: Certification[];
  contacts: Contact[];
  documents: Document[];
  performanceMetrics: PerformanceMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export type SupplierCategory = 'strategic' | 'preferred' | 'approved' | 'restricted';
export type SupplierStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  isPrimary: boolean;
}

export interface Certification {
  id: string;
  name: string;
  type: string;
  issuedBy: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'valid' | 'expired' | 'expiring';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface PerformanceMetrics {
  onTimeDelivery: number;
  qualityScore: number;
  costVariance: number;
  responsivenessScore: number;
  overallScore: number;
}

// Procurement Types
export interface RFP {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: Date;
  status: RFPStatus;
  suppliers: string[];
  requirements: Requirement[];
  createdAt: Date;
  createdBy: string;
}

export type RFPStatus = 'draft' | 'published' | 'closed' | 'awarded';

export interface Requirement {
  id: string;
  description: string;
  isMandatory: boolean;
  weight: number;
}

export interface RFQ {
  id: string;
  rfpId: string;
  supplierId: string;
  items: RFQItem[];
  totalAmount: number;
  status: RFQStatus;
  submittedAt: Date;
  validUntil: Date;
}

export type RFQStatus = 'pending' | 'submitted' | 'accepted' | 'rejected';

export interface RFQItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: POItem[];
  totalAmount: number;
  status: POStatus;
  orderDate: Date;
  expectedDelivery: Date;
  createdBy: string;
}

export type POStatus = 'draft' | 'pending' | 'approved' | 'sent' | 'received' | 'cancelled';

export interface POItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Contract {
  id: string;
  title: string;
  supplierId: string;
  type: ContractType;
  startDate: Date;
  endDate: Date;
  value: number;
  status: ContractStatus;
  terms: ContractTerm[];
  documents: Document[];
}

export type ContractType = 'service' | 'goods' | 'maintenance' | 'consulting';
export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated';

export interface ContractTerm {
  id: string;
  clause: string;
  description: string;
  isMandatory: boolean;
}

export interface Invoice {
  id: string;
  supplierId: string;
  purchaseOrderId?: string;
  contractId?: string;
  amount: number;
  status: InvoiceStatus;
  invoiceDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  paymentHistory: Payment[];
}

export type InvoiceStatus = 'pending' | 'approved' | 'paid' | 'overdue' | 'disputed';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  id: string;
  amount: number;
  paymentDate: Date;
  method: PaymentMethod;
  reference: string;
}

export type PaymentMethod = 'bank_transfer' | 'check' | 'credit_card' | 'cash';

// Performance Management Types
export interface KPI {
  id: string;
  name: string;
  category: KPICategory;
  target: number;
  current: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

export type KPICategory = 'delivery' | 'quality' | 'cost' | 'responsiveness';

export interface Scorecard {
  id: string;
  supplierId: string;
  period: string;
  scores: Score[];
  overallScore: number;
  reviewedBy: string;
  reviewedAt: Date;
}

export interface Score {
  kpiId: string;
  kpiName: string;
  score: number;
  weight: number;
  comments?: string;
}

export interface Feedback {
  id: string;
  supplierId: string;
  type: FeedbackType;
  title: string;
  description: string;
  status: FeedbackStatus;
  priority: Priority;
  createdBy: string;
  createdAt: Date;
  assignedTo?: string;
  dueDate?: Date;
}

export type FeedbackType = 'complaint' | 'suggestion' | 'issue' | 'compliment';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

// Communication Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  attachments: Document[];
  sentAt: Date;
  readAt?: Date;
}

export type MessageType = 'direct' | 'group' | 'announcement';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface DiscussionForum {
  id: string;
  title: string;
  description: string;
  category: string;
  posts: ForumPost[];
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface ForumPost {
  id: string;
  forumId: string;
  title: string;
  content: string;
  authorId: string;
  replies: ForumReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: Priority;
  status: TicketStatus;
  supplierId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  comments: TicketComment[];
}

export type TicketCategory = 'technical' | 'billing' | 'general' | 'support';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface TicketComment {
  id: string;
  ticketId: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

// Risk & Compliance Types
export interface RiskAssessment {
  id: string;
  supplierId: string;
  type: RiskType;
  score: number;
  factors: RiskFactor[];
  assessedBy: string;
  assessedAt: Date;
  nextReview: Date;
}

export type RiskType = 'financial' | 'operational' | 'geopolitical' | 'cybersecurity' | 'compliance';

export interface RiskFactor {
  id: string;
  name: string;
  weight: number;
  score: number;
  description: string;
}

export interface ComplianceDocument {
  id: string;
  name: string;
  type: ComplianceType;
  supplierId: string;
  status: ComplianceStatus;
  issueDate: Date;
  expiryDate: Date;
  renewalReminder: Date;
  uploadedBy: string;
}

export type ComplianceType = 'iso' | 'safety' | 'environmental' | 'industry' | 'regulatory';
export type ComplianceStatus = 'valid' | 'expired' | 'expiring' | 'pending';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
}

// Analytics & Reports Types
export interface SpendAnalysis {
  id: string;
  period: string;
  category: string;
  totalSpend: number;
  supplierCount: number;
  averageOrderValue: number;
  trends: SpendTrend[];
}

export interface SpendTrend {
  period: string;
  amount: number;
  percentage: number;
}

export interface PerformanceReport {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  data: ReportData[];
  generatedBy: string;
  generatedAt: Date;
}

export type ReportType = 'supplier_performance' | 'spend_analysis' | 'risk_assessment' | 'compliance' | 'custom';

export interface ReportData {
  metric: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

// Settings & Admin Types
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  configuration: Record<string, any>;
  lastSync?: Date;
}

export type IntegrationType = 'erp' | 'crm' | 'finance' | 'api';
export type IntegrationStatus = 'active' | 'inactive' | 'error' | 'pending';

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: NavigationItem[];
  permissions?: string[];
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  title: string;
  type: WidgetType;
  size: WidgetSize;
  data: any;
  position: { x: number; y: number };
}

export type WidgetType = 'chart' | 'metric' | 'table' | 'list' | 'alert';
export type WidgetSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  userId: string;
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
}

export type NotificationType = 'info' | 'warning' | 'error' | 'success';
export type NotificationStatus = 'unread' | 'read' | 'archived';

