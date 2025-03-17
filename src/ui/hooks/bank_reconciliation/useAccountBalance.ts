import { useEffect, useState } from 'react';

const useGetAccountBalance = (bank_account: any, company: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchData = async () => {
    const result = await window.electron.getAccountBalance({
      bank_account: bank_account,
      company: company,
      from_date: from_date,
      to_date: to_date,
      token,
    });
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [company, bank_account, from_date, to_date]);

  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { accountBalanceInitialData: data, refreshData };
};

export default useGetAccountBalance;
