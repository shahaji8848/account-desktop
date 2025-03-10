import { useEffect, useState } from 'react';

const usePartyTypeData = (doctype: string) => {
  const [partyTypeData, setPatyTypeData] = useState<any>([]);
  const token = localStorage.getItem('account_desktop_token');

  const fetchData = async () => {
    const result = await window.electron.getData({ doctype, token });
    console.log('data in hook partyType', result);
    setPatyTypeData(result);
  };

  useEffect(() => {
    fetchData();
  }, [doctype]);

  return { partyTypeData };
};

export default usePartyTypeData;
