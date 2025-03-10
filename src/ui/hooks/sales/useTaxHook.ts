import { useDispatch } from 'react-redux';
import { companyPopupSliceData } from '../../store/reducers/CompanyPopupSlice';
import { taxDefaultInfo } from '../../utils/data';

const handleTaxFunctionalities = (
  setShowFilter: any,
  setType: any,
  setFieldName: any,
  setPartyNamePopup: any,
  setTableItemsPopup: any,
  filteredItems: any,
  setSelectedIndex: any,
  setIsSelecting: any,
  showFilter: any,
  // handleShowFilter: any,
  salesData: any,
  type: any,
  selectedIndex: any,
  textAreaRef: any,
  taxIndex: any,
  setTaxIndex: any,
  taxInfo: any,
  setTaxInfo: any,
  taxInfoPopup: any,
  setTaxInfoPopup: any,
  taxInfoRef: any,
  taxInfoPopupRef: any,
  taxData: any,
  getFilterData: any,
  setPaymentData: any,
  setTermsData: any,
  getData: any,
  salesDataRef: any,
  fieldName: any,
  date: any,
  setDate: any
) => {
  const dispatch = useDispatch();

  /**
   * Handles tax value changes for input fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleTaxValueChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const dropdown_names = ['account_head', 'charge_type', 'cost_center'];

    if (dropdown_names.includes(name)) {
      setType('dropdown');
      setShowFilter(true);
      setSelectedIndex(0);
      setIsSelecting(false);
    } else {
      setType('');
    }

    const data = [...taxInfo];
    data[taxIndex][name] = value;
    setTaxInfo(data);

    if (name === 'account_head') {
      getFilterData(
        {
          type: 'Account',
          filter: { input: value },
        },
        'account_data'
      );
    }
  };

  /**
   * Calculates tax amount based on the charge type.
   */
  const handleCalculation = () => {
    const data = taxInfo;

    switch (data[taxIndex]?.charge_type) {
      case 'On Net Total':
        data[taxIndex].amt = salesData.table.reduce((sum: any, item: any) => sum + Number(item.amt), 0) * (Number(data[taxIndex].rate) / 100);
        break;

      case 'On Previous Row Amount':
        data[taxIndex].amt = (taxIndex > 0 ? taxInfo[taxIndex - 1].amt : 0) * (Number(data[taxIndex].rate) / 100);
        break;

      case 'On Previous Row Total':
        data[taxIndex].amt = 0;
        const salesTotal = salesData.table.reduce((sum: any, item: any) => sum + Number(item.amt), 0);
        const taxTotal = taxInfo.reduce((sum: any, item: any) => sum + Number(item.amt), 0);
        const taxDataTotal = taxData.length > 0 ? taxData.reduce((sum: any, item: any) => sum + Number(item.amt), 0) : 0;
        const total = salesTotal + taxTotal + taxDataTotal;
        data[taxIndex].amt = total * (Number(data[taxIndex].rate) / 100);
        break;

      case 'On Item Quantity':
        data[taxIndex].amt = salesData.table.reduce((sum: any, item: any) => sum + Number(item.qty), 0) * Number(data[taxIndex].rate);
        break;

      default:
        data[taxIndex].amt = taxInfo[taxIndex].amt;
    }

    taxInfoPopup ? setTaxInfo(data) : setTaxInfo([...data, { ...taxDefaultInfo }]);
  };

  /**
   * Handles keyboard events for tax-related input fields.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keydown event.
   */
  const handleTaxKeyDown = (e: any) => {
    const { name } = e.target;

    setFieldName(name);

    if (e.key === 'Escape') {
      setShowFilter(false);
      setPartyNamePopup(false);
      dispatch(companyPopupSliceData({ companyPopupToggle: true }));
      setTableItemsPopup(false);
      setTaxInfoPopup(false);
      return;
    }

    if (type !== 'dropdown') {
      if (e.key === 'Enter') {
        if (!taxInfoPopup) {
          setTaxIndex(taxIndex + 1);
          setTaxInfo([...taxInfo, { ...taxDefaultInfo }]);

          if (['rate', 'amt'].includes(name)) {
            handleCalculation();
            setTimeout(() => taxInfoRef.current[taxIndex + 1]?.childNodes[0].childNodes[0]?.focus(), 0);
            setType('dropdown');
            // handleShowFilter('charge_type');
          }
        } else {
          if (name === 'description') {
            setTimeout(() => {
              taxInfo[taxIndex]['charge_type'] === 'Actual' ? taxInfoPopupRef.current.amt.focus() : taxInfoPopupRef.current.rate.focus();
            }, 0);
          } else {
            handleCalculation();
            setTaxInfoPopup(false);
            setShowFilter(false);
            setType('');
            setTimeout(() => {
              taxInfoRef.current[taxIndex]?.childNodes[1].childNodes[taxInfo[taxIndex]['charge_type'] === 'Actual' ? 3 : 1]?.focus();
            }, 0);
          }
        }
      }
    } else {
      handleDropdownNavigation(e, name);
    }
  };

  /**
   * Handles dropdown navigation using arrow keys and selection.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keydown event.
   * @param {string} name - The name of the field being modified.
   */
  const handleDropdownNavigation = (e: any, name: any) => {
    if (e.ctrlKey && name === 'charge_type' && e.key === 'Enter') {
      setTaxInfoPopup(true);
      setTimeout(() => {
        taxInfoPopupRef.current?.charge_type?.focus();
      }, 0);
      return;
    }

    // if (!showFilter) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev: any) => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev: any) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      handleDropdownSelection(name, filteredItems[selectedIndex]);
    }
  };

  function calculateNewDueDate(dueDate: string, creditDays: number): string {
    const date = new Date(dueDate);
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + creditDays);
    return tomorrow.toISOString().split('T')[0] || '25-2-2025';
  }

  const handleDropdownSelection = (name: any, value: any) => {
    const data = [...taxInfo];

    if ((name === 'charge_type' && !taxInfoPopup && !showFilter) || filteredItems[selectedIndex] === '') {
      const newData = taxInfo.filter((_: any, i: any) => taxIndex !== i);
      setTaxInfo(newData);

      getData('Payment Terms Template', { name: salesData.payment_terms }).then((response: any) => {
        console.log(response, 'payment');
        const paymentInfo =
          response?.terms?.length > 0 &&
          response.terms.map((item: any) => {
            return { ...item, due_date: calculateNewDueDate(date.due_date, item.credit_days) };
          });
        // console.log(paymentInfo);
        if (paymentInfo.length > 0) {
          const maxDueDate = paymentInfo.reduce((max: any, task: any) => (new Date(task.due_date) > new Date(max.due_date) ? task : max));

          // console.log('Latest Due Date:', maxDueDate.due_date);
          setDate({ ...date, due_date: maxDueDate.due_date });
        }
        setPaymentData(response);
      });
      // setType('');
      // setShowFilter(false);
      setFieldName('apply_discount_on');
      salesDataRef.current?.apply_discount_on?.focus();
      setTaxIndex(taxIndex ?? 0);
    } else {
      if (name === 'charge_type') {
        // handleShowFilter('account_head');
        if (taxInfoPopup) {
          setTimeout(() => {
            taxInfoPopupRef.current.account_head.focus();
            setShowFilter(false);
          }, 0);
        } else {
          setTimeout(() => {
            taxInfoRef.current[taxIndex]?.childNodes[0].childNodes[1].focus();
            setShowFilter(false);
          }, 0);
        }
      } else if (name === 'account_head') {
        if (taxInfoPopup) {
          // handleShowFilter('cost_center');
          setTimeout(() => {
            taxInfoPopupRef.current.cost_center.focus();
            setShowFilter(false);
            // taxInfoRef.current[taxIndex]?.childNodes[1].childNodes[1].focus();
          }, 0);
        } else {
          data[taxIndex]['description'] = value;
          data[taxIndex]['cost_center'] = salesData.cost_center || '';
          setTimeout(() => {
            taxInfoRef.current[taxIndex]?.childNodes[1].childNodes[taxInfo[taxIndex]['charge_type'] === 'Actual' ? 3 : 1].focus();
            setShowFilter(false);
            setType('');
          }, 0);
        }
      } else if (name === 'cost_center') {
        setShowFilter(false);
        setType('');
        setTimeout(() => taxInfoPopupRef.current.description.focus(), 0);
      }

      data[taxIndex][name] = (fieldName === name && value) || '';

      fieldName === name && setTaxInfo(data);
    }
  };

  return {
    handleTaxValueChange,
    handleTaxKeyDown,
    taxInfo,
    setTaxInfo,
    taxIndex,
    setTaxIndex,
    taxDefaultInfo,
    setTaxInfoPopup,
    taxInfoRef,
    taxInfoPopupRef,
    taxInfoPopup,
    handleDropdownSelection,
  };
};

export default handleTaxFunctionalities;
