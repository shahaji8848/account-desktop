import { useEffect, useState } from 'react';

const useInvoiceFilter = (party: string, party_type?: any, company?: any, filters?: any) => {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.electron.getPaymentReconciliationEntries({ party, party_type, company, filters, token });
      setInvoiceData(result);
    };
    fetchData();
  }, [party, party_type, company, filters]);

  return invoiceData;
};

export default useInvoiceFilter;
