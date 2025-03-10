import { useEffect, useRef, useState } from 'react';
import { CompanyData, companyDefaultData, defaultDateData, defaultDateRef } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/root-reducer';
import { companyDataSliceFunc } from '../store/reducers/CompanyDataSlice';
import { companyPopupSliceData } from '../store/reducers/CompanyPopupSlice';
import { getData } from '../../apis/util';

export default function useGlobalKeyFunctionalities() {
  const [companyData, setCompanyData] = useState<CompanyData>(companyDefaultData);
  const companyPopup = useSelector((state: RootState) => state.companyPopupReducer.companyPopupToggle);

  const isAPP = window.electron ? true : false;

  const dispatch = useDispatch();

  const [date, setDate] = useState<{
    posting_date: string;
    due_date: string;
  }>(defaultDateData);

  const [isSelecting, setIsSelecting] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  // const [companyPopup, setCompanyPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [fieldName, setFieldName] = useState<any>('');
  const [filterData, setFilterData] = useState<any>({
    company_name: [],
    company_address: [],
    company_contact_person: [],
  });
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  const dateRef = useRef<any>(defaultDateRef);
  const companyDataRef = useRef<any>({
    company_name: null,
    company_address: null,
    company_gstin: null,
    company_contact_person: null,
  });
  
  const token = localStorage.getItem('account_desktop_token') || '';

  const openCompanyDropdown = () => {
    setIsSelecting(false);
    setShowFilter(true);
    dispatch(companyPopupSliceData({ companyPopupToggle: true }));
    setFieldName('company_name');
    setTimeout(() => {
      if (companyDataRef.current.company_name) {
        companyDataRef.current.company_name.focus();
      }
    }, 2);
  };

  const defaultStateOnRender = () => {
    const date = new Date();
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    setDate({
      posting_date: date.toISOString().split('T')[0],
      due_date: tomorrow.toISOString().split('T')[0],
    });
    // openCompanyDropdown();
  };

  useEffect(() => {
    defaultStateOnRender();
  }, []);

  const handleGlobalKeyFunctions = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if (event.ctrlKey && event.key === "a") {
    //   event.preventDefault(); // Prevent the default "Select All" behavior
    //   checkHandleSubmit();
    // }
    if (event.key === 'F2') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      dateRef.current?.posting_date?.focus();
    }
    if (event.key === 'F3') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      openCompanyDropdown();
    }
    if (event.key === 'Escape') {
      setShowFilter(false);
      dispatch(companyPopupSliceData({ companyPopupToggle: false }));
      dateRef.current?.posting_date?.focus();
    }
  };

  const handleFocus = (e: any) => {
    setIsSelecting(false);
    setShowFilter(true);
    setFieldName(e.target.name);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (['company_name', 'company_address', 'company_contact_person'].includes(name)) {
      // if (name.includes('company')) {
        setCompanyData({ ...companyData, [name]: value });
      // } else {
      //   setDate({ ...date, [name]: value });
      // }
    } else {
      setCompanyData({ ...companyData, [name]: value });

      setIsSelecting(false);
      setShowFilter(true);
    }
  };

  const handleKeyEnter = (name: string) => {
    if (selectedIndex >= 0) {
      setIsSelecting(true);

      if (name === 'company_name') {
        setTimeout(() => {
          if (companyDataRef.current.company_contact_person) {
            companyDataRef.current.company_contact_person.focus();
          }
        }, 0);
        setIsSelecting(false);
        setShowFilter(true);
        setFieldName('company_contact_person');
        setCompanyData({
          ...companyData,
          [name]: filteredItems[selectedIndex],
        });
      } else if (name === 'company_contact_person') {
        setTimeout(() => {
          if (companyDataRef.current.company_address) {
            companyDataRef.current.company_address.focus();
          }
        }, 0);
        setIsSelecting(false);
        setShowFilter(true);
        setFieldName('company_address');
        setCompanyData({
          ...companyData,
          [name]: filteredItems[selectedIndex],
        });
      } else {
        setTimeout(() => {
          if (companyDataRef.current.company_gstin) {
            companyDataRef.current.company_gstin.focus();
          }
        }, 0);
        setIsSelecting(false);
        setCompanyData({
          ...companyData,
          [name]: filteredItems[selectedIndex],
          company_gstin: filterData[name][selectedIndex].gstin,
          address_line1: filterData[name][selectedIndex].address_line1,
          address_line2: filterData[name][selectedIndex].address_line2,
          city: filterData[name][selectedIndex].city,
          state: filterData[name][selectedIndex].state,
          country: filterData[name][selectedIndex].country,
          pincode: filterData[name][selectedIndex].pincode,
          gst_category: filterData[name][selectedIndex].gst_category,
        });
        setShowFilter(false);
      }
    }
  };

  const handleValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextField: any) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === 'company_gstin') {
      if (e.key === 'Enter' && value !== '') {
        setTimeout(() => {
          if (nextField) {
            nextField.focus();
          }
        }, 0);
        setShowFilter(false);
        dispatch(companyPopupSliceData({ companyPopupToggle: false }));
        dispatch(companyDataSliceFunc(companyData));
      }
    } else {
      if (!showFilter) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        handleKeyEnter(name);
      }
      //   else if (e.key === "Escape") {
      //     setShowFilter(false);
      //     setCompanyPopup(false);
      //   }
    }
  };

  const handleItemFocus = (index: number) => {
    setSelectedIndex(index);
  };

  const getResponseData = async (type: any, filter: any) => {
    let response = isAPP
      ? await window.electron.getData({
          doctype: type,
          filters: { ...filter, company: companyData.company_name || '' },
          token: token
        })
      : await getData({
          doctype: type,
          filters: { ...filter, company: companyData.company_name || '' },
          token: token
        });

    return response;
  };

  async function getFilterData(filterDetails: any, name: any) {
    const result = await getResponseData(filterDetails.type, filterDetails.filter);
    setFilterData({ ...filterData, [name]: result });
  }

  const getAddressFilter = (type: any, name: any) => ({
    type: 'Address',
    filter: { type, name },
  });

  useEffect(() => {
    if (fieldName === 'company_address') {
      getFilterData(getAddressFilter('Company', companyData.company_name), 'company_address');
    }
  }, [fieldName]);

  useEffect(() => {
    getFilterData(
      {
        type: 'Company',
        filter: {},
      },
      'company_name'
    );
    setFieldName('company_name');
  }, []);

  useEffect(() => {
    handleFilter();
  }, [fieldName, companyData, filterData, companyPopup]);

  const handleFilter = () => {
    if (!isSelecting) {
      // console.log(fieldName, filterData, 'filter data')
      let filtered: string[] = [];

      if (fieldName === 'company_name') {
        const data = filterData['company_name']?.filter((item: any) =>
          item.name?.toLowerCase().includes((companyData.company_name as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'company_contact_person') {
        const data = filterData['company_contact_person']?.filter((item: any) =>
          item.name?.toLowerCase().includes((companyData.company_contact_person as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'company_address') {
        const data = filterData['company_address']?.filter((item: any) =>
          item?.name?.toLowerCase().includes((companyData.company_address as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }

      setFilteredItems(filtered);

      setSelectedIndex(0);
    }
  };

  return {
    companyPopup,
    companyData,
    handleValueChange,
    companyDataRef,
    handleValueKeyDown,
    handleFocus,
    date,
    setDate,
    handleGlobalKeyFunctions,
    dateRef,
    showFilter,
    handleItemFocus,
    selectedIndex,
    filteredItems,
    openCompanyDropdown,
    isQuitModalOpen,
    setIsQuitModalOpen,
  };
}
