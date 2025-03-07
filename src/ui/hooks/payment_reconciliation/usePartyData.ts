import { useEffect, useState } from 'react';

const usePartyData = (doctype: string) => {
  const [partyData, setPatyData] = useState<any[]>([]);
  const token = localStorage.getItem('account_desktop_token');

  const fetchData = async () => {
    const result = await window.electron.getData({ doctype, token });
    console.log('data in hook party', result);

    setPatyData(result);
  };
  useEffect(() => {
    fetchData();
  }, [doctype]);

  return { partyData };
};

export default usePartyData;
