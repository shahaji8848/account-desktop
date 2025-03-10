import React, { useEffect, useState } from 'react'
import Register from '../common/Register'
import { homeSideBarData } from '../../../utils/data'
import Sidebar from '../../Sales/Sidebar'
import BottomNavbar from '../../Sales/BottomNavbar'
import PageHeader from '../../common/PageHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/root-reducer'

const CreditNoteRegister = ({ homeHookData, globalData }: any) => {
    const [creditNoteRegisterList, setCreditNoteRegisterList] = useState([]);
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    const token = localStorage.getItem('account_desktop_token');
    const fetchCreditNoteRegisterList = async () => {
        try {
            const from_date = "2024-04-01";
            const to_date = "2025-03-31";

            let x = await window.electron.creditNoteRegister({
                filters: { from_date, to_date, company: "8848 Digital LLP" },
                token
            });
            setCreditNoteRegisterList(x)
        } catch (error) {
            console.error("Error fetching sales register list:", error);
        }
    };


    useEffect(() => {
        fetchCreditNoteRegisterList()
    }, []);

    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <PageHeader ragisterName='Credit Note Register' company={companyName} />
                <Register
                    homeHookData={homeHookData}
                    globalData={globalData}
                    registerList={creditNoteRegisterList}
                    type='credit_note_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default CreditNoteRegister
