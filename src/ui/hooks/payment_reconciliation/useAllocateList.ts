import { useEffect, useState, useCallback } from 'react';

const useAllocateList = () => {
  const [allocationListData, setAllocationListData] = useState<any>();

  // Create a function that can be called on demand
  const fetchAllocationList = useCallback(async (company?: string, party_type?: string, party?: string, invoices?: any, payments?: any) => {
    if (!company || !party_type || !party || !invoices?.length || !payments?.length) return;

    console.log('Fetching allocation list:', company, party_type, party, invoices, payments);

    try {
      const result = await window.electron.getAllocationList({
        company: company,
        party_type: party_type,
        party: party,
        invoices: invoices,
        payments: payments,
      });

      setAllocationListData(result?.docs || []);
      console.log('Allocation List Data: result', result);
      return result?.docs;
    } catch (error) {
      console.error('Error fetching allocation list:', error);
      return [];
    }
  }, []);

  return { allocationListData, fetchAllocationList };
};

export default useAllocateList;
