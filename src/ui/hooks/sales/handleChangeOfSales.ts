export function handleChangeOfSales(
  salesData: any,
  activeIndex: any,
  setFieldName: any,
  setSalesData: any,
  setType: any,
  setDate: any,
  date: any,
  tableItemsPopup: any,
  setItemsData: any,
  itemsData: any,
  setActiveIndex: any,
  getFilterData: any,
  setIsSelecting: any,
  setShowFilter: any,
  handleShowFilter: any
) {
  const handleInputChange = (value: string, name: string, item_index: number) => {
    const data = [...salesData.table];

    // console.log(name, value, 'table info');

    if ((name === 'qty' || name === 'rate') && (value === '' || /^-?\d+\.?\d*$/.test(value))) {
      data[activeIndex][name] = value;
    }
    if (name !== 'qty' && name !== 'rate') {
      data[activeIndex][name] = value;
    }

    // setFieldName('item_name');

    setSalesData({ ...salesData, table: data });
  };

  // handleValueChange function to handle input field changes
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, typeLabel: string = '', item_index: number = 0) => {
    e.preventDefault();

    const { name, value, checked } = e.target;
    let type = '';

    const dropdown_names = [
      'party_name',
      'cost_center',
      'tax_template',
      'item_code',
      'item_name',
      'uom',
      'hsn',
      'warehouse',
      'income_account',
      'expense_account',
      'naming_series',
      'shipping_detail',
      'payment_terms',
      'terms_and_conditions',
      'shipping_address',
      'billing_address',
      'source_warehouse',
      'additional_discount_account',
      'currency',
      'apply_discount_on',
      'margin_type',
      'batch_no',
      'item_tax_template',
      'receivable_account'
    ];

    if (dropdown_names.includes(name)) {
      setType('dropdown');
      type = 'dropdown';
    } else {
      setTimeout(() => {
        setType('');
        type = '';
      }, 0);
    }

    if (type !== 'dropdown') {
      if (typeLabel !== 'table') {
        if (name === 'sales_no') {
          if (value === '' || /^-?\d+\.?\d*$/.test(value)) {
            setSalesData({ ...salesData, [name]: value });
          }
        } else if (name.includes('date') && name !== 'update_stock') {
          setDate({ ...date, [name]: value });
        } else if (name === 'update_stock') {
          setTimeout(() => {
            setSalesData({ ...salesData, [name]: checked });
          }, 0);
        } else if (name === 'is_cash_or_non_trade_discount') {
          setTimeout(() => {
            // console.log(salesData, name, checked);
            setSalesData({ ...salesData, [name]: checked });
          }, 0);
        } else if (tableItemsPopup) {
          setItemsData({ ...itemsData, [name]: value });
        } else {
          setSalesData({ ...salesData, [name]: value });
        }
      } else {
        // handleShowFilter('table');
        // Assuming value is a JSON string that needs to be parsed
        handleInputChange(value, name, item_index);
        setActiveIndex(item_index);
      }
    } else {
      handleShowFilter(name);
      if (
        typeLabel !== 'table' &&
        !name.includes('company') &&
        !name.includes('date') &&
        name !== 'update_stock' &&
        !tableItemsPopup &&
        !name.includes('party') &&
        !name.includes('billing') &&
        !name.includes('shipping_address') &&
        !name.includes('shipping_gstin') &&
        name !== 'is_cash_or_non_trade_discount'&&
        !name.includes('receivable')
      ) {
        setSalesData({ ...salesData, [name]: value });
        setFieldName(name);
      } else if (name === 'naming_series') {
        setSalesData({ ...salesData, [name]: value });
      } else if (name.includes('party') || name.includes('billing') || name.includes('shipping') || name === 'receivable_account') {
        // console.log('value', value, name)
        setFieldName(name);
        setSalesData({
          ...salesData,
          party_details: { ...salesData.party_details, [name]: value },
        });
        
        if (name === 'receivable_account') {
          getFilterData(
            {
              type: 'Account',
              filter: { input: value },
            },
            'account_data'
          );
        }
      } else if (name.includes('date')) {
        setDate({ ...date, [name]: value });
      } else if (name === 'update_stock') {
        setTimeout(() => {
          setSalesData({ ...salesData, [name]: checked });
        }, 0);
      } else if (name === 'is_cash_or_non_trade_discount') {
        setTimeout(() => {
          // console.log(salesData, name, checked);
          setSalesData({ ...salesData, [name]: checked });
        }, 0);
      } else if (tableItemsPopup) {
        setItemsData({ ...itemsData, [name]: value });
        if (name === 'warehouse') {
          getFilterData(
            {
              type: 'Warehouse',
              filter: { input: value },
            },
            'warehouse'
          );
        }
        if (name === 'batch_no') {
          getFilterData(
            {
              type: 'Batch',
              filter: { item_name: itemsData.item_code },
            },
            'batch_no'
          );
        }
        if (name === 'income_account' || name === 'expense_account') {
          getFilterData(
            {
              type: 'Account',
              filter: { input: value },
            },
            'account_data'
          );
        }
        if (name === 'cost_center') {
          getFilterData(
            {
              type: 'Cost Center',
              filter: { input: value },
            },
            'cost_center'
          );
        }
        if (name === 'hsn') {
          getFilterData(
            {
              type: 'GST HSN Code',
              filter: { input: value },
            },
            'hsn'
          );
        }
        if (name === 'uom') {
          getFilterData(
            {
              type: 'UOM',
              filter: { input: value },
            },
            'uom'
          );
        }
        if (name === 'item_tax_template') {
          setType('dropdown');
        }
      } else {
        // Assuming value is a JSON string that needs to be parsed
        handleInputChange(value, name, item_index);
        setFieldName(name);
        setActiveIndex(item_index);
      }

      setIsSelecting(false);
      setShowFilter(true);
    }
  };
  return { handleValueChange };
}
