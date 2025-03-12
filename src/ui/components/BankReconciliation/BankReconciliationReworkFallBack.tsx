'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import useUnreconcileEntriesData from '../../hooks/payment_reconciliation/useUnreconcileEntriesData';
import useAllocateList from '../../hooks/payment_reconciliation/useAllocateList';
import useReconcile from '../../hooks/payment_reconciliation/useReconcile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import './bank-reconciliation.css';
import useFetchData from '../../hooks/fetchData';
export default function BankReconciliationRework({ homeHookData, globalData }: any) {
  const token = localStorage.getItem('account_desktop_token');
  const companyData = useFetchData('Company', {}, token);
  const bankData = useFetchData('Bank Account', {}, token);
  // console.log('Bank@@@ company hook called', companyData);
  const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
  const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
  const [masterList, setMasterList] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const formRef = useRef<any>(null);
  const inputRefs = useRef<any>(null);

  const [initalPaymentReconcileCompanyData, setInitalPaymentReconcileCompanyData] = useState({
    company: '',
    bank_account: '',
    from_date: '',
    to_date: '',
  });

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
  }: any = useUnreconcileEntriesData(initalPaymentReconcileCompanyData?.company, initalPaymentReconcileCompanyData?.bank_account);
  const company = initalPaymentReconcileCompanyData?.company;
  const bankAccount = initalPaymentReconcileCompanyData?.bank_account;

  const { allocationListData, fetchAllocationList } = useAllocateList();
  const { reconcileData, fetchReconcile } = useReconcile();

  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hideAllocationTable, setHideAllocationTable] = useState<boolean>(false);
  const [showDateFilters, setShowDateFilters] = useState(true);

  const [fromDate, setFromDate] = useState<any>('');
  const [toDate, setToDate] = useState<any>('');
  const [fromStatementDate, setFromStatementDate] = useState<any>('');
  const [toStatementDate, setToStatementDate] = useState<any>('');
  const [fromErpDate, setFromErpDate] = useState<any>('');
  const [toErpDate, setToErpDate] = useState<any>('');

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

      setInitalPaymentReconcileCompanyData((prevData) => ({
        ...prevData,
        [currentField]: currentFilterList[selectedIndex]?.name || currentFilterList[selectedIndex],
      }));
      setShowFilter(false);
      setSelectedIndex(0);
    } else if (e.key === 'Escape' && showFilter) {
      // setShowFilter(false);
    } else if (e.key === 'Escape') {
      setIsQuitModalOpen(true);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name: field } = e.target;
    setShowFilter(false);
    if (field === 'company' || field === 'bank_account') {
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
      } else if (field === 'bank_account') {
        selectedValue = initalPaymentReconcileCompanyData.bank_account;
        dataList = bankData;
        setCurrentFilterList(bankData);
        setMasterList(bankData);
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
      setSelectedInvoices(invoiceData);
    } else {
      setSelectedInvoices([]);
    }
  };

  // Handle select all for payments - get complete objects
  const handleSelectAllPayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPayments(paymnentData);
    } else {
      setSelectedPayments([]);
    }
  };

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
    if (!company || !bankAccount || selectedInvoices.length === 0 || selectedPayments.length === 0) {
      // setErrorMessage('Please select at least one invoice and one payment to reconcile');
      toast.error('Please select at least one invoice and one payment to reconcile', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
      return;
    }

    // Call the fetch function when the button is clicked
    const data = await fetchAllocationList(company, bankAccount, '', selectedInvoices, selectedPayments);
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
    if (!company || !bankAccount || selectedInvoices.length === 0 || selectedPayments.length === 0) {
      return;
    }
    const data = await fetchReconcile(company, bankAccount, '', selectedInvoices, selectedPayments);
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
    // setInvoiceData(allocationListData?.invoices);
    // setPaymentData(allocationListData?.payments);
    // Clear selected checkboxes
    setSelectedInvoices([]);
    setSelectedPayments([]);

    // Refresh data from the parent component
    refreshData();

    // // Optional: Clear filter inputs
    // setInvoiceFilter('');
    // setPaymentFilter('');
  };

  useEffect(() => {
    if (!isQuitModalOpen) {
      setTimeout(() => {
        inputRefs.current?.focus();
      }, 100);
    }
  }, [isQuitModalOpen]);

  // Update token if it changes in localStorage
  useEffect(() => {
    window.electron
      .getAccountBalance({
        bank_account: '8848 Digital - HDFC Bank',
        company: '8848 Digital LLP',
        from_date: '2025-01-01',
        to_date: '2025-03-31',
        token,
      })
      .then((data: any) => {
        console.log('Bank@@@ account  balance fn called ttt', data);
      });

    window.electron
      .getData({
        doctype: 'Bank Account',
        token,
      })
      .then((data: any) => {
        console.log('Bank@@@ account api ii', data);
      });

    window.electron
      .getErpTransaction({
        company: '8848 Digital LLP',
        bank_account: '8848 Digital - HDFC Bank',
        from_statement_date: '2024-01-01',
        to_statement_date: '2025-01-01',
        token,
      })
      .then((data: any) => {
        console.log('Bank@@@ erp Transation api ii', data);
      });
    window.electron
      .getBankTransaction({
        company: '8848 Digital LLP',
        bank_account: '8848 Digital - HDFC Bank',
        from_statement_date: '2024-01-01',
        to_statement_date: '2025-01-01',
        token,
      })
      .then((data: any) => {
        console.log('Bank@@@ bank Transation api ii', data);
      });
  }, []);

  return (
    <div className="container-fluid px-3 py-2 bg-light" style={{ width: '1200px' }}>
      <h2 className="mb-3">Bank Reconciliation</h2>

      <div className="row mb-4" ref={formRef} tabIndex={0}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Company:</label>
              <input
                type="text"
                className="form-control"
                name="company"
                ref={(el) => el && (inputRefs.current = el)}
                onKeyDown={(e) => handleKeyDown(e, 'company', 'company')}
                onFocus={handleInputFocus}
                onChange={(e) => handleInputChange(e, 'company')}
                value={initalPaymentReconcileCompanyData.company}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">Bank Account:</label>
              <input
                type="text"
                className="form-control"
                name="bank_account"
                onKeyDown={(e) => handleKeyDown(e, 'bank_account', 'Bank Account')}
                onFocus={handleInputFocus}
                onChange={(e) => handleInputChange(e, 'Bank Account')}
                value={initalPaymentReconcileCompanyData.bank_account}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                name="from_date"
                onKeyDown={(e) => handleKeyDown(e, 'from_date')}
                onChange={(e) => handleInputChange(e, 'from_date')}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">To Date:</label>
              <input
                type="date"
                className="form-control"
                name="to_date"
                onKeyDown={(e) => handleKeyDown(e, 'to_date')}
                onChange={(e) => handleInputChange(e, 'to_date')}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Opening Balance</label>
              <input
                type="text"
                className="form-control"
                name="opening_balance"
                onKeyDown={(e) => handleKeyDown(e, 'opening_balance')}
                onFocus={handleInputFocus}
                onChange={(e) => handleInputChange(e, 'opening_balance')}
                // value={initalPaymentReconcileCompanyData.opening_balance}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Closing Balance as per Bank Statement:</label>
              <input
                type="text"
                className="form-control"
                name="bankClosingBalance"
                readOnly
                value="" // Will be auto-filled later
                onKeyDown={(e) => handleKeyDown(e, '', '')}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">Closing Balance as per ERP:</label>
              <input
                type="text"
                className="form-control"
                name="erpClosingBalance"
                readOnly
                value="" // Will be auto-filled later
                onKeyDown={(e) => handleKeyDown(e, '', '')}
              />
            </div>

            <div className="col-12 mt-3">
              <label className="form-label">Difference Amount:</label>
              <input
                type="text"
                className="form-control"
                name="differenceAmount"
                readOnly
                value="" // Will be auto-filled later
                onKeyDown={(e) => handleKeyDown(e, '', '')}
              />
            </div>
          </div>
        </div>
        {/* Add Filters Section */}
        <div className="col-12 mb-2 mt-4">
          <div className="d-flex align-items-center mb-2" style={{ cursor: 'pointer' }} onClick={() => setShowDateFilters(!showDateFilters)}>
            <h6 className="mb-0">Filters</h6>
            <span className={`ms-2 icon-wrapper ${showDateFilters ? 'rotated' : ''}`}>
              <MdKeyboardArrowDown size={30} />
            </span>
          </div>
          <div className={`filter-content ${showDateFilters ? 'show' : ''}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">From Statement Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="from_statement_date"
                    defaultValue="2024-04-01"
                    onKeyDown={(e) => handleKeyDown(e, 'from_statement_date')}
                    onChange={(e) => handleInputChange(e, 'from_statement_date')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">From ERP Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="from_erp_date"
                    defaultValue="2024-04-01"
                    onKeyDown={(e) => handleKeyDown(e, 'from_erp_date')}
                    onChange={(e) => handleInputChange(e, 'from_erp_date')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">To Statement Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="to_statement_date"
                    defaultValue="2025-03-07"
                    onKeyDown={(e) => handleKeyDown(e, 'to_statement_date')}
                    onChange={(e) => handleInputChange(e, 'to_statement_date')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">To ERP Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="to_erp_date"
                    defaultValue="2025-03-07"
                    onKeyDown={(e) => handleKeyDown(e, 'to_erp_date')}
                    onChange={(e) => handleInputChange(e, 'to_erp_date')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unreconcile Entries */}
        <div className="col-12 mt-5">
          <h2 className="mb-2">Unreconciled Entries</h2>
        </div>
        {/* Unreconcile table */}
        <div className="col-md-6 mt-3">
          <p>Bank Statement</p>
          <table className="table table-bordered invoice-table">
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllInvoices}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedInvoices.length === invoiceData?.length && invoiceData?.length > 0}
                  />
                </th>
                <th>Invoice Type</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>Amount</th>
                <th>Outstanding Amount</th>{' '}
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice: any, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedInvoices.some((item) => item.idx === invoice.idx)}
                      onChange={() => handleInvoiceSelect(invoice)}
                      onKeyDown={(e) => handleKeyDown(e, '', '')}
                    />
                  </td>
                  <td>{invoice.invoice_type}</td>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.invoice_date}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.outstanding_amount}</td>{' '}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6 mt-3">
          <p>Erp Transaction</p>
          <table className="table table-bordered payment-table">
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllPayments}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedPayments.length === paymnentData?.length && paymnentData?.length > 0}
                  />
                </th>
                <th>Reference Type</th>
                <th>Reference Name</th>
                <th>Posting Date</th>
                <th>Amount</th>
                <th>Difference Amount</th>{' '}
              </tr>
            </thead>
            <tbody>
              {paymnentData?.map((payment: any, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onKeyDown={(e) => handleKeyDown(e, '', '')}
                      checked={selectedPayments.some((item) => item.idx === payment.idx)}
                      onChange={() => handlePaymentSelect(payment)}
                    />
                  </td>
                  <td>{payment.reference_type}</td>
                  <td>{payment.reference_name}</td>
                  <td>{payment.posting_date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.difference_amount}</td>{' '}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <div className="me-3">
              <button className="btn btn-primary" onKeyDown={(e) => handleKeyDown(e, 'btn_allocate', '')} onClick={handleAllocation}>
                Allocate
              </button>
            </div>
            {allocationListData?.length > 0 && (
              <div className="">
                <button className="btn btn-secondary" onKeyDown={(e) => handleKeyDown(e, 'btn_reconcile', '')} onClick={handleReconcile}>
                  Reconcile
                </button>
              </div>
            )}
          </div>
        </div>

        {allocationListData?.length > 0 && !hideAllocationTable && (
          <div className="mt-4 col-md-12 reconciled-table" tabIndex={-1}>
            <h2 className="mb-3">Reconciled Entries</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-success">
                  <tr>
                    <th>No</th>
                    <th>Reference No</th>
                    <th>Invoice Number</th>
                    <th>Allocated Amount</th>
                    <th>Difference Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationListData[0]?.allocation?.map((entry: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entry.reference_name}</td>
                      <td>{entry.invoice_number}</td>
                      <td>{entry.allocated_amount}</td>
                      <td>{entry.difference_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {showFilter && (
        <ShowFilter filteredItems={currentFilterList} selectedIndex={selectedIndex} handleItemFocus={setSelectedIndex} right="0" top="58px" />
      )}
      {isQuitModalOpen && (
        <QuitConfirmationModal
          type="payment_reconciliation"
          isOpen={isQuitModalOpen}
          setIsQuitModalOpen={setIsQuitModalOpen}
          homeHookData={homeHookData}
        />
      )}
    </div>
  );
}
