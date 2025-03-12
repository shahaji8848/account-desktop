import ShowFilter from './ShowFilter';

function CompanyPopup({ nextfield, popup, globalData }: any) {
  const {
    companyData,
    handleValueChange,
    companyDataRef,
    handleValueKeyDown,
    handleFocus,
    showFilter,
    handleItemFocus,
    selectedIndex,
    dropdownRef,
    filteredItems,
  } = globalData;

  return (
    <>
      <div className="popup company-popup" style={{ display: popup ? 'flex' : 'none' }}>
        <div className="popup-body">
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Company Name</label>
              <p>: </p>
            </div>
            <input
              name="company_name"
              value={companyData['company_name']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (companyDataRef.current.company_name = el)}
              onKeyDown={(e) => handleValueKeyDown(e, companyDataRef.current.company_contact_person)}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Company Contact Person</label>
              <p>: </p>
            </div>
            <input
              name="company_contact_person"
              value={companyData['company_contact_person']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (companyDataRef.current.company_contact_person = el)}
              onKeyDown={(e) => handleValueKeyDown(e, companyDataRef.current.company_address)}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Company Address</label>
              <p>: </p>
            </div>
            <input
              name="company_address"
              value={companyData['company_address']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (companyDataRef.current.company_address = el)}
              onKeyDown={(e) => handleValueKeyDown(e, companyDataRef.current.company_gstin)}
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
              {companyData?.address_line1}
              {companyData?.address_line2}{", "}
              {companyData?.city}
            </p>
          </div>
          <div className="d-flex align-items-start w-100 pt-5">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">State / Province</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {companyData?.state}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Country</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {companyData?.country}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">GST Category</label>
              <p>: </p>
            </div>
            <p className="ps-2 ms-1" style={{ width: '70%' }}>
              {companyData?.gst_category}
            </p>
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">Company GSTIN No.</label>
              <p>: </p>
            </div>
            <input
              name="company_gstin"
              value={companyData['company_gstin']}
              ref={(el) => (companyDataRef.current.company_gstin = el)}
              onChange={(e: any) => handleValueChange(e)}
              onKeyDown={(e) => handleValueKeyDown(e, nextfield)}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              readOnly
            />
          </div>
        </div>
      </div>

      {showFilter && (
        <ShowFilter
          filteredItems={filteredItems || []}
          selectedIndex={selectedIndex}
          handleClick={() => {}}
          handleItemFocus={handleItemFocus}
          dropdownRef={dropdownRef}
        />
      )}
    </>
  );
}

export default CompanyPopup;
