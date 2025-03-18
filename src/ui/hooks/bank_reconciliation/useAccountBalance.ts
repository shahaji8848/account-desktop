import { useEffect, useState } from 'react';

const useGetAccountBalance = (bank_account: any, company: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const result = await window.electron.getAccountBalance({
        bank_account,
        company,
        from_date,
        to_date,
        token,
      });
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching account balance:', err);
      setError('Failed to fetch account balance. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [company, bank_account, from_date, to_date, shouldRefetch]);

  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { accountBalanceInitialData: data, refreshData, error };
};

export default useGetAccountBalance;
