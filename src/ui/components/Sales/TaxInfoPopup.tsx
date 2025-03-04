function TaxInfoPopup({ taxInfoPopup, taxIndex, taxInfo, handleTaxKeyDown, handleTaxValueChange, taxInfoPopupRef }: any) {
  return (
    <div className="popup" style={{ display: taxInfoPopup ? 'flex' : 'none' }}>
      <div className="popup-body gap-1" style={{width: '400px', marginLeft: '-14%'}}>
        <div className="d-flex align-items-center w-100">
          <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Type</label>
            <p>: </p>
          </div>
          <input
            name="charge_type"
            value={taxInfo[taxIndex]?.charge_type}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.charge_type = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%' }}
          />
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Account Head</label>
            <p>: </p>
          </div>
          <input
            name="account_head"
            value={taxInfo[taxIndex]?.account_head}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.account_head = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%' }}
          />
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Cost Center</label>
            <p>: </p>
          </div>
          <input
            name="cost_center"
            value={taxInfo[taxIndex]?.cost_center}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.cost_center = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%' }}
          />
        </div>
        <div className="d-flex align-items-start w-100">
          <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Description</label>
            <p>: </p>
          </div>
          <textarea
            name="description"
            value={taxInfo[taxIndex]?.description}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.description = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%', minHeight:'100px' }}
          />
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Rate</label>
            <p>: </p>
          </div>
          <input
            name="rate"
            value={taxInfo[taxIndex]?.rate}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.rate = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%' }}
          />
        </div>
        <div className="d-flex align-items-center w-100">
          <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
            <label className="ps-1 pe-3">Amount</label>
            <p>: </p>
          </div>
          <input
            name="amt"
            value={taxInfo[taxIndex]?.amt}
            onChange={(e) => handleTaxValueChange(e, taxIndex)}
            onKeyDown={(e: any) => handleTaxKeyDown(e)}
            ref={(el) => (taxInfoPopupRef.current.amt = el)}
            className="ms-2"
            style={{ outline: 'none', width: '63%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaxInfoPopup;
