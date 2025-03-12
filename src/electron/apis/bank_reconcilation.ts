const baseUrl = 'https://yatish-testing-v15.frappe.cloud/';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};


async function deposit(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(deposit) as deposit"],
      filters: [
        ["date", "<=", args.to_date],
        ["bank_account", "=", args.bank_account],
        ["date", ">=", args.from_date],
        ["docstatus", "=", 1],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
  async function open_deposit(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(deposit) as open_deposit"],
      filters: [
        ["date", "<", args.from_date],
        ["bank_account", "=", args.bank_account],
        ["docstatus", "=", 1],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
  async function withdrawal(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(withdrawal) as withdrawal"],
      filters: [
        ["date", "<=", args.to_date],
        ["bank_account", "=", args.bank_account],
        ["date", ">=", args.from_date],
        ["docstatus", "=", 1],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
  async function open_withdrawal(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(withdrawal) as open_withdrawal"],
      filters: [
        ["date", "<", args.from_date],
        ["bank_account", "=", args.bank_account],
        ["docstatus", "=", 1],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
async function get_closing_bal_bnk(args: any) {
    const debit = await deposit({
      bank_account: args.bank_account,
      from_date: args.from_date,
      to_date: args.to_date,
    });
    const open_debit = await open_deposit({
      bank_account: args.bank_account,
      from_date: args.from_date,
    });
    const credit = await withdrawal({
      bank_account: args.bank_account,
      from_date: args.from_date,
      to_date: args.to_date,
    });
    const open_credit = await open_withdrawal({
      bank_account: args.bank_account,
      from_date: args.from_date,
    });
  
    const closing_bal = open_credit.data[0].open_withdrawal-open_debit.data[0].open_deposit + credit.data[0].withdrawal-debit.data[0].deposit;

    return closing_bal
  }

  async function erp_deposit(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(allocated_amount) as deposit"],
      filters: [
        ["date", "<=", args.to_date],
        ["bank_account", "=", args.bank_account],
        ["date", ">=", args.from_date],
        ["docstatus", "=", 1],
        ["deposit", ">", 0],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
  async function erp_withdrawal(args: any) {
    const parms = {
      doctype: "Bank Transaction",
      fields: ["sum(allocated_amount) as withdrawal"],
      filters: [
        ["date", "<=", args.to_date],
        ["bank_account", "=", args.bank_account],
        ["date", ">=", args.from_date],
        ["docstatus", "=", 1],
        ["withdrawal", ">", 0],
      ],
    };
  
    const queryParams = new URLSearchParams();
    if (parms.fields.length > 0) {
      queryParams.append("fields", JSON.stringify(parms.fields));
    }
    if (parms.filters.length > 0) {
      queryParams.append("filters", JSON.stringify(parms.filters));
    }
    // console.log(parms.doctype);
    const url = `${baseUrl}api/resource/${parms.doctype}?${queryParams.toString()}`;
  
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  }
  
  
  
  async function get_closing_bal_erp(args: any) {
    const debit = await erp_deposit({
      bank_account: args.bank_account,
      from_date: args.from_date,
      to_date: args.to_date,
    });
   
    const credit = await erp_withdrawal({
      bank_account: args.bank_account,
      from_date: args.from_date,
      to_date: args.to_date,
    });
  
    const closing_bal =
      credit.data[0].withdrawal -
      debit.data[0].deposit;
    
    return closing_bal;
  }




export async function getAccountBalance(args: any) {
    try {
        const till_date = new Date(args.from_date);
        till_date.setDate(till_date.getDate()  - 1);
        let api_url = "api/method/erpnext.accounts.doctype.bank_reconciliation_tool.bank_reconciliation_tool.get_account_balance"

        let params:any =  {
        bank_account: args.bank_account,
        company: args.company,
        till_date: till_date.toISOString().split('T')[0]
        }

        const response = await fetch(`${baseUrl}${api_url}`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization: args?.token,
              },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch AccountBalance: ${response.statusText}` };
        }

        const opening_balance = await response.json();
        const opening_balance_value = opening_balance.message;
        const erp_bal = await get_closing_bal_erp(args);
        const bal_bnk = await get_closing_bal_bnk(args);
        const acc_erp_bal = opening_balance_value + erp_bal;
        const difference_amount = bal_bnk - erp_bal;
       
        return {
        opening_balance: opening_balance_value,
        erp_bal: acc_erp_bal,
        bal_bnk: bal_bnk,
        difference_amount: difference_amount,
        };
    } 
    catch (error) {
        console.error("Error in getAccountBalance:", error);
        return { error: true, message: "An unexpected error occurred while fetching AccountBalance." };
    }
}


export async function getErpTransaction(args: any) {
    try {
        
        let api_url = "api/method/erpnext.accounts.doctype.bank_reconciliation_tool_erpnext.bank_reconciliation_tool_erpnext.get_erp_transaction"

        let params:any =  {
        bank_account: args.bank_account,
        company: args.company,
        from_statement_date: args.from_statement_date,
        to_statement_date:args.to_statement_date
        }

        const response = await fetch(`${baseUrl}${api_url}`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization: args?.token,
              },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch Erp Transaction: ${response.statusText}` };
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error in getErpTransaction:", error);
        return { error: true, message: "An unexpected error occurred while fetching ErpTransaction." };
    }
}

export async function getBankTransaction(args: any) {
    try {
        
        let api_url = "api/method/erpnext.accounts.doctype.bank_reconciliation_tool.bank_reconciliation_tool.get_bank_transactions"

        let params:any =  {
        bank_account: args.bank_account,
        from_statement_date: args.from_statement_date,
        to_statement_date:args.to_statement_date
        }

        const response = await fetch(`${baseUrl}${api_url}`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization: args?.token,
              },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch Bank Transaction: ${response.statusText}` };
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error in getBankTransaction:", error);
        return { error: true, message: "An unexpected error occurred while fetching BankTransaction." };
    }
}



export async function getReconcileBankTransaction(args: any) {
    try {
        let api_url = "api/method/erpnext.accounts.doctype.bank_reconciliation_tool_erpnext.bank_reconciliation_tool_erpnext.reconcile_bnk_transaction"
        
        let params: any = { matching_table: args.matching_table };
       
        const response = await fetch(`${baseUrl}${api_url}`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization: args?.token,
              },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch reconcile bank transaction: ${response.statusText}` };
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error in getReconcileBankTransaction:", error);
        return { error: true, message: "An unexpected error occurred while fetching reconcile bank transaction." };
    }
}

export async function getAllocateEntries(args: any) {
    try {
        let bank_statement = args.bank_statement;
        let erp_transaction = args.erp_transaction;
        let params: any = {
            company: args.company,
            doctype: "Bank Reconciliation Tool",
            bank_statement: bank_statement,
            erp_transaction: erp_transaction,
            __islocal: 1,
            bank_account: args.bank_account,
        };

        let arg: any = {
            bank_statement: bank_statement,
            erp_transaction: erp_transaction,
        };

        const response = await fetch(`${baseUrl}api/method/run_doc_method`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization: args?.token,
              },
            body: JSON.stringify( 
                {
                    docs: params,
                    method: "allocate_entries",
                    args:arg
                
            })
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch allocate entries: ${response.statusText}` };
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error in getAllocateEntries:", error);
        return { error: true, message: "An unexpected error occurred while fetching allocate entries." };
    }
}
