'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import useCompanyData from '../../hooks/payment_reconciliation/useCompanyData';
import usePartyData from '../../hooks/payment_reconciliation/usePartyData';
import usePartyTypeData from '../../hooks/payment_reconciliation/usePartyTypeData';
import useUnreconcileEntriesData from '../../hooks/payment_reconciliation/useUnreconcileEntriesData';
import useAllocateList from '../../hooks/payment_reconciliation/useAllocateList';
import useReconcile from '../../hooks/payment_reconciliation/useReconcile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';

export default function PaymentReconciliationRework({ homeHookData, globalData }: any) {
  const { companyData } = useCompanyData('Company');
  const { partyData } = usePartyData('Customer');
  const { partyTypeData } = usePartyTypeData('Payment Reconciliation Party');
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
    party_type: '',
    party: '',
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
  }: any = useUnreconcileEntriesData(
    initalPaymentReconcileCompanyData?.company,
    initalPaymentReconcileCompanyData?.party_type,
    initalPaymentReconcileCompanyData?.party
  );

  // console.log('Fetched reconciliation data : in component@@', receivablePayableAccount, defaultAdvanceAccount, invoiceData, paymnentData);
  const company = initalPaymentReconcileCompanyData?.company;
  const partyType = initalPaymentReconcileCompanyData?.party_type;
  const party = initalPaymentReconcileCompanyData?.party;

  const [invoiceFilter, setInvoiceFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoiceData);
  const [filteredPayments, setFilteredPayments] = useState(paymnentData);
  const { allocationListData, fetchAllocationList } = useAllocateList();
  console.log('Fetched reconciliation data : from hook', allocationListData);
  const { reconcileData, fetchReconcile } = useReconcile();
  console.log('Fetched reconciliation data : reconcile from hook', reconcileData);

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
      // setShowFilter(false);
    } else if (e.key === 'Escape') {
      setIsQuitModalOpen(true);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name: field } = e.target;
    setShowFilter(false);

    if (field === 'company' || field === 'party_type' || field === 'party') {
      setShowFilter(true);
      setCurrentField(field);

      const selectedValue = initalPaymentReconcileCompanyData[field]; // Get the selected value
      const foundIndex = masterList.findIndex((item) => item.name === selectedValue);
      setSelectedIndex(foundIndex !== -1 ? foundIndex : 0); // Highlight the selected value in the filter
    }

    if (field === 'company') {
      setCurrentFilterList(companyData);
      setMasterList(companyData);
    } else if (field === 'party_type') {
      setCurrentFilterList(partyTypeData);
      setMasterList(partyTypeData);
    } else if (field === 'party') {
      setCurrentFilterList(partyData);
      setMasterList(partyData);
    }
  };

  const handleFilter = (value: string) => {
    if (value.trim() === '') {
      setCurrentFilterList(masterList);
    } else {
      setCurrentFilterList(masterList.filter((data) => data.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleInputChange = (e: any, type: any) => {
    const { name, value } = e.target;
    handleFilter(value);

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

  return (
    <div className="container-fluid px-3 py-2 bg-light" style={{ width: '1200px' }}>
      <h2 className="mb-3">Payment Reconciliation</h2>
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
              <label className="form-label">Party Type:</label>
              <input
                type="text"
                className="form-control"
                name="party_type"
                onKeyDown={(e) => handleKeyDown(e, 'party_type', 'Payment Reconciliation Party')}
                onFocus={handleInputFocus}
                onChange={(e) => handleInputChange(e, 'Payment Reconciliation Party')}
                value={initalPaymentReconcileCompanyData.party_type}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Party:</label>
              <input
                type="text"
                className="form-control"
                name="party"
                onKeyDown={(e) => handleKeyDown(e, 'party', 'party')}
                onFocus={handleInputFocus}
                onChange={(e) => handleInputChange(e, 'party')}
                value={initalPaymentReconcileCompanyData.party}
              />
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">Receivable/Payable Account:</label>
              <input
                type="text"
                name="Receivable/Payable Account"
                onKeyDown={(e) => handleKeyDown(e, '', '')}
                value={receivablePayableAccount}
                className="form-control"
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="form-label">Default Advance Account:</label>
              <input
                type="text"
                name="Default Advance Account"
                onKeyDown={(e) => handleKeyDown(e, '', '')}
                className="form-control"
                value={defaultAdvanceAccount}
              />
            </div>
          </div>
        </div>

        {/* Unreconcile Entries */}
        <div className="col-12">
          <h2 className="mb-3">Unreconciled Entries</h2>
        </div>
        <div className="col-md-6">
          <label className="form-label">Filter On Invoice:</label>
          <input
            type="text"
            className="form-control"
            value={invoiceFilter}
            onChange={(e) => setInvoiceFilter(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, '', '')}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Filter On Payment:</label>
          <input
            type="text"
            className="form-control"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, '', '')}
          />
        </div>

        {/* Unreconcile table */}
        <div className="col-md-6 mt-3">
          <table className="table table-bordered invoice-table">
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllInvoices}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
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
              {filteredInvoices.map((invoice: any, index: number) => (
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
          <table className="table table-bordered payment-table">
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllPayments}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
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
              {filteredPayments.map((payment: any, index: number) => (
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
          {/* {!company || !partyData || !party || selectedInvoices.length === 0 || selectedPayments.length === 0
            ? errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>
            : ''} */}
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
                  {allocationListData[0]?.allocation.map((entry: any, index: number) => (
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
