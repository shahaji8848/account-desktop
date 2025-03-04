import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sales/Sidebar'
import { homeSideBarData } from '../../../utils/data'
import VoucherRegister from '../common/VoucherRegister'
import BottomNavbar from '../../Sales/BottomNavbar'
import RegistePageHeader from '../common/RegistePageHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/root-reducer'

const ReceiptVoucherRegister = ({ homeHookData, globalData }: any) => {
    const [VoucherRegisterList, setVoucherRegisterList] = useState<any>([]);
    const { voucherRegisterMonthDate } = homeHookData
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';

    const fetchVoucherList = async () => {
        try {
            let x = await window.electron.PaymentEntryDetailBreakup({
                filters: {
                    from_date: voucherRegisterMonthDate?.start_date,
                    to_date: voucherRegisterMonthDate?.end_date,
                    company: "8848 Digital LLP",
                    payment_type: 'Receive'
                }
            });
            setVoucherRegisterList(x);
        } catch (error) {
            console.error("Error fetching sales register list:", error);
        }
    };

    useEffect(() => {
        fetchVoucherList();
    }, []);
    console.log("VoucherRegisterList", VoucherRegisterList)
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <RegistePageHeader ragisterName='Voucher Register' company={companyName} />
                <VoucherRegister
                    homeHookData={homeHookData}
                    globalData={globalData}
                    VoucherRegisterList={VoucherRegisterList}
                    type='receipt_voucher_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default ReceiptVoucherRegister
