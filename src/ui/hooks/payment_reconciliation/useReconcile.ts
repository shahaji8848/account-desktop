import { useCallback, useEffect, useState } from 'react';
import { ReconcileAmount } from '../../../apis/payment_reconciliation';

const useReconcile = () => {
  const [reconcileData, setReconcileData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');
  const isAPP = window.electron ? true : false;

  // Create a function that can be called on demand
  const fetchReconcile = useCallback(async (company?: string, party_type?: string, party?: string, invoices?: any, payments?: any) => {
    if (!company || !party_type || !party || !invoices?.length || !payments?.length) return;

    // console.log('Fetching allocation list:', company, party_type, party, invoices, payments);

    try {
      const result = isAPP
        ? await window.electron.ReconcileAmount({
            company: company,
            party_type: party_type,
            party: party,
            invoices: invoices,
            payments: payments,
            token,
          })
        : await ReconcileAmount({
            company: company,
            party_type: party_type,
            party: party,
            invoices: invoices,
            payments: payments,
            token,
          });

      setReconcileData(result?.docs || []);
      // console.log('Allocation List Data: result', result);
      return result;
    } catch (error) {
      console.error('Error fetching allocation list:', error);
      return [];
    }
  }, []);

  return { reconcileData, fetchReconcile };
};

export default useReconcile;
