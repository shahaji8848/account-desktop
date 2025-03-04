import React, { useEffect, useRef, useState } from "react";
import "./TallyUI.css";
import TallyModal from "./TallyModal";
import QuitConfirmationModal from "./QuitConfirmationModal";

import { useNavigate } from "react-router-dom";

const TallyUI = ({ isModalOpen, setIsModalOpen, setIsSales, setShowCustomerForm, setShowSupplierForm, handlekeyfunctions, setSelectedIndex, selectedIndex, globalData, homeHookData }: any) => {
  const navigate = useNavigate();
  const { moreReportList, accountBooksList, setMoreReportList, setAccountBooksList } = homeHookData
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

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) =>
        prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) =>
        prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedText = menuItems[index]?.textContent;
      if (selectedText === "Create") {
        setIsModalOpen(true);
      } else if (selectedText === "Vouchers") {
        navigate('/sales')
      } else if (selectedText === "Quit") {
        setIsQuitModalOpen(true); // Open the quit confirmation modal
      } else if (selectedText === "Display More Reports") {
        setMoreReportList(true);
        setSelectedIndex(0);
      } else if (selectedText === "Account Books") {
        setAccountBooksList(true);
        setMoreReportList(false);
        setSelectedIndex(0);
      } else if (selectedText === 'Sales Register') {
        navigate('/sales-register')
      } else if (selectedText === 'CrEdit Note Register') {
        navigate('/credit-note-register')
      } else if (selectedText === 'Purchase Register') {
        navigate('/purchase-register')
      } else if (selectedText === 'Debit Note Register') {
        navigate('/debit-note-register')
      }
    } else if (e.key === "d" && accountBooksList && !moreReportList) {
      navigate('/debit-note-register')
    }
    else if (e.key === "d") { //menu list button click functionality
      setMoreReportList(true);
      setSelectedIndex(0);
    } else if (e.key === "a" && moreReportList) {
      setAccountBooksList(true);
      setMoreReportList(false);
      setSelectedIndex(0);
    } else if (e.key === "s" && accountBooksList) {
      navigate('/sales-register')
    } else if (e.key === "e" && accountBooksList) {
      navigate('/credit-note-register')
    } else if (e.key === "p" && accountBooksList) {
      navigate('/purchase-register')
    } else if (e.key === "Escape") {
      setIsQuitModalOpen(true);
    }
  };

  const handleQuitConfirm = () => {
    window.close();
    setIsQuitModalOpen(false)
  };



  // kdjlkj
  const HomeMenuList = (
    <div className="col-md-5 right-section">
      <div className="menu-box">
        <div className="menu-header text-center">Gateway of Tally</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            MASTERS
          </li>
          {["Create", "Alter", "Chart of Accounts"].map((item, index) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            TRANSACTIONS
          </li>
          {["Vouchers", "Day Book"].map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 3] = el)}
              className={`menu-item ${index + 3 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 3)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            UTILITIES
          </li>
          {["Banking"].map((item, index) => (
            <li
              key={index + 5}
              ref={(el) => (menuItemsRef.current[index + 5] = el)}
              className={`menu-item ${index + 5 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 5)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            REPORTS
          </li>
          {[
            "Balance Sheet",
            "Profit & Loss A/c",
            "Stock Summary",
            "Ratio Analysis",
            "Display More Reports",
            "Dashboard",
          ].map((item, index) => (
            <li
              key={index + 6}
              ref={(el) => (menuItemsRef.current[index + 6] = el)}
              className={`menu-item ${index + 6 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 6)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li
            className={`menu-item mt-3 text-danger ${12 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[12] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 12)}
          >
            Quit
          </li>
        </ul>
      </div>
    </div>
  );
  // lkdl 

  // more Report 

  const MoreReportList = (
    <div className="col-md-5 right-section">
      <div className="menu-box">
        <div className="menu-header text-center">Display More Reports</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            ACCOUNTING
          </li>
          {["Trial Balance", "Day Book", "Cash Flow", "Funds Flow", "Account Books", "Statements of Accounts"].map((item, index) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            INVENTORY
          </li>
          {["Inventory Books", "Statements of Inventory"].map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 6] = el)}
              className={`menu-item ${index + 6 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 6)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            STATUTORY
          </li>
          {["Statutory Reports"].map((item, index) => (
            <li
              key={index + 5}
              ref={(el) => (menuItemsRef.current[index + 8] = el)}
              className={`menu-item ${index + 8 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 8)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            EXCEPTION
          </li>
          {[
            "Exception Reports", "Analysis & Verification"
          ].map((item, index) => (
            <li
              key={index + 9}
              ref={(el) => (menuItemsRef.current[index + 9] = el)}
              className={`menu-item ${index + 9 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 9)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li
            className={`menu-item mt-3 text-danger ${11 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[11] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 11)}
          >
            Quit
          </li>
        </ul>
      </div>
    </div>
  );

  // more Report end

  // Account books
  const AccountBooksList = (
    <div className="col-md-5 right-section">
      <div className="menu-box">
        <div className="menu-header text-center">Account Books</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            SUMMARY
          </li>
          {["Cash/Bank Book(s)", "Ledger", "Group Summary", "Group Vouchers"].map((item, index) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            REGISTERS
          </li>
          {[
            "ConTra Register",
            "PaYment Register",
            "Receipt Register",
            "Sales Register",
            "Purchase Register",
            "Journal Register",
            "Debit Note Register",
            "CrEdit Note Register",
            "VoUcher Clarification"
          ].map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 4] = el)}
              className={`menu-item ${index + 4 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 4)}
              onClick={() => console.log(item)}
            >
              {item}
            </li>
          ))}

          <li
            className={`menu-item mt-3 text-danger ${13 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[13] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 13)}
          >
            Quit
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <div className="container-fluid" style={{ height: "100%" }} onKeyDown={handlekeyfunctions}>
      <div className="row" style={{ height: "100%" }}>
        {/* Left Section */}
        <div className="col-md-7 left-section">
          <div className="d-flex justify-content-between px-4">
            <div>
              <p style={{ color: "#87bde6" }}>CURRENT PERIOD</p>
              <p className="fw-bold">1-Apr-24 to 31-Mar-25</p>
            </div>
            <div className="text-end">
              <p style={{ color: "#87bde6" }}>CURRENT DATE</p>
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
        {(!moreReportList && !accountBooksList) && HomeMenuList}
        {(moreReportList && !accountBooksList) && MoreReportList}
        {(accountBooksList && !moreReportList) && AccountBooksList}
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

