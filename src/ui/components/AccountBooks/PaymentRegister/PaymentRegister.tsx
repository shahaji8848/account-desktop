import React, { useEffect, useState } from 'react'
import Register from '../common/Register'
import { homeSideBarData } from '../../../utils/data'
import Sidebar from '../../Sales/Sidebar'
import BottomNavbar from '../../Sales/BottomNavbar'
import RegistePageHeader from '../common/RegistePageHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/root-reducer'

const PaymentRegister = ({ homeHookData, globalData }: any) => {
    const [paymentRegisterList, setPaymentRegisterList] = useState([]);
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    const fetchPaymentRegisterList = async () => {
        try {
            const from_date = "2024-04-01";
            const to_date = "2025-03-31";

            let x = await window.electron.PaymentEntryBreakupReport({
                filters: {
                    from_date,
                    to_date,
                    company: "8848 Digital LLP",
                    payment_type: 'Pay'
                }
            });

            setPaymentRegisterList(x);
        } catch (error) {
            console.error("Error fetching payment register list:", error);
        }
    };

    useEffect(() => {
        fetchPaymentRegisterList()
    }, []);

    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <RegistePageHeader ragisterName='Payment Register' company={companyName} />
                <Register
                    homeHookData={homeHookData}
                    globalData={globalData}
                    registerList={paymentRegisterList}
                    type='payment_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default PaymentRegister
