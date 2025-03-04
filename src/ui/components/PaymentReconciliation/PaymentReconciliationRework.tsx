'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import useCompanyData from '../../hooks/payment_reconciliation/useCompanyData';
import usePartyData from '../../hooks/payment_reconciliation/usePartyData';
import usePartyTypeData from '../../hooks/payment_reconciliation/usePartyTypeData';
import useUnreconcileEntriesData from '../../hooks/payment_reconciliation/useUnreconcileEntriesData';

interface Company {
  id: number;
  name: string;
}

interface PartyType {
  id: number;
  name: string;
}

interface Party {
  id: number;
  name: string;
  receivableAccount: string;
  advanceAccount: string;
}

export default function PaymentReconciliationRework() {
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

  // Fetching data only when all values are available
  const { receivablePayableAccount, defaultAdvanceAccount, invoiceData, paymnentData }: any = useUnreconcileEntriesData(
    initalPaymentReconcileCompanyData?.company,
    initalPaymentReconcileCompanyData?.party_type,
    initalPaymentReconcileCompanyData?.party
  );

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
    if (e.key === 'Enter' && !showFilter) {
      console.log('enter');
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
      console.log('enter --->');

      e.preventDefault();
      setInitalPaymentReconcileCompanyData((prevData) => ({
        ...prevData,
        [currentField]: currentFilterList[selectedIndex]?.name || currentFilterList[selectedIndex],
      }));
      setShowFilter(false);
      setSelectedIndex(0);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name: field } = e.target;
    setShowFilter(false);
    if (field === 'company' || field === 'party_type' || field === 'party') {
      setShowFilter(true);
      setCurrentField(field);
      setSelectedIndex(0);
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

  return (
    <div className="container-fluid p-4 bg-light">
      <h2 className="mb-4">Payment Reconciliation</h2>
      <div className="row mb-4" ref={formRef}>
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
              <input type="text" name="Receivable/Payable Account" value={receivablePayableAccount} className="form-control" />
            </div>
            <div className="col-md-12 mt-3">
              <label className="form-label">Default Advance Account:</label>
              <input type="text" name="Default Advance Account" className="form-control" value={defaultAdvanceAccount} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Filter On Invoice:</label>
          <input type="text" name="Filter On Invoice" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Filter On Payment:</label>
          <input type="text" name="Filter On Payments" className="form-control" />
        </div>
      </div>
      {showFilter && (
        <ShowFilter filteredItems={currentFilterList} selectedIndex={selectedIndex} handleItemFocus={setSelectedIndex} right="0" top="58px" />
      )}
    </div>
  );
}
