import React from 'react'
import Sidebar from '../Sales/Sidebar'
import { sideBarData } from '../../utils/data'
import Receipt from './Receipt'

const ReceiptMaster = ({ homeHookData, globalData,salesHookData}: any) => {
    return (
        <div
            className="w-100 d-flex align-items-stretch justify-content-between"
            style={{ overflow: 'hidden' }}
        >
            <Receipt
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

export default ReceiptMaster
