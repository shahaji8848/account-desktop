import { toast } from 'react-toastify';
import { advancesDefaultInfo, defaultTableData, salesDefaultdata } from '../../utils/data';
import { handleChangeOfSales } from './handleChangeOfSales';
import { useNavigate } from 'react-router-dom';
import { postData, updateData } from '../../../apis/util';
// import PartyNamePopup from '../../components/Sales/PartyNamePopup';

export function handleAllSalesFunctions(
  setPreviousSalesData: any,
  setSubmitted: any,
  setSalesInvoiceName: any,
  setDate: any,
  setSalesData: any,
  setActiveIndex: any,
  salesDataRef: any,
  salesData: any,
  activeIndex: any,
  setFieldName: any,
  setType: any,
  tableItemsPopup: any,
  date: any,
  setItemsData: any,
  itemsData: any,
  getFilterData: any,
  setIsSelecting: any,
  type: any,
  setShowFilter: any,
  handleIfNotDropdown: any,
  handleTableIfNotDropdown: any,
  handleTableKeyEnter: any,
  tableBodyRef: any,
  handleShowFilter: any,
  setTableItemsPopup: any,
  tablePopupRef: any,
  showFilter: any,
  setSelectedIndex: any,
  handleKeyEnter: any,
  filteredItems: any,
  taxInfoPopup: any,
  setTaxInfoPopup: any,
  setPartyNamePopup: any,
  setIsModalOpen: any,
  setShowCustomerForm: any,
  companyData: any,
  taxData: any,
  previousSalesData: any,
  salesInvoiceName: any,
  handleSubmitFindDifferences: any,
  dateRef: any,
  openCompanyDropdown: any,
  fetchTaxes: any,
  taxInfo: any,
  globalData: any,
  setTaxInfo: any,
  setTaxData: any,
  partyNamePopup: any,
  shippingTaxData: any,
  setTermsPopup: any,
  termsPopup: any,
  paymentData: any,
  setPaymentTermsOpen: any,
  paymentTermsOpen: any,
  gstTableOpen: any,
  setGstTableOpen: any,
  gstData: any,
  productData: any,
  handlePartyNameAndCostCenter: any,
  fieldName: any,
  handleDropdown: any,
  handleDropdownSelection: any,
  advancePaymentPopup: any,
  setAdvancePaymentPopup: any,
  setAdvancePaymentData: any,
  advancePaymentData: any,
  setAdvancePaymentIndex: any,
  advancePaymentIndex: any,
  advancePaymentRef: any,
  token: any,
  setPaymentData: any,
  setTransporterPopup: any,
  transporterPopup: any,
  transporterRef: any,
  setTransporterData: any,
  transporterData: any,
  getPDF: any,
  isOnPrint: any,
  setIsOnPrint: any,
  setIsQuitModalOpen: any
) {
  const navigate = useNavigate();
  const handleSubmitData = async (salesInvoiceData: any, method: string = 'POST') => {
    console.log(JSON.stringify(salesInvoiceData), salesInvoiceData, 'submit data');
    try {
      const x =
        method === 'POST'
          ? window.electron
            ? await window.electron.postData({
                doctype: 'Sales Invoice',
                data: salesInvoiceData,
                token: token,
              })
            : await postData({
                doctype: 'Sales Invoice',
                data: salesInvoiceData,
                token: token,
              })
          : window.electron
          ? await window.electron.updateData({
              doctype: 'Sales Invoice',
              data: salesInvoiceData,
              name: salesInvoiceName,
              token: token,
            })
          : await updateData({
              doctype: 'Sales Invoice',
              data: salesInvoiceData,
              name: salesInvoiceName,
              token: token,
            });
      // console.log(x);
      if (x !== undefined) {
        toast.success('Form is submitted!', {
          autoClose: 2000,
          className: 'custom-toast',
        });

        if (x.data.docstatus && x.data.docstatus === 1) {
          setPreviousSalesData({});
          setSubmitted(false);
          setSalesInvoiceName('');
          const date = new Date();
          const tomorrow = new Date(date);
          tomorrow.setDate(date.getDate() + 1);
          setDate({
            posting_date: date.toISOString().split('T')[0],
            due_date: tomorrow.toISOString().split('T')[0],
          });
          setSalesData({ ...salesDefaultdata });
          setTaxInfo([]);
          setTaxData([]);
          if (salesDataRef.current) {
            setTimeout(() => {
              // salesDataRef.current.sales_no?.focus();
              salesDataRef.current.naming_series?.focus();
            }, 10);
          }
        } else {
          setPreviousSalesData(salesData);
          setSubmitted(true);
          setSalesInvoiceName(x.data.name);
          // console.log(paymentData?.terms === undefined, paymentData);
          paymentData?.terms === undefined &&
            setPaymentData({
              terms: [
                {
                  credit_days: 0,
                  invoice_portion: 100,
                },
              ],
            });
        }
      } else {
        toast.error('Something went wrong. Please Re-enter all the data!', {
          autoClose: 2000,
          className: 'custom-toast',
        });
      }
    } catch (error) {
      console.error('Error fetching taxes or saving form:', error);
    }
  };

  const { handleValueChange } = handleChangeOfSales(
    salesData,
    activeIndex,
    setFieldName,
    setSalesData,
    setType,
    setDate,
    date,
    tableItemsPopup,
    setItemsData,
    itemsData,
    setActiveIndex,
    getFilterData,
    setIsSelecting,
    setShowFilter,
    handleShowFilter,
    advancePaymentPopup,
    setAdvancePaymentData,
    advancePaymentData,
    setAdvancePaymentIndex,
    advancePaymentIndex,
    transporterPopup,
    setTransporterData,
    transporterData
  );

  const handleAdvancePaymentDelete = (index: any) => {
    let data = [...advancePaymentData];
    data = data.filter((_, i) => index !== i);
    setAdvancePaymentData(data);
    if (advancePaymentIndex < advancePaymentData.length - 1) {
      setTimeout(() => {
        (advancePaymentRef.current[advancePaymentIndex - 1].childNodes[4] as HTMLElement).focus();
        setAdvancePaymentIndex(advancePaymentIndex - 1);
      }, 10);
    } else {
      setTimeout(() => {
        (salesDataRef.current.allocate_advances_automatically as HTMLElement).focus();
      });
    }
  };

  const handleValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    // console.log(type);

    if (type !== 'dropdown') {
      if (e.key === 'Enter' && name !== 'update_stock' && !tableItemsPopup) {
        handleIfNotDropdown(name, value);
      }

      if (e.key === 'Enter' && advancePaymentPopup && (name === 'allocated_amount' || name === 'difference_posting_date')) {
        if (name === 'allocated_amount') {
          if (value === '') {
            handleAdvancePaymentDelete(advancePaymentIndex);
          } else {
            setTimeout(() => {
              (advancePaymentRef.current[advancePaymentIndex].childNodes[4] as HTMLElement).focus();
            }, 0);
          }
          // console.log(advancePaymentRef.current[advancePaymentIndex].childNodes[4])
        }
        if (name === 'difference_posting_date') {
          if (advancePaymentIndex <= advancePaymentData.length - 1) {
            setTimeout(() => {
              (advancePaymentRef.current[advancePaymentIndex].childNodes[5] as HTMLElement).focus();
              setAdvancePaymentIndex(advancePaymentIndex);
            }, 0);
          }
          // else {
          //   setTimeout(() => {
          //     setAdvancePaymentData([...advancePaymentData, { ...advancesDefaultInfo, difference_posting_date: date.posting_date }]);
          //   }, 0);
          //   setTimeout(() => {
          //     (advancePaymentRef.current[advancePaymentIndex + 1].childNodes[3] as HTMLElement).focus();
          //     setAdvancePaymentIndex(advancePaymentIndex + 1);
          //   }, 10);
          // }
          // console.log(advancePaymentRef.current[advancePaymentIndex].childNodes[4])
        }
      }

      if (e.ctrlKey && name === 'item_name' && e.key === 'Enter' && !tableItemsPopup) {
        setTableItemsPopup(true);
        if (salesData.table.length > 0) {
          setItemsData(salesData.table[activeIndex]);
        }
        // setItemsData
        setTimeout(() => {
          tablePopupRef.current.item_name?.focus();
        }, 0);
        // handleShowFilter('table');
      }

      if (e.key === 'Enter' && name === 'update_stock' && !tableItemsPopup) {
        handleIfNotDropdown(name, value);
      }
      if (e.key === 'Enter' && tableItemsPopup) {
        handleTableIfNotDropdown(name, value);
      }

      if (name === 'qty' && e.shiftKey && e.key === 'Tab' && !tableItemsPopup) {
        setTimeout(() => {
          (tableBodyRef.current[activeIndex]?.childNodes[0].childNodes[0] as HTMLElement)?.focus();

          // handleShowFilter('table');
        }, 0);
      }
    } else {
      // console.log(e);
      if (e.ctrlKey && name === 'item_name' && e.key === 'Enter' && !tableItemsPopup) {
        setTableItemsPopup(true);
        if (salesData.table.length > 0) {
          setItemsData(salesData.table[activeIndex]);
        }
        // setItemsData
        setTimeout(() => {
          tablePopupRef.current.item_name?.focus();
        }, 0);
        // handleShowFilter('table');
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev: any) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev: any) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && !e.ctrlKey && !tableItemsPopup && !taxInfoPopup && !advancePaymentPopup) {
        // console.log('hello')
        handleKeyEnter(name, value);
      } else if (e.key === 'Enter' && !e.ctrlKey && tableItemsPopup) {
        handleTableKeyEnter(name);
      } else if (e.key === 'Escape') {
        setShowFilter(false);
        setPartyNamePopup(false);
        setTableItemsPopup(false);
        setTaxInfoPopup(false);
        setIsModalOpen(false);
        setShowCustomerForm(false);
        setTermsPopup(false);
      }
    }
  };
  const checkEmptyFields = (data: any[]) => {
    return data.some((item) => !item.uom || !item.rate || !item.amt || !item.item_name || !item.income_account || !item.cost_center);
  };

  const checkHandleSubmit = () => {
    if (
      salesData.party_details.party_name === '' ||
      salesData.naming_series === '' ||
      companyData.company_name === '' ||
      salesData.table.length === 0 ||
      date.posting_date === '' ||
      date.due_date === ''
    ) {
      toast.error('Please fill all the required fields!', {
        autoClose: 2000,
        className: 'custom-toast',
      });
      if (salesDataRef.current?.party_name) {
        salesDataRef.current?.party_name.focus();
      }
    } else {
      if (salesData.table.length > 0) {
        // console.log(salesData, taxInfo, companyData);
        const hasEmptyRow = salesData.table.some((row: any) => Object.values(row).every((value) => value === ''));
        // const taxHasEmptyRow = taxInfo.some((row: any) => Object.values(row).every((value) => value === ''));
        const filteredTaxInfo = taxInfo.filter((row: any) => row.charge_type.trim() !== '');
        if (hasEmptyRow) {
          toast.error('Items Table has an empty row please add data or remove it!', {
            autoClose: 2000,
            className: 'custom-toast',
          });
          setTimeout(() => {
            tableBodyRef.current[0].childNodes[0].childNodes[0]?.focus();
          }, 0);
        } else if (checkEmptyFields(salesData.table)) {
          toast.error('Items Table has empty important fields!', {
            autoClose: 2000,
            className: 'custom-toast',
          });
          setTimeout(() => {
            tableBodyRef.current[0].childNodes[0].childNodes[0]?.focus();
          }, 0);
        } else {
          let data: any = [];
          salesData.table.map((item: any) => {
            data = [...data, { ...item, gst_hsn_code: item.hsn }];
          });
          // productData.map((item: any) => {
          //   data = [...data, { ...item, gst_hsn_code: item.hsn }];
          // });
          setTaxInfo(filteredTaxInfo);
          let newTaxData: any = [];
          filteredTaxInfo.length > 0 &&
            filteredTaxInfo.map((item: any, index: number) => {
              if (item.charge_type?.includes('Previous')) {
                const totalTaxes = salesData.tax_template === 'Output GST In-state - 8DL' ? 2 : 1;
                newTaxData = [...newTaxData, { ...item, row_id: index + totalTaxes }];
              } else {
                newTaxData = [...newTaxData, { ...item }];
              }
            });
          let newAdvanceData: any = [];
          advancePaymentData.length > 0 &&
            advancePaymentData.map((item: any, index: number) => {
              newAdvanceData = [...newAdvanceData, { ...item, allocated_amount: Number(item.allocated_amount) }];
            });
          let salesInvoiceData = {
            customer: salesData.party_details.party_name,
            customer_name: salesData.party_details.party_name,
            custom_sales_invoice_id: salesData.sales_no || '',
            naming_series: salesData.naming_series,
            company: companyData.company_name,
            company_address: companyData.company_address,
            company_gstin: companyData.company_gstin,
            company_contact_person: companyData.company_contact_person,
            customer_address: salesData.party_details.billing_address,
            billing_address_gstin: salesData.party_details.billing_gstin,
            contact_person: salesData.party_details.contact_person,
            // customer: "Reliance Retail Limited",
            taxes_and_charges: salesData.tax_template,
            items: [...data],
            taxes: [...taxData, ...newTaxData],
            posting_date: date.posting_date,
            due_date: date.due_date,
            remarks: salesData.narration,
            update_stock: salesData.update_stock,
            shipping_rule: salesData.shipping_detail,
            currency: salesData.currency,
            conversion_rate: salesData.conversion_rate,
            terms_and_conditions: salesData.terms_and_conditions,
            payment_terms_template: salesData.payment_terms,
            set_warehouse: salesData.source_warehouse,
            terms_description: salesData.terms_description,
            apply_discount_on: salesData.apply_discount_on,
            additional_discount_percentage: Number(salesData.additional_discount_percentage) || 0,
            additional_discount_amount: Number(salesData.additional_discount_amount) || 0,
            additional_discount_account: salesData.additional_discount_account,
            is_cash_or_non_trade_discount: salesData.is_cash_or_non_trade_discount,
            cost_center: salesData.cost_center || '',
            advances: advancePaymentData?.length > 0 && advancePaymentData[0].allocated_amount !== '' ? newAdvanceData : [],
            // allocate_advances_automatically: salesData.allocate_advances_automatically,
            // only_include_allocated_payments: salesData.only_include_allocated_payments,
            incoterm: salesData.incoterm,
            named_place: salesData.named_place,
            ...transporterData,
          };
          if (Object.keys(previousSalesData).length > 0) {
            if (previousSalesData === salesData) {
              const submitData = {
                docstatus: 1,
                name: salesInvoiceName,
              };

              handleSubmitData(submitData, 'PUT');
            } else {
              const differences = handleSubmitFindDifferences(previousSalesData, salesData);
              let data: any = [];
              salesData.table.map((item: any) => {
                data = [...data, { ...item, gst_hsn_code: item.hsn }];
              });
              const submitData = {
                ...differences,
                additional_discount_percentage: Number(salesData.additional_discount_percentage) || 0,
                items: data,
                name: salesInvoiceName || salesData.sales_no || '',
              };
              handleSubmitData(submitData, 'PUT');
            }
          } else {
            handleSubmitData(salesInvoiceData);
          }
        }
      } else {
        toast.error('please fill the data to proceed!', {
          autoClose: 2000,
          className: 'custom-toast',
        });
      }
    }
  };

  const handlePartyNamePopup = () => {
    if (paymentData?.terms?.length > 0) {
      setPaymentTermsOpen(!paymentTermsOpen);
      setGstTableOpen(false);
      setTimeout(() => {
        // Prevent the default "Select All" behavior
        dateRef.current?.posting_date?.focus();
      }, 0);
    } else {
      toast.warning('No Payment Terms Found!', {
        autoClose: 2000,
        className: 'custom-toast',
      });
    }
  };

  const handleGstPopup = () => {
    if (gstData?.length > 0) {
      setPaymentTermsOpen(false);
      setGstTableOpen(!gstTableOpen);
      setTimeout(() => {
        // Prevent the default "Select All" behavior
        dateRef.current?.posting_date?.focus();
      }, 0);
    } else {
      toast.warning('Please fill in the items to get GST Breakup!', {
        autoClose: 2000,
        className: 'custom-toast',
      });
    }
  };

  const handleTermsPopup = () => {
    setTermsPopup(true);
    setTimeout(() => {
      (salesDataRef.current.terms_and_conditions as HTMLElement).focus();
    }, 0);
  };

  const handleTransporterPopup = () => {
    setTransporterPopup(true);
    setTimeout(() => {
      setSelectedIndex(0);
      (transporterRef.current.transporter as HTMLElement).focus();
      setType('dropdown');
    }, 0);
  };

  const handleAdvancePaymentsPopup = () => {
    if (salesData.table?.length > 0) {
      setAdvancePaymentPopup(true);
      setTimeout(() => {
        (salesDataRef.current.allocate_advances_automatically as HTMLElement).focus();
      }, 0);
    } else {
      toast.warning('Please fill in the items to get advance payments!', {
        autoClose: 2000,
        className: 'custom-toast',
      });
    }
  };

  const handlePrintFormat = () => {
    if (salesInvoiceName) {
      setIsOnPrint(true);
      setTimeout(() => {
        salesDataRef.current.print_format.focus();
      }, 0);
      getPDF(salesInvoiceName, salesData.print_format);
    } else {
      toast.warning('Please make sure the status is in draft!', {
        autoClose: 2000,
        className: 'custom-toast',
      });
    }
  };

  const handleAllKeyFunctions = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      checkHandleSubmit();
    }
    if (
      event.key === 'Escape' &&
      !tableItemsPopup &&
      !taxInfoPopup &&
      !globalData.companyPopup &&
      !partyNamePopup &&
      !termsPopup &&
      !paymentTermsOpen &&
      !gstTableOpen &&
      !advancePaymentPopup &&
      !transporterPopup &&
      !isOnPrint
    ) {
      setIsQuitModalOpen(true);
    }
    if (event.ctrlKey && event.key === 'x') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      globalData.setIsSales(false);
      setSalesData(salesDefaultdata);
      setTaxInfo([]);
    }
    if (event.ctrlKey && event.key === 't') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      handleTermsPopup();
    }
    if (event.altKey && event.key === 'a') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      // setTermsPopup(true);
      handleAdvancePaymentsPopup();
    }
    if (event.altKey && event.key === 'p') {
      event.preventDefault();
      handlePrintFormat();
    }
    if (event.altKey && event.key === 't') {
      event.preventDefault();
      handleTransporterPopup();
    }
    if (event.ctrlKey && event.key === 'p') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      // setTermsPopup(true);
      handlePartyNamePopup();
    }
    if (event.ctrlKey && event.key === 'g') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      // setTermsPopup(true);
      handleGstPopup();
    }
    if (paymentTermsOpen && event.key === 'Escape') {
      setPaymentTermsOpen(false);
    }
    if (gstTableOpen && event.key === 'Escape') {
      setGstTableOpen(false);
    }
    if (advancePaymentPopup && event.key === 'Escape') {
      setAdvancePaymentPopup(false);
    }
    if (transporterPopup && event.key === 'Escape') {
      setTransporterPopup(false);
    }
    if (isOnPrint && event.key === 'Escape') {
      setIsOnPrint(false);
    }
    if (event.key === 'F2') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      dateRef.current?.posting_date?.focus();
    }
    if (event.key === 'F3') {
      event.preventDefault(); // Prevent the default "Select All" behavior
      openCompanyDropdown();
    }
    if (event.key === 'Escape' && !gstTableOpen && !paymentTermsOpen) {
      setShowFilter(false);
      setPartyNamePopup(false);
      setTableItemsPopup(false);
      setTaxInfoPopup(false);
      setIsModalOpen(false);
      setShowCustomerForm(false);
      setTermsPopup(false);
      setPaymentTermsOpen(false);
      setGstTableOpen(false);
      setTimeout(() => {
        salesDataRef.current?.naming_series?.focus();
      }, 0);
    }
  };

  const handleItemClick = (item: string) => {
    setIsSelecting(true);
    setShowFilter(false);
    // console.log(fieldName, item);
    if (tableItemsPopup) {
      handleDropdown(fieldName, item);
    } else if (fieldName === 'charge_type' || fieldName === 'account_head') {
      handleDropdownSelection(fieldName, item);
    } else if (fieldName === 'cost_center' && taxInfoPopup) {
      handleDropdownSelection(fieldName, item);
    } else {
      handlePartyNameAndCostCenter(fieldName, item);
    }
  };

  const handleItemFocus = (index: number) => {
    setSelectedIndex(index);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  return {
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
    handleTransporterPopup,
    handlePrintFormat,
  };
}
