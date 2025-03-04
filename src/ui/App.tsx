
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from "./components/Sales/Header";
import CustomerFormMaster from "./components/CustomerForm/CustomerFormMaster";
import SupplierFormMaster from "./components/SupplierForm/SupplierFormMaster";
import CompanyPopup from "./components/common/CompanyPopup";
import useGlobalKeyFunctionalities from "./hooks/useGlobalKeyFunctionalities";
import SalesMaster from "./components/Sales/SalesMaster";
import useSalesHook from './hooks/sales/useSalesHook';
import Home from "./components/Home/Home";
import useHomePageHooks from "./hooks/useHomePageHooks";
import SalesVoucherRegister from './components/AccountBooks/SalesRegister/SalesVoucherRegister';
import SalesRegister from './components/AccountBooks/SalesRegister/SalesRegister';
import CreditNoteRegister from './components/AccountBooks/CreditNoteRegister/CreditNoteRegister';
import CreditNoteVoucherRegister from './components/AccountBooks/CreditNoteRegister/CreditNoteVoucherRegister';
import Login from './components/Login/Login';
import PurchaseRegister from './components/AccountBooks/PurchaseRegister/PurchaseRegister';
import PurchaseVoucherRegister from './components/AccountBooks/PurchaseRegister/PurchaseVoucherRegister';
import DebitNoteRegister from './components/AccountBooks/DebitNoteRegister/DebitNoteRegister';
import DebitNoteVoucherRegister from './components/AccountBooks/DebitNoteRegister/DebitNoteVoucherRegister';

function App() {
  const { handleGlobalKeyFunctions, companyPopup, ...globalData } = useGlobalKeyFunctionalities();
  const { handleAllKeyFunctions, ...salesHookData } = useSalesHook(globalData);
  const { handlekeyfunctions, ...homeHookData } = useHomePageHooks();
  
  const location = useLocation();

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Update token if it changes in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handle login success and store token
  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  return (
    <>
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="main" tabIndex={0} onKeyDown={handleGlobalKeyFunctions}>
          <Header />
          <div className="w-100 d-flex align-items-stretch justify-content-between">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home homeHookData={homeHookData} globalData={globalData} handlekeyfunctions={handlekeyfunctions} />} />
              <Route path="/sales" element={
                <SalesMaster
                  openCompanyDropdown={globalData.openCompanyDropdown}
                  salesHookData={salesHookData}
                  handleAllKeyFunctions={handleAllKeyFunctions}
                  globalData={globalData}
                />
              } />
              <Route path="/customer-form" element={
                <CustomerFormMaster
                  homeHookData={homeHookData}
                  globalData={globalData}
                  handlekeyfunctions={handlekeyfunctions}
                />
              } />
              <Route path="/supplier-form" element={
                <SupplierFormMaster
                  homeHookData={homeHookData}
                  globalData={globalData}
                  handlekeyfunctions={handlekeyfunctions}
                />
              } />
              <Route path="/sales-register" element={
                <SalesRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/sales-voucher-register" element={
                <SalesVoucherRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/credit-note-register" element={
                <CreditNoteRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/credit-note-voucher-register" element={
                <CreditNoteVoucherRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
               <Route path="/purchase-register" element={
                <PurchaseRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/purchase-voucher-register" element={
                <PurchaseVoucherRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/debit-note-register" element={
                <DebitNoteRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="/debit-note-voucher-register" element={
                <DebitNoteVoucherRegister
                  homeHookData={homeHookData}
                  globalData={globalData}
                />
              } />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
          <CompanyPopup
            popup={companyPopup}
            globalData={globalData}
            nextfield={location.pathname === '/sales' ? salesHookData.salesDataRef.current.naming_series : ''}
          />
        </div>
      )}
    </>
  );
}

export default App;




