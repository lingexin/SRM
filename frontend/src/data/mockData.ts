// Mock data for all SRM sections

// Dashboard Data
export const dashboardStats = {
  totalSuppliers: 1247,
  activeContracts: 89,
  monthlySpend: 2400000,
  riskAlerts: 7,
  pendingApprovals: 12,
  recentActivities: 8,
  performanceScore: 87.5,
  onTimeDelivery: 94.2,
  qualityScore: 91.7,
  costSavings: 1200000,
}

export const recentActivities = [
  {
    id: 1,
    type: 'supplier',
    title: 'New supplier ABC Corp registered',
    time: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 2,
    type: 'contract',
    title: 'Contract renewal for XYZ Ltd',
    time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    status: 'approved',
    priority: 'high',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment processed for DEF Inc',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    status: 'completed',
    priority: 'low',
  },
  {
    id: 4,
    type: 'risk',
    title: 'Risk assessment updated for GHI Corp',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    status: 'reviewed',
    priority: 'medium',
  },
  {
    id: 5,
    type: 'performance',
    title: 'Performance review completed for JKL Ltd',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'completed',
    priority: 'low',
  },
]

export const pendingApprovals = [
  {
    id: 1,
    type: 'supplier',
    title: 'ABC Corp - Supplier Onboarding',
    priority: 'high',
    submittedBy: 'John Smith',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    amount: null,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  {
    id: 2,
    type: 'contract',
    title: 'XYZ Ltd - Contract Amendment',
    priority: 'medium',
    submittedBy: 'Sarah Johnson',
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    amount: 250000,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  },
  {
    id: 3,
    type: 'invoice',
    title: 'DEF Inc - Invoice Approval',
    priority: 'low',
    submittedBy: 'Mike Wilson',
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    amount: 45000,
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
  },
  {
    id: 4,
    type: 'purchase_order',
    title: 'GHI Corp - Equipment Purchase',
    priority: 'medium',
    submittedBy: 'Lisa Brown',
    submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    amount: 180000,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  },
]

// Supplier Data
export const suppliers = [
  {
    id: 1,
    name: 'ABC Corporation',
    email: 'contact@abccorp.com',
    phone: '+1 (555) 123-4567',
    industry: 'Manufacturing',
    category: 'strategic',
    status: 'active',
    riskScore: 85,
    location: 'New York, NY',
    contracts: 12,
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    performance: 92,
    certifications: ['ISO 9001', 'ISO 14001'],
    establishedYear: 1995,
    employees: 500,
    revenue: 50000000,
  },
  {
    id: 2,
    name: 'XYZ Technologies',
    email: 'info@xyztech.com',
    phone: '+1 (555) 987-6543',
    industry: 'Technology',
    category: 'preferred',
    status: 'active',
    riskScore: 72,
    location: 'San Francisco, CA',
    contracts: 8,
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    performance: 88,
    certifications: ['ISO 27001', 'SOC 2'],
    establishedYear: 2010,
    employees: 200,
    revenue: 25000000,
  },
  {
    id: 3,
    name: 'DEF Industries',
    email: 'sales@defind.com',
    phone: '+1 (555) 456-7890',
    industry: 'Automotive',
    category: 'approved',
    status: 'pending',
    riskScore: 45,
    location: 'Detroit, MI',
    contracts: 3,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    performance: 75,
    certifications: ['TS 16949'],
    establishedYear: 1985,
    employees: 300,
    revenue: 15000000,
  },
  {
    id: 4,
    name: 'GHI Logistics',
    email: 'support@ghilogistics.com',
    phone: '+1 (555) 321-0987',
    industry: 'Logistics',
    category: 'restricted',
    status: 'inactive',
    riskScore: 25,
    location: 'Chicago, IL',
    contracts: 1,
    lastActivity: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    performance: 60,
    certifications: ['ISO 9001'],
    establishedYear: 2000,
    employees: 150,
    revenue: 8000000,
  },
  {
    id: 5,
    name: 'JKL Manufacturing',
    email: 'contact@jklmfg.com',
    phone: '+1 (555) 654-3210',
    industry: 'Manufacturing',
    category: 'strategic',
    status: 'active',
    riskScore: 90,
    location: 'Houston, TX',
    contracts: 15,
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    performance: 95,
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    establishedYear: 1990,
    employees: 800,
    revenue: 75000000,
  },
]

// Procurement Data
export const rfps = [
  {
    id: 1,
    title: 'IT Infrastructure Services',
    description: 'Comprehensive IT infrastructure management and support services',
    category: 'Technology',
    budget: 500000,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    status: 'published',
    suppliers: 8,
    createdBy: 'John Smith',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    requirements: [
      '24/7 technical support',
      'Cloud migration services',
      'Security compliance',
      'Disaster recovery planning',
    ],
  },
  {
    id: 2,
    title: 'Office Supplies Contract',
    description: 'Annual contract for office supplies and equipment',
    category: 'Office Supplies',
    budget: 75000,
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days from now
    status: 'draft',
    suppliers: 0,
    createdBy: 'Sarah Johnson',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    requirements: [
      'Delivery within 24 hours',
      'Bulk pricing discounts',
      'Quality guarantee',
      'Inventory management',
    ],
  },
  {
    id: 3,
    title: 'Manufacturing Equipment',
    description: 'Purchase of new manufacturing equipment for production line',
    category: 'Equipment',
    budget: 1200000,
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days from now
    status: 'closed',
    suppliers: 12,
    createdBy: 'Mike Wilson',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    requirements: [
      'Warranty coverage',
      'Installation services',
      'Training for operators',
      'Maintenance support',
    ],
  },
]

export const rfqs = [
  {
    id: 1,
    rfpId: 1,
    rfpTitle: 'IT Infrastructure Services',
    supplierId: 1,
    supplierName: 'ABC Corporation',
    items: [
      { id: 1, description: 'Managed Services', quantity: 12, unitPrice: 18000, totalPrice: 216000 },
    ],
    totalAmount: 216000,
    status: 'submitted',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    rfpId: 1,
    rfpTitle: 'IT Infrastructure Services',
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    items: [
      { id: 2, description: 'Managed Services', quantity: 12, unitPrice: 17500, totalPrice: 210000 },
    ],
    totalAmount: 210000,
    status: 'submitted',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    rfpId: 2,
    rfpTitle: 'Office Supplies Contract',
    supplierId: 3,
    supplierName: 'DEF Industries',
    items: [
      { id: 3, description: 'Stationery', quantity: 1, unitPrice: 70000, totalPrice: 70000 },
    ],
    totalAmount: 70000,
    status: 'pending',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const purchaseOrders = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'ABC Corporation',
    items: [
      { id: 1, description: 'Industrial Equipment', quantity: 5, unitPrice: 25000, totalPrice: 125000 },
      { id: 2, description: 'Installation Services', quantity: 1, unitPrice: 15000, totalPrice: 15000 },
    ],
    totalAmount: 140000,
    status: 'approved',
    orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    expectedDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdBy: 'John Smith',
  },
  {
    id: 2,
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    items: [
      { id: 3, description: 'Software Licenses', quantity: 100, unitPrice: 500, totalPrice: 50000 },
      { id: 4, description: 'Support Services', quantity: 1, unitPrice: 10000, totalPrice: 10000 },
    ],
    totalAmount: 60000,
    status: 'sent',
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    expectedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    createdBy: 'Sarah Johnson',
  },
]

export const contracts = [
  {
    id: 1,
    title: 'ABC Corp Service Agreement',
    supplierId: 1,
    supplierName: 'ABC Corporation',
    type: 'service',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    endDate: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000).toISOString(), // 350 days from now
    value: 500000,
    status: 'active',
    terms: [
      'Service level agreement with 99.9% uptime',
      'Monthly performance reviews',
      'Quarterly business reviews',
      'Annual contract renewal option',
    ],
  },
  {
    id: 2,
    title: 'XYZ Tech Software License',
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    type: 'goods',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 365 days from now
    value: 150000,
    status: 'active',
    terms: [
      'Unlimited user licenses',
      '24/7 technical support',
      'Regular software updates',
      'Data security compliance',
    ],
  },
]

export const invoices = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'ABC Corporation',
    amount: 140000,
    status: 'pending',
    invoiceDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: 1, description: 'Industrial Equipment', quantity: 5, unitPrice: 25000, totalPrice: 125000 },
      { id: 2, description: 'Installation Services', quantity: 1, unitPrice: 15000, totalPrice: 15000 },
    ],
    paymentHistory: [],
  },
  {
    id: 2,
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    amount: 60000,
    status: 'approved',
    invoiceDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: 3, description: 'Software Licenses', quantity: 100, unitPrice: 500, totalPrice: 50000 },
      { id: 4, description: 'Support Services', quantity: 1, unitPrice: 10000, totalPrice: 10000 },
    ],
    paymentHistory: [
      { id: 1, amount: 10000, paymentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), method: 'bank_transfer', reference: 'PART-XYZ-001' },
    ],
  },
]

// Performance Data
export const performanceMetrics = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'ABC Corporation',
    period: 'Q4 2023',
    overallScore: 96.5,
    kpis: [
      { name: 'On-Time Delivery', score: 98, weight: 30, target: 95 },
      { name: 'Quality Compliance', score: 95, weight: 25, target: 90 },
      { name: 'Cost Variance', score: 92, weight: 20, target: 85 },
      { name: 'Responsiveness', score: 98, weight: 25, target: 90 },
    ],
    trends: {
      delivery: 'up',
      quality: 'stable',
      cost: 'up',
      responsiveness: 'up',
    },
  },
  {
    id: 2,
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    period: 'Q4 2023',
    overallScore: 94.2,
    kpis: [
      { name: 'On-Time Delivery', score: 96, weight: 30, target: 95 },
      { name: 'Quality Compliance', score: 93, weight: 25, target: 90 },
      { name: 'Cost Variance', score: 95, weight: 20, target: 85 },
      { name: 'Responsiveness', score: 94, weight: 25, target: 90 },
    ],
    trends: {
      delivery: 'up',
      quality: 'down',
      cost: 'up',
      responsiveness: 'stable',
    },
  },
]

export const feedbackItems = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'ABC Corporation',
    type: 'compliment',
    title: 'Excellent service delivery',
    description: 'Outstanding performance in meeting delivery deadlines and quality standards.',
    status: 'resolved',
    priority: 'low',
    createdBy: 'John Smith',
    createdAt: '2024-01-15',
    assignedTo: 'Sarah Johnson',
  },
  {
    id: 2,
    supplierId: 3,
    supplierName: 'DEF Industries',
    type: 'issue',
    title: 'Quality concerns with recent shipment',
    description: 'Several items in the latest shipment did not meet quality specifications.',
    status: 'in_progress',
    priority: 'high',
    createdBy: 'Mike Wilson',
    createdAt: '2024-01-14',
    assignedTo: 'Quality Team',
  },
  {
    id: 3,
    supplierId: 4,
    supplierName: 'GHI Logistics',
    type: 'suggestion',
    title: 'Improvement in communication',
    description: 'Suggest implementing real-time tracking for better visibility.',
    status: 'open',
    priority: 'medium',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-13',
    assignedTo: null,
  },
]

// KPI Data
export const kpis = [
  { id: 1, name: 'On-Time Delivery', category: 'delivery', unit: '%', period: 'Q4 2023', target: 95, current: 94.2, trend: 'up' },
  { id: 2, name: 'Quality Compliance', category: 'quality', unit: '%', period: 'Q4 2023', target: 92, current: 91.7, trend: 'stable' },
  { id: 3, name: 'Cost Variance', category: 'cost', unit: '%', period: 'Q4 2023', target: 10, current: 8.4, trend: 'up' },
  { id: 4, name: 'Responsiveness', category: 'responsiveness', unit: 'score', period: 'Q4 2023', target: 90, current: 89.1, trend: 'down' },
]

// Communication Data
export const messages = [
  {
    id: 1,
    sender: 'ABC Corporation',
    receiver: 'John Smith',
    subject: 'Contract Amendment Discussion',
    content: 'We would like to discuss the proposed changes to the service level agreement...',
    time: '2024-01-15T10:30:00Z',
    unread: true,
    priority: 'high',
    attachments: 2,
  },
  {
    id: 2,
    sender: 'XYZ Technologies',
    receiver: 'Sarah Johnson',
    subject: 'Monthly Performance Review',
    content: 'Please find attached our monthly performance report for December...',
    time: '2024-01-15T09:15:00Z',
    unread: true,
    priority: 'medium',
    attachments: 1,
  },
  {
    id: 3,
    sender: 'DEF Industries',
    receiver: 'Mike Wilson',
    subject: 'Delivery Schedule Update',
    content: 'We need to adjust the delivery schedule for next week due to...',
    time: '2024-01-14T16:45:00Z',
    unread: false,
    priority: 'low',
    attachments: 0,
  },
]

export const documents = [
  {
    id: 1,
    name: 'ABC Corp - Service Agreement v2.1.pdf',
    type: 'Contract',
    size: '2.4 MB',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-01-15T10:00:00Z',
    sharedWith: 3,
    category: 'Legal',
  },
  {
    id: 2,
    name: 'XYZ Tech - Performance Report Q4.xlsx',
    type: 'Report',
    size: '1.8 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-15T09:30:00Z',
    sharedWith: 5,
    category: 'Performance',
  },
  {
    id: 3,
    name: 'DEF Industries - Compliance Certificate.pdf',
    type: 'Certificate',
    size: '856 KB',
    uploadedBy: 'Mike Wilson',
    uploadedAt: '2024-01-14T16:20:00Z',
    sharedWith: 2,
    category: 'Compliance',
  },
]

export const tickets = [
  {
    id: 1,
    title: 'Login Issues with Portal',
    category: 'Technical',
    priority: 'high',
    status: 'open',
    supplier: 'ABC Corporation',
    assignedTo: 'Tech Support',
    createdAt: '2024-01-15T08:30:00Z',
    lastUpdate: '2024-01-15T10:15:00Z',
    description: 'Unable to access the supplier portal with valid credentials',
  },
  {
    id: 2,
    title: 'Payment Processing Delay',
    category: 'Billing',
    priority: 'medium',
    status: 'in_progress',
    supplier: 'XYZ Technologies',
    assignedTo: 'Finance Team',
    createdAt: '2024-01-14T14:20:00Z',
    lastUpdate: '2024-01-15T09:45:00Z',
    description: 'Payment submitted 3 days ago but still showing as pending',
  },
  {
    id: 3,
    title: 'Document Upload Problem',
    category: 'General',
    priority: 'low',
    status: 'open',
    supplier: 'DEF Industries',
    assignedTo: 'Support Team',
    createdAt: '2024-01-13T11:10:00Z',
    lastUpdate: '2024-01-14T15:30:00Z',
    description: 'Getting error when trying to upload compliance documents',
  },
]

// Analytics Data
export const spendAnalysis = [
  { category: 'Technology', amount: 3200000, percentage: 25.8, trend: 'up', change: 12.5 },
  { category: 'Manufacturing', amount: 2800000, percentage: 22.6, trend: 'up', change: 8.3 },
  { category: 'Services', amount: 2100000, percentage: 16.9, trend: 'down', change: -5.2 },
  { category: 'Office Supplies', amount: 1800000, percentage: 14.5, trend: 'stable', change: 0.0 },
  { category: 'Logistics', amount: 1500000, percentage: 12.1, trend: 'up', change: 15.7 },
  { category: 'Other', amount: 1000000, percentage: 8.1, trend: 'down', change: -3.1 },
]

export const topSuppliersBySpend = [
  {
    id: 1,
    name: 'ABC Corporation',
    spend: 2400000,
    percentage: 19.4,
    contracts: 12,
    performance: 96.5,
    trend: 'up',
    change: 8.5,
  },
  {
    id: 2,
    name: 'XYZ Technologies',
    spend: 1800000,
    percentage: 14.5,
    contracts: 8,
    performance: 94.2,
    trend: 'up',
    change: 12.3,
  },
  {
    id: 3,
    name: 'DEF Industries',
    spend: 1200000,
    percentage: 9.7,
    contracts: 6,
    performance: 89.8,
    trend: 'down',
    change: -2.1,
  },
  {
    id: 4,
    name: 'GHI Logistics',
    spend: 900000,
    percentage: 7.3,
    contracts: 4,
    performance: 87.2,
    trend: 'stable',
    change: 0.5,
  },
]

// Settings Data
export const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    department: 'Procurement',
    permissions: 25,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    department: 'Finance',
    permissions: 18,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    role: 'Buyer',
    status: 'inactive',
    lastLogin: '2024-01-10T16:45:00Z',
    department: 'Operations',
    permissions: 12,
  },
  {
    id: 4,
    name: 'Lisa Brown',
    email: 'lisa.brown@company.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15T08:20:00Z',
    department: 'Procurement',
    permissions: 18,
  },
]

export const integrations = [
  {
    id: 1,
    name: 'SAP ERP',
    type: 'ERP',
    status: 'active',
    lastSync: '2024-01-15T10:00:00Z',
    records: 12547,
    health: 'healthy',
    description: 'Enterprise resource planning system integration',
  },
  {
    id: 2,
    name: 'Salesforce CRM',
    type: 'CRM',
    status: 'active',
    lastSync: '2024-01-15T09:30:00Z',
    records: 8932,
    health: 'healthy',
    description: 'Customer relationship management integration',
  },
  {
    id: 3,
    name: 'QuickBooks',
    type: 'Finance',
    status: 'error',
    lastSync: '2024-01-14T15:20:00Z',
    records: 0,
    health: 'error',
    description: 'Financial management system integration',
  },
  {
    id: 4,
    name: 'Microsoft Dynamics',
    type: 'ERP',
    status: 'inactive',
    lastSync: '2024-01-10T08:45:00Z',
    records: 0,
    health: 'inactive',
    description: 'Business applications platform integration',
  },
]

// Settings & Admin Mock
export const rolesPermissions = [
  { id: 1, role: 'Administrator', users: 5, description: 'Full access to all modules', permissions: ['users.manage','procurement.manage','suppliers.manage','analytics.view','settings.manage'] },
  { id: 2, role: 'Manager', users: 18, description: 'Approve and manage procurement', permissions: ['procurement.manage','suppliers.view','analytics.view'] },
  { id: 3, role: 'Buyer', users: 32, description: 'Create POs and manage RFQs', permissions: ['procurement.create','suppliers.view'] },
  { id: 4, role: 'Viewer', users: 21, description: 'Read-only access', permissions: ['analytics.view','suppliers.view'] },
]

export const datasets = [
  { id: 1, name: 'Suppliers Master', records: 1247, sizeMB: 56, lastUpdated: '2024-01-15T10:00:00Z', retention: '7 years', status: 'healthy' },
  { id: 2, name: 'Purchase Orders', records: 6532, sizeMB: 240, lastUpdated: '2024-01-15T09:45:00Z', retention: '7 years', status: 'healthy' },
  { id: 3, name: 'Contracts', records: 312, sizeMB: 120, lastUpdated: '2024-01-14T16:20:00Z', retention: '10 years', status: 'healthy' },
]

export const securityPolicies = [
  { id: 1, name: 'MFA Required', key: 'mfa', enabled: true, description: 'Require multi-factor authentication for all users' },
  { id: 2, name: 'Session Timeout', key: 'sessionTimeout', enabled: true, value: 30, description: 'Auto-logout after 30 minutes of inactivity' },
  { id: 3, name: 'IP Allowlist', key: 'ipAllowlist', enabled: false, value: '192.168.1.0/24', description: 'Restrict access to corporate network' },
]

// Current User Profile & Settings
export const currentUser = {
  id: 'u-1001',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@company.com',
  role: 'Administrator',
  department: 'Procurement',
  phone: '+1 (555) 010-2233',
  location: 'New York, USA',
  avatar: null,
  uniqueCode: 'SRM-ADM-7F2C9A',
  joinedAt: '2022-09-12',
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
}

export const userPreferences = {
  theme: 'light',
  language: 'en-US',
  timezone: 'America/New_York',
  newsletter: false,
  notifications: {
    email: true,
    sms: false,
    inApp: true,
    weeklyDigest: true,
  }
}

export const securityAlerts = [
  {
    id: 1,
    type: 'Failed Login',
    description: 'Multiple failed login attempts detected',
    severity: 'medium',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'investigating',
    user: 'unknown@external.com',
    ipAddress: '192.168.1.100',
  },
  {
    id: 2,
    type: 'Permission Change',
    description: 'User role modified by administrator',
    severity: 'low',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'resolved',
    user: 'john.smith@company.com',
    ipAddress: '192.168.1.50',
  },
  {
    id: 3,
    type: 'Data Export',
    description: 'Large data export initiated',
    severity: 'medium',
    timestamp: '2024-01-14T14:20:00Z',
    status: 'monitoring',
    user: 'sarah.johnson@company.com',
    ipAddress: '192.168.1.75',
  },
]

// Risk & Compliance Data
export const riskAssessments = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'ABC Corporation',
    type: 'financial',
    score: 85,
    factors: [
      { name: 'Credit Rating', score: 90, weight: 30 },
      { name: 'Financial Stability', score: 85, weight: 25 },
      { name: 'Payment History', score: 80, weight: 20 },
      { name: 'Market Position', score: 85, weight: 25 },
    ],
    assessedBy: 'Risk Team',
    assessedAt: '2024-01-15',
    nextReview: '2024-04-15',
  },
  {
    id: 2,
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    type: 'cybersecurity',
    score: 72,
    factors: [
      { name: 'Security Certifications', score: 80, weight: 40 },
      { name: 'Data Protection', score: 70, weight: 30 },
      { name: 'Incident Response', score: 65, weight: 30 },
    ],
    assessedBy: 'Security Team',
    assessedAt: '2024-01-14',
    nextReview: '2024-04-14',
  },
]

export const complianceDocuments = [
  {
    id: 1,
    name: 'ISO 9001 Quality Management',
    type: 'iso',
    supplierId: 1,
    supplierName: 'ABC Corporation',
    status: 'valid',
    issueDate: '2023-01-15',
    expiryDate: '2026-01-15',
    renewalReminder: '2025-10-15',
    uploadedBy: 'John Smith',
  },
  {
    id: 2,
    name: 'SOC 2 Type II Certification',
    type: 'safety',
    supplierId: 2,
    supplierName: 'XYZ Technologies',
    status: 'expiring',
    issueDate: '2022-06-01',
    expiryDate: '2024-06-01',
    renewalReminder: '2024-03-01',
    uploadedBy: 'Sarah Johnson',
  },
  {
    id: 3,
    name: 'Environmental Compliance Certificate',
    type: 'environmental',
    supplierId: 3,
    supplierName: 'DEF Industries',
    status: 'expired',
    issueDate: '2021-12-01',
    expiryDate: '2023-12-01',
    renewalReminder: '2023-09-01',
    uploadedBy: 'Mike Wilson',
  },
]

// Audit Logs
export const auditLogs = [
  { id: 1, user: 'john.smith@company.com', action: 'UPDATE', resource: 'Contract', resourceId: '2', details: 'Changed end date', timestamp: new Date(Date.now() - 2*60*60*1000).toISOString(), ipAddress: '192.168.1.50' },
  { id: 2, user: 'sarah.johnson@company.com', action: 'CREATE', resource: 'RFP', resourceId: '1', details: 'Published RFP', timestamp: new Date(Date.now() - 4*60*60*1000).toISOString(), ipAddress: '192.168.1.75' },
  { id: 3, user: 'mike.wilson@company.com', action: 'DELETE', resource: 'Document', resourceId: '7', details: 'Removed outdated file', timestamp: new Date(Date.now() - 24*60*60*1000).toISOString(), ipAddress: '192.168.1.80' },
]
