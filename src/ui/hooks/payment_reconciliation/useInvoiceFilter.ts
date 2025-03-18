import { useEffect, useState } from 'react';
import { getPaymentReconciliationEntries } from '../../../apis/payment_reconciliation';

const useInvoiceFilter = (party: string, party_type?: any, company?: any, filters?: any) => {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');
  const isAPP = window.electron ? true : false;

  const fetchData = async () => {
    const result = isAPP
      ? await window.electron.getPaymentReconciliationEntries({ party, party_type, company, filters, token })
      : await getPaymentReconciliationEntries({ party, party_type, company, filters, token });
    setInvoiceData(result);
  };
  useEffect(() => {
    fetchData();
  }, [party, party_type, company, filters]);

  return invoiceData;
};

export default useInvoiceFilter;
