import { useEffect, useState, useCallback } from 'react';

const useUnreconcileEntriesData = (company?: string, party_type?: string, party?: string, filters?: any) => {
  const [data, setData] = useState<any>({});
  const [receivablePayableAccount, setReceivablePayableAccount] = useState('');
  const [defaultAdvanceAccount, setDefaultAdvanceAccount] = useState('');
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [paymnentData, setPaymentData] = useState<any>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState<any>('');
  const [paymentFilter, setPaymentFilter] = useState<any>('');

  const fetchData = useCallback(async () => {
    if (!company || !party_type || !party) return; // Ensure all fields are selected
    try {
      if (filters) {
        const result = await window.electron.getPaymentReconciliationEntries({
          company: company,
          party_type: party_type,
          party: party,
          filters: { invoice_name: invoiceFilter, payment_name: paymentFilter },
        });
        console.log('Fetched reconciliation data :', result);
        setData(result);
      } else {
        const result = await window.electron.getPaymentReconciliationEntries({
          company: company,
          party_type: party_type,
          party: party,
        });
        console.log('Fetched reconciliation data :', result);
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [company, party_type, party]);

  // Initial data fetch when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData, shouldRefetch]);

  // Process data when it changes
  useEffect(() => {
    if (data?.docs?.length > 0) {
      setReceivablePayableAccount(data?.docs[0]?.receivable_payable_account || '');
      setDefaultAdvanceAccount(data?.docs[0]?.default_advance_account || '');
      setInvoiceData(data?.docs[0]?.invoices || []);
      setPaymentData(data?.docs[0]?.payments || []);
    }
  }, [data]);

  // Function to manually trigger refetch
  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return {
    data,
    receivablePayableAccount,
    defaultAdvanceAccount,
    invoiceData,
    paymnentData,
    setInvoiceData,
    setPaymentData,
    refreshData,
    setInvoiceFilter,
    setPaymentFilter,
  };
};

export default useUnreconcileEntriesData;
