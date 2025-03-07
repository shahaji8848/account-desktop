// import { JSDOM } from 'jsdom';

export function isDev(): boolean {
  return true;
}

const baseUrl = 'https://yatish-testing-v15.frappe.cloud/api/resource';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};

// Function to fetch taxes
async function fetchTaxes(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const taxesApiFilter: any = [];
  if (filters.company) {
    taxesApiFilter.push(['company', '=', filters.company]);
  }
  if (filters.name) {
    taxesApiFilter.push(['name', '=', filters.name]);
  }

  const fields = JSON.stringify([
    '`tabSales Taxes and Charges`.charge_type',
    '`tabSales Taxes and Charges`.account_head',
    '`tabSales Taxes and Charges`.description',
    '`tabSales Taxes and Charges`.rate',
    '`tabSales Taxes and Charges`.cost_center',
  ]);
  if (taxesApiFilter.length > 0) {
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(taxesApiFilter)}&fields=${fields}`;
  }
  const response = await fetch(url, { method: 'GET', headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch taxes: ${response.status} - ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
}

async function fetchData(url: string) {
  const response = await fetch(url, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
  }
  const { data } = await response.json();
  return data;
}

async function getAddressData(doctype: any, filters: any) {
  const addressFilters: any = [];
  if (filters?.address_type) addressFilters.push(['address_type', '=', filters.address_type]);
  if (filters?.type) addressFilters.push(['Dynamic Link', 'link_doctype', '=', filters.type]);
  if (filters?.name) addressFilters.push(['Dynamic Link', 'link_name', '=', filters.name]);
  const url = `${baseUrl}/${doctype}?filters=${JSON.stringify(addressFilters)}&fields=${JSON.stringify(['*'])}`;
  return await fetchData(url);
}

export async function login(kwargs: any) {
  const login_url = 'https://yatish-testing-v15.frappe.cloud/api/method/login';

  if (kwargs.email && kwargs.password) {
    try {
      const response = await fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usr: kwargs.email,
          pwd: kwargs.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message == 'Logged In') {
        const generateKeysUrl = `https://yatish-testing-v15.frappe.cloud/api/method/frappe.core.doctype.user.user.generate_keys?user=${kwargs.email}`;
        const keysResponse = await fetch(generateKeysUrl, {
          method: 'POST',
          headers: headers,
        });

        const keysData = await keysResponse.json();
        if (keysData.message.api_secret) {
          const userDetails = `${baseUrl}/User/${kwargs.email}`;
          const res = await fetch(userDetails, { method: 'GET', headers });
          let response = await res.json();
          if (response.data.api_key) {
            return { status: 'success', token: `token ${keysData.message.api_secret}:${response.data.api_key}` };
          } else {
            return { error: data.message || 'Login failed' };
          }
        } else {
          return { error: data.message || 'Login failed' };
        }
      } else {
        return { error: data.message || 'Login failed' };
      }
    } catch (error) {
      return { error: 'An error occurred while logging in' };
    }
  } else {
    return { error: 'Invalid username or password' };
  }
}

async function getItemData(doctype: string, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const itemApiFilter: any[] = [];

  if (filters?.name) {
    url = `${url}/${filters.name}`;
  } else if (filters?.input) {
    itemApiFilter.push(['name', 'like', `%${filters.input}%`]);
  } else {
    url = `${url}?limit_page_length=None`;
    return await fetchData(url);
  }

  if (itemApiFilter.length > 0) {
    url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(itemApiFilter))}&limit_page_length=None`;
  }

  let responseItemData = await fetchData(url);
  let itemdata: any = {};
  let item_defaults: any[] = [];
  let taxes: any[] = [];

  itemdata['gst_hsn_code'] = responseItemData?.gst_hsn_code || null;
  itemdata['stock_uom'] = responseItemData?.stock_uom || null;
  itemdata['item_name'] = responseItemData?.item_name || null;
  itemdata['name'] = responseItemData?.name || null;
  itemdata['item_group'] = responseItemData?.item_group || null;
  // let description = responseItemData?.description || null;
  // itemdata['description'] = description.window.document.body.textContent;
  itemdata['description'] = responseItemData?.description || null;
  if (responseItemData?.item_defaults) {
    for (let row of responseItemData.item_defaults) {
      if (row?.company === filters.company) {
        item_defaults.push(row);
      }
    }
  }

  if (responseItemData?.taxes) {
    for (let row of responseItemData.taxes) {
      if (row?.item_tax_template) {
        let companyData = await getItemTaxTemplate('Item Tax Template', { name: row.item_tax_template });
        if (companyData?.length > 0 && companyData[0]?.company === filters.company) {
          taxes.push(row);
        }
      }
    }
  }

  itemdata['taxes'] = taxes;
  itemdata['item_defaults'] = item_defaults;
  // console.log(responseItemData, itemdata, 'itemdata');
  return itemdata;
}

async function getCostCenterData(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const costCenterApiFilter: any = [];
  if (filters?.company) {
    costCenterApiFilter.push(['company', '=', filters.company]);
  }
  if (filters?.input) {
    costCenterApiFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  if (costCenterApiFilter.length > 0) {
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(costCenterApiFilter)}`;
  } else {
    url = `${baseUrl}/${doctype}?limit_page_length=None`;
  }
  return await fetchData(url);
}
async function getWarehouseData(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const warehouseApiFilter: any = [];
  if (filters?.company) {
    warehouseApiFilter.push(['company', '=', filters.company]);

    if (filters?.input) {
      warehouseApiFilter.push(['name', 'like', `%${filters.input}%`]);
    }
    if (warehouseApiFilter.length > 0) {
      url = `${baseUrl}/${doctype}?filters=${JSON.stringify(warehouseApiFilter)}`;
    } else {
      url = `${baseUrl}/${doctype}?limit_page_length=None`;
    }

    return await fetchData(url);
  }
}

async function getAccountsData(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  let accountsApiFilter: any = [];
  if (filters?.company) {
    accountsApiFilter.push(['company', '=', filters.company]);
  }
  if (filters?.input) {
    accountsApiFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  if (filters?.root_type) {
    accountsApiFilter.push(['root_type', '=', `${filters.root_type}`]);
  }
  if (filters?.account_type) {
    accountsApiFilter.push(['account_type', '=', `${filters.account_type}`]);
  }
  if ('is_group' in filters) {
    accountsApiFilter.push(['is_group', '=', `${filters.is_group}`]);
  }

  if (accountsApiFilter.length > 0) {
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(accountsApiFilter)}`;
  } else {
    url = `${baseUrl}/${doctype}?limit_page_length=None`;
  }
  return await fetchData(url);
}
async function getItemTaxTemplate(doctype: any, filters: any) {
  const fields = JSON.stringify(['name', 'gst_rate', 'company']);
  const apiFilters: any[] = [];
  let taxes = [];
  if (filters?.name) {
    apiFilters.push(['name', '=', filters.name]);
  } else if (filters?.company) {
    apiFilters.push(['company', '=', filters.company]);
  }

  if (filters?.item_code) {
    let itemData = await getItemData('Item', { name: filters.item_code, company: filters.company });
    console.log(itemData);
    if (itemData?.taxes?.length > 0) {
      for (let row in itemData.taxes) {
        if (itemData.taxes[row].valid_from <= new Date().toISOString()) {
          let taxTemplate = itemData.taxes[row].item_tax_template;
          taxes.push(taxTemplate);
        }
      }
      apiFilters.push(['name', 'IN', taxes]);
    }
  }

  const queryParams = new URLSearchParams();
  if (apiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(apiFilters));
  }
  queryParams.append('fields', fields);

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url);
}
async function getUomData(doctype: any, filters: any) {
  const uomapiFilters: any[] = [];

  if (filters?.input) {
    uomapiFilters.push(['name', 'like', `%${filters.input}%`]);
  }
  const queryParams = new URLSearchParams();
  if (uomapiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(uomapiFilters));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url);
}

async function getGstHsnData(doctype: any, filters: any) {
  const hsnFilter: any[] = [];

  if (filters?.input) {
    hsnFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  const queryParams = new URLSearchParams();
  if (hsnFilter.length > 0) {
    queryParams.append('filters', JSON.stringify(hsnFilter));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url);
}

async function getOtherRecords(doctype: any) {
  let url = `${baseUrl}/${doctype}`;
  return await fetchData(url);
}

async function getShippingData(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  if (filters.name) {
    url = url + '/' + filters.name;
    let data = await fetchData(url);
    return { conditions: data.conditions, account: data.account, cost_center: data.cost_center };
  }
  const shippingFilter: any[] = [];

  if (filters?.input) {
    shippingFilter.push(['name', 'like', `%${filters.input}%`]);
  }

  const queryParams = new URLSearchParams();
  if (shippingFilter.length > 0) {
    queryParams.append('filters', JSON.stringify(shippingFilter));
  }

  url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url);
}

export async function getItemRate(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const itemRateFilter: any[] = [];
  if (filters?.item_code) {
    itemRateFilter.push(['item_code', '=', `${filters.item_code}`]);
    itemRateFilter.push(['price_list', '=', 'Standard Selling']);
    url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(itemRateFilter))}&fields=["*"]`;
    console.log(url);
    let data = await fetchData(url);
    return data;
  }
}

export async function getPaymentTerms(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const getPaymentTermsFilters: any[] = [];
  if (filters?.input) {
    getPaymentTermsFilters.push(['name', 'like', `%${filters.input}%`]);
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(getPaymentTermsFilters)}`;
    let data = await fetchData(url);
    return data;
  }
  if (filters?.name) {
    url = `${baseUrl}/${doctype}/${filters.name}`;
    let data = await fetchData(url);
    return data;
  } else {
    let data = await fetchData(url);
    return data;
  }
}

export async function getTermsCondtions(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const termsnConditionFilter: any[] = [];

  if (filters?.input) {
    termsnConditionFilter.push(['name', 'like', `%${filters.input}%`]);
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(termsnConditionFilter)}`;
  } else if (filters?.name) {
    url = `${baseUrl}/${doctype}/${filters.name}`;
  }

  let data = await fetchData(url);

  // Extract text content using jsdom
  // if (data && data.terms) {
  //   const dom = data.terms;
  //   data.terms = dom.window.document.body.textContent;
  // }

  return data;
}

export async function getIncotermList(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const incotermFilter: any[] = [];

  if (filters?.input) {
    incotermFilter.push(['name', 'like', `%${filters.input}%`]);
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(incotermFilter)}`;
  }

  let data = await fetchData(url);

  return data;
}

export async function getCurrency(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const curencyFilter = [];
  curencyFilter.push(['enabled', '=', 1]);
  if (filters?.input) {
    curencyFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  url = `${baseUrl}/${doctype}?filters=${JSON.stringify(curencyFilter)}&limit_page_length=None`;
  let data = await fetchData(url);
  return data;
}
async function getPromotionalSchemes(doctype: string, filters: any) {
  const schemeFilters: any = [];
  const currentDate = new Date().toISOString().split('T')[0];

  let url = `${baseUrl}/${doctype}`;
  if (filters?.item_code) schemeFilters.push(['Pricing Rule Item Code', 'item_code', '=', filters.item_code]);
  schemeFilters.push(['valid_from', '<=', currentDate]);
  schemeFilters.push(['valid_upto', '>=', currentDate]);

  if (filters?.input) {
    schemeFilters.push(['name', 'like', `%${filters.input}%`]);
  }

  if (filters?.name) {
    url = `${baseUrl}/${doctype}/${filters.name}`;
  } else {
    url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(schemeFilters))}`;
  }

  return await fetchData(url);
}

export async function getSerialNo(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const apiFilter: any[] = [];
  Object.entries(filters).forEach(([key, value]) => {
    apiFilter.push([key, '=', value]);
  });
  url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(apiFilter))}&limit_page_length=None`;
  return await fetchData(url);
}
export async function getBatch(doctype: any, filters: any) {
  let url = `${baseUrl}/${doctype}`;
  const apiFilter: any[] = [];
  Object.entries(filters).forEach(([key, value]) => {
    apiFilter.push([key, '=', value]);
  });
  url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(apiFilter))}&limit_page_length=None`;
  console.log(url, 'batch url');
  return await fetchData(url);
}

export async function getCurrencyData(kwargs: any) {
  let endpoint = 'https://yatish-testing-v15.frappe.cloud/api/method/erpnext.setup.utils.get_exchange_rate';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(kwargs.data),
  });
  return response.json();
}

export async function getPaymentReconciliationParty(doctype: any, filters: any) {
  const url = `${baseUrl}/DocType?filters=${encodeURIComponent(
    JSON.stringify([['name', 'in', ['Customer', 'Supplier', 'Employee', 'Shareholder']]])
  )}`;
  return await fetchData(url);
}

export async function getData(kwargs: any) {
  const { doctype, filters } = kwargs;

  switch (doctype) {
    case 'Address':
      return await getAddressData(doctype, filters);
    case 'Incoterm':
      return await getIncotermList(doctype, filters);
    case 'Item':
      return await getItemData(doctype, filters);
    case 'Cost Center':
      return await getCostCenterData(doctype, filters);
    case 'Warehouse':
      return await getWarehouseData(doctype, filters);
    case 'Account':
      return await getAccountsData(doctype, filters);
    case 'Sales Taxes and Charges Template':
      return await fetchTaxes(doctype, filters);
    case 'Item Tax Template':
      return await getItemTaxTemplate(doctype, filters);
    case 'UOM':
      return await getUomData(doctype, filters);
    case 'GST HSN Code':
      return await getGstHsnData(doctype, filters);
    case 'Shipping Rule':
      return await getShippingData(doctype, filters);
    case 'Item Price':
      return await getItemRate(doctype, filters);
    case 'Payment Terms Template':
      return await getPaymentTerms(doctype, filters);
    case 'Terms and Conditions':
      return await getTermsCondtions(doctype, filters);
    case 'Currency':
      return await getCurrency(doctype, filters);
    case 'Serial No':
      return await getSerialNo(doctype, filters);
    case 'Batch':
      return await getBatch(doctype, filters);
    case 'Promotional Scheme':
      return await getPromotionalSchemes(doctype, filters);
    case 'Payment Reconciliation Party':
      return await getPaymentReconciliationParty(doctype, filters);
    default:
      return getOtherRecords(doctype);
  }
}

async function postSalesInvoice(invoiceData: any, method: any) {
  let endpoint = `${baseUrl}/Sales Invoice`;
  if (method == 'PUT') {
    endpoint += `/${invoiceData.name}`;
  }
  const response = await fetch(endpoint, {
    method: method,
    headers,
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error(`Failed to post sales invoice: ${response.status} - ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}

export async function getTaxes(kwargs: any) {
  try {
    const { company, templateName } = kwargs;
    const taxes = await fetchTaxes(company, templateName);
    return taxes;
  } catch (error: any) {
    console.error('Error in getTaxes:', error);
  }
}

export async function saveForm(kwargs: any) {
  try {
    if (kwargs.method == 'POST') {
      return await postSalesInvoice(kwargs.salesInvoiceData, kwargs.method);
    } else if (kwargs.method == 'PUT') {
      return await postSalesInvoice(kwargs.salesInvoiceData, kwargs.method);
    }
  } catch (error: any) {
    console.error('Error in saveForm:', error);
  }
}

export async function postData(kwargs: any) {
  let endpoint = baseUrl;
  if (kwargs.doctype) {
    endpoint = `${baseUrl}/${kwargs.doctype}`;
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(kwargs.data),
  });
  return response;
}

export async function updateData(kwargs: any) {
  let endpoint = baseUrl;
  if (kwargs.doctype) {
    endpoint += `/${kwargs.doctype}`;
  }
  if (kwargs.name) {
    endpoint += `/${kwargs.name}`;
  }
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(kwargs.data),
  });
  return response;
}

export async function getGstinInfo(kwargs: any) {
  if (kwargs.gstin) {
    let gstinUrl = `https://yatish-testing-v15.frappe.cloud/api/method/india_compliance.gst_india.utils.gstin_info.get_gstin_info?gstin=${kwargs.gstin}`;
    const response = await fetch(gstinUrl, {
      method: 'POST',
      headers,
    });
    return response.json();
  } else {
    return { error: 'Invalid Request. Pls Enter GSTIN' };
  }
}

export async function getAdvancePaymentEntries(args: any) {
  try {
    let params: any = {
      doctype: 'Sales Invoice',
      company: args.company,
      only_include_allocated_payments: args.only_include_allocated_payments,
      customer: args.customer,
      rounded_total: args.rounded_total,
      grand_total: args.grand_total,
      __islocal: 1,
    };

    const response = await fetch(`https://yatish-testing-v15.frappe.cloud/api/method/run_doc_method`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        docs: params,
        method: 'set_advances',
      }),
    });

    if (!response.ok) {
      return { error: true, message: `Failed to fetch advance payment eEntries: ${response.statusText}` };
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getAdvancePaymentEntries:', error);
    return { error: true, message: 'An unexpected error occurred while fetching advance payment entries.' };
  }
}
