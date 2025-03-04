import { useEffect, useState } from 'react';

const useCompanyData = (doctype: string) => {
  const [companyData, setCompanyData] = useState<any[]>([]);

  const fetchData = async () => {
    const result = await window.electron.getData({ doctype });
    console.log('data in hook company', result);

    setCompanyData(result);
  };
  useEffect(() => {
    fetchData();
  }, [doctype]);

  return { companyData };
};

export default useCompanyData;
