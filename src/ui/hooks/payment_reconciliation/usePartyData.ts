import { useEffect, useState } from 'react';

const usePartyData = (doctype: string) => {
  const [partyData, setPatyData] = useState<any[]>([]);

  const fetchData = async () => {
    const result = await window.electron.getData({ doctype });
    console.log('data in hook party', result);

    setPatyData(result);
  };
  useEffect(() => {
    fetchData();
  }, [doctype]);

  return { partyData };
};

export default usePartyData;
