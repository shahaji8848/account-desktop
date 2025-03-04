import React from 'react';
import { GrFormEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const AddressCard = ({ data, handleEditAddress, handleKeyDown, handleDeleteAddress }: any) => {
  console.log("AddressCard", data)
  const handleAdressFormEdit = () => {

  }
  return (
    <div className="card" style={{ maxWidth: "24rem", border: "1px solid #ccc" }}>
      <div className="card-body d-flex justify-content-between">

        <div style={{ flexBasis: '90%' }}>
          {/* <h5 className="card-title font-weight-bold mb-3">{data.address_title}</h5> */}
          {data?.links?.map((link: any, index: any) => (
            <p key={index} className="card-text">{link?.link_name}.<span>{data?.address_type}</span></p>
          ))}
          <p className="card-text">{data?.address_line1}</p>
          {data?.address_line2 && <p className="card-text">{data?.address_line2}</p>}
          <p className="card-text">{data?.city}</p>
          <p className="card-text">
            {data?.state}, State Code: {data?.gstin}
          </p>
          <p className="card-text">PIN Code: {data?.pincode}</p>
          <p className="card-text">{data?.country}</p>
          <p className="font-weight-bold">GSTIN: {data?.gstin}</p>
        </div>
        {/* edit btn  */}
        <button className='bg-transparent border-0'
          style={{ height: "fit-content" }}
          onClick={() => handleEditAddress(data)}
          onKeyDown={(e: any) => handleKeyDown(e, 'edit_address_btn', 'address', data)}>
          <GrFormEdit style={{ fontSize: "25px", color: 'gray' }} />
        </button>
        {/* delete btn  */}
        <button className='bg-transparent border-0'
          style={{ height: "fit-content" }}
          onClick={() => handleDeleteAddress(data)}
          onKeyDown={(e: any) => handleKeyDown(e, 'delete_address_btn', 'address', data)}>
          <MdDeleteOutline style={{ fontSize: "25px", color: 'gray' }} />
        </button>
      </div>
    </div>
  )
}

export default AddressCard
