import { toast } from 'react-toastify';

export function handleTableKeyFunctionalities(
  itemsData: any,
  setIsSelecting: any,
  handleTaxDefault: any,
  tableBodyRef: any,
  activeIndex: any,
  setShowFilter: any,
  setSalesData: any,
  handleFocus: any,
  setTableItemsPopup: any,
  salesData: any,
  setType: any,
  setItemsData: any,
  filterData: any,
  filteredItems: any,
  handleShowFilter: any,
  setFieldName: any,
  tablePopupRef: any,
  focusNextField: any,
  selectedIndex: any,
  getItemsData: any,
  serialNoData: any,
  productData: any,
  setProductData: any,
  companyData: any
) {
  const handleDropdown = (name: string) => {
    // console.log(filterData, filteredItems);
    if (name === 'item_name') {
      focusNextField(tablePopupRef.current.hsn);
      handleShowFilter('hsn');
      getItemsData(filteredItems[selectedIndex]);
      setFieldName('hsn');
    } else if (name === 'hsn') {
      focusNextField(tablePopupRef.current.uom);
      handleShowFilter('uom');
      setFieldName('uom');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
    } else if (name === 'uom') {
      focusNextField(tablePopupRef.current.description);
      // handleShowFilter('income_account');
      setFieldName('description');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
      setType('');
      setShowFilter(false);
    } else if (name === 'income_account') {
      focusNextField(tablePopupRef.current.expense_account);
      handleShowFilter('expense_account');
      setFieldName('expense_account');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
    } else if (name === 'warehouse') {
      setTimeout(() => {
        setShowFilter(false);
      }, 0);
      setType('');
      (tablePopupRef.current['qty'] as HTMLElement).focus();
      setFieldName('qty');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
    } else if (name === 'margin_type') {
      focusNextField(tablePopupRef.current.margin_rate_or_amount);
      handleShowFilter('margin_rate_or_amount');
      setFieldName('margin_rate_or_amount');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
      setTimeout(() => {
        setShowFilter(false);
      }, 0);
      setType('');
    } else if (name === 'item_tax_template') {
      focusNextField(tablePopupRef.current.income_account);
      handleShowFilter('income_account');
      setFieldName('income_account');

      const data = filterData[name]?.filter((item: any) => filteredItems[selectedIndex] === item.name);
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
        gst_rate: data[0].gst_rate || 0,
      });
    } else if (name === 'expense_account') {
      focusNextField(tablePopupRef.current.cost_center);
      handleShowFilter('cost_center');
      setFieldName('cost_center');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
    } else if (name === 'cost_center') {
      // focusNextField(tableBodyRef.current.rate);

      setFieldName('serial_no');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
      // setTableItemsPopup(false);
      setTimeout(() => {
        setShowFilter(false);
        setType('');
      }, 0);
      focusNextField(tablePopupRef.current.serial_no);

      // setFieldName('rate');
      // setItemsData({
      //   ...itemsData,
      //   [name]: filteredItems[selectedIndex],
      // });
      // setTableItemsPopup(false);

      // setTimeout(() => {
      //   setShowFilter(false);
      //   setType('');
      //   (tableBodyRef.current[activeIndex].childNodes[1].childNodes[1] as HTMLElement).focus();
      // }, 0);
      // // console.log(activeIndex, tableBodyRef.current[activeIndex].childNodes[1].childNodes[1]);

      // let data = [...salesData.table];
      // data[activeIndex] = {
      //   ...itemsData,
      //   [name]: filteredItems[selectedIndex],
      // };

      // setSalesData({ ...salesData, table: data });
    } else if (name === 'batch_no') {
      setFieldName('rate');
      setItemsData({
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      });
      setTableItemsPopup(false);

      setTimeout(() => {
        setShowFilter(false);
        setType('');
        (tableBodyRef.current[activeIndex].childNodes[1].childNodes[1] as HTMLElement).focus();
      }, 0);
      // console.log(activeIndex, tableBodyRef.current[activeIndex].childNodes[1].childNodes[1]);

      let data = [...salesData.table];
      data[activeIndex] = {
        ...itemsData,
        [name]: filteredItems[selectedIndex],
      };

      setSalesData({ ...salesData, table: data });
    } else {
      setShowFilter(false);
      setType('');
    }
  };

  const handleTableKeyEnter = (name: string) => {
    let data = [...salesData.table];

    if (selectedIndex >= 0) {
      setIsSelecting(true);

      handleFocus(name);

      if (
        name === 'item_name' ||
        name === 'cost_center' ||
        name === 'uom' ||
        name === 'hsn' ||
        name === 'income_account' ||
        name === 'expense_account' ||
        name === 'warehouse' ||
        name === 'item_tax_template' ||
        name === 'margin_type' ||
        name === 'batch_no'
      ) {
        handleDropdown(name);
      } else {
        handleTaxDefault(data, name);
      }
    }
  };

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

  const getData = async (value: string) => {
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
      data['rate'] = amount - (amount * Number(value)) / 100;
      data['amt'] = Number(data['qty']) * Number(data['rate']);
      data['discount_amount'] = (amount * Number(value)) / 100;
    } else {
      amount = Number(data['original_rate']);
      data['rate'] = amount - (amount * Number(value)) / 100;
      data['amt'] = Number(data['qty']) * Number(data['rate']);
      data['discount_amount'] = (amount * Number(value)) / 100;
    }
    return data;
  };

  const handleTableIfNotDropdown = (name: string, value: string) => {
    // console.log("running",name)
    switch (name) {
      case 'qty': {
        let data = { ...itemsData };
        data[name] = value;
        if (data['rate'] !== '') {
          data['amt'] = Number(value) * Number(data['rate']);
        }
        // console.log(getData(value), 'get discount');
        getData(value).then((discount) => {
          data['discount_percentage'] = discount;
          data = calculateDiscountAmt(data, discount);
          setItemsData({ ...data });
        });
        (tablePopupRef.current['rate'] as HTMLElement).focus();
        setShowFilter(false);
        setType('');
        break;
      }
      case 'rate': {
        const data = { ...itemsData };
        data[name] = value;
        if (data['qty'] !== '' && data['rate_with_margin'] === '') {
          data['amt'] = Number(value) * Number(data['qty']);
        }
        setFieldName('margin_type');
        setItemsData({ ...data });
        (tablePopupRef.current['margin_type'] as HTMLElement).focus();
        handleShowFilter('margin_type');
        break;
      }
      case 'margin_rate_or_amount': {
        const data = { ...itemsData };
        data[name] = value;
        if (data['qty'] !== '') {
          if (data['margin_type'] === 'Percentage') {
            data['rate'] = Number(data['original_rate']) + (Number(data['original_rate']) * Number(value)) / 100;
            data['rate_with_margin'] = (Number(data['original_rate']) * Number(value)) / 100;
            data['amt'] = Number(data['rate']) * Number(data['qty']);
          } else {
            data['rate'] = Number(data['original_rate']) + Number(value);
            data['rate_with_margin'] = Number(value);
            data['amt'] = Number(data['rate']) * Number(data['qty']);
          }
        }
        setFieldName('discount_percentage');
        setItemsData({ ...data });
        (tablePopupRef.current['discount_percentage'] as HTMLElement).focus();
        // handleShowFilter('discount_percentage');
        break;
      }
      case 'discount_percentage': {
        let data = { ...itemsData };
        data[name] = value;
        if (data['qty'] !== '') {
          data = calculateDiscountAmt(data, value);
        }
        setFieldName('item_tax_template');
        setItemsData({ ...data });
        (tablePopupRef.current['item_tax_template'] as HTMLElement).focus();
        handleShowFilter('item_tax_template');
        // handleShowFilter('margin_type');
        break;
      }
      // case 'discount_amount': {
      //   const data = { ...itemsData };
      //   data[name] = value;
      //   setFieldName('rate_with_margin');
      //   setItemsData({ ...data });
      //   (tablePopupRef.current['rate_with_margin'] as HTMLElement).focus();
      //   // handleShowFilter('margin_type');
      //   break;
      // }
      // case 'rate_with_margin': {
      //   const data = { ...itemsData };
      //   data[name] = value;
      //   if (data['qty'] !== '') {
      //     data['amt'] = Number(value) * Number(data['qty']);
      //   }
      //   setFieldName('item_tax_template');
      //   setItemsData({ ...data });
      //   (tablePopupRef.current['item_tax_template'] as HTMLElement).focus();
      //   handleShowFilter('item_tax_template');
      //   break;
      // }
      case 'description': {
        const data = { ...itemsData };
        data[name] = value;
        setItemsData({ ...data });
        (tablePopupRef.current['warehouse'] as HTMLElement).focus();
        handleShowFilter('warehouse');
        setFieldName('warehouse');
        break;
      }
      case 'serial_no': {
        if (serialNoData?.length > 0) {
          const filterSerialNo = serialNoData?.filter((item: any) => item.name === value);
          if (filterSerialNo?.length > 0) {
            const data = { ...itemsData };
            data['serial_no_list'] = data['serial_no_list'] ? `${data['serial_no_list']}\n${value}` : value;
            data[name] = '';
            // console.log(data, `${data['serial_no_list']}/n${value}`);
            setItemsData({ ...data });
            // (tablePopupRef.current['bat'] as HTMLElement).focus();
            // handleShowFilter('bat');
            // setFieldName('bat');
          } else {
            toast.warning('Serial No. is incorrect!', {
              autoClose: 2000,
              className: 'custom-toast',
            });
          }
        } else {
          toast.warning('There are No corresponding Serial No. for this Item!', {
            autoClose: 2000,
            className: 'custom-toast',
          });
        }
        // setFieldName('rate');
        // setItemsData({
        //   ...itemsData,
        //   [name]: value,
        // });
        // setTableItemsPopup(false);

        // setTimeout(() => {
        //   (tableBodyRef.current[activeIndex].childNodes[1].childNodes[1] as HTMLElement).focus();
        // }, 0);
        // // console.log(activeIndex, tableBodyRef.current[activeIndex].childNodes[1].childNodes[1]);

        // let data = [...salesData.table];
        // data[activeIndex] = {
        //   ...itemsData,
        //   [name]: value,
        // };

        // setSalesData({ ...salesData, table: data });
      }
      default: {
        tablePopupRef.current[name as keyof typeof tablePopupRef.current]?.focus();
      }
    }
  };
  return { handleTableKeyEnter, handleTableIfNotDropdown };
}
