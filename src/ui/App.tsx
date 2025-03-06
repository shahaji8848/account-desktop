import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Sales/Header';
import CompanyPopup from './components/common/CompanyPopup';
import useGlobalKeyFunctionalities from './hooks/useGlobalKeyFunctionalities';
import useSalesHook from './hooks/sales/useSalesHook';
import useHomePageHooks from './hooks/useHomePageHooks';
import Login from './components/Login/Login';
import routesConfig from './routesConfig';
import SalesMaster from './components/Sales/SalesMaster';
import Home from './components/Home/Home';

function App() {
  const { handleGlobalKeyFunctions, companyPopup, ...globalData } = useGlobalKeyFunctionalities();
  const { handleAllKeyFunctions, ...salesHookData } = useSalesHook(globalData);
  const { handlekeyfunctions, ...homeHookData } = useHomePageHooks();

  const location = useLocation();

  const [token, setToken] = useState<string | null>(localStorage.getItem('account_desktop_token'));

  // Update token if it changes in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('account_desktop_token');
    if (storedToken) {
      setToken(storedToken);
    }

    window.electron
      .getPaymentReconciliationEntries({
        filters: { invoice_name: '53', payment_name: 'ACC-PAY-2025-00010' },
      })
      .then((data: any) => {
        console.log('reconcile', data);
      });
  }, []);

  // Handle login success and store token
  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem('account_desktop_token', receivedToken);
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
              <Route path="/" element={<Home homeHookData={homeHookData} globalData={globalData} />} />
              <Route
                path="/sales"
                element={
                  <SalesMaster
                    openCompanyDropdown={globalData.openCompanyDropdown}
                    salesHookData={salesHookData}
                    handleAllKeyFunctions={handleAllKeyFunctions}
                    globalData={globalData}
                  />
                }
              />
              {/* remaining routes  */}
              {routesConfig.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component homeHookData={homeHookData} globalData={globalData} />} />
              ))}
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
