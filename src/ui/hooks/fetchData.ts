import { useEffect, useState } from 'react';

const useFetchData = (doctype: string, filters: any, token: any) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await window.electron.getData({ doctype, filters, token });
            setData(result);
        };
        fetchData();
    }, []);

    return data;
};

export default useFetchData;