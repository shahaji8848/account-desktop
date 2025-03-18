import { useState, useCallback } from 'react';
import { getReconcileBankTransaction } from '../../../apis/bank_reconcilation';

const useReconcile = () => {
  const [reconcileData, setReconcileData] = useState<any>({});
  const [apiErrorMessage, setApiErrorMessage] = useState<any>('');
  const [apiError, setApiError] = useState<any>();

  const fetchReconcile = useCallback(async (matching_table: any, token: any) => {
    console.log('initial data @@@ reconcile data', matching_table, token);
    try {
      const result = window.electron
        ? await window.electron.getReconcileBankTransaction({
            matching_table: matching_table,
            token,
          })
        : await getReconcileBankTransaction({
            matching_table: matching_table,
            token,
          });
      if (result?.error === true) {
        setApiErrorMessage(result?.message);
        setApiError(result?.error);
        setReconcileData([]);
        console.log('Fetched reconciliation data : in hook in if', result, result.error, result?.message, apiErrorMessage);
      } else {
        setReconcileData(result || {});
        console.log('Fetched reconciliation data : in hook in else', result);
      }
      console.log('Allocation List Data: result', result);
      return result;
    } catch (error) {
      console.error('Error fetching allocation list:', error);
      setApiErrorMessage('An error occurred while fetching data.');
      setApiError(true);
      setReconcileData([]);
      return [];
    }
  }, []);

  return { reconcileData, fetchReconcile, apiError, apiErrorMessage };
};

export default useReconcile;
