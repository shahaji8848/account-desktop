'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { companies, partyTypes, parties, invoices, payments } from '../../utils/paymentReconcile';
import ShowFilter from '../common/ShowFilter';
interface ReconciledEntry {
  id: number;
  referenceNo: string;
  invoiceNumber: string;
  allocatedAmount: number;
  differenceAmount: number;
}
export default function PaymentReconciliation() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedPartyType, setSelectedPartyType] = useState<any>(null);
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [receivableAccount, setReceivableAccount] = useState('');
  const [advanceAccount, setAdvanceAccount] = useState('');
  const [invoiceFilter, setInvoiceFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [reconciledEntries, setReconciledEntries] = useState<ReconciledEntry[]>([]);

  // Handle company selection
  const handleCompanyChange = (selectedOption: any) => {
    setSelectedCompany(selectedOption);
    setSelectedPartyType(null);
    setSelectedParty(null);
    setReceivableAccount('');
    setAdvanceAccount('');
  };

  // Handle party type selection
  const handlePartyTypeChange = (selectedOption: any) => {
    setSelectedPartyType(selectedOption);
    setSelectedParty(null);
    setReceivableAccount('');
    setAdvanceAccount('');
  };

  // Handle party selection
  const handlePartyChange = (selectedOption: any) => {
    setSelectedParty(selectedOption);

    const selectedPartyData = parties[selectedPartyType.value as keyof typeof parties]?.find((p) => p.id === selectedOption.value);

    if (selectedPartyData) {
      setReceivableAccount(selectedPartyData.receivableAccount);
      setAdvanceAccount(selectedPartyData.advanceAccount);
    }
  };

  // Filter invoices
  useEffect(() => {
    const filtered = invoices.filter((invoice) => invoice.invoiceNumber.toLowerCase().includes(invoiceFilter.toLowerCase()));
    setFilteredInvoices(filtered);
  }, [invoiceFilter]);

  // Filter payments
  useEffect(() => {
    const filtered = payments.filter((payment) => payment.referenceName.toLowerCase().includes(paymentFilter.toLowerCase()));
    setFilteredPayments(filtered);
  }, [paymentFilter]);

  // Handle invoice checkbox selection
  const handleInvoiceSelect = (id: number) => {
    setSelectedInvoices((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Handle payment checkbox selection
  const handlePaymentSelect = (id: number) => {
    setSelectedPayments((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleReconcile = () => {
    if (selectedInvoices.length === 0 || selectedPayments.length === 0) {
      alert('Please select at least one invoice and one payment to reconcile');
      return;
    }

    const selectedInvoiceData = filteredInvoices.filter((inv) => selectedInvoices.includes(inv.id));
    const selectedPaymentData = filteredPayments.filter((pay) => selectedPayments.includes(pay.id));

    const newReconciledEntries = selectedInvoiceData.flatMap((invoice, index) => {
      return selectedPaymentData.map((payment, pIndex) => ({
        id: Date.now() + index + pIndex,
        referenceNo: payment.referenceName,
        invoiceNumber: invoice.invoiceNumber,
        allocatedAmount: Math.min(invoice.outstandingAmount, payment.amount),
        differenceAmount: payment.amount - invoice.outstandingAmount,
      }));
    });

    setReconciledEntries((prev) => [...prev, ...newReconciledEntries]);

    // Clear selections after reconciliation
    setSelectedInvoices([]);
    setSelectedPayments([]);
  };

  return (
    <div className="container-fluid p-4 bg-light">
      <h2 className="mb-4">Payment Reconciliation</h2>

      {/* Form Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Company:</label>
            <Select
              options={companies.map((company) => ({ value: company.id, label: company.name }))}
              value={selectedCompany}
              onChange={handleCompanyChange}
              isSearchable
              placeholder="Select Company"
              isClearable
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Party Type:</label>
            <Select
              options={
                selectedCompany
                  ? partyTypes[selectedCompany.value as keyof typeof partyTypes]?.map((type) => ({ value: type.id, label: type.name }))
                  : []
              }
              value={selectedPartyType}
              onChange={handlePartyTypeChange}
              isSearchable
              placeholder="Select Party Type"
              isDisabled={!selectedCompany}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Party:</label>
            <Select
              options={
                selectedPartyType
                  ? parties[selectedPartyType.value as keyof typeof parties]?.map((party) => ({ value: party.id, label: party.name }))
                  : []
              }
              value={selectedParty}
              onChange={handlePartyChange}
              isSearchable
              placeholder="Select Party"
              isDisabled={!selectedPartyType}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Receivable/Payable Account:</label>
            <input type="text" className="form-control" value={receivableAccount} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Default Advance Account:</label>
            <input type="text" className="form-control" value={advanceAccount} readOnly />
          </div>
        </div>
      </div>

      {/* Unreconciled Entries Section */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Unreconciled Entries</h3>
        <button className="btn btn-primary" onClick={handleReconcile} disabled={selectedInvoices.length === 0 || selectedPayments.length === 0}>
          Allocate
        </button>
      </div>
      <div className="row">
        {/* Invoices Table */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Filter On Invoice:</label>
            <input
              type="text"
              className="form-control"
              value={invoiceFilter}
              onChange={(e) => setInvoiceFilter(e.target.value)}
              placeholder="Filter invoices..."
            />
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const ids = filteredInvoices.map((inv) => inv.id);
                        setSelectedInvoices(e.target.checked ? ids : []);
                      }}
                    />
                  </th>
                  <th>Invoice Type</th>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Amount</th>
                  <th>Outstanding Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <input type="checkbox" checked={selectedInvoices.includes(invoice.id)} onChange={() => handleInvoiceSelect(invoice.id)} />
                    </td>
                    <td>{invoice.invoiceType}</td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.invoiceDate}</td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.outstandingAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payments Table */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Filter On Payment:</label>
            <input
              type="text"
              className="form-control"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              placeholder="Filter payments..."
            />
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const ids = filteredPayments.map((pay) => pay.id);
                        setSelectedPayments(e.target.checked ? ids : []);
                      }}
                    />
                  </th>
                  <th>Reference Type</th>
                  <th>Reference Name</th>
                  <th>Posting Date</th>
                  <th>Amount</th>
                  <th>Difference Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <input type="checkbox" checked={selectedPayments.includes(payment.id)} onChange={() => handlePaymentSelect(payment.id)} />
                    </td>
                    <td>{payment.referenceType}</td>
                    <td>{payment.referenceName}</td>
                    <td>{payment.postingDate}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.differenceAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Reconciled Entries Table */}
        {reconciledEntries.length > 0 && (
          <div className="mt-4 col-md-12">
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
                  {reconciledEntries.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>{index + 1}</td>
                      <td>{entry.referenceNo}</td>
                      <td>{entry.invoiceNumber}</td>
                      <td>{entry.allocatedAmount}</td>
                      <td>{entry.differenceAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* <ShowFilter filteredItems={companies} selectedIndex={selectedIndex} /> */}
    </div>
  );
}
