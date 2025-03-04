import { useEffect, useState } from 'react';

const useInvoiceFilter = (party: string, party_type?: any, company?: any, filters?: any) => {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.electron.getPaymentReconciliationEntries({ party, party_type, company, filters });
      setInvoiceData(result);
    };
    fetchData();
  }, [party, party_type, company, filters]);

  return invoiceData;
};

export default useInvoiceFilter;
