const baseUrl = 'https://yatish-testing-v15.frappe.cloud/';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};

export async function getPaymentReconciliationEntries(args: any) {
    try {
        let partyAccounts: any = await getPartyAccounts(args.party, args.party_type, args.company);
        if (!partyAccounts || !partyAccounts.message || partyAccounts.message.length <= 1) {
            return { error: true, message: "Payable or Advance Accounts not found for the party" };
        }
        let params:any =  {
        doctype: "Payment Reconciliation",
        company: args.company,
        party: args.party,
        party_type: args.party_type,
        receivable_payable_account: partyAccounts.message[0],
        default_advance_account: partyAccounts.message[1],
        
        }
        
        if (args.filters?.invoice_name){
            params["invoice_name"] = args.filters.invoice_name;
        }
        if (args.filters?.payment_name){
            params["payment_name"] = args.filters.payment_name;
        }

        const response = await fetch(`${baseUrl}api/method/run_doc_method`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify( 
                {
                    docs: params,
                    method: "get_unreconciled_entries"
                
            })
        });

        if (!response.ok) {
            return { error: true, message: `Failed to fetch reconciliation entries: ${response.statusText}` };
        }

        return await response.json();
    } 
    catch (error) {
        console.error("Error in getPaymentReconciliationEntries:", error);
        return { error: true, message: "An unexpected error occurred while fetching reconciliation entries." };
    }
}


export async function getAllocationList(args: any) {
    try {
       let data = await getPaymentReconciliationEntries(args)
       let invoices = data.docs[0].invoices
       let payments = data.docs[0].payments
        if (! data.docs[0].receivable_payable_account || ! data.docs[0].default_advance_account) {
            return { error: true, message: "Payable or Advance Accounts not found for the party" };
        }
        let params:any =  {
        doctype: "Payment Reconciliation",
        company: args.company,
        party: args.party,
        party_type: args.party_type,
        receivable_payable_account: data.docs[0].receivable_payable_account,
        default_advance_account: data.docs[0].default_advance_account,
        payments: payments,
        invoices: invoices
        }

        const response = await fetch(`${baseUrl}api/method/run_doc_method`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify( 
                {
                    docs: params,
                    method: "allocate_entries",
                    args:{
                        payments:args.payments,
                        invoices:args.invoices
                    }

                
            })
        });
        let data1 = await response.json();
        if (!response.ok) {
            return { error: true, message: `Failed to fetch reconciliation entries: ${response.statusText}` };
        }

        return data1
    } 
    catch (error) {
        console.error("Error in getPaymentReconciliationEntries:", error);
        return { error: true, message: "An unexpected error occurred while fetching reconciliation entries." };
    }
}
export async function ReconcileAmount(args: any) {
    try {
        let data = await getAllocationList(args);
        let params:any =  {
            doctype: "Payment Reconciliation",
            company: args.company,
            party: args.party,
            party_type: args.party_type,
            receivable_payable_account: data.docs[0].receivable_payable_account,
            default_advance_account: data.docs[0].default_advance_account,
            payments: data.docs[0].payments,
            invoices: data.docs[0].invoices,
            allocation: data.docs[0].allocation,
            }
            const response = await fetch(`${baseUrl}api/method/run_doc_method`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify( 
                    {
                        docs: params,
                        method: "reconcile",
                    })
            });

            let data1 = await response.json();
            return data1
       
}
catch (error) {
    console.error("Error in getPaymentReconciliationEntries:", error);
    return { error: true, message: "An unexpected error occurred while fetching reconciliation entries." };

}
}


export async function getPartyAccounts(party: any, party_type: any, company: any) {
    try {
        const response = await fetch(`${baseUrl}api/method/erpnext.accounts.party.get_party_account`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                company: company,
                party: party,
                party_type: party_type,
                include_advance: 1
            })
        });
       
        if (!response.ok) {
            return { error: true, message: `Failed to fetch party accounts: ${response.statusText}` };
        }

        const data = await response.json();

        if (!data || !data.message) {
            return { error: true, message: "No data received for party accounts." };
        }

        return data;
    } catch (error) {
        console.error("Error in getPartyAccounts:", error);
        return { error: true, message: "An unexpected error occurred while fetching party accounts." };
    }
}
