import { useEffect, useState } from 'react';

const useGetAccountBalance = (bank_account: any, company: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.electron.getAccountBalance({ bank_account, company, from_date, to_date, token });
      setData(result);
    };
    fetchData();
  }, []);

  return data;
};

export default useGetAccountBalance;
