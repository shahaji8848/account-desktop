import React, { useEffect, useState } from 'react'
import BottomNavbar from '../../../ui/components/Sales/BottomNavbar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../ui/store/root-reducer'
import JournalTable from './JournalTable'

const Journal = ({ homeHookData, globalData }: any) => {
    const [VoucherRegisterList, setVoucherRegisterList] = useState<any>([]);
    const { voucherRegisterMonthDate } = homeHookData
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';

    const fetchVoucherList = async () => {
        try {
            let x = await window.electron.salesBreakupReport({
                filters: {
                    from_date: voucherRegisterMonthDate?.start_date,
                    to_date: voucherRegisterMonthDate?.end_date,
                    company: "8848 Digital LLP",
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

    return (
        <div className="main-body" style={{ width: "86%" }}>
            <div
                className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
                style={{ background: "#87bde6", zIndex: "999" }}
            >
                <p style={{ width: "30%" }}>Accounting Voucher Creation</p>
                <p style={{ width: "25%" }} className="text-center">
                    Company Name: {companyName || ""}
                </p>
               <p
                    onClick={() => console.log('')}
                    style={{ width: "5%", cursor: "pointer" }}
                    className="text-end cursor-pointer"
                >
                    X
                </p>
            </div>

            <JournalTable
                homeHookData={homeHookData}
                globalData={globalData}
                VoucherRegisterList={VoucherRegisterList}
                type='sales_voucher_register'
            />
            <BottomNavbar />
        </div>
    )
}

export default Journal
