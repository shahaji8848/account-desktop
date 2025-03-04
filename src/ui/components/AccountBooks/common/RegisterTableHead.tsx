import React from 'react'

const RegisterTableHead = ({ companyName, registerLabel }: any) => {
    return (
        <>
            <tr>
                <th className='text-start align-middle' style={{ width: "80%" }} rowSpan={3}>Particulars</th>
                <th colSpan={3} className="transactionsHeader">
                    <div className="text-center">
                        <span className="text-secondary font-italic">{registerLabel}</span>
                        <br />
                        <span>{companyName}</span>
                        <br />
                        <span className="text-secondary">For 1-Apr-24</span>
                    </div>
                </th>
            </tr>

            <tr>
                <th colSpan={2}>Transactions</th>
                <th rowSpan={2}>Closing Balance</th>
            </tr>

            <tr>
                <th className='text-start' style={{ width: '10%' }}>Debit</th>
                <th className='text-start' style={{ width: '10%' }}>Credit</th>
            </tr>
        </>
    )
}

export default RegisterTableHead
