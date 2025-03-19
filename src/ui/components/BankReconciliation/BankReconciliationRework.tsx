'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import './bank-reconciliation.css';
import useFetchData from '../../hooks/fetchData';
import useGetAccountBalance from '../../hooks/bank_reconciliation/useAccountBalance';
import useErpTransaction from '../../hooks/bank_reconciliation/useErpTransaction';
import useBankTransaction from '../../hooks/bank_reconciliation/useBankTransaction';
import useAllocateList from '../../hooks/bank_reconciliation/useAllocateList';
import useReconcile from '../../hooks/bank_reconciliation/useReconcile';
import { useNavigate } from 'react-router-dom'; // Import navigate function
// import report from '../../../assets/files/unsaved-report.xlsx';
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
  const navigate = useNavigate();
  const [initalBankReconcileData, setInitalBankReconcileData] = useState({
    company: '',
    bank_account: '',
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0],
  });

  const company = initalBankReconcileData?.company;
  const bankAccount = initalBankReconcileData?.bank_account;
  const fromDate = initalBankReconcileData?.from_date;
  const toDate = initalBankReconcileData?.to_date;

  const [openingBal, setOpeningBal] = useState('');
  const [diffAmount, setDiffAmount] = useState('');
  const [closingBalErp, setClosingBalErp] = useState('');
  const [closingBalBank, setClosingBalBank] = useState('');

  const [selectedBankStatement, setSelectedBankStatement] = useState<any[]>([]);
  const [selectedErpTransaction, setSelectedErpTransaction] = useState<any[]>([]);
  const [hideAllocationTable, setHideAllocationTable] = useState<boolean>(false);
  const [showDateFilters, setShowDateFilters] = useState(true);

  const [fromStatementDate, setFromStatementDate] = useState<any>(new Date().toISOString().split('T')[0]);
  const [toStatementDate, setToStatementDate] = useState<any>(new Date().toISOString().split('T')[0]);
  const [fromErpDate, setFromErpDate] = useState<any>(new Date().toISOString().split('T')[0]);
  const [toErpDate, setToErpDate] = useState<any>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current.focus();
    }
    setShowFilter(true);
    setCurrentField('company');
    setCurrentFilterList(companyData);
    setMasterList(companyData);
  }, [companyData]);

  useEffect(() => {
    // Synchronize filter dates with main dates when they change
    setFromStatementDate(initalBankReconcileData.from_date);
    setToStatementDate(initalBankReconcileData.to_date);
    setFromErpDate(initalBankReconcileData.from_date);
    setToErpDate(initalBankReconcileData.to_date);
  }, [initalBankReconcileData.from_date, initalBankReconcileData.to_date]);

  const { accountBalanceInitialData, refreshData }: any = useGetAccountBalance(bankAccount, company, fromDate, toDate, token);
  const { erpTransaction, reFetchData } = useErpTransaction(bankAccount, fromErpDate, toErpDate, token);
  const { bankTransaction, refectBankTransaction } = useBankTransaction(bankAccount, company, fromStatementDate, toStatementDate, token);
  console.log('initial data @@@', bankTransaction, erpTransaction);
  const bankTransactionArray = Array.isArray(bankTransaction) ? bankTransaction : [];
  const erpTransactionArray = Array.isArray(erpTransaction) ? erpTransaction : [];
  const handleImportBankStatement = () => {
    navigate('/bank-statement-import');
  };

  const handleKeyDown = async (e: any, field?: any, type?: any) => {
    setInitalBankReconcileData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));

    const focusableElements = Array.from(
      formRef.current?.querySelectorAll("input, button, select, textarea, [tabindex]:not([tabindex='-1'])") || []
    ) as HTMLElement[];
    // console.log('focusableElements', focusableElements);
    const index = focusableElements.indexOf(e.currentTarget);
    // console.log('index', index);

    if (e.ctrlKey && e.key === 'Enter') {
      if (field === 'import_bank_statement') {
        handleImportBankStatement();
      }
      if (field === 'btn_allocate') {
        handleAllocation();
      }
      if (field === 'btn_reconcile') {
        handleReconcile();
      }
    } else if (e.key === 'Enter' && !showFilter) {
      e.preventDefault();
      if (field === 'to_date') {
        setOpeningBal(accountBalanceInitialData?.opening_balance);
        setClosingBalBank(accountBalanceInitialData?.bal_bnk);
        setClosingBalErp(accountBalanceInitialData?.erp_bal);
        setDiffAmount(accountBalanceInitialData?.difference_amount);
        // Recalling the APIs
        refreshData(); // Refresh account balance data
        reFetchData(); // Refresh ERP transaction data
        refectBankTransaction(); // Refresh bank transaction data
      }
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
      // if (field === 'party') {
      //   refreshData();
      // }

      setInitalBankReconcileData((prevData) => ({
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
        selectedValue = initalBankReconcileData.company;
        dataList = companyData;
        setCurrentFilterList(companyData);
        setMasterList(companyData);
      } else if (field === 'bank_account') {
        selectedValue = initalBankReconcileData.bank_account;
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

    // Update the main data
    setInitalBankReconcileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update filter dates independently
    if (name === 'from_statement_date') setFromStatementDate(value);
    if (name === 'to_statement_date') setToStatementDate(value);
    if (name === 'from_erp_date') setFromErpDate(value);
    if (name === 'to_erp_date') setToErpDate(value);
  };

  // Handle select all for bank statement - get complete objects
  const handleSelectAllBankStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBankStatement(bankTransaction);
    } else {
      setSelectedBankStatement([]);
    }
  };

  const handleBankStatementSelect = (data: any) => {
    setSelectedBankStatement((prev) => {
      // Use a unique identifier, such as a combination of name and date
      const uniqueId = `${data.name}`;
      const isSelected = prev.some((item) => `${item.name}` === uniqueId);

      if (isSelected) {
        // If already selected, remove it from the array
        return prev.filter((item) => `${item.name}` !== uniqueId);
      } else {
        // If not selected, add the complete invoice object to the array
        return [...prev, data];
      }
    });
  };

  // Handle select all for Erp Transaction - get complete objects

  const handleSelectAllErpTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedErpTransaction(erpTransaction);
    } else {
      setSelectedErpTransaction([]);
    }
  };

  const handleErpTransactionSelect = (data: any) => {
    setSelectedErpTransaction((prev) => {
      // Use 'name' as the unique identifier
      const isSelected = prev.some((item) => item.name === data.name);

      if (isSelected) {
        // If already selected, remove it from the array
        return prev.filter((item) => item.name !== data.name);
      } else {
        // If not selected, add the complete payment object to the array
        return [...prev, data];
      }
    });
  };

  const extractedBankTransactions = selectedBankStatement?.map((bankTransaction: any) => ({
    bank_transaction_id: bankTransaction?.name,
    deposit: bankTransaction?.deposit,
    withdraw: bankTransaction?.withdrawal,
    reference_no: bankTransaction?.reference_number,
    unallocated_amount: bankTransaction?.unallocated_amount,
  }));

  const extractedErpTransactions = selectedErpTransaction?.map((transaction: any) => ({
    date: transaction.posting_date,
    reference_id: transaction.name,
    reference_number: transaction.reference_no,
    deposit: transaction.deposit,
    remaining_amount: transaction.paid_amount,
    withdraw: transaction.withdraw,
    reference_doc: transaction.doctype,
  }));

  const { allocationListData, setAllocationListData, fetchData, allocateApiError, allocateErrorMsg } = useAllocateList(
    company,
    extractedBankTransactions,
    extractedErpTransactions,
    bankAccount,
    token
  );
  const handleAllocation = async () => {
    if (!company || !bankAccount || extractedBankTransactions.length === 0 || extractedErpTransactions.length === 0) {
      // setErrorMessage('Please select at least one invoice and one payment to reconcile');
      toast.error('Please select at least one Bank and one Erp transaction to reconcile', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
      return;
    }
    console.log('initial data @@@ in allocate fn', allocationListData);

    // Call the fetch function when the button is clicked
    fetchData();
    if (allocateApiError === true) {
      toast.warning(allocateErrorMsg, {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
    }
  };

  useEffect(() => {
    if (allocationListData && allocationListData.length > 0) {
      setHideAllocationTable(false);
    }
  }, [allocationListData]);
  const { reconcileData, fetchReconcile, apiError, apiErrorMessage } = useReconcile();

  const handleReconcile = async () => {
    const reconcileDataa = await fetchReconcile(allocationListData, token);
    console.log(' initial data @@@ reconcile data fetched on button click:', reconcileDataa, reconcileData);
    if (
      (Array.isArray(reconcileDataa) && reconcileDataa.length > 0) ||
      (typeof reconcileDataa.data === 'object' && Object.keys(reconcileDataa.data).length > 0)
    ) {
      toast.success('Reconciliation successful!', {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
      setSelectedBankStatement([]);
      setSelectedErpTransaction([]);
      // if (allocationListData.length > 0) {

      // }
      setAllocationListData([]);

      // Recalling the APIs
      refreshData(); // Refresh account balance data
      reFetchData(); // Refresh ERP transaction data
      refectBankTransaction(); // Refresh bank transaction data
    } else if (apiError === true) {
      toast.warning(apiErrorMessage, {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        className: 'custom-toast', // Custom class
      });
    }
  };

  useEffect(() => {
    if (!isQuitModalOpen) {
      setTimeout(() => {
        inputRefs.current?.focus();
      }, 100);
    }
  }, [isQuitModalOpen]);

  return (
    <div
      className={`container-fluid px-3 py-2 bg-light ${showFilter ? 'limited-width' : 'full-width'}`} // Conditionally apply class
    >
      <div className="row mb-4" ref={formRef} tabIndex={0}>
        <div className="col-md-6">
          <h2 className="mb-3">Bank Reconciliation</h2>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={handleImportBankStatement} onKeyDown={(e) => handleKeyDown(e, 'import_bank_statement')}>
              Import Bank Statement
            </button>
          </div>
        </div>
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
                value={initalBankReconcileData.company}
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
                value={initalBankReconcileData.bank_account}
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
                value={initalBankReconcileData.from_date}
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
                value={initalBankReconcileData.to_date}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Opening Balance</label>
              <p
                className="form-control-like"
                onKeyDown={(e) => handleKeyDown(e, 'opening_balance')}
                onFocus={handleInputFocus}
                onClick={() => handleInputChange({ target: { name: 'opening_balance', value: openingBal } }, 'opening_balance')}
              >
                {openingBal}
              </p>
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">Closing Balance as per Bank Statement:</label>
              <p className="form-control-like" onKeyDown={(e) => handleKeyDown(e, '', '')}>
                {closingBalBank}
              </p>
            </div>
            <div className="col-12 mt-3">
              <label className="form-label">Closing Balance as per ERP:</label>
              <p className="form-control-like" onKeyDown={(e) => handleKeyDown(e, '', '')}>
                {closingBalErp}
              </p>
            </div>

            <div className="col-12 mt-3">
              <label className="form-label">Difference Amount:</label>
              <p className="form-control-like" onKeyDown={(e) => handleKeyDown(e, '', '')}>
                {diffAmount}
              </p>
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
                    value={fromStatementDate}
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
                    value={fromErpDate}
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
                    value={toStatementDate}
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
                    value={toErpDate}
                    onKeyDown={(e) => handleKeyDown(e, 'to_erp_date')}
                    onChange={(e) => handleInputChange(e, 'to_erp_date')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unreconcile Entries */}
        <div className="col-12 mt-3">
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
                    onChange={handleSelectAllBankStatement}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedBankStatement.length === bankTransaction?.length && bankTransaction?.length > 0}
                  />
                </th>
                <th className="fs-10">Date</th>
                <th className="fs-10">Bank Transaction ID</th>
                <th className="fs-10">Description</th>
                <th className="fs-10">Deposit</th>
                <th className="fs-10">Withdrawal</th>
                <th className="fs-10">Reference Number</th>
                <th className="fs-10">UnAllocated Amount</th>{' '}
              </tr>
            </thead>
            <tbody>
              {bankTransactionArray.length > 0 &&
                bankTransaction?.map((bankStatementData: any, index: number) => {
                  const uniqueId = `${bankStatementData.name}`;
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedBankStatement.some((item) => `${item.name}` === uniqueId)}
                          onChange={() => handleBankStatementSelect(bankStatementData)}
                          onKeyDown={(e) => handleKeyDown(e, '', '')}
                        />
                      </td>
                      <td>{bankStatementData?.date}</td>
                      <td>{bankStatementData?.name}</td>
                      <td>{bankStatementData?.description || '-'}</td>
                      <td>{bankStatementData?.deposit}</td>
                      <td>{bankStatementData?.withdrawal}</td>
                      <td>{bankStatementData?.reference_number || '-'}</td>
                      <td>{bankStatementData?.unallocated_amount}</td>{' '}
                    </tr>
                  );
                })}
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
                    onChange={handleSelectAllErpTransaction}
                    onKeyDown={(e) => handleKeyDown(e, '', '')}
                    checked={selectedErpTransaction.length === erpTransaction?.length && erpTransaction?.length > 0}
                  />
                </th>
                <th className="fs-10">Date</th>
                <th className="fs-10">Reference ID</th>
                <th className="fs-10">Deposit</th>
                <th className="fs-10">Withdrawal</th>
                <th className="fs-10">Reference Number</th>
                <th className="fs-10">Remaining Amount</th>
                <th className="fs-10">Reference Doc</th>{' '}
              </tr>
            </thead>
            <tbody>
              {erpTransactionArray.length > 0 &&
                erpTransaction?.map((erpTransactionData: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onKeyDown={(e) => handleKeyDown(e, '', '')}
                          // Check if the item is selected using 'name' as the unique identifier
                          checked={selectedErpTransaction.some((item) => item.name === erpTransactionData.name)}
                          onChange={() => handleErpTransactionSelect(erpTransactionData)}
                        />
                      </td>
                      <td>{erpTransactionData.posting_date}</td>
                      <td>{erpTransactionData.name}</td>
                      <td>{erpTransactionData?.deposit || '-'}</td>
                      <td>{erpTransactionData?.withdraw || '-'}</td>
                      <td>{erpTransactionData.reference_no}</td>
                      <td>{erpTransactionData.paid_amount}</td>
                      <td>{erpTransactionData.doctype}</td>
                    </tr>
                  );
                })}
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
                    <th>Bank Transaction ID</th>
                    <th>Matched Amount</th>
                    <th>Reference ID</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationListData?.map((entry: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entry.bank_transaction_id}</td>
                      <td>{entry.matched_amount}</td>
                      <td>{entry.reference_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showFilter && (
        <div className="filter-container">
          <ShowFilter filteredItems={currentFilterList} selectedIndex={selectedIndex} handleItemFocus={setSelectedIndex} right="0" top="58px" />
        </div>
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
