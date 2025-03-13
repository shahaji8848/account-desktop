import { useEffect, useState, useCallback } from 'react';

const useAllocateList = (company: any, bank_statement: any, erp_transaction: any, bank_account: any, token: any) => {
  const [data, setData] = useState<any[]>([]);
  console.log('initial data @@@ in useEffect hook', company, bank_statement, erp_transaction, bank_account);
  const doctype = 'Bank Reconciliation Tool';

  const [apiErrorMessage, setApiErrorMessage] = useState<any>('');
  const [apiError, setApiError] = useState<any>();

  const fetchData = async () => {
    const result = await window.electron.getAllocateEntries({
      company: company,
      doctype: doctype,
      bank_statement: bank_statement,
      erp_transaction: erp_transaction,
      bank_account: bank_account,
      token,
    });
    setData(result);
    if (result?.error === true) {
      setApiErrorMessage(result?.message);
      setApiError(result?.error);
      setData([]);
    } else {
      setData(result || {});
    }
  };

  console.log('initial data @@@ in hook state data', data);

  return { allocationListData: data, fetchData, allocateApiError: apiError, allocateErrorMsg: apiErrorMessage };
};

export default useAllocateList;
