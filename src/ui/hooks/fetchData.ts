import { useEffect, useState } from 'react';

const useFetchData = (doctype: string, filters?:any) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await window.electron.getData({ doctype, filters });
            setData(result);
        };
        fetchData();
    }, [doctype, filters]);

    return data;
};

export default useFetchData;