'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import ShowFilter from '../common/ShowFilter';
import useUnreconcileEntriesData from '../../hooks/payment_reconciliation/useUnreconcileEntriesData';
import PaymentReconcileSection from './PaymentReconcileSection';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';
import useFetchData from '../../hooks/payment_reconciliation/fetchData';

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
  receivableAccount?: string;
  advanceAccount?: string;
}

interface ReconciledEntry {
  id: number;
  referenceNo: string;
  invoiceNumber: string;
  allocatedAmount: number;
  differenceAmount: number;
}

export default function PaymentReconciliation({ homeHookData, globalData }: any) {
  const token = localStorage.getItem('account_desktop_token');
  const companyData = useFetchData('Company', token);
  const partyData = useFetchData('Customer', token);
  const partyTypeData = useFetchData('Payment Reconciliation Party', token);
  const { isQuitModalOpen, setIsQuitModalOpen } = globalData;

  // console.log('filter data', companyData, partyData, partyTypeData);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [showCompanyFilter, setShowCompanyFilter] = useState(false);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);

  const [selectedPartyType, setSelectedPartyType] = useState<PartyType | null>(null);
  // console.log('party type', selectedPartyType?.name);
  const [partyTypeFilter, setPartyTypeFilter] = useState('');
  const [filteredPartyTypes, setFilteredPartyTypes] = useState<PartyType[]>([]);
  const [showPartyTypeFilter, setShowPartyTypeFilter] = useState(false);
  const [selectedPartyTypeIndex, setSelectedPartyTypeIndex] = useState(0);

  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [partyFilter, setPartyFilter] = useState('');
  const [filteredParties, setFilteredParties] = useState<Party[]>([]);
  const [showPartyFilter, setShowPartyFilter] = useState(false);
  const [selectedPartyIndex, setSelectedPartyIndex] = useState(0);

  const [receivableAccount, setReceivableAccount] = useState('');
  const [advanceAccount, setAdvanceAccount] = useState('');
  const companyInputRef = useRef<HTMLInputElement>(null);
  const partyTypeInputRef = useRef<HTMLInputElement>(null);
  const partyInputRef = useRef<HTMLInputElement>(null);
  const advanceAccountRef = useRef<HTMLInputElement>(null);

  // Refs for input fields and tables
  const invoiceFilterRef = useRef<HTMLInputElement>(null);
  // Data from api

  useEffect(() => {
    // Add index as id to the API response data
    const companiesWithIds = companyData.map((company: any, index: number) => ({
      ...company,
      id: index,
    }));

    const partyTypesWithIds = partyTypeData.map((partyType: any, index: number) => ({
      ...partyType,
      id: index,
    }));

    setFilteredCompanies(companiesWithIds);
    setFilteredPartyTypes(partyTypesWithIds);
    setShowCompanyFilter(true);
    setTimeout(() => companyInputRef.current?.focus(), 100);
  }, [companyData, partyTypeData]);

  const {
    receivablePayableAccount,
    defaultAdvanceAccount,
    invoiceData,
    paymnentData,
    setInvoiceData,
    setPaymentData,
    refreshData,
    setInvoiceFilter,
    setPaymentFilter,
  }: any = useUnreconcileEntriesData(selectedCompany?.name, selectedPartyType?.name, selectedParty?.name);

  // console.log('data@@', receivablePayableAccount, defaultAdvanceAccount, invoiceData, paymnentData);

  useEffect(() => {
    if (advanceAccount) {
      setTimeout(() => advanceAccountRef.current?.focus(), 100);
    }
  }, [advanceAccount]);

  const handleFilterChange = (value: string, type: 'company' | 'partyType' | 'party') => {
    if (type === 'company') {
      setCompanyFilter(value);
      const filtered = companyData.map((c, index) => ({ ...c, id: index })).filter((c) => c.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredCompanies(filtered);
      setShowCompanyFilter(filtered.length > 0);
      setSelectedCompanyIndex(0);
    } else if (type === 'partyType') {
      setPartyTypeFilter(value);
      const filtered = partyTypeData
        .map((p: any, index: number) => ({ ...p, id: index }))
        .filter((p: any) => p.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredPartyTypes(filtered);
      setShowPartyTypeFilter(filtered.length > 0);
      setSelectedPartyTypeIndex(0);
    } else if (type === 'party') {
      setPartyFilter(value);
      // Filter the party data based on input value
      const filtered = partyData
        .map((p: any, index: number) => ({
          ...p,
          id: index,
        }))
        .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()));

      setFilteredParties(filtered);
      setShowPartyFilter(filtered.length > 0);
      setSelectedPartyIndex(0);
    }
  };
  const handleSelection = (item: Company | PartyType | Party, type: 'company' | 'partyType' | 'party') => {
    if (type === 'company') {
      setSelectedCompany(item as Company);
      setCompanyFilter(item.name);
      setShowCompanyFilter(false);

      setTimeout(() => {
        partyTypeInputRef.current?.focus();
        if (filteredPartyTypes.length > 0) setShowPartyTypeFilter(true);
      }, 100);
    } else if (type === 'partyType') {
      setSelectedPartyType(item as PartyType); // ✅ Update only selectedPartyType
      setPartyTypeFilter(item.name);
      setShowPartyTypeFilter(false);

      // Ensure filteredParties is updated with IDs, but do not overwrite selectedParty
      const partiesWithIds = partyData.map((party, index) => ({
        ...party,
        id: index,
      }));
      setFilteredParties(partiesWithIds);

      setTimeout(() => {
        partyInputRef.current?.focus();
        setShowPartyFilter(true);
      }, 100);
    } else if (type === 'party') {
      const selected = item as Party;
      setSelectedParty(selected); // ✅ Ensure only selectedParty is updated
      setPartyFilter(selected.name);
      setShowPartyFilter(false);

      // Set account values only for party selection
      setReceivableAccount(receivablePayableAccount);
      setAdvanceAccount(defaultAdvanceAccount);

      setTimeout(() => {
        advanceAccountRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'company' | 'partyType' | 'party') => {
    const handlers = {
      company: { filter: filteredCompanies, index: selectedCompanyIndex, setIndex: setSelectedCompanyIndex },
      partyType: { filter: filteredPartyTypes, index: selectedPartyTypeIndex, setIndex: setSelectedPartyTypeIndex },
      party: { filter: filteredParties, index: selectedPartyIndex, setIndex: setSelectedPartyIndex },
    };

    const { filter, index, setIndex } = handlers[type];

    if (filter.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((prev) => (prev + 1) % filter.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((prev) => (prev - 1 + filter.length) % filter.length);
      } else if (e.key === 'Tab') {
        // If Shift+Tab, move focus backward
        if (e.shiftKey) {
          // Don't prevent default for shift+tab to allow natural backward navigation
          return;
        } else {
          e.preventDefault();
          // Move focus forward if selection exists
          if (index >= 0) {
            handleSelection(filter[index], type);
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (index >= 0) {
          handleSelection(filter[index], type);
        }
      } else if (e.key === 'Escape') {
        if (type === 'company') setShowCompanyFilter(false);
        if (type === 'partyType') setShowPartyTypeFilter(false);
        if (type === 'party') setShowPartyFilter(false);
        setIsQuitModalOpen(true);
      }
    }
  };

  const handleFocus = (type: 'company' | 'partyType' | 'party') => {
    if (type === 'company') {
      setShowCompanyFilter(filteredCompanies.length > 0);
    } else if (type === 'partyType') {
      setShowPartyTypeFilter(filteredPartyTypes.length > 0);
    } else if (type === 'party') {
      // Always show party filter when party input is focused and we have filtered parties
      setShowPartyFilter(filteredParties.length > 0);
    }
  };

  const handleBlur = (type: 'company' | 'partyType' | 'party') => {
    // Use setTimeout to allow click events on the filter to complete before hiding
    setTimeout(() => {
      if (type === 'company') setShowCompanyFilter(false);
      if (type === 'partyType') setShowPartyTypeFilter(false);
      if (type === 'party') setShowPartyFilter(false);
    }, 200);
  };

  // Update account values whenever selectedParty changes
  useEffect(() => {
    if (selectedParty) {
      setReceivableAccount(receivablePayableAccount);
      setAdvanceAccount(defaultAdvanceAccount);
    }
  }, [selectedParty, receivablePayableAccount, defaultAdvanceAccount]);

  //

  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuitModalOpen(true);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleEscapePress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [setIsQuitModalOpen]);

  useEffect(() => {
    if (!isQuitModalOpen) {
      setTimeout(() => {
        companyInputRef.current?.focus();
      }, 100);
    }
  }, [isQuitModalOpen]);
  // console.log('selected@', selectedCompany, selectedParty, selectedPartyType);
  // console.log('selected@ in reconcile section', selectedCompany?.name, selectedParty?.name, selectedPartyType?.name);

  return (
    <div
    // style={{ width: showCompanyFilter || showPartyTypeFilter || showPartyFilter ? '1230px' : '1536px' }}
    >
      <div className="container-fluid p-4 bg-light">
        <h2 className="mb-4">Payment Reconciliation</h2>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <div>
                  <label className="form-label">Company:</label>
                  <input
                    ref={companyInputRef}
                    type="text"
                    className="form-control"
                    value={companyFilter}
                    onChange={(e) => handleFilterChange(e.target.value, 'company')}
                    onKeyDown={(e) => handleKeyDown(e, 'company')}
                    onFocus={() => handleFocus('company')}
                    onBlur={() => handleBlur('company')}
                  />
                  {showCompanyFilter && (
                    <ShowFilter
                      filteredItems={filteredCompanies}
                      selectedIndex={selectedCompanyIndex}
                      handleClick={(item: any) => handleSelection(item, 'company')}
                      right="0"
                      top="58px"
                    />
                  )}
                </div>
              </div>
              <div className="col-12 mt-3">
                <div>
                  <label className="form-label">Party Type:</label>
                  <input
                    ref={partyTypeInputRef}
                    type="text"
                    className="form-control"
                    value={partyTypeFilter}
                    onChange={(e) => handleFilterChange(e.target.value, 'partyType')}
                    onKeyDown={(e) => handleKeyDown(e, 'partyType')}
                    onFocus={() => handleFocus('partyType')}
                    onBlur={() => handleBlur('partyType')}
                  />
                  {showPartyTypeFilter && (
                    <ShowFilter
                      filteredItems={filteredPartyTypes}
                      selectedIndex={selectedPartyTypeIndex}
                      handleClick={(item: any) => handleSelection(item, 'partyType')}
                      right="0"
                      top="58px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <div>
                  <label className="form-label">Party:</label>
                  <input
                    ref={partyInputRef}
                    type="text"
                    className="form-control"
                    value={partyFilter}
                    onChange={(e) => handleFilterChange(e.target.value, 'party')}
                    onKeyDown={(e) => handleKeyDown(e, 'party')}
                    onFocus={() => handleFocus('party')}
                    onBlur={() => handleBlur('party')}
                  />
                  {showPartyFilter && (
                    <ShowFilter
                      filteredItems={filteredParties}
                      selectedIndex={selectedPartyIndex}
                      handleClick={(item: any) => handleSelection(item, 'party')}
                      right="0"
                      top="58px"
                    />
                  )}
                </div>
              </div>
              <div className="col-12 mt-3">
                <label className="form-label">Receivable/Payable Account:</label>
                <input type="text" className="form-control" value={receivableAccount} readOnly />
              </div>
              <div className="col-md-12 mt-3">
                <label className="form-label">Default Advance Account:</label>
                <input
                  ref={advanceAccountRef}
                  type="text"
                  className="form-control"
                  value={advanceAccount}
                  readOnly
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      invoiceFilterRef.current?.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentReconcileSection
        invoiceFilterRef={invoiceFilterRef}
        invoiceData={invoiceData}
        paymnentData={paymnentData}
        company={selectedCompany?.name}
        partyType={selectedPartyType?.name}
        party={selectedParty?.name}
        setPaymentData={setPaymentData}
        setInvoiceData={setInvoiceData}
        refreshData={refreshData}
        setInvoiceFilter={setInvoiceFilter}
        setPaymentFilter={setPaymentFilter}
        setIsQuitModalOpen
      />

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
