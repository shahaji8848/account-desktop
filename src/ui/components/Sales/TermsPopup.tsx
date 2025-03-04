function TermsPopup({ termsPopup, salesData, handleValueChange, handleValueKeyDown, handleFocus, salesDataRef }: any) {
  return (
    <div className="popup" style={{ display: termsPopup ? 'flex' : 'none' }}>
      <div className="popup-body gap-1" style={{ width: '800px', marginLeft: '-14%' }}>
        <div className="d-flex align-items-center w-100">
          <div className="d-flex align-items-center justify-content-between w-50">
            <label className="ps-1 pe-3">Terms & Conditions</label>
            <p>: </p>
          </div>
          <input
            name="terms_and_conditions"
            value={salesData.terms_and_conditions}
            onChange={(e: any) => handleValueChange(e)}
            onKeyDown={handleValueKeyDown}
            ref={(el) => (salesDataRef.current.terms_and_conditions = el)}
            className="ms-2"
            style={{ outline: 'none', width: '50%' }}
            onFocus={handleFocus}
          />
        </div>
        <div className="d-flex flex-column align-items-center w-100">
          <div className="d-flex align-items-center justify-content-start w-100">
            <label className="ps-1 pe-3">Description</label>
            <p>: </p>
          </div>
          <textarea
            name="terms_description"
            value={salesData.terms_description}
            onChange={(e: any) => handleValueChange(e)}
            onKeyDown={handleValueKeyDown}
            ref={(el) => (salesDataRef.current.terms_description = el)}
            className="ms-2"
            style={{ outline: 'none', width: '100%', minHeight: '400px' }}
            onFocus={handleFocus}
          />
        </div>
      </div>
    </div>
  );
}

export default TermsPopup;
