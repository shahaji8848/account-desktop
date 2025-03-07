import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageHeader = ({ ragisterName, company }: any) => {
    const navigate = useNavigate();
    return (
        <div
            className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
            style={{
                background: "#87bde6",
                zIndex: "999",

            }}
        >
            <p className='text-center'>{ragisterName}</p>
            <p className='text-center'>{company}</p>

            <p
                style={{ width: "5%", cursor: "pointer" }}
                className="text-end cursor-pointer"
                onClick={() => navigate(-1)}
            >
                X
            </p>
        </div>
    )
}

export default PageHeader
