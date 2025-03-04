import React from 'react'
import Sidebar from '../Sales/Sidebar'
import { homeSideBarData } from "../../utils/data";
import CustomerFormPopup from './CustomerFormPopup';

const CustomerFormMaster = ({ homeHookData, globalData,handlekeyfunctions }: any) => {
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        // onKeyDown={handlekeyfunctions}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <div
                    className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
                    style={{
                        background: "#87bde6",
                        zIndex: "999",

                    }}
                >
                    <p className='text-center'>Customer Creation</p>
                    <p className='text-center'>8848 digital</p>

                    <p
                        style={{ width: "5%", cursor: "pointer" }}
                        className="text-end cursor-pointer"
                    >
                        X
                    </p>
                </div>


                <CustomerFormPopup
                    homeHookData={homeHookData}
                    globalData={globalData}
                />

            </div>
            <Sidebar
                dateRef={homeHookData.dateRef}
                openCompanyDropdown={homeHookData.openCompanyDropdown}
                sideBarData={homeSideBarData}
            />

        </div>
    )
}

export default CustomerFormMaster
