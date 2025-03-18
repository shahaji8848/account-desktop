import React, { useEffect, useState } from 'react';
import Register from '../common/Register';
import { homeSideBarData } from '../../../utils/data';
import Sidebar from '../../Sales/Sidebar';
import BottomNavbar from '../../Sales/BottomNavbar';
import PageHeader from '../../common/PageHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { JournalEntryBreakupReport } from '../../../../apis/reports/journal_entry';

const JournalRegister = ({ homeHookData, globalData }: any) => {
  const [journalRegisterList, setJournalRegisterList] = useState([]);
  const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
  const token = localStorage.getItem('account_desktop_token');
  const fetchJournalRegisterList = async () => {
    try {
      const from_date = '2024-04-01';
      const to_date = '2025-03-31';

      let x = window.electron
        ? await window.electron.JournalEntryBreakupReport({
            filters: { from_date, to_date, company: '8848 Digital LLP' },
            token,
          })
        : await JournalEntryBreakupReport({
            filters: { from_date, to_date, company: '8848 Digital LLP' },
            token,
          });

      setJournalRegisterList(x);
    } catch (error) {
      console.error('Error fetching journal register list:', error);
    }
  };

  useEffect(() => {
    fetchJournalRegisterList();
  }, []);

  return (
    <div className="w-100 d-flex align-items-stretch justify-content-between" style={{ overflow: 'hidden' }}>
      <div className="main-body" style={{ width: '86%' }}>
        <PageHeader ragisterName="Journal Register" company={companyName} />
        <Register homeHookData={homeHookData} globalData={globalData} registerList={journalRegisterList} type="journal_register" />
        <BottomNavbar />
      </div>
      <Sidebar sideBarData={homeSideBarData} />
    </div>
  );
};

export default JournalRegister;
