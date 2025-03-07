import React from 'react'
import Sidebar from '../Sales/Sidebar'
import { homeSideBarData } from "../../utils/data";
import CustomerFormPopup from './CustomerFormPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import PageHeader from '../common/PageHeader';

const CustomerFormMaster = ({ homeHookData, globalData }: any) => {
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <div className="main-body" style={{ width: "86%" }}>
                <PageHeader ragisterName='Customer Creation' company={companyName} />
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
