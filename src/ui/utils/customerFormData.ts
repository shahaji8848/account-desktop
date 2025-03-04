export const customerTypeFilter = [
    { name: 'Company' },
    { name: 'Individual' },
    { name: 'Partnership' }
];

export const addressTypeList = [
    { name: 'Billing' },
    { name: 'Shipping' },
    { name: 'Office' },
    { name: 'Personal' },
];

export const gstCategoryList = [
    { name: 'Registered Regular' },
    { name: 'Registered Composition' },
    { name: 'Unregistered' },
    { name: 'SEZ' },
    { name: 'Overseas' },
    { name: 'Deemed Export' },
    { name: 'UIN Holders' },
    { name: 'Tax Deductor' },
    { name: 'Tax Collector' },
    { name: 'Input Service Distributor' },
];

export const satutoryDetailFields = [
    {
        label: "Tax WithHolding Category",
        name: "tax_withholding_category",
        isFilterList: true,
    },
    {
        label: "GSTIN",
        name: "gstin",
    },
    {
        label: "GST Category",
        name: "gst_category",
        isFilterList: true,
    },
]

export const addressFields = [
    {
        label: "GSTIN",
        name: "address_gstin"
    },
    {
        label: "Address Line 1",
        name: "addressLine1"
    },
    {
        label: "Address Line 2",
        name: "addressLine2"
    },
    {
        label: "City/Town",
        name: "city"
    },
    {
        label: "Pin Code",
        name: "postalCode"
    },
    {
        label: "State",
        name: "state"
    },
    {
        label: "Country",
        name: "country"
    },
    {
        label: "GST Category",
        name: "gstCategory",
        isFilterList: true,
    },

    {
        label: "Address Type",
        name: "addressType",
        isFilterList: true,
    },
]



export const bankFields = [
    {
        label: "Account Name",
        name: "account_name"
    },
    {
        label: "Bank",
        name: "bank",
        isFilterList: true,
    },
    {
        label: "Account Type",
        name: "account_type",
        isFilterList: true,
    },
    {
        label: "Bank Account No",
        name: "bank_account_no"
    },
    {
        label: "Branch Code",
        name: "branch_code"
    }

]