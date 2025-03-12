import { sideBarData } from '../../utils/data';
import QuitConfirmationModal from './QuitConfirmationModal';
import SalesMainPage from './SalesMainPage';
import Sidebar from './Sidebar';

function SalesMaster({ openCompanyDropdown, handleAllKeyFunctions, salesHookData, globalData }: any) {
  return (
    <div onKeyDown={handleAllKeyFunctions} className="w-100 d-flex align-items-stretch justify-content-between">
      <SalesMainPage salesHookData={salesHookData} globalData={globalData} />
      <Sidebar dateRef={salesHookData.dateRef} openCompanyDropdown={openCompanyDropdown} sideBarData={sideBarData} />
      <QuitConfirmationModal isOpen={salesHookData.isQuitModalOpen} setIsQuitModalOpen={salesHookData.setIsQuitModalOpen} />
    </div>
  );
}

export default SalesMaster;
