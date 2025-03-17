import React, { useEffect, useRef, useState } from 'react';
import './TallyUI.css';
import TallyModal from './TallyModal';
import QuitConfirmationModal from './QuitConfirmationModal';
import { useNavigate } from 'react-router-dom';
import HomeMenuList from './MenuList/HomeMenuList';
import MoreReportMenuList from './MenuList/MoreReportMenuList';
import AccountBooksMenuList from './MenuList/AccountBooksMenuList';
import BankingMenuListShow from './BankingMenuListShow';

const menuItems = [
  { id: 0, label: 'Bank Reconciliation' },
  { id: 1, label: 'Payment Reconciliation' },
];
const TallyUI = ({
  isModalOpen,
  setIsModalOpen,
  setIsSales,
  setShowCustomerForm,
  setShowSupplierForm,
  setSelectedIndex,
  selectedIndex,
  globalData,
  homeHookData,
  setShowBankingMenuList,
  showBankingMenuList,
}: any) => {
  const navigate = useNavigate();
  const { moreReportList, accountBooksList, setMoreReportList, setAccountBooksList } = homeHookData;
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState(0);

  const { isQuitModalOpen, setIsQuitModalOpen } = globalData;

  useEffect(() => {
    // Focus the first menu item on mount
    if (!isModalOpen && menuItemsRef.current[selectedIndex]) {
      menuItemsRef.current[selectedIndex]?.focus();
    }
  }, [moreReportList, accountBooksList, isModalOpen, selectedIndex, isQuitModalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const menuItems = menuItemsRef.current.filter((item) => item !== null); // Filter out null values

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) => (prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedText = menuItems[index]?.textContent;
      if (selectedText === 'Create') {
        setIsModalOpen(true);
      } else if (selectedText === 'Vouchers') {
        navigate('/sales');
      } else if (selectedText === 'Quit') {
        setIsQuitModalOpen(true); // Open the quit confirmation modal
      } else if (selectedText === 'Display More Reports') {
        setMoreReportList(true);
        setSelectedIndex(0);
      } else if (selectedText === 'Account Books') {
        setAccountBooksList(true);
        setMoreReportList(false);
        setSelectedIndex(0);
      } else if (selectedText === 'Sales Register') {
        navigate('/sales-register');
      } else if (selectedText === 'CrEdit Note Register') {
        navigate('/credit-note-register');
      } else if (selectedText === 'Purchase Register') {
        navigate('/purchase-register');
      } else if (selectedText === 'Debit Note Register') {
        navigate('/debit-note-register');
      } else if (selectedText === 'Journal Register') {
        navigate('/journal-register');
      } else if (selectedText === 'PaYment Register') {
        navigate('/payment-register');
      } else if (selectedText === 'Receipt Register') {
        navigate('/receipt-register');
      } else if (selectedText === 'ConTra Register') {
        navigate('/contra-register');
      } else if (selectedText === 'Bank Reconciliation') {
        navigate('/bank-reconciliation');
      } else if (selectedText === 'Payment Reconciliation') {
        navigate('/payment-reconciliation');
      } else if (selectedText === 'BaNking') {
        // navigate('/payment-reconciliation');
        setShowBankingMenuList(true);
        setSelectedIndex(0); // Ensure the first item is highlighted
      }
    } else if (e.key === 'd' && !moreReportList && !accountBooksList) {
      //menu list button click functionality
      setMoreReportList(true);
      setSelectedIndex(0);
    } else if (e.key === 'v' && !moreReportList && !accountBooksList) {
      //menu list button click functionality
      navigate('/sales');
    } else if (e.key === 'a' && moreReportList) {
      setAccountBooksList(true);
      setMoreReportList(false);
      setSelectedIndex(0);
    } else if (e.key === 'd' && accountBooksList) {
      navigate('/debit-note-register');
    } else if (e.key === 's' && accountBooksList) {
      navigate('/sales-register');
    } else if (e.key === 'e' && accountBooksList) {
      navigate('/credit-note-register');
    } else if (e.key === 'p' && accountBooksList) {
      navigate('/purchase-register');
    } else if (e.key === 'j' && accountBooksList) {
      navigate('/journal-register');
    } else if (e.key === 'y' && accountBooksList) {
      navigate('/payment-register');
    } else if (e.key === 'r' && accountBooksList) {
      navigate('/receipt-register');
    } else if (e.key === 't' && accountBooksList) {
      navigate('/contra-register');
    } else if (e.key === 'Escape' || e.key === 'q') {
      setIsQuitModalOpen(true);
    }
  };

  const handleClick = (index: number) => {
    const menuItems = menuItemsRef.current.filter((item) => item !== null); // Filter out null values
    const selectedText = menuItems[index]?.textContent;
    console.log('>>', index, selectedIndex);
    if (selectedText === 'Create') {
      setIsModalOpen(true);
    } else if (selectedText === 'Vouchers') {
      navigate('/sales');
    } else if (selectedText === 'Quit') {
      setIsQuitModalOpen(true); // Open the quit confirmation modal
    } else if (selectedText === 'Display More Reports') {
      setMoreReportList(true);
      setSelectedIndex(0);
    } else if (selectedText === 'Account Books') {
      setAccountBooksList(true);
      setMoreReportList(false);
      setSelectedIndex(0);
    } else if (selectedText === 'Sales Register') {
      navigate('/sales-register');
    } else if (selectedText === 'CrEdit Note Register') {
      navigate('/credit-note-register');
    } else if (selectedText === 'Purchase Register') {
      navigate('/purchase-register');
    } else if (selectedText === 'Debit Note Register') {
      navigate('/debit-note-register');
    } else if (selectedText === 'Journal Register') {
      navigate('/journal-register');
    } else if (selectedText === 'PaYment Register') {
      navigate('/payment-register');
    } else if (selectedText === 'Receipt Register') {
      navigate('/receipt-register');
    } else if (selectedText === 'ConTra Register') {
      navigate('/contra-register');
    }
  };

  const handleQuitConfirm = () => {
    window.close();
    setIsQuitModalOpen(false);
    setShowBankingMenuList(false);
  };

  return (
    <div className="container-fluid home_page" style={{ height: '100%' }}>
      <div className="row" style={{ height: '100%' }}>
        {/* Left Section */}
        <div className="col-md-7 left-section">
          <div className="d-flex justify-content-between px-4">
            <div>
              <p style={{ color: '#87bde6' }}>CURRENT PERIOD</p>
              <p className="fw-bold">1-Apr-24 to 31-Mar-25</p>
            </div>
            <div className="text-end">
              <p style={{ color: '#87bde6' }}>CURRENT DATE</p>
              <p className="fw-bold">Monday, 1-Apr-2024</p>
            </div>
          </div>

          <table className="table table-borderless mt-4 px-4">
            <thead>
              <tr>
                <th className="text-muted">NAME OF COMPANY</th>
                <th className="text-muted text-end">DATE OF LAST ENTRY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold">8848 Digital</td>
                <td className="text-end text-muted">No Vouchers Entered</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Section */}

        {!showBankingMenuList && !moreReportList && !accountBooksList && (
          <HomeMenuList menuItemsRef={menuItemsRef} selectedIndex={selectedIndex} handleKeyDown={handleKeyDown} handleClick={handleClick} />
        )}

        {showBankingMenuList && !moreReportList && !accountBooksList && (
          <BankingMenuListShow
            menuItems={menuItems}
            menuItemsRef={menuItemsRef}
            selectedIndex={selectedIndex}
            handleKeyDown={handleKeyDown}
            handleClick={handleClick}
          />
        )}

        {moreReportList && !accountBooksList && (
          <MoreReportMenuList menuItemsRef={menuItemsRef} selectedIndex={selectedIndex} handleKeyDown={handleKeyDown} handleClick={handleClick} />
        )}
        {accountBooksList && !moreReportList && (
          <AccountBooksMenuList menuItemsRef={menuItemsRef} selectedIndex={selectedIndex} handleKeyDown={handleKeyDown} handleClick={handleClick} />
        )}
      </div>
      {/* pop up */}
      {isModalOpen && (
        <TallyModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setShowCustomerForm={setShowCustomerForm}
          setShowSupplierForm={setShowSupplierForm}
        />
      )}

      {/* Quit Confirmation Modal */}
      {isQuitModalOpen && (
        <QuitConfirmationModal
          isOpen={isQuitModalOpen}
          setIsQuitModalOpen={setIsQuitModalOpen}
          onConfirm={handleQuitConfirm}
          homeHookData={homeHookData}
        />
      )}
    </div>
  );
};

export default TallyUI;
