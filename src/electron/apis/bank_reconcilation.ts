const baseUrl = 'https://yatish-testing-v15.frappe.cloud/';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};

export async function getAccountBalance(args: any) {
    try {
        const till_date = new Date(args.till_date);
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

        return await response.json();
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
        
        let api_url = "api/method/erpnext.accounts.doctype.bank_reconciliation_tool_erpnext.bank_reconciliation_tool_erpnext.get_bank_transaction"

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
