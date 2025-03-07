import { useEffect, useState } from 'react';

const usePaymentFilter = (party: string, party_type?: any, company?: any, filters?: any) => {
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.electron.getPaymentReconciliationEntries({ party, party_type, company, filters, token });
      setPaymentData(result);
    };
    fetchData();
  }, [party, party_type, company, filters]);

  return paymentData;
};

export default usePaymentFilter;
