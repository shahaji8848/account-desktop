import React from 'react';
import { GrFormEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const BankCard = ({ data, handleEditbank, handleKeyDown, handleDeleteBank }: any) => {
    return (
        <div className="card" style={{ maxWidth: "24rem", border: "1px solid #ccc" }}>
            <div className="card-body d-flex justify-content-between">

                <div style={{ flexBasis: '90%' }}>
                    <p className="card-text">Name: {data?.account_name}</p>
                    <p className="card-text">Bank: {data?.bank}</p>
                    <p className="card-text">Account Number: {data?.bank_account_no}</p>
                    <p className="card-text">Branch Code: {data?.branch_code}</p>

                </div>
                {/* edit btn  */}
                <button
                    className='bg-transparent border-0'
                    style={{ height: "fit-content" }}
                    onClick={() => handleEditbank(data)}
                    onKeyDown={(e: any) => handleKeyDown(e, 'edit_bank_btn', 'bank', data)}>
                    <GrFormEdit style={{ fontSize: '25px', color: 'gray' }} />
                </button>
                {/* delete btn  */}
                <button
                    className='bg-transparent border-0'
                    style={{ height: "fit-content" }}
                    onClick={() => handleDeleteBank(data)}
                    onKeyDown={(e: any) => handleKeyDown(e, 'delete_bank_btn', 'bank', data)}>
                    <MdDeleteOutline style={{ fontSize: '25px', color: 'gray' }} />
                </button>
            </div>
        </div>
    )
}

export default BankCard
