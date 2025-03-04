import { useEffect, useState } from 'react';

const usePartyTypeData = (doctype: string) => {
  const [partyTypeData, setPatyTypeData] = useState<any>([]);

  const fetchData = async () => {
    const result = await window.electron.getData({ doctype });
    console.log('data in hook partyType', result);
    setPatyTypeData(result);
  };

  useEffect(() => {
    fetchData();
  }, [doctype]);

  return { partyTypeData };
};

export default usePartyTypeData;
