import React, { useEffect, useState } from 'react'
import Register from '../common/Register'
import { homeSideBarData } from '../../../utils/data'
import Sidebar from '../../Sales/Sidebar'
import BottomNavbar from '../../Sales/BottomNavbar'

const SalesRegister = ({ homeHookData, globalData }: any) => {
    const [salesRegisterList, setSalesRegisterList] = useState([]);
    const fetchSalesRegisterList = async () => {
        try {
            const from_date = "2024-04-01";
            const to_date = "2025-03-31";

            let x = await window.electron.salesRegister({
                filters: { from_date, to_date, company: "8848 Digital LLP" }
            });

            setSalesRegisterList(x);
        } catch (error) {
            console.error("Error fetching sales register list:", error);
        }
    };


    useEffect(() => {
        fetchSalesRegisterList()
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
                    <p className='text-center'>Sales Register</p>
                    <p className='text-center'>8848 digital</p>

                    <p
                        style={{ width: "5%", cursor: "pointer" }}
                        className="text-end cursor-pointer"
                    >
                        X
                    </p>
                </div>
                <Register
                    homeHookData={homeHookData}
                    globalData={globalData}
                    registerList={salesRegisterList}
                    type='sales_register'
                />
                <BottomNavbar />
            </div>
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default SalesRegister
