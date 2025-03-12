let baseUrl = "https://yatish-testing-v15.frappe.cloud"

export async function getAllAccounts(doctype: any, filters: any, token: any) {
    let url = `${baseUrl}/api/resource/Account`;
    let accountsApiFilter: any = [];
    if (filters?.company) {
      accountsApiFilter.push(['company', '=', filters.company]);
    }
    if (filters?.input) {
      accountsApiFilter.push(['name', 'like', `%${filters.input}%`]);
    }
    if (filters?.account_type) {
      accountsApiFilter.push(['account_type', 'IN', `${filters.account_type}`]);
    }
    if(filters?.account_type)
      {
        accountsApiFilter.push(["account_type","IN",filters.account_type])
      }
  
    if (accountsApiFilter.length > 0) {
      url = `${baseUrl}/api/resource/Account?filters=${JSON.stringify(accountsApiFilter)}`;
    } 
    else {
      url = `${baseUrl}/api/resource/Account?limit_page_length=None`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      
      });
      return await response.json()
  }

export async function paymentEntryAccountsDetails(doctype:any , filters:any , token:any){
  if (!filters?.account) {
    return { error: true, msg: 'Please select an account' };
  }
  const getAccountsDetailUrl = "https://yatish-testing-v15.frappe.cloud/api/method/erpnext.accounts.doctype.payment_entry.payment_entry.get_account_details"
  
  const response = await fetch(getAccountsDetailUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "date":new Date().toISOString().split("T")[0],
      "account":filters.account
    }),
  });
  return  await response.json()


}