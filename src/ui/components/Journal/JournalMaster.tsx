import React from 'react'
import Sidebar from '../../../ui/components/Sales/Sidebar'
import { homeSideBarData } from '../../../ui/utils/data'
import Journal from './Journal'

const JournalMaster = ({ homeHookData, globalData }: any) => {
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <Journal
                homeHookData={homeHookData}
                globalData={globalData}

            />
            <Sidebar
                sideBarData={homeSideBarData}
            />
        </div>
    )
}

export default JournalMaster
