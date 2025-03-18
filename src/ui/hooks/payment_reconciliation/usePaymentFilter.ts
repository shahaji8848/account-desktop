import { useEffect, useState } from 'react';
import { getPaymentReconciliationEntries } from '../../../apis/payment_reconciliation';

const usePaymentFilter = (party: string, party_type?: any, company?: any, filters?: any) => {
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');
  const isAPP = window.electron ? true : false;

  const fetchData = async () => {
    const result = isAPP
      ? await window.electron.getPaymentReconciliationEntries({ party, party_type, company, filters, token })
      : await getPaymentReconciliationEntries({ party, party_type, company, filters, token });
    setPaymentData(result);
  };
  useEffect(() => {
    fetchData();
  }, [party, party_type, company, filters]);

  return paymentData;
};

export default usePaymentFilter;
