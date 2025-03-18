import { useEffect, useState } from 'react';
import { getData } from '../../apis/util';

const useFetchData = (doctype: string, filters: any, token: any) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = window.electron
        ? await window.electron.getData({ doctype, filters, token })
        : await getData({ doctype, filters, token });
      setData(result);
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchData;
