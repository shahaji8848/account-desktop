import React from 'react'
import Sidebar from '../../../ui/components/Sales/Sidebar'
import { sideBarData } from '../../../ui/utils/data'
import Journal from './Journal'

const JournalMaster = ({ homeHookData, globalData,salesHookData}: any) => {
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <Journal
                homeHookData={homeHookData}
                globalData={globalData}
                salesHookData={salesHookData}

            />
            <Sidebar
                sideBarData={sideBarData}
            />
        </div>
    )
}

export default JournalMaster
