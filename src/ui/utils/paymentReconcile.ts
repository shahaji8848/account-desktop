export const companies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
  { id: 3, name: 'Company C' },
  { id: 4, name: 'Assemble' },
];

export const partyTypes = {
  1: [
    { id: 1, name: 'Customer' },
    { id: 2, name: 'Vendor' },
  ],
  2: [
    { id: 1, name: 'Supplier' },
    { id: 2, name: 'Distributor' },
  ],
  3: [
    { id: 1, name: 'Partner' },
    { id: 2, name: 'Agent' },
  ],
};

export const parties = {
  1: [
    { id: 1, name: 'Party 1', receivableAccount: 'REC-001', advanceAccount: 'ADV-001' },
    { id: 2, name: 'Party 2', receivableAccount: 'REC-002', advanceAccount: 'ADV-002' },
  ],
  2: [
    { id: 3, name: 'Party 3', receivableAccount: 'REC-003', advanceAccount: 'ADV-003' },
    { id: 4, name: 'Party 4', receivableAccount: 'REC-004', advanceAccount: 'ADV-004' },
  ],
};

export const invoices = [
  {
    id: 1,
    invoiceType: 'Sales',
    invoiceNumber: 'INV-001',
    invoiceDate: '2024-02-25',
    amount: 1000,
    outstandingAmount: 500,
  },
  {
    id: 2,
    invoiceType: 'Purchase',
    invoiceNumber: 'INV-002',
    invoiceDate: '2024-02-24',
    amount: 2000,
    outstandingAmount: 1500,
  },
];

export const payments = [
  {
    id: 1,
    referenceType: 'Bank',
    referenceName: 'PMT-001',
    postingDate: '2024-02-25',
    amount: 500,
    differenceAmount: 0,
  },
  {
    id: 2,
    referenceType: 'Cash',
    referenceName: 'PMT-002',
    postingDate: '2024-02-24',
    amount: 1500,
    differenceAmount: 0,
  },
];
