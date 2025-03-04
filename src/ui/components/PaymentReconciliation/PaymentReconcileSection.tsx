'use client';
import React, { useState, useEffect, useRef } from 'react';
import useAllocateList from '../../hooks/payment_reconciliation/useAllocateList';
import useReconcile from '../../hooks/payment_reconciliation/useReconcile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ReconciledEntry {
  id: number;
  referenceNo: string;
  invoiceNumber: string;
  allocatedAmount: number;
  differenceAmount: number;
}

export default function PaymentReconcileSection({
  invoiceFilterRef,
  invoiceData,
  paymnentData,
  company,
  partyType,
  party,
  setInvoiceData,
  setPaymentData,
  refreshData,
}: any) {
  console.log('selected@ in reconcile section', company, partyType, party);
  const [invoiceFilter, setInvoiceFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoiceData);
  const [filteredPayments, setFilteredPayments] = useState(paymnentData);
  const { allocationListData, fetchAllocationList } = useAllocateList();
  const { reconcileData, fetchReconcile } = useReconcile();
  console.log('allocation ');
  // Store complete objects instead of just IDs
  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<any[]>([]);

  const [reconciledEntries, setReconciledEntries] = useState<ReconciledEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for input fields and tables
  const paymentFilterRef = useRef<HTMLInputElement>(null);
  const invoiceTableRef = useRef<HTMLTableElement>(null);
  const paymentTableRef = useRef<HTMLTableElement>(null);
  const allocateButtonRef = useRef<HTMLButtonElement>(null);
  const reconcileButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (document.activeElement === invoiceFilterRef.current) {
        paymentFilterRef.current?.focus();
      } else if (document.activeElement === paymentFilterRef.current) {
        invoiceTableRef.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      } else if (document.activeElement?.closest('.invoice-table')) {
        const checkboxes = invoiceTableRef.current?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        const currentIndex = Array.from(checkboxes || []).indexOf(document.activeElement as HTMLInputElement);
        if (currentIndex !== -1 && currentIndex < (checkboxes?.length || 0) - 1) {
          checkboxes?.[currentIndex + 1]?.focus();
        } else {
          paymentTableRef.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
        }
      } else if (document.activeElement?.closest('.payment-table')) {
        const checkboxes = paymentTableRef.current?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        const currentIndex = Array.from(checkboxes || []).indexOf(document.activeElement as HTMLInputElement);
        if (currentIndex !== -1 && currentIndex < (checkboxes?.length || 0) - 1) {
          checkboxes?.[currentIndex + 1]?.focus();
        } else {
          allocateButtonRef.current?.focus();
        }
      }
    }

    if (e.key === ' ' && document.activeElement instanceof HTMLInputElement && document.activeElement.type === 'checkbox') {
      e.preventDefault();
      (document.activeElement as HTMLInputElement).click();
    }

    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();

      if (document.activeElement === allocateButtonRef.current) {
        // If "Allocate" is focused, call handleReconcile
        handleAllocation();
      } else if (document.activeElement === reconcileButtonRef.current) {
        handleReconcile();
      } else {
        // Otherwise, move focus to the first payment checkbox
        paymentTableRef.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      }
    }
  };

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
  console.log('filtered', filteredInvoices);

  const handleAllocation = async () => {
    if (!company || !partyType || !party || selectedInvoices.length === 0 || selectedPayments.length === 0) {
      setErrorMessage('Please select at least one invoice and one payment to reconcile');
      return;
    }

    // Call the fetch function when the button is clicked
    const data = await fetchAllocationList(company, partyType, party, selectedInvoices, selectedPayments);
    console.log('Allocation data fetched on button click:', data);

    if (data?.allocation && data?.allocation.length > 0) {
      toast.success('Allocation List Fetched Successfully', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
      });
    }

    // You can add additional logic here to handle the response
    // For example, you might want to show a success message or update the UI
  };
  console.log('Allocation data fetched custom hook', allocationListData);

  console.log('Selected Invoices:', selectedInvoices);
  console.log('Selected Payments:', selectedPayments);

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

    toast.success(messageObject.message, {
      position: 'top-right',
      autoClose: 3000, // Closes after 3 seconds
    });

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

    // setTimeout(() => {
    //   invoiceFilterRef.current?.focus(); // Move focus to invoice search field
    // }, 0);
  };
  console.log('reconcile data fetched on custom hook:', allocationListData);

  return (
    <div className="container-fluid p-4 bg-light" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="row mb-3">
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
            ref={invoiceFilterRef}
            // placeholder="Filter invoices..."
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Filter On Payment:</label>
          <input
            type="text"
            className="form-control"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            ref={paymentFilterRef}
            // placeholder="Filter payments..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <table className="table table-bordered invoice-table" ref={invoiceTableRef}>
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllInvoices}
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

        <div className="col-md-6">
          <table className="table table-bordered payment-table" ref={paymentTableRef}>
            <thead className="table-primary">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllPayments}
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
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-end">
          {allocationListData?.length > 0 && (
            <div className="me-3">
              <button className="btn btn-secondary" ref={reconcileButtonRef} onClick={handleReconcile}>
                Reconcile
              </button>
            </div>
          )}
          <div>
            <button
              className="btn btn-primary"
              ref={allocateButtonRef}
              onClick={handleAllocation}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  reconcileButtonRef.current?.focus();
                }
              }}
            >
              Allocate
            </button>
          </div>
        </div>
        {!company || !partyType || !party || selectedInvoices.length === 0 || selectedPayments.length === 0
          ? errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>
          : ''}
      </div>

      {allocationListData?.length > 0 && (
        <div className="mt-4 col-md-12 reconciled-table" tabIndex={-1}>
          <h3 className="mb-3">Reconciled Entries</h3>
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
  );
}
