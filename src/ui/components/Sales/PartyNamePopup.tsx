function PartyNamePopup({ partyNamePopup, salesData, handleValueChange, handleValueKeyDown, salesDataRef, handleFocus }: any) {
  return (
    <>
      <div className="popup company-popup" style={{ display: partyNamePopup ? 'flex' : 'none' }}>
        <div className="popup-body">
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Party A/C Name</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="party_name"
              value={salesData.party_details['party_name']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (salesDataRef.current.party_name = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100 pt-1">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Contact Person</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="contact_person"
              value={salesData.party_details['contact_person']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (salesDataRef.current.contact_person = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100 pt-1">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Receivable Account</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="receivable_account"
              value={salesData.party_details['receivable_account']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (salesDataRef.current.receivable_account = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100 pt-1">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Billing Address</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="billing_address"
              value={salesData.party_details['billing_address']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (salesDataRef.current.billing_address = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>

          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Address</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.billing_address_line1}
              {', '}
              {salesData.party_details?.billing_address_line2}
              {', '}
              {salesData.party_details?.billing_city}
            </p>
          </div>
          <div className="d-flex align-items-start w-100 pt-3">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">State / Province</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.billing_state}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Country</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.billing_country}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">GST Category</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.billing_gst_category}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Billing GSTIN No.</label>
              <p>: </p>
            </div>
            <input
              name="billing_gstin"
              value={salesData.party_details['billing_gstin']}
              ref={(el) => (salesDataRef.current.billing_gstin = el)}
              onChange={(e: any) => handleValueChange(e)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              readOnly
            />
          </div>
          <div className="d-flex align-items-center w-100 pt-5">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Shipping Address</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="shipping_address"
              value={salesData.party_details['shipping_address']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (salesDataRef.current.shipping_address = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>

          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Address</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.shipping_address_line1}
              {', '}
              {salesData.party_details?.shipping_address_line2}
              {', '}
              {salesData.party_details?.shipping_city}
            </p>
          </div>
          <div className="d-flex align-items-start w-100 pt-3">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">State / Province</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.shipping_state}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Country</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.shipping_country}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">GST Category</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {salesData.party_details?.shipping_gst_category}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Shipping GSTIN No.</label>
              <p>: </p>
            </div>
            <input
              name="shipping_gstin"
              value={salesData.party_details['shipping_gstin']}
              ref={(el) => (salesDataRef.current.shipping_gstin = el)}
              onChange={(e: any) => handleValueChange(e)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PartyNamePopup;
