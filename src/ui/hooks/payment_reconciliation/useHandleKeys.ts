import { useEffect, useRef, useState } from 'react';
import useCompanyData from './useCompanyData';
import usePartyData from './usePartyData';
import usePartyTypeData from './usePartyTypeData';
import useUnreconcileEntriesData from './useUnreconcileEntriesData';
import useAllocateList from './useAllocateList';
import useReconcile from './useReconcile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useHandleKeys = (isQuitModalOpen: any, setIsQuitModalOpen: any) => {
  const { companyData } = useCompanyData('Company');
  const { partyData } = usePartyData('Customer');
  const { partyTypeData } = usePartyTypeData('Payment Reconciliation Party');
  const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
  const [masterList, setMasterList] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const formRef = useRef<any>(null);
  const inputRefs = useRef<any>(null);

  const [initalPaymentReconcileCompanyData, setInitalPaymentReconcileCompanyData] = useState({
    company: '',
    party_type: '',
    party: '',
  });

  // console.log('Fetched reconciliation data : in component@@', receivablePayableAccount, defaultAdvanceAccount, invoiceData, paymnentData);
  const company = initalPaymentReconcileCompanyData?.company;
  const partyType = initalPaymentReconcileCompanyData?.party_type;
  const party = initalPaymentReconcileCompanyData?.party;
  // Fetching data only when all values are available
  const {
    receivablePayableAccount,
    defaultAdvanceAccount,
    invoiceData,
    paymnentData,
    setInvoiceData,
    setPaymentData,
    refreshData,
    apiErrorMessage,
    apiError,
    data,
  }: any = useUnreconcileEntriesData(company, partyType, party);

  const { allocationListData, fetchAllocationList } = useAllocateList();
  console.log('Fetched reconciliation data : from hook', allocationListData);
  const { reconcileData, fetchReconcile } = useReconcile();
  console.log('Fetched reconciliation data : reconcile from hook', reconcileData);

  const [invoiceFilter, setInvoiceFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoiceData);
  const [filteredPayments, setFilteredPayments] = useState(paymnentData);

  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hideAllocationTable, setHideAllocationTable] = useState<boolean>(false);

  useEffect(() => {
    if (allocationListData?.length > 0) {
      setHideAllocationTable(false);
    }
  }, [allocationListData]); // Reset the state when new data arrives

  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current.focus();
    }
    setShowFilter(true);
    setCurrentField('company');
    setCurrentFilterList(companyData);
    setMasterList(companyData);
  }, [companyData]);

  const handleKeyDown = async (e: any, field?: any, type?: any) => {
    setInitalPaymentReconcileCompanyData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));

    const focusableElements = Array.from(
      formRef.current?.querySelectorAll("input, button, select, textarea, [tabindex]:not([tabindex='-1'])") || []
    ) as HTMLElement[];
    console.log('focusableElements', focusableElements);
    const index = focusableElements.indexOf(e.currentTarget);
    console.log('index', index);

    if (e.ctrlKey && e.key === 'Enter') {
      if (field === 'btn_allocate') {
        handleAllocation();
      }
      if (field === 'btn_reconcile') {
        handleReconcile();
      }
    } else if (e.key === 'Enter' && !showFilter) {
      e.preventDefault();
      if (e.shiftKey) {
        if (index > 0) {
          focusableElements[index - 1].focus();
        }
      } else {
        if (index < focusableElements.length - 1) {
          focusableElements[index + 1].focus();
        }
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentField(field);

      const newIndex =
        e.key === 'ArrowDown'
          ? (selectedIndex + 1) % currentFilterList.length
          : (selectedIndex - 1 + currentFilterList.length) % currentFilterList.length;
      setSelectedIndex(newIndex);
    } else if (e.key === 'Enter' && showFilter) {
      e.preventDefault();
      if (field === 'party') {
        refreshData();
      }

      // if (field === 'party' && apiError) {
      //   toast.warning(apiErrorMessage, {
      //     position: 'top-right',
      //     autoClose: 3000, // Closes after 3 seconds
      //     className: 'custom-toast', // Custom class
      //   });
      // }
      setInitalPaymentReconcileCompanyData((prevData) => ({
        ...prevData,
        [currentField]: currentFilterList[selectedIndex]?.name || currentFilterList[selectedIndex],
      }));
      setShowFilter(false);
      setSelectedIndex(0);
    } else if (e.key === 'Escape' && showFilter) {
      setShowFilter(false);
    } else if (e.key === 'Escape') {
      setIsQuitModalOpen(true);
    }
  };

  // const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const { name: field } = e.target;
  //   setShowFilter(false);

  //   if (field === 'company' || field === 'party_type' || field === 'party') {
  //     setShowFilter(true);
  //     setCurrentField(field);

  //     const selectedValue = initalPaymentReconcileCompanyData[field]; // Get the selected value
  //     const foundIndex = masterList.findIndex((item) => item.name === selectedValue);
  //     setSelectedIndex(foundIndex !== -1 ? foundIndex : 0); // Highlight the selected value in the filter
  //   }

  //   if (field === 'company') {
  //     setCurrentFilterList(companyData);
  //     setMasterList(companyData);
  //   } else if (field === 'party_type') {
  //     setCurrentFilterList(partyTypeData);
  //     setMasterList(partyTypeData);
  //   } else if (field === 'party') {
  //     setCurrentFilterList(partyData);
  //     setMasterList(partyData);
  //   }

  // };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name: field } = e.target;
    setShowFilter(false);
    if (field === 'company' || field === 'party_type' || field === 'party') {
      setShowFilter(true);
      setCurrentField(field);

      // Find and highlight the currently selected value
      let selectedValue = '';
      let dataList: any[] = [];

      if (field === 'company') {
        selectedValue = initalPaymentReconcileCompanyData.company;
        dataList = companyData;
        setCurrentFilterList(companyData);
        setMasterList(companyData);
      } else if (field === 'party_type') {
        selectedValue = initalPaymentReconcileCompanyData.party_type;
        dataList = partyTypeData;
        setCurrentFilterList(partyTypeData);
        setMasterList(partyTypeData);
      } else if (field === 'party') {
        selectedValue = initalPaymentReconcileCompanyData.party;
        dataList = partyData;
        setCurrentFilterList(partyData);
        setMasterList(partyData);
      }

      // Find the index of the selected value
      const selectedItemIndex = dataList.findIndex((item) => (item.name || item) === selectedValue);

      // Set the selected index if found, otherwise default to 0
      setSelectedIndex(selectedItemIndex !== -1 ? selectedItemIndex : 0);
    }
  };

  const handleFilter = (value: string) => {
    if (value.trim() === '') {
      setCurrentFilterList(masterList);

      // Ensure the filter is shown when text is cleared
      setShowFilter(true);
    } else {
      setCurrentFilterList(masterList.filter((data) => data.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleInputChange = (e: any, type: any) => {
    const { name, value } = e.target;
    handleFilter(value);

    // If the input is cleared, reset the selected index to 0
    if (value === '') {
      setSelectedIndex(0);
      // Also ensure the filter shows the full list
      setCurrentFilterList(masterList);
    }
    setInitalPaymentReconcileCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Unreconcile Logic
  // Handle select all for invoices - get complete objects
  const handleSelectAllInvoices = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedInvoices(filteredInvoices);
    } else {
      setSelectedInvoices([]);
    }
  };

  // Handle select all for payments - get complete objects
  const handleSelectAllPayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPayments(filteredPayments);
    } else {
      setSelectedPayments([]);
    }
  };

  // Filter invoices
  useEffect(() => {
    if (invoiceData && invoiceData.length > 0) {
      const filtered = invoiceData.filter(
        (invoice: any) => invoice.invoice_number && invoice.invoice_number.toLowerCase().includes(invoiceFilter.toLowerCase())
      );
      setFilteredInvoices(filtered);
      console.log('Filtered invoices:', filtered);
    } else {
      setFilteredInvoices([]);
    }
  }, [invoiceFilter, invoiceData]);

  // payment filter
  useEffect(() => {
    if (paymnentData && paymnentData.length > 0) {
      const filtered = paymnentData.filter(
        (payment: any) => payment.reference_name && payment.reference_name.toLowerCase().includes(paymentFilter.toLowerCase())
      );
      setFilteredPayments(filtered);
      console.log('Filtered payments:', filtered);
    } else {
      setFilteredPayments([]);
    }
  }, [paymentFilter, paymnentData]);

  const handleInvoiceSelect = (invoice: any) => {
    setSelectedInvoices((prev) => {
      // Check if this invoice is already selected by looking for its idx
      const isSelected = prev.some((item) => item.idx === invoice.idx);

      if (isSelected) {
        // If already selected, remove it from the array
        return prev.filter((item) => item.idx !== invoice.idx);
      } else {
        // If not selected, add the complete invoice object to the array
        return [...prev, invoice];
      }
    });
  };

  const handlePaymentSelect = (payment: any) => {
    setSelectedPayments((prev) => {
      // Check if this payment is already selected by looking for its idx
      const isSelected = prev.some((item) => item.idx === payment.idx);

      if (isSelected) {
        // If already selected, remove it from the array
        return prev.filter((item) => item.idx !== payment.idx);
      } else {
        // If not selected, add the complete payment object to the array
        return [...prev, payment];
      }
    });
  };

  const handleAllocation = async () => {
    if (!company || !partyType || !party || selectedInvoices.length === 0 || selectedPayments.length === 0) {
      // setErrorMessage('Please select at least one invoice and one payment to reconcile');
      toast.error('Please select at least one invoice and one payment to reconcile', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
      return;
    }

    // Call the fetch function when the button is clicked
    const data = await fetchAllocationList(company, partyType, party, selectedInvoices, selectedPayments);
    console.log('Allocation data fetched on button click:', data);

    if (data?.allocation && data?.allocation.length > 0) {
      toast.success('Allocation List Fetched Successfully', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
    }

    // You can add additional logic here to handle the response
    // For example, you might want to show a success message or update the UI
  };

  const handleReconcile = async () => {
    if (!company || !partyType || !party || selectedInvoices.length === 0 || selectedPayments.length === 0) {
      return;
    }
    const data = await fetchReconcile(company, partyType, party, selectedInvoices, selectedPayments);
    console.log('reconcile data fetched on button click:', data?.docs, data?.invoices, data?.payments);
    // Step 1: Parse the first level
    const firstParse = JSON.parse(data._server_messages);

    // Step 2: Parse the second level
    const messageObject = JSON.parse(firstParse[0]);

    if (messageObject?.message === 'Successfully Reconciled') {
      toast.success(messageObject.message, {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
      });

      setHideAllocationTable(true);

      setTimeout(() => {
        inputRefs.current?.focus(); // Move focus to invoice search field
      }, 100);
    }

    // Accessing the message
    console.log('reconcile data fetched on button click:', data?._server_message, data?.invoices, data?.payments);
    console.log('reconcile data fetched on button click: reconcile message', messageObject.message); // Output: Successfully Reconciled
    console.log(messageObject.title); // Output: Message
    setInvoiceData(allocationListData?.invoices);
    setPaymentData(allocationListData?.payments);
    // Clear selected checkboxes
    setSelectedInvoices([]);
    setSelectedPayments([]);

    // Refresh data from the parent component
    refreshData();

    // Optional: Clear filter inputs
    setInvoiceFilter('');
    setPaymentFilter('');
  };

  useEffect(() => {
    if (!isQuitModalOpen) {
      setTimeout(() => {
        inputRefs.current?.focus();
      }, 100);
    }
  }, [isQuitModalOpen]);

  return {
    formRef,
    receivablePayableAccount,
    defaultAdvanceAccount,
    invoiceData,
    paymnentData,
    setInvoiceData,
    setPaymentData,
    refreshData,
    apiErrorMessage,
    apiError,
    data,
    company,
    partyType,
    party,
    selectedInvoices,
    selectedPayments,
    errorMessage,
    hideAllocationTable,
    handleKeyDown,
    handleInputFocus,
    handleInputChange,
    handleSelectAllInvoices,
    handleSelectAllPayments,
    handleInvoiceSelect,
    handlePaymentSelect,
    inputRefs,
    invoiceFilter,
    setInvoiceFilter,
    paymentFilter,
    setPaymentFilter,
    filteredInvoices,
    filteredPayments,
    allocationListData,
    showFilter,
    currentFilterList,
    selectedIndex,
    setSelectedIndex,
    isQuitModalOpen,
    setIsQuitModalOpen,
    setHideAllocationTable,
    handleAllocation,
    handleReconcile,
  };
};

export default useHandleKeys;
