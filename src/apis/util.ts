// import { JSDOM } from 'jsdom';

export function isDev(): boolean {
  return true;
}

const baseUrl = 'https://yatish-testing-v15.frappe.cloud/api/resource';
const headers = {
  'Content-Type': 'application/json',
  // Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};

async function fetchTaxes(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  let header_details = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
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
  const response = await fetch(url, { method: 'GET', headers: header_details });

  if (!response.ok) {
    throw new Error(`Failed to fetch taxes: ${response.status} - ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
}

async function fetchData(url: string, token: any) {
  let header_details = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const response = await fetch(url, { method: 'GET', headers: header_details });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
  }
  const { data } = await response.json();
  return data;
}

async function getAddressData(doctype: any, filters: any, token: any) {
  const addressFilters: any = [];
  if (filters?.address_type) addressFilters.push(['address_type', '=', filters.address_type]);
  if (filters?.type) addressFilters.push(['Dynamic Link', 'link_doctype', '=', filters.type]);
  if (filters?.name) addressFilters.push(['Dynamic Link', 'link_name', '=', filters.name]);
  const url = `${baseUrl}/${doctype}?filters=${JSON.stringify(addressFilters)}&fields=${JSON.stringify(['*'])}`;
  return await fetchData(url, token);
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
        credentials: 'include',
      });

      const data = await response.json();
      const cookies = response.headers.get('set-cookie');
      const sid = cookies || data.message?.sid || null;
      let header_detials = {
        'Content-Type': 'application/json',
        Cookie: `${sid}`,
      };
      if (response.ok && data.message == 'Logged In') {
        const generateKeysUrl = `https://yatish-testing-v15.frappe.cloud/api/method/frappe.core.doctype.user.user.generate_keys`;
        const keysResponse = await fetch(generateKeysUrl, {
          method: 'POST',
          body: JSON.stringify({
            user: kwargs.email,
            usr: kwargs.email,
            pwd: kwargs.password,
          }),
          headers: header_detials,
        });

        const keysData = await keysResponse.json();

        if (keysData.message.api_secret) {
          const userDetails = `${baseUrl}/User/${kwargs.email}`;
          const res = await fetch(userDetails, { method: 'GET', headers: header_detials });
          let response = await res.json();
          if (response.data.api_key) {
            return { status: 'success', token: `token ${response.data.api_key}:${keysData.message.api_secret}` };
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

async function getItemData(doctype: string, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const itemApiFilter: any[] = [];

  if (filters?.name) {
    url = `${url}/${filters.name}`;
  } else if (filters?.input) {
    itemApiFilter.push(['name', 'like', `%${filters.input}%`]);
  } else {
    url = `${url}?limit_page_length=None`;
    return await fetchData(url, token);
  }

  if (itemApiFilter.length > 0) {
    url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(itemApiFilter))}&limit_page_length=None`;
  }

  let responseItemData = await fetchData(url, token);
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
        let companyData = await getItemTaxTemplate('Item Tax Template', { name: row.item_tax_template }, token);
        if (companyData?.length > 0 && companyData[0]?.company === filters.company) {
          taxes.push(row);
        }
      }
    }
  }

  itemdata['taxes'] = taxes;
  itemdata['item_defaults'] = item_defaults;
  return itemdata;
}

async function getCostCenterData(doctype: any, filters: any, token: any) {
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
  return await fetchData(url, token);
}
async function getWarehouseData(doctype: any, filters: any, token: any) {
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

    return await fetchData(url, token);
  }
}

async function getAccountsData(doctype: any, filters: any, token: any) {
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
  return await fetchData(url, token);
}
async function getItemTaxTemplate(doctype: any, filters: any, token: any) {
  const fields = JSON.stringify(['name', 'gst_rate', 'company']);
  const apiFilters: any[] = [];
  let taxes = [];
  if (filters?.name) {
    apiFilters.push(['name', '=', filters.name]);
  } else if (filters?.company) {
    apiFilters.push(['company', '=', filters.company]);
  }

  if (filters?.item_code) {
    let itemData = await getItemData('Item', { name: filters.item_code, company: filters.company }, token);
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
  return await fetchData(url, token);
}
async function getUomData(doctype: any, filters: any, token: any) {
  const uomapiFilters: any[] = [];

  if (filters?.input) {
    uomapiFilters.push(['name', 'like', `%${filters.input}%`]);
  }
  const queryParams = new URLSearchParams();
  if (uomapiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(uomapiFilters));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url, token);
}

async function getBankAccount(doctype: any, filters: any, token: any) {
  const apiFilters: any[] = [];
  if (filters?.company) {
    apiFilters.push(['company', '=', filters.company]);
  }
  if (filters?.input) {
    apiFilters.push(['name', 'like', `%${filters.input}%`]);
  }

  const queryParams = new URLSearchParams();
  if (apiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(apiFilters));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url, token);
}

async function getPrintFormat(doctype: any, filters: any, token: any) {
  const printformatapiFilters: any[] = [];

  if (filters?.input) {
    printformatapiFilters.push(['name', 'like', `%${filters.input}%`]);
  }
  if (filters?.doctype) {
    printformatapiFilters.push(['doc_type', '=', filters.doctype]);
  }
  const queryParams = new URLSearchParams();
  if (printformatapiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(printformatapiFilters));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url, token);
}

async function getGstHsnData(doctype: any, filters: any, token: any) {
  const hsnFilter: any[] = [];

  if (filters?.input) {
    hsnFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  const queryParams = new URLSearchParams();
  if (hsnFilter.length > 0) {
    queryParams.append('filters', JSON.stringify(hsnFilter));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url, token);
}

async function getOtherRecords(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  let data = await fetchData(url, token);
  return data;
}

async function getShippingData(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  if (filters.name) {
    url = url + '/' + filters.name;
    let data = await fetchData(url, token);
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
  return await fetchData(url, token);
}

export async function getItemRate(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const itemRateFilter: any[] = [];
  if (filters?.item_code) {
    itemRateFilter.push(['item_code', '=', `${filters.item_code}`]);
    itemRateFilter.push(['price_list', '=', 'Standard Selling']);
    url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(itemRateFilter))}&fields=["*"]`;
    let data = await fetchData(url, token);
    return data;
  }
}

export async function getPaymentTerms(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const getPaymentTermsFilters: any[] = [];
  if (filters?.input) {
    getPaymentTermsFilters.push(['name', 'like', `%${filters.input}%`]);
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(getPaymentTermsFilters)}`;
    let data = await fetchData(url, token);
    return data;
  }
  if (filters?.name) {
    url = `${baseUrl}/${doctype}/${filters.name}`;
    let data = await fetchData(url, token);
    return data;
  } else {
    let data = await fetchData(url, token);
    return data;
  }
}

export async function getTermsCondtions(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const termsnConditionFilter: any[] = [];

  if (filters?.input) {
    termsnConditionFilter.push(['name', 'like', `%${filters.input}%`]);
    url = `${baseUrl}/${doctype}?filters=${JSON.stringify(termsnConditionFilter)}`;
  } else if (filters?.name) {
    url = `${baseUrl}/${doctype}/${filters.name}`;
  }

  let data = await fetchData(url, token);

  // Extract text content using jsdom
  // if (data && data.terms) {
  //   const dom = data.terms;
  //   data.terms = dom.window.document.body.textContent;
  // }

  return data;
}

export async function getIncotermData(doctype: any, filters: any, token: any) {
  const incotermapiFilters: any[] = [];

  if (filters?.input) {
    incotermapiFilters.push(['name', 'like', `%${filters.input}%`]);
  }
  const queryParams = new URLSearchParams();
  if (incotermapiFilters.length > 0) {
    queryParams.append('filters', JSON.stringify(incotermapiFilters));
  }

  const url = `${baseUrl}/${doctype}?${queryParams.toString()}`;
  return await fetchData(url, token);
}
export async function getCurrency(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const curencyFilter = [];
  curencyFilter.push(['enabled', '=', 1]);
  if (filters?.input) {
    curencyFilter.push(['name', 'like', `%${filters.input}%`]);
  }
  url = `${baseUrl}/${doctype}?filters=${JSON.stringify(curencyFilter)}&limit_page_length=None`;
  let data = await fetchData(url, token);
  return data;
}
async function getPromotionalSchemes(doctype: string, filters: any, token: any) {
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

  return await fetchData(url, token);
}

export async function getSerialNo(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const apiFilter: any[] = [];
  Object.entries(filters).forEach(([key, value]) => {
    apiFilter.push([key, '=', value]);
  });
  url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(apiFilter))}&limit_page_length=None`;
  return await fetchData(url, token);
}
export async function getBatch(doctype: any, filters: any, token: any) {
  let url = `${baseUrl}/${doctype}`;
  const apiFilter: any[] = [];
  Object.entries(filters).forEach(([key, value]) => {
    apiFilter.push([key, '=', value]);
  });
  url = `${baseUrl}/${doctype}?filters=${encodeURIComponent(JSON.stringify(apiFilter))}&limit_page_length=None`;
  return await fetchData(url, token);
}

export async function getCurrencyData(kwargs: any) {
  let endpoint = 'https://yatish-testing-v15.frappe.cloud/api/method/erpnext.setup.utils.get_exchange_rate';
  // let d = JSON.stringify
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: kwargs?.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(kwargs.data),
  });
 
  return response.json();
}

export async function getPaymentReconciliationParty(doctype: any, filters: any, token: any) {
  const url = `${baseUrl}/DocType?filters=${encodeURIComponent(
    JSON.stringify([['name', 'in', ['Customer', 'Supplier', 'Employee', 'Shareholder']]])
  )}`;
  return await fetchData(url, token);
}

// to be deleted later
export async function getJournalEntryAccountsData(doctype: any, filters: any, token?: any) {
  if (!filters?.account) {
    return { error: true, msg: 'Please select an account' };
  }
  const getBalanceUrl = 'https://yatish-testing-v15.frappe.cloud/api/method/erpnext.accounts.utils.get_account_balances';
  const getAccountsDetails = await fetch(`${baseUrl}/Account/${encodeURIComponent(filters.account)}?fields=["*"]`, {
    method: 'GET',
    headers: { Authorization: token },
  });
  const accountsData = await getAccountsDetails.json();
  const accountCurrency = accountsData?.data?.account_currency;
  if (!accountCurrency) {
    return { error: true, msg: 'Please try again selecting an account' };
  }
  const args = {
    accounts: [{ value: filters.account, account_currency: accountCurrency }],
    company: filters?.company,
  };
  const response = await fetch(getBalanceUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const accountBalanceData = await response.json();
  const balance = accountBalanceData?.message?.[0]?.balance || 0;
  const accountType = accountsData?.data?.root_type;
  let type;
  if (accountType === 'Asset' || accountType === 'Expenses') {
    type = balance >= 0 ? 'Debit' : 'Credit';
  } else if (accountType === 'Liability' || accountType === 'Equity' || accountType === 'Income') {
    type = balance >= 0 ? 'Credit' : 'Debit';
  } else {
    return { error: true, msg: 'Unknown account type' };
  }
  return {
    account: filters.account,
    account_currency: accountCurrency,
    balance: Math.abs(balance),
    type: type,
  };
}
export async function getJournalEntryReceiptName(doctype: any, filters: any, token: any) {
  const journalEntryApiFilters: any[] = [];

  if (filters.reference_type === "Sales Invoice") {
    journalEntryApiFilters.push(["account", "=", filters.account]);
    journalEntryApiFilters.push(["party", "=", filters.party]);
  } 
  else if (filters.reference_type === "Asset") {
    journalEntryApiFilters.push(["docstatus", "=", 1]);
  } 
  else if (filters.reference_type === "Purchase Invoice") {
    journalEntryApiFilters.push(
      [ "docstatus", "=", 1],
      [ "outstanding_amount", "!=", 0],
      [ "cost_center", "IN",["",filters.cost_center]],
      [ "credit_to", "=", filters.account]
    );
  }

  const baseUrl = `https://yatish-testing-v15.frappe.cloud/api/resource/${filters.reference_type}?filters=${JSON.stringify(journalEntryApiFilters)}&limit_page_length=None`;

  
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

   
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getJournalEntryReceiptName:", error);
    return null;
  }
}
export async function getContactData(doctype:any , filters:any , token:any) {
  let contactUrl = baseUrl+`/${doctype}`
  const contactapiFilters:any =[];
  if (filters?.type) contactapiFilters.push(['Dynamic Link', 'link_doctype', '=', filters.type]);
  if (filters?.type_name) contactapiFilters.push(['Dynamic Link', 'link_name', '=', filters.type_name]);
  if (contactapiFilters.length >0){
     contactUrl = contactUrl+`?filters=${encodeURIComponent(JSON.stringify(contactapiFilters))}`
  }
  return await fetchData(contactUrl , token)
}
export async function getSupplierData(doctype: string, filters: any, token: string) {
  let contactUrl = `${baseUrl}/${doctype}`;
  if (filters?.name) {
    contactUrl += `/${filters.name}`;
  } else {
    const supplierapiFilters = filters?.is_transporter ? [['is_transporter', '=', 1]] : [];
    if (supplierapiFilters.length) {
      contactUrl += `?filters=${encodeURIComponent(JSON.stringify(supplierapiFilters))}`;
    }
  }
  return fetchData(contactUrl, token);
}

export async function getPaymentEntryPartyDetails(doctype: string, filters: any, token: string) {
  let paymentEntryUrl = 'https://yatish-testing-v15.frappe.cloud/api/method/erpnext.accounts.doctype.payment_entry.payment_entry.get_party_details'
  if (!filters.party_type || !filters.party || !filters.company ){
    return {"error":true , "msg":"Party Details Missing"}
  }
  else {
    paymentEntryUrl +=`?company=${encodeURIComponent(filters.company)}&party_type=${encodeURIComponent(filters.party_type)}&party=${encodeURIComponent(filters.party)}&date=${encodeURIComponent(new Date().toISOString().split('T')[0])}` ;
  }
  const response = await fetch(paymentEntryUrl, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
 return await response.json()
}

export async function getPaymentEntryRefDocuments(
  doctype: string,
  filters: any,
  token: string
) {
 
  const paymentEntryRefDocUrl =
    "https://yatish-testing-v15.frappe.cloud/api/method/erpnext.accounts.doctype.payment_entry.payment_entry.get_outstanding_reference_documents";

  if (
    !filters.party_type ||
    !filters.party ||
    !filters.company ||
    !filters.party_account ||
    !filters.payment_type
  ) {
    return { error: true, msg: "Party Details Missing" };
  }

  let args: any = {
    posting_date: new Date().toISOString().split("T")[0],
    company: filters.company,
    party_type: filters.party_type,
    payment_type: filters.payment_type,
    party: filters.party,
    party_account: filters.party_account,
    outstanding_amt_greater_than: 0,
  };

  if (["Sales Order", "Sales Invoice"].includes(filters.ref_type)) {
    if (filters.ref_type === "Sales Order") {
      args["get_orders_to_be_billed"] = 1;
    }

    try {
      const response = await fetch(paymentEntryRefDocUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ args }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch reconciliation entries: ${response.statusText}`);
      }

      return await response.json();
    } catch (error:any) {
      return { error: true, message: error.message };
    }
  }

  if (["Journal Entry", "Dunning"].includes(filters.ref_type)) {
    let apiFilters: any[] = [
      ["docstatus", "=", 1],
      ["company", "=", filters.company],
    ];
    let apiEndpoint = filters.ref_type === "Journal Entry" ? "Journal Entry" : "Dunning";

    try {
      const response = await fetch(
        `${baseUrl}/${apiEndpoint}?limit_page_length=None&filters=${encodeURIComponent(
          JSON.stringify(apiFilters)
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data
      }
    } catch (error) {
      return { error: true, message: `Error fetching ${filters.ref_type}: ${error}` };
    }
  }


  try {
    const response = await fetch(paymentEntryRefDocUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reconciliation entries: ${response.statusText}`);
    }

    return await response.json();
  } catch (error:any) {
    return { error: true, message: error.message };
  }
}

export async function getData(kwargs: any) {
  const { doctype, filters, token } = kwargs;

  switch (doctype) {
    case 'Address':
      return await getAddressData(doctype, filters, token);
    case 'Item':
      return await getItemData(doctype, filters, token);
    case 'Cost Center':
      return await getCostCenterData(doctype, filters, token);
    case 'Warehouse':
      return await getWarehouseData(doctype, filters, token);
    case 'Account':
      return await getAccountsData(doctype, filters, token);
    case 'Sales Taxes and Charges Template':
      return await fetchTaxes(doctype, filters, token);
    case 'Item Tax Template':
      return await getItemTaxTemplate(doctype, filters, token);
    case 'UOM':
      return await getUomData(doctype, filters, token);
    case 'Bank Account':
      return await getBankAccount(doctype, filters, token);
    case 'GST HSN Code':
      return await getGstHsnData(doctype, filters, token);
    case 'Shipping Rule':
      return await getShippingData(doctype, filters, token);
    case 'Item Price':
      return await getItemRate(doctype, filters, token);
    case 'Payment Terms Template':
      return await getPaymentTerms(doctype, filters, token);
    case 'Terms and Conditions':
      return await getTermsCondtions(doctype, filters, token);
    case 'Currency':
      return await getCurrency(doctype, filters, token);
    case 'Serial No':
      return await getSerialNo(doctype, filters, token);
    case 'Batch':
      return await getBatch(doctype, filters, token);
    case 'Promotional Scheme':
      return await getPromotionalSchemes(doctype, filters, token);
    case 'Payment Reconciliation Party':
      return await getPaymentReconciliationParty(doctype, filters, token);
    case 'Journal Entry Accounts':
      return await getJournalEntryAccountsData(doctype, filters, token);
    case 'Incoterm':
      return await getIncotermData(doctype, filters, token);
    case 'Print Format':
      return await getPrintFormat(doctype, filters, token);
     case "Journal Receipt Names":
          return await getJournalEntryReceiptName(doctype, filters, token);
    case "Supplier":
        return await getSupplierData(doctype, filters, token)
    case "Contact":
      return getContactData(doctype, filters, token)
    case "Payment Entry Party Details":
      return getPaymentEntryPartyDetails(doctype, filters, token)
    case "Payment Entry Reference Documents":
      return getPaymentEntryRefDocuments(doctype, filters, token)
    default:
      return getOtherRecords(doctype, filters, token);
  }
}

async function postSalesInvoice(invoiceData: any, method: any, headers: any) {
  let endpoint = `${baseUrl}/Sales Invoice`;
  if (method == 'PUT') {
    endpoint += `/${invoiceData.name}`;
  }
  const response = await fetch(endpoint, {
    method: method,
    headers: headers,
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
    const { company, templateName, token } = kwargs;
    const taxes = await fetchTaxes(company, templateName, token);
    return taxes;
  } catch (error: any) {
    console.error('Error in getTaxes:', error);
  }
}

export async function saveForm(kwargs: any) {
  try {
    if (kwargs.method == 'POST') {
      return await postSalesInvoice(kwargs.salesInvoiceData, kwargs.method, kwargs.headers);
    } else if (kwargs.method == 'PUT') {
      return await postSalesInvoice(kwargs.salesInvoiceData, kwargs.method, kwargs.headers);
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
    headers: { Authorization: kwargs?.token },
    body: JSON.stringify(kwargs.data),
  });
  const result = await response.json();
  return result;
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
    headers: { Authorization: kwargs?.token },
    body: JSON.stringify(kwargs.data),
  });
  const result = await response.json();
  return result;
}

export async function getGstinInfo(kwargs: any) {
  if (kwargs.gstin) {
    let gstinUrl = `https://yatish-testing-v15.frappe.cloud/api/method/india_compliance.gst_india.utils.gstin_info.get_gstin_info?gstin=${kwargs.gstin}`;
    const response = await fetch(gstinUrl, {
      method: 'POST',
      headers: { Authorization: kwargs?.token },
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
      headers: { ...headers, Authorization: args.token },
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

export async function getPrintFormatData(args: any) {
  try {
    let api_url = 'https://yatish-testing-v15.frappe.cloud/api/method/frappe.utils.print_format.download_pdf';
    let params = new URLSearchParams({
      doctype: args.doctype,
      name: args.name,
      format: args.format,
    });

    const response = await fetch(`${api_url}?${params.toString()}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      return { error: true, message: `Error: ${response.statusText}` };
    }
    // const htmlContent = response.data;
    // const htmlPath = path.resolve(__dirname, 'Sales_Invoice_Return.html');
    // fs.writeFileSync(htmlPath, htmlContent);
    return await response;
  } catch (error) {
    console.error('Error in getPrintFormatData:', error);
    return { error: true, message: `Error: ${error}` };
  }
}
