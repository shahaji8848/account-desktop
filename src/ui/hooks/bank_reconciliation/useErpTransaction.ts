import { useEffect, useState } from 'react';

const useErpTransaction = (bank_account: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  // console.log('initial data @@@ in useEffect hook', bank_account, from_date, to_date, token);
  const fetchData = async () => {
    const result = await window.electron.getErpTransaction({
      bank_account: bank_account,
      from_statement_date: from_date,
      to_statement_date: to_date,
      token,
    });
    setData(result[0]);
  };

  useEffect(() => {
    fetchData();
  }, [bank_account, from_date, to_date]);

  return data;
};

export default useErpTransaction;
