import { useEffect, useRef, useState } from 'react';

import {
  advancesDefaultInfo,
  advancesDefaultRef,
  chargeTypeData,
  dataRef,
  defaultTableData,
  defaultTableDataRef,
  filterDefaultData,
  SalesData,
  salesDefaultdata,
  TaxData,
  taxDefaultInfoRef,
} from '../../utils/data';

import useHandleKeyFunctionalities from './useHandleKeyFunctionalities';
import useFilterHook from './useFilterHook';
import { handleAllSalesFunctions } from './handleAllSalesFunctions';
import handleTaxFunctionalities from './useTaxHook';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/root-reducer';
import { useSelector } from 'react-redux';
import { getData } from '../../../apis/util';

function useSalesHook(globalData: any) {
  const { companyPopup, companyDataRef, openCompanyDropdown, date, setDate, dateRef } = globalData;

  const [salesData, setSalesData] = useState<SalesData>(salesDefaultdata);
  const [taxData, setTaxData] = useState<TaxData[]>([]);
  const [shippingDetails, setShippingDetails] = useState<any>([]);
  const [shippingTaxData, setShippingTaxData] = useState<any>([]);
  const [paymentData, setPaymentData] = useState<any>([]);
  const [advancePaymentData, setAdvancePaymentData] = useState<any>();
  const [gstData, setGstData] = useState<any>([]);
  const [termsData, setTermsData] = useState<any>([]);
  const [itemsData, setItemsData] = useState<any>({ ...defaultTableData });
  const [productData, setProductData] = useState<any>([]);
  const [taxInfo, setTaxInfo] = useState<any>([]);
  const [serialNoData, setSerialNoData] = useState<any>([]);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [filterData, setFilterData] = useState<any>(filterDefaultData);
  const [isSelecting, setIsSelecting] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [type, setType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [salesInvoiceName, setSalesInvoiceName] = useState('');
  const [filterListName, setFilterListName] = useState('');
  const [previousSalesData, setPreviousSalesData] = useState({});
  const [taxIndex, setTaxIndex] = useState(-1);
  const [advancePaymentIndex, setAdvancePaymentIndex] = useState(-1);

  const [taxInfoPopup, setTaxInfoPopup] = useState(false);
  const [partyNamePopup, setPartyNamePopup] = useState(false);
  const [tableItemsPopup, setTableItemsPopup] = useState(false);
  const [termsPopup, setTermsPopup] = useState(false);
  const [paymentTermsOpen, setPaymentTermsOpen] = useState(false);
  const [gstTableOpen, setGstTableOpen] = useState(false);
  const [advancePaymentPopup, setAdvancePaymentPopup] = useState(false);

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const salesDataRef = useRef<any>(dataRef);
  const tableBodyRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const tablePopupRef = useRef<any>({ ...defaultTableDataRef });
  const dropdownRef = useRef<HTMLElement | null>(null);
  const textAreaRef = useRef<HTMLElement | null>(null);
  const taxInfoRef = useRef<any[]>([]);
  const taxInfoPopupRef = useRef<any>(taxDefaultInfoRef);
  const advancePaymentRef = useRef<any[]>([]);

  const companyData = useSelector((state: RootState) => state.companyDataReducer);

  const token = localStorage.getItem('account_desktop_token') || '';

  const isAPP = window.electron ? true : false;

  // useEffect(async () => {
  //   let x = await window.electron.getData({
  //     doctype: 'Item',
  //     filters: { 'name':'Consultant Fees','company':'8848 Digital LLP' },
  //   });
  //   console.log(x, 'items');
  // }, []);

  // console.log(window.electron ? 'desktop' : 'web');

  const fetchTaxes = async (value: string) => {
    try {
      const taxes = await window.electron.getData({
        doctype: 'Sales Taxes and Charges Template',
        filters: { company: '8848 Digital LLP', name: value },
        token: token,
      });
      const shippingTaxes = await window.electron.getData({
        doctype: 'Shipping Rule',
        filters: { company: '8848 Digital LLP', name: salesData.shipping_detail || '' },
        token: token,
      });
      // console.log(shippingTaxes, taxes, 'shipping taxes');
      shippingTaxes?.conditions && setShippingDetails([...shippingTaxes.conditions]);
      setTaxData([...taxes]);
    } catch (error) {
      console.error('Error fetching taxes:', error);
    }
  };

  // useEffect(async () => {
  //   let x = await window.electron.getAdvancePaymentEntries({
  //     doctype: 'Sales Invoice',
  //     company: '8848 Digital LLP',
  //     only_include_allocated_payments: false,
  //     customer: 'Namiex Chemicals Pvt. Ltd.',
  //     rounded_total: 1600,
  //     grand_total: 1600,
  //     __islocal: 1,
  //   });
  //   // let x = await window.electron.getData({doctype:'Incoterm',filters:{}});
  //   console.log(x, 'payment terms');
  //   // let x = await window.electron.getData({ doctype: 'Promotional Scheme', filters: { item_code: 'Product' } });
  //   // console.log(x, 'promotional scheme');
  //   // let x1 = await window.electron.getData({ doctype: 'Promotional Scheme', filters: { name: 'Product Scheme' } });
  //   // console.log(x1);
  // }, []);

  const getResponseData = async (type: any, filter: any) => {
    try {
      let response = isAPP
        ? await window.electron.getData({
            doctype: type,
            filters: { ...filter, company: companyData.company_name || '' },
            token: token,
          })
        : await getData({
            doctype: type,
            filters: { ...filter, company: companyData.company_name || '' },
            token: token,
          });

      // console.log(type, filter, response, 'response');

      const dropdown_names = [
        'Company',
        'Batch',
        'Customer',
        'Currency',
        'Cost Center',
        'UOM',
        'GST HSN Code',
        'Account',
        'Warehouse',
        'Shipping Rule',
        'Incoterm',
      ];

      if (dropdown_names.includes(type)) {
        let data: any = [];

        response.map((item: any) => {
          data = [...data, item.name];
        });
        return type === 'Shipping Rule' ? ['', ...data] : data;
      } else {
        return response;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    }
  };

  async function getFilterData(filterDetails: any, name: any) {
    if (name === 'batch_no') {
      const response = await window.electron.getData({
        doctype: filterDetails.type,
        filters: { ...filterDetails.filter },
        token: token,
      });
      if (response) {
        let data: any = [];

        response.map((item: any) => {
          data = [...data, item.name];
        });
        setFilterData({ ...filterData, [name]: data });
      }
    } else {
      const result = await getResponseData(filterDetails.type, filterDetails.filter || {});
      setFilterData({ ...filterData, [name]: result });
    }
  }

  useEffect(() => {
    setFieldName('company_name');
    const filterDetails = { type: 'Company', filter: {} };
    getFilterData(filterDetails, 'company_name');
  }, []);

  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname, companyData, 'company ');
    if (location.pathname === '/sales' && companyData.company_name === '') {
      openCompanyDropdown();
    } else {
      // salesDataRef.current?.sales_no?.focus();
      salesDataRef.current?.naming_series?.focus();
    }
  }, [location]);

  const handleShowFilter = (name: string) => {
    setIsSelecting(false);
    setShowFilter(true);
    setType('dropdown');
    setFieldName(name);
  };

  const getItemsData = async (value: any) => {
    // console.log(value);
    let response = await window.electron.getData({
      doctype: 'Item',
      filters: { name: value, company: companyData.company_name || '' },
      token: token,
    });
    let rate = await window.electron.getData({
      doctype: 'Item Price',
      filters: { item_code: value },
      token: token,
    });
    // console.log(response, rate);
    // let promotionalDiscount = await window.electron.getData({
    //   doctype: 'Promotional Scheme',
    //   filters: { item_code: value },
    // });
    if (response && rate) {
      let serialData = await window.electron.getData({
        doctype: 'Serial No',
        filters: {
          item_code: value,
          warehouse: salesData?.source_warehouse ? salesData.source_warehouse : response?.item_defaults[0]?.expense_account || '',
        },
        token: token,
      });
      let batchNoData = await window.electron.getData({
        doctype: 'Batch',
        filters: { item_name: value },
        token: token,
      });

      let gstRate = await window.electron.getData({
        doctype: 'Item Tax Template',
        filters: { company: companyData.company_name || '' },
        token: token,
      });

      if (serialData?.length > 0) {
        setSerialNoData(serialData);
      }

      let finalGstRate = gstRate?.filter((item: any) => item.name === response?.taxes[0]?.item_tax_template);

      // console.log(response, rate, gstRate, serialData, batchNoData, 'response and rate');
      setItemsData({
        ...itemsData,
        item_name: value,
        item_code: value,
        hsn: response?.gst_hsn_code || '0101',
        uom: response?.stock_uom || response.uoms[0]?.name || 'Nos',
        description: response.description || '',
        rate: rate[0]?.price_list_rate || salesData.table[activeIndex]?.rate || '',
        qty: '',
        amt: '',
        income_account: response?.item_defaults[0]?.income_account || '',
        warehouse: salesData?.source_warehouse ? salesData.source_warehouse : response?.item_defaults[0]?.expense_account || '',
        item_tax_template: response?.taxes[0]?.item_tax_template || '',
        expense_account: response?.item_defaults[0]?.expense_account || '',
        cost_center: response?.item_defaults[0]?.buying_cost_center || '',
        gst_rate: finalGstRate?.length > 0 ? finalGstRate[0].gst_rate : '',
        original_rate: rate[0]?.price_list_rate || salesData.table[activeIndex]?.rate || '',
        use_serial_batch_fields: serialData?.length > 0,
        // serial_no: `${(serialData?.length > 0 && serialData[0]?.name) || ''}`,
        batch_no: (batchNoData?.length > 0 && batchNoData[0]?.name) || '',
      });

      let tableData = [...salesData.table];

      tableData[activeIndex] = {
        ...itemsData,
        item_name: value,
        item_code: value,
        hsn: response?.gst_hsn_code || '0101',
        uom: response?.stock_uom || response.uoms[0]?.name || 'Nos',
        description: response.description || '',
        rate: rate[0]?.price_list_rate || salesData.table[activeIndex]?.rate || '',
        qty: '',
        amt: '',
        income_account: response?.item_defaults[0]?.income_account || '',
        warehouse: salesData?.source_warehouse ? salesData.source_warehouse : response?.item_defaults[0]?.expense_account || '',
        item_tax_template: response?.taxes[0]?.item_tax_template || '',
        expense_account: response?.item_defaults[0]?.expense_account || '',
        cost_center: response?.item_defaults[0]?.buying_cost_center || '',
        gst_rate: finalGstRate?.length > 0 ? finalGstRate[0].gst_rate : '',
        original_rate: rate[0]?.price_list_rate || salesData.table[activeIndex]?.rate || '',
        use_serial_batch_fields: serialData?.length > 0,
        // serial_no: `${(serialData?.length > 0 && serialData[0]?.name) || ''}`,
        batch_no: (batchNoData?.length > 0 && batchNoData[0]?.name) || '',
      };

      setSalesData({ ...salesData, table: tableData });

      // console.log({ ...salesData, table: tableData }, 'sales data')
    }

    getFilterData(
      {
        type: 'GST HSN Code',
        filter: { input: response?.gst_hsn_code || '' },
      },
      'hsn'
    );

    getFilterData(
      {
        type: 'UOM',
        filter: { input: response?.stock_uom || response.uoms[0]?.name || '' },
      },
      'uom'
    );
  };

  const getTotal = () => {
    const taxTableTotal = taxInfo.length > 0 ? taxInfo.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;

    const salesTotalAmount = salesData.table.length > 0 ? salesData.table.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;

    const taxDataTotal = taxData.length > 0 ? taxData.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;

    const shippingTaxDataTotal = shippingTaxData.length > 0 ? shippingTaxData.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;

    const totalAmount = Number(salesTotalAmount) + Number(taxTableTotal) + Number(taxDataTotal) + Number(shippingTaxDataTotal);

    return totalAmount.toFixed(2);
  };

  const getAdvancePaymentData = async () => {
    let response = await window.electron.getAdvancePaymentEntries({
      doctype: 'Sales Invoice',
      company: companyData.company_name || '',
      only_include_allocated_payments: salesData.only_include_allocated_payments,
      customer: salesData.party_details.party_name || '',
      rounded_total: Number(Number(getTotal()).toFixed(2)),
      grand_total: Number(Number(getTotal()).toFixed(2)),
      __islocal: 1,
      token: token,
    });

    // console.log(response);

    if (response.docs?.length > 0) {
      const advancePaymentInfo =
        (response.docs[0]?.advances?.length > 0 &&
          response.docs[0].advances.map((item: any) => ({
            ...item,
            difference_posting_date: date.posting_date,
          }))) ||
        [];
      // console.log(response.docs[0]?.advances, advancePaymentInfo, 'response advance payments');
      setTimeout(() => setAdvancePaymentData(advancePaymentInfo), 0);
    }
  };

  const { handleTaxValueChange, handleTaxKeyDown, handleDropdownSelection } = handleTaxFunctionalities(
    setShowFilter,
    setType,
    setFieldName,
    setPartyNamePopup,
    setTableItemsPopup,
    filteredItems,
    setSelectedIndex,
    setIsSelecting,
    showFilter,
    // handleShowFilter,
    salesData,
    type,
    selectedIndex,
    textAreaRef,
    taxIndex,
    setTaxIndex,
    taxInfo,
    setTaxInfo,
    taxInfoPopup,
    setTaxInfoPopup,
    taxInfoRef,
    taxInfoPopupRef,
    taxData,
    getFilterData,
    setPaymentData,
    setTermsData,
    getResponseData,
    salesDataRef,
    fieldName,
    date,
    setDate
  );

  const {
    handleIfNotDropdown,
    // handleWhenNoDataInTable,
    handleKeyEnter,
    handleSubmitFindDifferences,
    handleTableKeyEnter,
    handleTableIfNotDropdown,
    handlePartyNameAndCostCenter,
    handleDropdown,
  } = useHandleKeyFunctionalities({
    salesData,
    salesDataRef,
    setSalesData,
    filteredItems,
    selectedIndex,
    fetchTaxes,
    setActiveIndex,
    activeIndex,
    setType,
    textAreaRef,
    setIsSelecting,
    setShowFilter,
    showFilter,
    tableBodyRef,
    setFilteredItems,
    setSelectedIndex,
    setFieldName,
    type,
    setPartyNamePopup,
    companyData,
    companyDataRef,
    date,
    isSelecting,
    fieldName,
    filterData,
    tableItemsPopup,
    tablePopupRef,
    itemsData,
    setItemsData,
    getFilterData,
    setTableItemsPopup,
    setFilterData,
    taxInfo,
    taxIndex,
    setTaxInfo,
    taxInfoRef,
    setTaxIndex,
    taxInfoPopup,
    setTaxInfoPopup,
    setTaxData,
    taxData,
    dateRef,
    handleShowFilter,
    getItemsData,
    shippingDetails,
    shippingTaxData,
    setShippingTaxData,
    setPaymentData,
    setTermsData,
    gstData,
    setGstData,
    getTotal,
    serialNoData,
    productData,
    setProductData,
    getResponseData,
    setFilterListName,
    token,
    getAdvancePaymentData,
    advancePaymentRef,
    advancePaymentData
  });

  const { handleFilter } = useFilterHook({
    filterData,
    salesData,
    companyData,
    itemsData,
    taxInfo,
    taxIndex,
    isSelecting,
    tableItemsPopup,
    taxInfoPopup,
    activeIndex,
    chargeTypeData,
    setFilteredItems,
    setSelectedIndex,
    fieldName,
  });

  // useEffect to focus on the first input field
  useEffect(() => {
    if (showFilter && dropdownRef.current) {
      setTimeout(() => {
        (dropdownRef.current?.firstChild as HTMLElement)?.focus();
      }, 0);
    }
  }, [showFilter]);

  // UseEffect to filter items based on user input
  useEffect(() => {
    handleFilter();
  }, [salesData, fieldName, filterData, isSelecting, itemsData, companyData, taxInfo]);

  const {
    handleValueChange,
    handleAllKeyFunctions,
    handleValueKeyDown,
    handleItemClick,
    handleItemFocus,
    handleFilterClose,
    checkHandleSubmit,
    handleTermsPopup,
    handlePartyNamePopup,
    handleGstPopup,
    handleAdvancePaymentsPopup,
    handleAdvancePaymentDelete,
  } = handleAllSalesFunctions(
    setPreviousSalesData,
    setSubmitted,
    setSalesInvoiceName,
    setDate,
    setSalesData,
    setActiveIndex,
    salesDataRef,
    salesData,
    activeIndex,
    setFieldName,
    setType,
    tableItemsPopup,
    date,
    setItemsData,
    itemsData,
    getFilterData,
    setIsSelecting,
    type,
    setShowFilter,
    handleIfNotDropdown,
    handleTableIfNotDropdown,
    handleTableKeyEnter,
    tableBodyRef,
    handleShowFilter,
    setTableItemsPopup,
    tablePopupRef,
    showFilter,
    setSelectedIndex,
    handleKeyEnter,
    filteredItems,
    taxInfoPopup,
    setTaxInfoPopup,
    setPartyNamePopup,
    setIsModalOpen,
    setShowCustomerForm,
    companyData,
    taxData,
    previousSalesData,
    salesInvoiceName,
    handleSubmitFindDifferences,
    dateRef,
    openCompanyDropdown,
    fetchTaxes,
    taxInfo,
    globalData,
    setTaxInfo,
    setTaxData,
    partyNamePopup,
    shippingTaxData,
    setTermsPopup,
    termsPopup,
    paymentData,
    setPaymentTermsOpen,
    paymentTermsOpen,
    gstTableOpen,
    setGstTableOpen,
    gstData,
    productData,
    handlePartyNameAndCostCenter,
    fieldName,
    handleDropdown,
    handleDropdownSelection,
    advancePaymentPopup,
    setAdvancePaymentPopup,
    setAdvancePaymentData,
    advancePaymentData,
    setAdvancePaymentIndex,
    advancePaymentIndex,
    advancePaymentRef,
    token
  );

  return {
    salesData,
    setSalesData,
    handleValueChange,
    handleValueKeyDown,
    // handleFilterChange,
    // handleFilterKeyDown,
    handleAllKeyFunctions,
    salesDataRef,
    handleItemClick,
    handleItemFocus,
    handleFilterClose,
    checkHandleSubmit,
    filteredItems,
    tableBodyRef,
    dropdownRef,
    showFilter,
    activeIndex,
    selectedIndex,
    isSelecting,
    textAreaRef,
    taxData,
    submitted,
    handleShowFilter,
    companyPopup,
    partyNamePopup,
    setPartyNamePopup,
    companyData,
    companyDataRef,
    dateRef,
    setDate,
    date,
    fieldName,
    filterData,
    tableItemsPopup,
    tablePopupRef,
    itemsData,
    setItemsData,
    setActiveIndex,
    taxInfo,
    setTaxInfo,
    taxInfoRef,
    taxIndex,
    setTaxIndex,
    handleTaxValueChange,
    handleTaxKeyDown,
    taxInfoPopup,
    taxInfoPopupRef,
    getTotal,
    isModalOpen,
    setIsModalOpen,
    showCustomerForm,
    setShowCustomerForm,
    shippingTaxData,
    paymentData,
    termsData,
    termsPopup,
    paymentTermsOpen,
    gstData,
    gstTableOpen,
    productData,
    setFieldName,
    setShowFilter,
    setType,
    filterListName,
    handleTermsPopup,
    handlePartyNamePopup,
    handleGstPopup,
    advancePaymentPopup,
    advancePaymentData,
    handleAdvancePaymentsPopup,
    getAdvancePaymentData,
    advancePaymentRef,
    setAdvancePaymentIndex,
    handleAdvancePaymentDelete,
  };
}

export default useSalesHook;
