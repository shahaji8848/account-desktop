import { useEffect, useState } from 'react';
import { getErpTransaction } from '../../../apis/bank_reconcilation';

const useErpTransaction = (bank_account: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const result = window.electron
        ? await window.electron.getErpTransaction({
            bank_account: bank_account,
            from_statement_date: from_date,
            to_statement_date: to_date,
            token,
          })
        : await getErpTransaction({
            bank_account: bank_account,
            from_statement_date: from_date,
            to_statement_date: to_date,
            token,
          });
      setData(result || []);
      setError(null); // Clear previous errors on successful fetch
    } catch (err) {
      console.error('Error fetching ERP transactions:', err);
      setError('Failed to fetch ERP transactions. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [bank_account, from_date, to_date, shouldRefetch]);

  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { reFetchData: refreshData, erpTransaction: data, error };
};

export default useErpTransaction;
