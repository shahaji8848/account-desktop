import { useEffect, useState } from 'react';
import { getBankTransaction } from '../../../apis/bank_reconcilation';

const useBankTransaction = (bank_account: any, company: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const result = window.electron
        ? await window.electron.getBankTransaction({
            bank_account: bank_account,
            company: company,
            from_statement_date: from_date,
            to_statement_date: to_date,
            token,
          })
        : await getBankTransaction({
            bank_account: bank_account,
            company: company,
            from_statement_date: from_date,
            to_statement_date: to_date,
            token,
          });
      setData(result?.message || []);
      setError(null); // Clear any previous errors on successful fetch
    } catch (err) {
      console.error('Error fetching bank transactions:', err);
      setError('Failed to fetch bank transactions. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [company, bank_account, from_date, to_date, shouldRefetch]);

  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { refectBankTransaction: refreshData, bankTransaction: data, error };
};

export default useBankTransaction;
