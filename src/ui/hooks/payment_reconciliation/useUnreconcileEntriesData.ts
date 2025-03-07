import { useEffect, useState, useCallback } from 'react';

const useUnreconcileEntriesData = (company?: string, party_type?: string, party?: string, filters?: any) => {
  const [data, setData] = useState<any>({});
  const [receivablePayableAccount, setReceivablePayableAccount] = useState('');
  const [defaultAdvanceAccount, setDefaultAdvanceAccount] = useState('');
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [paymnentData, setPaymentData] = useState<any>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<any>('');
  const [apiError, setApiError] = useState<any>();

  const fetchData = async () => {
    if (!company || !party_type || !party) return; // Ensure all fields are selected
    try {
      const result = await window.electron.getPaymentReconciliationEntries({
        company: company,
        party_type: party_type,
        party: party,
      });

      if (result?.error === true) {
        setApiErrorMessage(result?.message);
        setApiError(result?.error);
        setData({});
        console.log('Fetched reconciliation data : in hook in if', result, result.error, result?.message, apiErrorMessage);
      } else {
        setData(result);
        console.log('Fetched reconciliation data : in hook in else', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({}); // Reset data on unexpected errors
      setApiErrorMessage('Failed to fetch data.');
      setApiError(true);
    }
  };

  console.log('Fetched reconciliation data : in hook out', data, apiError, apiErrorMessage);

  // Initial data fetch when dependencies change
  useEffect(() => {
    fetchData();
  }, [company, party_type, party, shouldRefetch]);

  // Process data when it changes
  useEffect(() => {
    if (data?.docs?.length > 0) {
      setReceivablePayableAccount(data?.docs[0]?.receivable_payable_account || '');
      setDefaultAdvanceAccount(data?.docs[0]?.default_advance_account || '');
      setInvoiceData(data?.docs[0]?.invoices || []);
      setPaymentData(data?.docs[0]?.payments || []);
    } else {
      // Reset state when data is empty
      setReceivablePayableAccount('');
      setDefaultAdvanceAccount('');
      setInvoiceData([]);
      setPaymentData([]);
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
    apiErrorMessage,
    apiError,
  };
};

export default useUnreconcileEntriesData;
