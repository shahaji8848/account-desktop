import { useEffect, useState } from 'react';

const useBankTransaction = (bank_account: any, company: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    const result = await window.electron.getBankTransaction({
      bank_account: bank_account,
      company: company,
      from_statement_date: from_date,
      to_statement_date: to_date,
      token,
    });
    setData(result?.message);
  };

  useEffect(() => {
    fetchData();
  }, [company, bank_account, from_date, to_date]);

  return data;
};

export default useBankTransaction;
