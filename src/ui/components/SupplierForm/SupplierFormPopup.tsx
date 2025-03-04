import BottomNavbar from '../Sales/BottomNavbar';
import SupplierForm from './SupplierForm';

const SupplierFormPopup = ({ homeHookData, globalData }: any) => {
  return (
    <>
      <div className="form-wrapper">
        <SupplierForm
          homeHookData={homeHookData}
          globalData={globalData}
        />
        <BottomNavbar />
      </div>
    </>
  )
}

export default SupplierFormPopup
