import { useEffect, useState } from 'react';

const useErpTransaction = (bank_account: any, from_date: any, to_date: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  // console.log('initial data @@@ in useEffect hook', bank_account, from_date, to_date, token);
  const fetchData = async () => {
    const result = await window.electron.getErpTransaction({
      bank_account: bank_account,
      from_statement_date: from_date,
      to_statement_date: to_date,
      token,
    });
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [bank_account, from_date, to_date]);

  const refreshData = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { reFetchData: refreshData, erpTransaction: data };
};

export default useErpTransaction;
