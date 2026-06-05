# SRM - Supplier Relationship Management System

A comprehensive Supplier Relationship Management (SRM) web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏠 Dashboard
- **Overview Widgets**: Supplier performance summary, procurement spend overview, risk alerts, compliance status
- **Approvals Center**: Pending supplier onboarding, contract approvals, invoice approvals
- **Notifications**: System alerts, deadlines & expiry reminders, custom alerts

### 👥 Supplier Management
- **Supplier Directory**: All suppliers list with search & filters, categorization (Strategic/Preferred/Approved/Restricted)
- **Supplier Profiles**: Basic info, certifications & licenses, banking details, historical performance, uploaded documents
- **Onboarding Workflow**: Registration forms, compliance checks, document verification, approval steps
- **Risk Assessment**: Financial risk scoring, geopolitical risk, cybersecurity risk, past compliance issues
- **Lifecycle Management**: Contract duration monitoring, renewal & termination tracking, exit/replacement workflows

### 🛒 Procurement
- **RFP Management**: Create RFP, compare bids, award contracts
- **RFQ Management**: Generate RFQs, quotation comparison matrix, auto-select lowest/best offer
- **Purchase Orders**: Create & approve POs, PO tracking, change requests
- **Contract Management**: Drafting & negotiation, digital signatures, clause library, version control
- **Invoices & Payments**: Invoice submission portal, three-way match (PO–GRN–Invoice), payment scheduling, payment history

### 📊 Performance Management
- **KPIs & Metrics**: On-time delivery rate, quality compliance, cost variance, responsiveness score
- **Scorecards & Reviews**: Supplier evaluation templates, periodic performance reviews, weighted scoring models
- **Feedback & Issues**: Supplier feedback forms, issue logging, corrective action plans, dispute resolution

### 💬 Communication & Collaboration
- **Messaging**: Supplier–buyer chat, group channels, announcement broadcasts
- **Document Sharing**: Central repository, version history, access controls
- **Discussion Forums**: Category threads, Q&A with suppliers
- **Supplier Helpdesk**: Ticketing system, FAQs & knowledge base, escalation matrix

### 🛡️ Risk & Compliance
- **Audit Trails**: User activity logs, change tracking
- **Compliance Documents**: Mandatory certifications, expiry tracking, renewal reminders
- **Certifications Management**: ISO certificates, safety compliance, industry-specific standards
- **Supplier Risk Rating**: Composite risk score, automated alerts, high-risk supplier watchlist

### 📈 Analytics & Reports
- **Spend Analysis**: Category spend, supplier spend concentration, savings opportunities
- **Supplier Performance Reports**: Delivery & quality trends, comparative supplier rankings, yearly scorecards
- **Risk & Compliance Reports**: Non-compliance reports, risk heatmaps
- **Custom Reports**: Report builder, export (Excel, PDF, CSV), scheduled reports

### ⚙️ Settings & Admin
- **User Roles & Permissions**: Role definitions, access control lists, multi-level approval flows
- **Data Management**: Import suppliers (CSV/Excel/API), export data, data cleansing tools
- **Security & Access Controls**: Multi-factor authentication, encryption settings, audit & compliance policies
- **Integrations**: ERP (SAP, Oracle, etc.), CRM (Salesforce, HubSpot, etc.), Finance systems, API management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Recharts
- **Forms**: React Hook Form
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── suppliers/         # Supplier management pages
│   │   ├── procurement/       # Procurement pages
│   │   ├── performance/       # Performance management pages
│   │   ├── communication/     # Communication pages
│   │   ├── analytics/         # Analytics pages
│   │   ├── settings/          # Settings pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── suppliers/        # Supplier components
│   │   ├── procurement/      # Procurement components
│   │   ├── performance/      # Performance components
│   │   ├── communication/    # Communication components
│   │   ├── analytics/        # Analytics components
│   │   └── settings/         # Settings components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Key Features

### Responsive Design
- Mobile-first approach with responsive layouts
- Collapsible sidebar navigation
- Optimized for desktop, tablet, and mobile devices

### Modern UI/UX
- Clean, professional design with consistent styling
- Interactive components with hover states and transitions
- Accessible design with proper contrast and focus states

### Type Safety
- Full TypeScript implementation
- Comprehensive type definitions for all data models
- Type-safe component props and state management

### Performance
- Optimized bundle size with Next.js
- Lazy loading and code splitting
- Efficient re-rendering with React best practices

## Customization

### Styling
The application uses Tailwind CSS with custom design tokens defined in `globals.css`. You can customize:

- Color palette
- Typography
- Spacing and sizing
- Component styles

### Components
All components are modular and reusable. You can easily:

- Modify existing components
- Create new components following the established patterns
- Extend functionality with additional features

### Data Models
TypeScript interfaces are defined in `src/types/index.ts` for:

- User and authentication
- Suppliers and contracts
- Procurement processes
- Performance metrics
- Communication features
- Analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.









