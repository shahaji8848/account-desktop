import { useCallback, useEffect, useState } from 'react';

const useReconcile = () => {
  const [reconcileData, setReconcileData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');

  // Create a function that can be called on demand
  const fetchReconcile = useCallback(async (company?: string, party_type?: string, party?: string, invoices?: any, payments?: any) => {
    if (!company || !party_type || !party || !invoices?.length || !payments?.length) return;

    console.log('Fetching allocation list:', company, party_type, party, invoices, payments);

    try {
      const result = await window.electron.ReconcileAmount({
        company: company,
        party_type: party_type,
        party: party,
        invoices: invoices,
        payments: payments,
        token,
      });

      setReconcileData(result?.docs || []);
      console.log('Allocation List Data: result', result);
      return result;
    } catch (error) {
      console.error('Error fetching allocation list:', error);
      return [];
    }
  }, []);

  return { reconcileData, fetchReconcile };
};

export default useReconcile;
