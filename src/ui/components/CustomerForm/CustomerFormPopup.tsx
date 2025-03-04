import BottomNavbar from '../Sales/BottomNavbar';
import CustomerForm from './CustomerForm';

const CustomerFormPopup = ({ homeHookData, globalData }: any) => {
  return (
    <>
      <div className="form-wrapper">
        <CustomerForm
          homeHookData={homeHookData}
          globalData={globalData}
        />
        <BottomNavbar />
      </div>
    </>
  )
}

export default CustomerFormPopup
