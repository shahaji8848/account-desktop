import { useEffect } from 'react';
import {
  additionalDiscountOnData,
  chargeTypeData,
  defaultTableData,
  filterTypes,
  marginTypeData,
  salesNoData,
  taxDefaultInfo,
} from '../../utils/data';
import { handleTableKeyFunctionalities } from './handleTableKeyFunctionalities';

export default function useHandleKeyFunctionalities({
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
  tableBodyRef,
  setFieldName,
  setPartyNamePopup,
  companyData,
  dateRef,
  fieldName,
  filterData,
  getFilterData,
  itemsData,
  setItemsData,
  tablePopupRef,
  setTableItemsPopup,
  setFilterData,
  taxInfo,
  setTaxInfo,
  taxInfoRef,
  setTaxIndex,
  setTaxData,
  taxData,
  handleShowFilter,
  getItemsData,
  shippingDetails,
  setShippingTaxData,
  setTermsPopup,
  getData,
  setGstData,
  getTotal,
  serialNoData,
  productData,
  setProductData,
  showFilter,
  setFilterListName,
  token,
  getAdvancePaymentData,
  advancePaymentRef,
  advancePaymentData,
}: any) {
  const getAddressFilter = (type: any, name: any) => ({
    type: 'Address',
    filter: { type, name },
  });

  useEffect(() => {
    if (fieldName === 'charge_type') {
      setFilterListName('Charge Types');
      setFilterData({ ...filterData, charge_type: chargeTypeData });
    } else if (fieldName === 'naming_series') {
      setFilterListName('Naming Series');
      setFilterData({ ...filterData, naming_series: salesNoData });
    } else if (fieldName === 'margin_type') {
      setFilterListName('Margin Types');
      setFilterData({ ...filterData, [fieldName]: marginTypeData });
    } else if (fieldName === 'apply_discount_on') {
      setFilterListName('Apply Discount On');
      setFilterData({ ...filterData, [fieldName]: additionalDiscountOnData });
    } else if (fieldName === 'company_address') {
      setFilterListName('Company Address');
      getFilterData(getAddressFilter('Company', companyData.company_name), 'company_address');
    } else if (fieldName === 'billing_address') {
      setFilterListName('Customer Billing Address');
      getFilterData({ type: 'Address', filter: { type: 'Customer', name: salesData.party_details.party_name } }, 'billing_address');
    } else if (fieldName === 'shipping_address') {
      setFilterListName('Customer Shipping Address');
      getFilterData({ type: 'Address', filter: { type: 'Customer', name: salesData.party_details.party_name } }, 'shipping_address');
    } else if (
      fieldName === 'income_account' ||
      fieldName === 'expense_account' ||
      fieldName === 'account_head' ||
      fieldName === 'additional_discount_account'
    ) {
      setFilterListName(filterTypes[fieldName].type);
      getFilterData(filterTypes[fieldName], 'account_data');
    } else if (fieldName === 'contact_person') {
      setFilterListName(filterTypes[fieldName].type);
      console.log('hello');
      getFilterData(
        { type: filterTypes[fieldName].type, filter: { type: 'Customer', type_name: salesData.party_details.party_name } },
        'contact_person'
      );
    } else if (fieldName === 'receivable_account') {
      setFilterListName(filterTypes[fieldName].type);
      getFilterData(filterTypes[fieldName], 'account_data');
    } else if (fieldName === 'uom') {
      setFilterListName(filterTypes[fieldName].type);
      filterData.uom?.length <= 0 && getFilterData(filterTypes[fieldName], fieldName);
    } else if (fieldName === 'hsn') {
      setFilterListName(filterTypes[fieldName].type);
      filterData.hsn?.length <= 0 && getFilterData(filterTypes[fieldName], fieldName);
    } else if (fieldName === 'source_warehouse') {
      setFilterListName('Source Warehouse');
      // console.log(filterTypes[fieldName], fieldName);
      getFilterData(filterTypes['warehouse'], 'warehouse');
    } else if (fieldName === 'warehouse') {
      setFilterListName(filterTypes[fieldName].type);
      // console.log(filterTypes[fieldName], fieldName);
      getFilterData({ type: filterTypes['warehouse'].type, filter: { input: salesData.source_warehouse || '' } }, 'warehouse');
    } else if (fieldName === 'batch_no') {
      setFilterListName(filterTypes[fieldName].type);
      // console.log(filterTypes[fieldName], fieldName);
      getFilterData({ type: filterTypes['batch_no'].type, filter: { item_name: itemsData.item_name || '' } }, 'batch_no');
    } else if (filterTypes[fieldName]) {
      setFilterListName(filterTypes[fieldName].type);
      // console.log(filterTypes[fieldName], fieldName);
      getFilterData(filterTypes[fieldName], fieldName);
    }
  }, [fieldName]);

  const handleFocus = (name: string) => {
    if (name === 'due_date' && salesData.party_details.party_name === '') {
      salesDataRef.current?.party_name?.focus();
    }
    if (name === 'due_date' && salesData.cost_center === '') {
      salesDataRef.current?.cost_center?.focus();
    }
    setIsSelecting(false);
    // setShowFilter(true);
  };

  const handleTaxTemplateKeyPress = (name: string, value: any) => {
    const taxState =
      salesData.party_details.billing_gstin !== '' &&
      companyData.company_gstin !== '' &&
      salesData.party_details.billing_gstin.slice(0, 2).toLowerCase() === companyData.company_gstin.slice(0, 2).toLowerCase()
        ? 'Output GST In-state - 8DL'
        : 'Output GST Out-state - 8DL';
    // console.log(taxState);
    if (salesData.table.length > 0) {
      setSalesData({
        ...salesData,
        // [name]: filteredItems[selectedIndex],
        [name]: value,
        ['tax_template']: taxState,
        table: [...salesData.table],
      });
    } else {
      setSalesData({
        ...salesData,
        // [name]: filteredItems[selectedIndex],
        [name]: value,
        ['tax_template']: taxState,
        table: [{ ...defaultTableData, warehouse: salesData.source_warehouse || '' }],
      });
    }
    fetchTaxes(taxState);
    setActiveIndex(0);
    setTimeout(() => {
      tableBodyRef.current[0].childNodes[0].childNodes[0]?.focus();
      setType('dropdown');
    }, 0);
  };

  const focusNextField = (nextField: HTMLInputElement | null) => {
    setTimeout(() => {
      if (nextField) {
        nextField.focus();
      }
    }, 0);
    setIsSelecting(false);
    // setShowFilter(true);
  };

  const getCurrencyData = async () => {
    const response = await window.electron.getCurrencyData({
      data: {
        transaction_date: new Date().toISOString().split('T')[0] || '25-2-2025',
        from_currency: filteredItems[selectedIndex],
        to_currency: 'INR',
        args: 'for_selling',
      },
      token: token,
    });
    return response;
  };

  const handlePartyNameAndCostCenter = (name: string, value: any) => {
    // updateSalesData({ [name]: filteredItems[selectedIndex] });
    // console.log(fieldName, name, 'filter info');
    if (name === 'party_name') {
      focusNextField(salesDataRef.current.contact_person);
      // handleShowFilter('billing_address');
      fieldName === name &&
        setSalesData({
          ...salesData,
          party_details: {
            ...salesData.party_details,
            [name]: value,
          },
        });
      setTimeout(() => {
        setShowFilter(false);
        // setType('dropdown')
      }, 0);
    } else if (name === 'contact_person') {
      focusNextField(salesDataRef.current.receivable_account);
      // handleShowFilter('billing_address');
      fieldName === name &&
        setSalesData({
          ...salesData,
          party_details: {
            ...salesData.party_details,
            [name]: value,
          },
        });
      setTimeout(() => {
        setShowFilter(false);
        // setType('dropdown')
      }, 0);
    } else if (name === 'receivable_account') {
      focusNextField(salesDataRef.current.billing_address);
      // handleShowFilter('billing_address');
      fieldName === name &&
        setSalesData({
          ...salesData,
          party_details: {
            ...salesData.party_details,
            [name]: value,
          },
        });
      setTimeout(() => {
        setShowFilter(false);
        // setType('dropdown')
      }, 0);
    } else if (name === 'billing_address') {
      focusNextField(salesDataRef.current.billing_gstin);
      setTimeout(() => {
        setShowFilter(false);
        setType('');
      }, 0);
      fieldName === name &&
        setSalesData({
          ...salesData,
          party_details: {
            ...salesData.party_details,
            [name]: filterData[name][selectedIndex].name,
            billing_gstin: filterData[name][selectedIndex].gstin,
            billing_address_line1: filterData[name][selectedIndex].address_line1,
            billing_address_line2: filterData[name][selectedIndex].address_line2,
            billing_city: filterData[name][selectedIndex].city,
            billing_state: filterData[name][selectedIndex].state,
            billing_country: filterData[name][selectedIndex].country,
            billing_pincode: filterData[name][selectedIndex].pincode,
            billing_gst_category: filterData[name][selectedIndex].gst_category,
          },
        });
    } else if (name === 'shipping_address') {
      focusNextField(salesDataRef.current.shipping_gstin);
      setTimeout(() => {
        setShowFilter(false);
        setType('');
      }, 0);
      fieldName === name &&
        setSalesData({
          ...salesData,
          party_details: {
            ...salesData.party_details,
            [name]: filterData[name][selectedIndex].name,
            shipping_gstin: filterData[name][selectedIndex].gstin,
            shipping_address_line1: filterData[name][selectedIndex].address_line1,
            shipping_address_line2: filterData[name][selectedIndex].address_line2,
            shipping_city: filterData[name][selectedIndex].city,
            shipping_state: filterData[name][selectedIndex].state,
            shipping_country: filterData[name][selectedIndex].country,
            shipping_pincode: filterData[name][selectedIndex].pincode,
            shipping_gst_category: filterData[name][selectedIndex].gst_category,
          },
        });
    } else if (name === 'cost_center') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value,
        });
      setTimeout(() => {
        salesDataRef.current?.shipping_detail?.focus();
        setShowFilter(false);
        setType('dropdown');
      }, 0);
      setIsSelecting(false);
    } else if (name === 'source_warehouse') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value,
        });
      setTimeout(() => {
        salesDataRef.current?.incoterm?.focus();
        setShowFilter(false);
        // setType('dropdown')
      }, 0);
      setIsSelecting(false);
    } else if (name === 'incoterm') {
      // console.log('first', value);
      if (fieldName === name && showFilter) {
        setSalesData({
          ...salesData,
          [name]: value,
        });
        setTimeout(() => {
          salesDataRef.current?.named_place?.focus();
          setShowFilter(false);
          setType('');
        }, 0);
      } else {
        setTimeout(() => {
          salesDataRef.current?.currency?.focus();
          setShowFilter(false);
          setType('dropdown');
        }, 0);
      }
      setIsSelecting(false);
    } else if (name === 'additional_discount_account') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value,
        });
      setTimeout(() => {
        textAreaRef.current?.focus();
        setShowFilter(false);
        setType('');
      }, 0);
      setIsSelecting(false);
    } else if (name === 'currency') {
      fieldName === name &&
        getCurrencyData()
          .then((resp: any) => {
            // console.log(resp, 'resp');
            setSalesData({
              ...salesData,
              [name]: value,
              conversion_rate: Number(resp.message).toFixed(2) || 1,
            });
          })
          .catch((err: any) => {
            setSalesData({
              ...salesData,
              [name]: value,
            });
          });

      setTimeout(() => {
        salesDataRef.current?.conversion_rate?.focus();
        setShowFilter(false);
        setType('');
      }, 0);
      setIsSelecting(false);
    } else if (name === 'terms_and_conditions') {
      setTimeout(() => {
        salesDataRef.current?.terms_description?.focus();
        setShowFilter(false);
        setType('');
      }, 0);
      // console.log(value.name);
      fieldName === name &&
        showFilter &&
        getData('Terms and Conditions', { name: value.name }).then((response: any) => {
          // console.log(response, 'terms');
          let html = response.terms;
          html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
          html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
          html = html.replace(/<\/div>/gi, '\n');
          html = html.replace(/<\/li>/gi, '\n');
          html = html.replace(/<li>/gi, '  *  ');
          html = html.replace(/<\/ul>/gi, '\n');
          html = html.replace(/<\/p>/gi, '\n');
          html = html.replace(/<br\s*[\/]?>/gi, '\n');
          html = html.replace(/<[^>]+>/gi, '');

          // console.log(html, response, 'terms & c');
          setSalesData({
            ...salesData,
            [name]: value.name,
            terms_description: html || response.terms || '',
          });
        });
      setIsSelecting(false);
    } else if (name === 'payment_terms') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value.name,
        });
      setTimeout(() => {
        salesDataRef.current?.update_stock?.focus();
        setShowFilter(false);
        setType('');
      }, 0);
      setIsSelecting(false);
    } else if (name === 'shipping_detail') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value,
        });
      // setTimeout(() => {
      //   salesData.update_stock ? salesDataRef.current?.source_warehouse?.focus() : salesDataRef.current?.payment_terms?.focus();
      // }, 0);
      setIsSelecting(false);
      setTimeout(() => {
        salesDataRef.current?.payment_terms?.focus();
        setShowFilter(false);
        // setType('dropdown')
      }, 0);
    } else if (name === 'naming_series') {
      // console.log(value);
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: value,
        });
      setShowFilter(false);
      setIsSelecting(false);
      setTimeout(() => {
        dateRef.current?.posting_date?.focus();
      }, 0);
      setType('');
    } else if (name === 'apply_discount_on') {
      fieldName === name &&
        setSalesData({
          ...salesData,
          [name]: filteredItems[selectedIndex],
        });
      if (filteredItems[selectedIndex] === '') {
        setTimeout(() => {
          setShowFilter(false);
          setType('');
          textAreaRef.current.focus();
        }, 0);
      } else {
        setShowFilter(false);
        setIsSelecting(false);
        setTimeout(() => {
          salesDataRef.current?.additional_discount_percentage?.focus();
        }, 0);
        setType('');
      }
    } else if (name === 'item_name') {
      if (!showFilter) {
        let data = [...salesData.table];
        data = data.filter((_, i) => activeIndex !== i);
        setSalesData({ ...salesData, table: data });

        setTaxInfo([...taxInfo, { ...taxDefaultInfo }]);
        setTaxIndex(0);

        handleTaxData(salesData.table);

        setTimeout(() => {
          if (taxInfoRef.current) {
            taxInfoRef.current[0].childNodes[0].childNodes[0]?.focus();
          }
        }, 2);
      } else {
        (tableBodyRef.current[activeIndex].childNodes[1].childNodes[0] as HTMLElement).focus();
        setTimeout(() => {
          setShowFilter(false);
          setType('');
        }, 0);
        // handleShowFilter('hsn');
        fieldName === name && getItemsData(filteredItems[selectedIndex]);
        setFieldName('qty');
      }
    } else {
      setShowFilter(false);
    }
  };

  const handleRate = (data: { [key: string]: string | number | boolean }[], value: string) => {
    const itemData = { ...itemsData };
    itemData['rate'] = value;
    // if (itemData['qty'] !== '' && itemData['rate_with_margin'] !== '') {
    //   itemData['amt'] = Number(itemData['rate_with_margin']) * Number(itemData['qty']);
    // }

    if (itemsData.item_name !== '' && itemData.qty !== '' && data[activeIndex] !== itemData) {
      data[activeIndex] = itemData;
    } else {
      data[activeIndex]['rate'] = value;
      data[activeIndex]['per'] = 'Nos';
      if (data[activeIndex]['qty'] !== '') {
        data[activeIndex]['amt'] = Number(value) * Number(data[activeIndex]['qty']);
      }
    }

    // console.log({
    //   ...salesData,
    //   table: [...data, { ...defaultTableData, warehouse: salesData.source_warehouse || '' }],
    // });

    if (!data[activeIndex + 1]) {
      setSalesData({
        ...salesData,
        table: [...data, { ...defaultTableData, warehouse: salesData.source_warehouse || '' }],
      });
    }

    setItemsData({ ...defaultTableData, warehouse: salesData.source_warehouse || '' });

    setActiveIndex((prev: number) => prev + 1);

    // setTaxData
    setTimeout(() => {
      tableBodyRef.current[activeIndex + 1].childNodes[0].childNodes[0]?.focus();
    }, 0);

    setTimeout(() => {
      setShowFilter(false);
      setType('dropdown');
    }, 0);
    // setType("dropdown");
    // handleShowFilter('table');
  };

  const handleTaxData = (tableData: any) => {
    let tax_data = [...taxData];
    let gst_data: any = [];
    let shipping_tax_data: any = [];

    tax_data.forEach((tax) => {
      tax.amt = 0;
    });

    tax_data.forEach((tax) => {
      tax.amt = tableData.reduce((total: any, item: any) => {
        if (!item.amt || !item.gst_rate) return total; // Skip invalid rows

        const gstAmount = tax.description === 'IGST' ? (item.amt * item.gst_rate) / 100 : (item.amt * item.gst_rate) / 2 / 100;

        return total + gstAmount;
      }, 0);
    });

    const tax_description = salesData.tax_template === 'Output GST In-state - 8DL' ? 'SGST' : 'IGST';

    salesData.table.forEach((item: any) => {
      const itemTotal =
        salesData.additional_discount_amount !== '' ? Number(item.amt) - Number(salesData.additional_discount_amount) : Number(item.amt);
      const gstAmount = tax_description === 'IGST' ? (itemTotal * item.gst_rate) / 100 : (itemTotal * item.gst_rate) / 2 / 100;
      // console.log(gstAmount, itemTotal, tax_description, salesData, 'gst tax info');
      if (item.item_name !== '') {
        gst_data =
          tax_description === 'IGST'
            ? [...gst_data, { item_name: item.item_name, taxable_amt: item.amt, igst_gst_rate: item.gst_rate, igst_taxed_amt: gstAmount }]
            : [
                ...gst_data,
                {
                  item_name: item.item_name,
                  taxable_amt: itemTotal || item.amt,
                  sgst_gst_rate: item.gst_rate,
                  sgst_taxed_amt: gstAmount,
                  cgst_gst_rate: item.gst_rate,
                  cgst_taxed_amt: gstAmount,
                },
              ];
      }
    });

    // console.log(gst_data, 'gst data');

    setGstData(gst_data);

    const totalSales = salesData.table.reduce((sum: any, item: any) => sum + Number(item.amt), 0);
    shippingDetails?.length > 0 &&
      shippingDetails.map((item: any) => {
        // console.log(totalSales, item, 'shipping values');
        if (totalSales >= item.from_value && totalSales <= item.to_value) {
          shipping_tax_data = [
            ...shipping_tax_data,
            {
              charge_type: 'Actual',
              cost_center: 'Main - 8DL',
              description: item.owner || 'None',
              rate: '',
              account_head: 'Sales - 8DL',
              amt: item.shipping_amount,
            },
          ];
        }
      });

    setTaxData(tax_data);
    setShippingTaxData(shipping_tax_data);
  };

  const handleDefault = (data: { [key: string]: string | number | boolean }[], name: string) => {
    if (filteredItems[selectedIndex] === '') {
      if (data[activeIndex][name] === '') {
        data = data.filter((_, i) => activeIndex !== i);
        setSalesData({ ...salesData, table: data });

        setTaxInfo([...taxInfo, { ...taxDefaultInfo }]);
        setTaxIndex(0);

        handleTaxData(salesData.table);

        setTimeout(() => {
          if (taxInfoRef.current) {
            taxInfoRef.current[0].childNodes[0].childNodes[0]?.focus();

            // handleShowFilter('charge_type');
          }
        }, 2);
      } else {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }
    } else {
      data[activeIndex][name] = filteredItems[selectedIndex];
      setSalesData({ ...salesData, table: data });
      if (name === 'item_name') {
        getItemsData(filteredItems[selectedIndex]);
      }
      setFieldName('qty');
      setTimeout(() => {
        tableBodyRef.current[activeIndex].childNodes[1].childNodes[0]?.focus();
      }, 0);
      setType('');
    }
    setShowFilter(false);
  };

  const handleTaxDefault = (data: { [key: string]: string | number | boolean }[], name: string) => {
    if (filteredItems[selectedIndex] === '') {
      if (data[activeIndex][name] === '') {
        data = data.filter((_, i) => activeIndex !== i);
        setTaxInfo(data);

        setTimeout(() => {
          if (textAreaRef.current) {
            textAreaRef.current.focus();
          }
        }, 0);
      } else {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }
    }
    setShowFilter(false);
  };

  const handleKeyEnter = (name: string, value: string) => {
    let data = [...salesData.table];

    if (selectedIndex >= 0) {
      setIsSelecting(true);

      handleFocus(name);

      if (
        name === 'party_name' ||
        name === 'naming_series' ||
        name === 'cost_center' ||
        name === 'company_name' ||
        name === 'company_address' ||
        name === 'billing_address' ||
        name === 'shipping_address' ||
        name === 'shipping_detail' ||
        name === 'payment_terms' ||
        name === 'terms_and_conditions' ||
        name === 'source_warehouse' ||
        name === 'apply_discount_on' ||
        name === 'additional_discount_account' ||
        name === 'currency' ||
        name === 'item_name' ||
        name === 'receivable_account' ||
        name === 'incoterm' ||
        name === 'contact_person'
      ) {
        handlePartyNameAndCostCenter(name, filteredItems[selectedIndex]);
      } else if (name === 'rate') {
        handleRate(data, value);
      } else {
        handleDefault(data, name);
      }
    }
  };

  const { handleTableIfNotDropdown, handleTableKeyEnter, handleDropdown } = handleTableKeyFunctionalities(
    itemsData,
    setIsSelecting,
    handleTaxDefault,
    tableBodyRef,
    activeIndex,
    setShowFilter,
    setSalesData,
    handleFocus,
    setTableItemsPopup,
    salesData,
    setType,
    setItemsData,
    filterData,
    filteredItems,
    // handleShowFilter,
    setFieldName,
    tablePopupRef,
    focusNextField,
    selectedIndex,
    getItemsData,
    serialNoData,
    productData,
    setProductData,
    companyData,
    fieldName,
    showFilter,
    token
  );
  const getPromotionalItemData = async (data: any) => {
    // console.log(data);
    let response = await window.electron.getData({
      doctype: 'Item',
      filters: { name: data.free_item, company: companyData.company_name || '' },
    });
    let rate = await window.electron.getData({
      doctype: 'Item Price',
      filters: { item_code: data.free_item },
    });
    if (response && rate) {
      let tax_info = await window.electron.getData({
        doctype: 'Item Tax Template',
        filters: { input: response?.taxes[0]?.item_tax_template || '' },
      });
      // console.log(response, rate, tax_info, 'response and rate');
      setProductData([
        {
          item_name: data.free_item,
          item_code: data.free_item,
          hsn: response?.gst_hsn_code || '0101',
          uom: response?.stock_uom || response.uoms[0]?.name || 'Nos',
          description: response.description || '',
          rate: data.free_item_rate,
          qty: data.free_qty,
          amt: '',
          income_account: response?.item_defaults[0]?.income_account || '',
          warehouse: salesData?.source_warehouse ? salesData.source_warehouse : response?.item_defaults[0]?.expense_account || '',
          item_tax_template: response?.taxes[0]?.item_tax_template || '',
          expense_account: response?.item_defaults[0]?.expense_account || '',
          cost_center: response?.item_defaults[0]?.buying_cost_center || '',
          gst_rate: tax_info[0]?.gst_rate,
          original_rate: data.free_item_rate,
        },
      ]);
    }
  };

  const getPromotionalData = async (value: string) => {
    const itemData = await window.electron.getData({ doctype: 'Promotional Scheme', filters: { item_code: itemsData.item_name } });
    if (itemData && itemData.length > 0) {
      const promotionalData = await window.electron.getData({ doctype: 'Promotional Scheme', filters: { name: itemData[0].name } });
      // console.log(itemData, promotionalData, 'Promotional Scheme');
      if (promotionalData && promotionalData.customer[0]?.customer === salesData.party_details.party_name) {
        if (value >= promotionalData.product_discount_slabs[0]?.min_qty) {
          getPromotionalItemData(promotionalData.product_discount_slabs[0]);
        }
        if (value >= promotionalData.price_discount_slabs[0]?.min_qty) {
          return promotionalData.price_discount_slabs[0]?.discount_percentage;
        }
      }
      return 0;
    }
    return 0;
  };

  const calculateDiscountAmt = (data: any, value: any) => {
    let amount = 0;
    if (data['rate_with_margin'] !== '') {
      amount = Number(data['original_rate']) + Number(data['rate_with_margin']);
      data['rate'] = Number(amount - (amount * Number(value)) / 100).toFixed(2);
      data['amt'] = Number(data['qty']) * Number(data['rate']);
      data['discount_amount'] = (amount * Number(value)) / 100;
    } else {
      amount = Number(data['original_rate']);
      data['rate'] = Number(amount - (amount * Number(value)) / 100).toFixed(2);
      data['amt'] = Number(data['qty']) * Number(data['rate']);
      data['discount_amount'] = (amount * Number(value)) / 100;
    }
    return data;
  };

  const handleIfNotDropdown = (name: string, value: string) => {
    switch (name) {
      case 'sales_no': {
        setTimeout(() => {
          dateRef.current?.posting_date?.focus();
        }, 0);
        break;
      }
      case 'posting_date': {
        dateRef.current.due_date?.focus();
        break;
      }
      case 'due_date': {
        // handleShowFilter('party_name');
        setPartyNamePopup(true);
        setTimeout(() => {
          salesDataRef.current.party_name?.focus();
        }, 0);
        break;
      }
      case 'terms_description': {
        setSalesData({ ...salesData, terms_description: value });
        setTermsPopup(false);
        (salesDataRef.current.payment_terms as HTMLElement).focus();
        break;
      }
      case 'conversion_rate': {
        handleTaxTemplateKeyPress(name, salesData.conversion_rate);
      }
      case 'additional_discount_percentage': {
        // console.log(getTotal(), 'total');
        if (salesData.apply_discount_on === 'Grand Total') {
          setSalesData({ ...salesData, additional_discount_percentage: value, additional_discount_amount: (getTotal() * Number(value)) / 100 || 0 });
          setTimeout(() => {
            setShowFilter(false);
            setType('');
            (salesDataRef.current.is_cash_or_non_trade_discount as HTMLElement).focus();
          }, 0);
        } else {
          textAreaRef.current.focus();

          // const tableData = [...salesData.table];
          const tableData = JSON.parse(JSON.stringify(salesData.table));
          const salesTotalAmount = salesData.table.length > 0 ? salesData.table.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;
          const additional_amt = (salesTotalAmount * Number(value)) / 100;

          tableData.map((item: any) => {
            item.amt = 0;
            // let final_rate = 0;

            // final_rate = item.rate - additional_amt;
            // item.rate = final_rate.toFixed(2);

            // console.log(item, salesTotalAmount, additional_amt, 'table items0');

            // if (item['margin_type'] === 'Percentage') {
            //   item['rate_with_margin'] = (Number(item['rate']) * Number(item['margin_rate_or_amount'])) / 100;
            //   item['rate'] = Number(item['rate']) + Number(item['rate_with_margin']);
            //   // item['amt'] = Number(item['rate_with_margin']) * Number(item['qty']);
            // } else {
            //   item['rate_with_margin'] = Number(item['margin_rate_or_amount']) || 0;
            //   item['rate'] = Number(item['rate']) + Number(item['rate_with_margin']);
            //   // item['amt'] = Number(item['rate_with_margin']) * Number(item['qty']);
            // }

            // let margin_value = 0;
            // margin_value = Number(item['rate']);
            // item['discount_amount'] = (margin_value * Number(item['discount_percentage'])) / 100;
            // item['rate'] = margin_value - (margin_value * Number(item['discount_percentage'])) / 100;

            item['amt'] = Number(item['rate']) * Number(item['qty']) - additional_amt;
          }); // Do something with each item

          const data = JSON.parse(JSON.stringify(taxInfo));

          data.map((tax: any, taxIndex: number) => {
            switch (tax?.charge_type) {
              case 'On Net Total':
                tax.amt = tableData.reduce((sum: any, item: any) => sum + Number(item.amt), 0) * (Number(tax.rate) / 100);
                break;

              case 'On Previous Row Amount':
                tax.amt = (taxIndex > 0 ? taxInfo[taxIndex - 1].amt : 0) * (Number(tax.rate) / 100);
                break;

              case 'On Previous Row Total':
                tax.amt = 0;
                const salesTotal = tableData.reduce((sum: any, item: any) => sum + Number(item.amt), 0);
                const taxTotal = taxInfo.reduce((sum: any, item: any) => sum + Number(item.amt), 0);
                const taxDataTotal = taxData.length > 0 ? taxData.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;
                const total = salesTotal + taxTotal + taxDataTotal;
                tax.amt = total * (Number(tax.rate) / 100);
                break;

              case 'On Item Quantity':
                tax.amt = tableData.reduce((sum: any, item: any) => sum + Number(item.qty), 0) * Number(tax.rate);
                break;

              default:
                tax.amt = taxInfo[taxIndex].amt;
            }
          });

          handleTaxData(tableData);
          setSalesData({ ...salesData, table: tableData, additional_discount_percentage: value, additional_discount_amount: additional_amt });
          setTaxInfo(data);

          // console.log(tableData, data, 'table data');
        }
        break;
      }
      case 'qty': {
        const data = [...salesData.table];
        data[activeIndex][name] = value;
        if (data[activeIndex]['rate'] !== '') {
          data[activeIndex]['amt'] = Number(value) * Number(data[activeIndex]['rate']);
        }
        getPromotionalData(value).then((discount: any) => {
          data[activeIndex]['discount_percentage'] = discount;
          data[activeIndex] = calculateDiscountAmt(data[activeIndex], discount);
          // setItemsData({ ...data });
          // console.log(data[activeIndex])
        });
        setSalesData({ ...salesData, table: data });
        (tableBodyRef.current[activeIndex].childNodes[1].childNodes[1] as HTMLElement).focus();
        break;
      }
      case 'rate': {
        handleKeyEnter(name, value);
        break;
      }
      case 'billing_gstin': {
        focusNextField(salesDataRef.current.shipping_address);
        setTimeout(() => {
          setShowFilter(false);
          // setType('dropdown')
        }, 0);
        break;
      }
      case 'named_place': {
        focusNextField(salesDataRef.current.currency);
        setTimeout(() => {
          setShowFilter(false);
          setType('dropdown');
        }, 0);
        break;
      }
      case 'shipping_gstin': {
        focusNextField(salesDataRef.current.cost_center);
        setPartyNamePopup(false);
        // handleShowFilter('cost_center');
        setTimeout(() => {
          setShowFilter(false);
          // setType('dropdown')
        }, 0);
        break;
      }
      case 'update_stock': {
        setTimeout(() => {
          salesData.update_stock ? salesDataRef.current?.source_warehouse?.focus() : salesDataRef.current?.incoterm?.focus();
        }, 0);
        // handleShowFilter(salesData.update_stock ? 'source_warehouse' : 'currency');
        // focusNextField(salesDataRef.current.cost_center);
        // handleShowFilter('cost_center');
        break;
      }
      case 'allocate_advances_automatically': {
        salesData.allocate_advances_automatically && getAdvancePaymentData();
        setTimeout(() => {
          salesData.allocate_advances_automatically
            ? salesDataRef.current?.only_include_allocated_payments?.focus()
            : salesDataRef.current?.get_advances?.focus();
        }, 0);
        break;
      }
      // case 'get_advances': {
      //   if (advancePaymentData.length > 0) {
      //     (advancePaymentRef.current[0].childNodes[3] as HTMLElement).focus();
      //   }
      //   break;
      // }
      case 'only_include_allocated_payments': {
        if (salesData.only_include_allocated_payments) {
          getAdvancePaymentData();
        }
        if (advancePaymentData.length > 0) {
          (advancePaymentRef.current[0].childNodes[3] as HTMLElement).focus();
        }
        break;
      }
      case 'is_cash_or_non_trade_discount': {
        // console.log(salesData.is_cash_or_non_trade_discount, 'is cash');
        if (salesData.is_cash_or_non_trade_discount) {
          focusNextField(salesDataRef.current.additional_discount_account);
          // handleShowFilter('additional_discount_account');
        } else {
          setTimeout(() => {
            textAreaRef.current?.focus();
            setShowFilter(false);
            setType('');
          }, 0);
        }
      }
      default: {
        salesDataRef.current[name as keyof typeof salesDataRef.current]?.focus();
      }
    }
  };

  function handleSubmitFindDifferences(obj1: any, obj2: any) {
    const differences: any = {};

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (key === 'table' && Array.isArray(obj1[key])) {
          // Handle table specifically
          const diffArray = obj2[key].filter((item: any) => !obj1[key].some((row: any) => JSON.stringify(row) === JSON.stringify(item)));
          if (diffArray.length > 0) {
            differences[key] = diffArray;
          }
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
          // Handle nested objects
          const nestedDiff = handleSubmitFindDifferences(obj1[key], obj2[key]);
          if (Object.keys(nestedDiff).length > 0) {
            differences[key] = nestedDiff;
          }
        } else if (obj1[key] !== obj2[key]) {
          // Handle primitive values
          differences[key] = obj2[key];
        }
      }
    }

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !(key in obj1)) {
        differences[key] = obj2[key];
      }
    }

    return differences;
  }

  return {
    handleIfNotDropdown,
    // handleWhenNoDataInTable,
    handleKeyEnter,
    handleSubmitFindDifferences,
    handleRate,
    handleTableKeyEnter,
    handleTableIfNotDropdown,
    handlePartyNameAndCostCenter,
    handleDropdown,
  };
}
