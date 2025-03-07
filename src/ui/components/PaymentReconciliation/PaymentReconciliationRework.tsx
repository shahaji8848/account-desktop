'use client';
import type React from 'react';
import ShowFilter from '../common/ShowFilter';
import 'react-toastify/dist/ReactToastify.css';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';
import useHandleKeys from '../../hooks/payment_reconciliation/useHandleKeys';

export default function PaymentReconciliationRework({ homeHookData, globalData }: any) {
  const {
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
  } = useHandleKeys(homeHookData, globalData);

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
                value={company}
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
                value={partyType}
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
                value={party}
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
