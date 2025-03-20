import { useEffect, useState, useCallback } from 'react';
import { getAllocationList } from '../../../apis/payment_reconciliation';

const useAllocateList = () => {
  const [allocationListData, setAllocationListData] = useState<any>();
  const token = localStorage.getItem('account_desktop_token');
  const isAPP = window.electron ? true : false;

  // Create a function that can be called on demand
  const fetchAllocationList = useCallback(async (company?: string, party_type?: string, party?: string, invoices?: any, payments?: any) => {
    if (!company || !party_type || !party || !invoices?.length || !payments?.length) return;

    // console.log('Fetching allocation list:', company, party_type, party, invoices, payments);

    try {
      const result = isAPP
        ? await window.electron.getAllocationList({
            company: company,
            party_type: party_type,
            party: party,
            invoices: invoices,
            payments: payments,
            token,
          })
        : await getAllocationList({
            company: company,
            party_type: party_type,
            party: party,
            invoices: invoices,
            payments: payments,
            token,
          });

      setAllocationListData(result?.docs || []);
      // console.log('Allocation List Data: result', result);
      return result?.docs;
    } catch (error) {
      console.error('Error fetching allocation list:', error);
      return [];
    }
  }, []);

  return { allocationListData, fetchAllocationList };
};

export default useAllocateList;
