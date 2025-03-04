export const sideBarData = [
  {
    label: 'F2',
    text: 'Date',
    arrow_inactive: true,
    tab_inactive: false,
    next_tab: false,
  },
  {
    label: 'F3',
    text: 'Company',
    arrow_inactive: true,
    tab_inactive: false,
    next_tab: false,
  },
  {
    label: 'F4',
    text: 'Contra',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: true,
  },
  {
    label: 'F5',
    text: 'Payment',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'F6',
    text: 'Receipt',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'F7',
    text: 'Journal',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'F8',
    text: 'Sales',
    arrow_inactive: true,
    tab_inactive: false,
    next_tab: false,
  },
  {
    label: 'F9',
    text: 'Purchase',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'F10',
    text: 'Other Vouchers',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'F',
    text: 'Autofill',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: true,
  },
  {
    label: 'H',
    text: 'Change Mode',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'I',
    text: 'More details',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'O',
    text: 'Related Reports',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
  {
    label: 'L',
    text: 'Optional',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: true,
  },
  {
    label: 'T',
    text: 'Post-Dated',
    arrow_inactive: true,
    tab_inactive: true,
    next_tab: false,
  },
];

export const homeSideBarData = [
  {
    label: 'F2',
    text: 'Date',
    arrow_inactive: true,
    tab_inactive: false,
    next_tab: false,
  },
  {
    label: 'F3',
    text: 'Company',
    arrow_inactive: true,
    tab_inactive: false,
    next_tab: false,
  },
];

export const salesDefaultdata = {
  party_details: {
    party_name: '',
    billing_address: '',
    billing_gstin: '',
    billing_address_line1: '',
    billing_address_line2: '',
    billing_city: '',
    billing_state: '',
    billing_country: '',
    billing_pincode: '',
    billing_gst_category: '',
    shipping_address: '',
    shipping_gstin: '',
    shipping_address_line1: '',
    shipping_address_line2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_country: '',
    shipping_pincode: '',
    shipping_gst_category: '',
  },
  cost_center: '',
  sales_no: '',
  naming_series: '',
  voucher_class: '',
  current_balance: '',
  tax_template: '',
  voucher_name: '',
  table: [],
  total_amount: '',
  total_qty: '',
  narration: '',
  update_stock: false,
  shipping_detail: '',
  terms_and_conditions: '',
  payment_terms: '',
  source_warehouse: '',
  terms_description: '',
  apply_discount_on: '',
  additional_discount_percentage: '',
  additional_discount_amount: '',
  additional_discount_account: '',
  is_cash_or_non_trade_discount: false,
  currency: 'INR',
  conversion_rate: '',
};

export const dataRef = {
  party_name: null,
  billing_address: null,
  shipping_address: null,
  billing_gstin: null,
  shipping_gstin: null,
  cost_center: null,
  sales_no: null,
  naming_series: null,
  voucher_class: null,
  current_balance: null,
  company: null,
  address: null,
  company_gstin: null,
  voucher_name: null,
  tax_template: null,
  narration: null,
  update_stock: null,
  shipping_detail: null,
  terms_and_conditions: null,
  payment_terms: null,
  source_warehouse: null,
  terms_description: null,
  apply_discount_on: null,
  additional_discount_percentage: null,
  additional_discount_amount: null,
  additional_discount_account: null,
  is_cash_or_non_trade_discount: null,
  currency: null,
  conversion_rate: null,
};

export const companyDefaultData = {
  company_name: '',
  company_address: '',
  company_gstin: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  gst_category: '',
};

export const taxDefaultInfo = {
  charge_type: '',
  account_head: '',
  rate: '',
  amt: '',
  cost_center: '',
  description: '',
};

export const defaultDateData = {
  posting_date: '',
  due_date: '',
};

export const defaultDateRef = {
  posting_date: null,
  due_date: null,
};

export const defaultTableData = {
  item_name: '',
  qty: '',
  rate: '',
  amt: '',
  hsn: '',
  uom: '',
  description: '',
  income_account: '',
  warehouse: '',
  item_tax_template: '',
  expense_account: '',
  cost_center: '',
  gst_rate: '',
  margin_type: '',
  margin_rate_or_amount: '',
  discount_percentage: '',
  discount_amount: '',
  rate_with_margin: '',
  original_rate: '',
  serial_no: '',
  serial_no_list: '',
  batch_no: '',
  batch_no_list: '',
};

export const defaultTableDataRef = {
  item_name: null,
  qty: null,
  rate: null,
  amt: null,
  hsn: null,
  uom: null,
  description: null,
  income_account: null,
  warehouse: null,
  item_tax_template: null,
  expense_account: null,
  cost_center: null,
  gst_rate: null,
  margin_type: null,
  margin_rate_or_amount: null,
  discount_percentage: null,
  discount_amount: null,
  rate_with_margin: null,
  original_rate: null,
  use_serial_batch_fields: null,
  serial_no: null,
  serial_no_list: null,
  batch_no: null,
  batch_no_list: null,
};

export const taxDefaultInfoRef = {
  charge_type: null,
  account_head: null,
  rate: null,
  amt: null,
  cost_center: null,
  description: null,
};

export interface SalesData {
  party_details: any;
  cost_center: string;
  sales_no: string;
  naming_series: string;
  voucher_class: string;
  current_balance: string;
  tax_template: string;
  voucher_name: string;
  table: { [key: string]: string | number | boolean }[];
  narration: string;
  update_stock: boolean;
  shipping_detail: string;
  source_warehouse: string;
  terms_and_conditions: string;
  payment_terms: string;
  terms_description: string;
}

export interface CompanyData {
  company_name: string;
  company_address: string;
  company_gstin: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_category: string;
}

export interface TaxData {
  account_head: string;
  charge_type: string;
  cost_center: string;
  description: string;
  rate: number;
}

export const chargeTypeData = ['', 'Actual', 'On Net Total', 'On Previous Row Amount', 'On Previous Row Total', 'On Item Quantity'];

export const salesNoData = ['SINV-.YY.-', 'SRET-.YY.-', 'INV-.YYYY.-', 'ACC-SINV-.YY.-', 'ACC-SINV-RET-.YY.-'];

export const additionalDiscountOnData = ['', 'Net Total', 'Grand Total'];

export const marginTypeData = ['', 'Percentage', 'Amount'];

export const filterTypes: any = {
  company_name: { type: 'Company' },
  party_name: { type: 'Customer' },
  cost_center: { type: 'Cost Center' },
  table: { type: 'Item' },
  item_name: { type: 'Item' },
  qty: { type: 'GST HSN Code' },
  hsn: { type: 'GST HSN Code' },
  uom: { type: 'UOM' },
  income_account: { type: 'Account' },
  expense_account: { type: 'Account' },
  account_head: { type: 'Account' },
  warehouse: { type: 'Warehouse' },
  item_tax_template: { type: 'Item Tax Template' },
  shipping_detail: { type: 'Shipping Rule' },
  payment_terms: { type: 'Payment Terms Template' },
  terms_and_conditions: { type: 'Terms and Conditions' },
  currency: { type: 'Currency' },
  batch_no: { type: 'Batch' },
};

export const filterDefaultData = {
  company_name: [],
  company_address: [],
  party_name: [],
  billing_address: [],
  shipping_address: [],
  cost_center: [],
  table: [],
  table_data: [],
  warehouse: [],
  account_data: [],
  hsn: [],
  uom: [],
  item_name: [],
  item_tax_template: [],
  charge_type: [],
  naming_series: [],
  shipping_detail: [],
  payment_terms: [],
  terms_and_conditions: [],
  margin_type: [],
  apply_discount_on: [],
  currency: [],
  batch_no: [],
};
