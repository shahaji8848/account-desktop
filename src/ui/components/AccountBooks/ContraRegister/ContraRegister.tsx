import React, { useEffect, useState } from 'react'
import Register from '../common/Register'
import { homeSideBarData } from '../../../utils/data'
import Sidebar from '../../Sales/Sidebar'
import BottomNavbar from '../../Sales/BottomNavbar'
import PageHeader from '../../common/PageHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/root-reducer'

const ContraRegister = ({ homeHookData, globalData }: any) => {
    const [contraRegisterList, setContraRegisterList] = useState([]);
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    const fetchContraRegisterList = async () => {
        try {
            const from_date = "2024-04-01";
            const to_date = "2025-03-31";

            let x = await window.electron.PaymentEntryBreakupReport({
                filters: {
                    from_date,
                    to_date,
                    company: "8848 Digital LLP",
                    payment_type: 'Internal Transfer'
                }
            });

            setContraRegisterList(x);
        } catch (error) {
            console.error("Error fetching contra register list:", error);
        }
    };


    useEffect(() => {
        fetchContraRegisterList()
    }, []);

    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <PageHeader ragisterName='Contra Register' company={companyName} />
                <Register
                    homeHookData={homeHookData}
                    globalData={globalData}
                    registerList={contraRegisterList}
                    type='contra_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default ContraRegister
