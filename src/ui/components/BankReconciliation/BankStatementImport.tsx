'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';
// import './bank-reconciliation.css';
import useFetchData from '../../hooks/fetchData';
import './file-upload.css';
import { MdInsertLink } from 'react-icons/md';

export default function BankStatementImport({ homeHookData, globalData }: any) {
  const token = localStorage.getItem('account_desktop_token');
  const companyData = useFetchData('Company', {}, token);
  const bankData = useFetchData('Bank Account', {}, token);
  // console.log('Bank@@@ company hook called', companyData);
  const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
  const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
  const [masterList, setMasterList] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentField, setCurrentField] = useState<any>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const formRef = useRef<any>(null);
  const inputRefs = useRef<any>(null);

  const [initalBankReconcileData, setInitalBankReconcileData] = useState({
    company: '',
    bank_account: '',
    importFromGoogleSheets: '',
  });

  const company = initalBankReconcileData?.company;
  const bankAccount = initalBankReconcileData?.bank_account;

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
      if (field === 'btn_allocate') {
        // handleAllocation();
      }
      if (field === 'btn_reconcile') {
        // handleReconcile();
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
    const { name: field, value } = e.target;
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
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>('');
  const fileInputRef = useRef<any>(null); // Create a ref for the file input

  const handleClearFile = () => {
    setSelectedFile(null);
    setFilePath('');
    setTimeout(() => {
      fileInputRef.current?.focus(); // Use a timeout to ensure focus is set after re-render
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePath(`/public/files/${file.name}`);
      const downloadButton: any = document.querySelector('.btn.btn-secondary');
      downloadButton?.focus();
    }
  };

  useEffect(() => {
    if (!isQuitModalOpen) {
      setTimeout(() => {
        inputRefs.current?.focus();
      }, 100);
    }
  }, [isQuitModalOpen]);

  console.log('file', initalBankReconcileData.importFromGoogleSheets, selectedFile, filePath);

  return (
    <div className={` px-3 py-2 bg-light`} style={{ width: showFilter ? '1200px' : '100%' }}>
      <div className="row mb-4" ref={formRef} tabIndex={0}>
        <div className="col-md-12">
          <h2 className="mb-3">Bank Statement Import</h2>
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
            <div className="col-12 mt-4">
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
            {/* <div className="col-12 mt-3">
              <label className="form-label">Bank</label>
              <p
                className="form-control-like"
                onKeyDown={(e) => handleKeyDown(e, 'Bank')}
                onFocus={handleInputFocus}
                onClick={() => handleInputChange({ target: { name: 'Bank', value: '' } }, 'Bank')}
              >
                Test
              </p>
            </div> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {selectedFile ? (
              ''
            ) : (
              <>
                <div className="col-12">
                  <label className="form-label">Import From Google Sheets</label>
                  <input
                    type="text"
                    className="form-control"
                    name="importFromGoogleSheets"
                    onKeyDown={(e) => handleKeyDown(e, 'importFromGoogleSheets', 'Import From Google Sheets')}
                    onFocus={handleInputFocus}
                    onChange={(e) => handleInputChange(e, 'importFromGoogleSheets')}
                    value={initalBankReconcileData.importFromGoogleSheets}
                  />
                  <p className="mb-0 mt-1">
                    Must be publicly accessible Google Sheets URL and adding Bank Account column is necessary for importing via Google Sheets
                  </p>
                </div>
                <div className="col-12 mt-3">
                  <h6>OR</h6>
                </div>
              </>
            )}
            <div className={`col-md-12 ${selectedFile ? '' : 'mt-3'}`}>
              <div className={`${selectedFile ? '' : 'mt-1'}`}>
                <label className="form-label">Import File</label>
              </div>

              {!selectedFile ? (
                <div className="mb-3">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    ref={fileInputRef} // Attach the ref to the file input
                    onKeyDown={(e) => handleKeyDown(e, 'choose_file', 'choose file')}
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <div className="d-flex align-items-center rounded p-2 bg-white" style={{ height: '31.6px' }}>
                    <MdInsertLink className="text-secondary fs-20" />
                    <span className="text-muted flex-grow-1 ms-2">{filePath}</span>
                    <div className="ms-2">
                      <button className="btn btn-link text-dark bold" onClick={handleClearFile} onKeyDown={(e) => handleKeyDown(e, '', '')}>
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-secondary" onKeyDown={(e) => handleKeyDown(e, '', '')}>
                {' '}
                Download Template
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex justify-content-end">
            <div className="me-3">
              <button className="btn btn-primary" onKeyDown={(e) => handleKeyDown(e, '', '')}>
                Save
              </button>
            </div>
          </div>
        </div>
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
