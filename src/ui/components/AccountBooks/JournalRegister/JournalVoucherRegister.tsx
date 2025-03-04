import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sales/Sidebar'
import { homeSideBarData } from '../../../utils/data'
import VoucherRegister from '../common/VoucherRegister'
import BottomNavbar from '../../Sales/BottomNavbar'

const JournalVoucherRegister = ({ homeHookData, globalData }: any) => {
    const [VoucherRegisterList, setVoucherRegisterList] = useState<any>([]);
    const { voucherRegisterMonthDate } = homeHookData


    const fetchVoucherList = async () => {
        try {
            let x = await window.electron.JournalEntryDetailBreakup({
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
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <div
                    className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
                    style={{
                        background: "#87bde6",
                        zIndex: "999",

                    }}
                >
                    <p className='text-center'>Voucher Register</p>
                    <p className='text-center'>8848 digital</p>

                    <p
                        style={{ width: "5%", cursor: "pointer" }}
                        className="text-end cursor-pointer"
                    >
                        X
                    </p>
                </div>
                <VoucherRegister
                    homeHookData={homeHookData}
                    globalData={globalData}
                    VoucherRegisterList={VoucherRegisterList}
                    type='journal_voucher_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default JournalVoucherRegister
