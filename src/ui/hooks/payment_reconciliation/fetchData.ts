import { useEffect, useState } from 'react';
import { getData } from '../../../apis/util';

const useFetchData = (doctype: string, token: any) => {
  const [data, setData] = useState<any[]>([]);

  const isAPP = window.electron ? true : false;

  const fetchData = async () => {
    try {
      const result = isAPP ? await window.electron.getData({ doctype, token }) : await getData({ doctype, token });
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export default useFetchData;
