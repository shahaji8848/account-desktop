function AdvancePaymentPopup({ advancePaymentPopup, advancePaymentData, salesData, handleValueChange, handleValueKeyDown, salesDataRef }: any) {
  return (
    <div
      className="popup table-popup"
      style={{
        display: advancePaymentPopup ? 'flex' : 'none',
      }}
    >
      <div
        className="popup-body d-flex align-items-center justify-content-between w-100 flex-column gap-1"
        style={{
          marginLeft: '-14%',
          maxWidth: '900px',
        }}
      >
        <div className="d-flex w-100 align-items-center py-0 justify-content-between">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
              <label className="ps-1 pe-3">Allocate Advances Automatically (FIFO)</label>
              <p>: </p>
            </div>
            <input
              name="allocate_advances_automatically"
              type="checkbox"
              // value={salesData.allocate_advances_automatically}
              checked={salesData.allocate_advances_automatically ? true : false}
              onChange={handleValueChange}
              onKeyDown={handleValueKeyDown}
              ref={(el) => (salesDataRef.current.allocate_advances_automatically = el)}
              className="ms-2"
              style={{ outline: 'none' }}
              // onFocus={handleFocus}
            />
          </div>
        </div>
        {salesData.allocate_advances_automatically ? (
          <div className="d-flex w-100 align-items-center py-0 justify-content-between">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-between">
                <label className="ps-1 pe-3">Only Include Allocated Payments</label>
                <p>: </p>
              </div>
              <input
                name="only_include_allocated_payments"
                type="checkbox"
                // value={salesData.only_include_allocated_payments}
                checked={salesData.only_include_allocated_payments ? true : false}
                onChange={handleValueChange}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.only_include_allocated_payments = el)}
                className="ms-2"
                style={{ outline: 'none' }}
                // onFocus={handleFocus}
              />
            </div>
          </div>
        ) : (
          <button ref={(el) => (salesDataRef.current.get_advances = el)} onClick={() => console.log('get advance payments')}>
            Get Advances Received
          </button>
        )}
        <div className="my-table pb-1 w-100">
          {advancePaymentData?.length > 0 && (
            <div className="w-100">
              <div
                className="table-head d-flex px-1 py-1 mb-2 align-items-center justify-content-between w-100"
                // style={{ position: 'absolute', bottom: '210px' }}
              >
                <div className="table-left" style={{ width: '20%' }}>
                  <p>
                    <b>Reference Name</b>
                  </p>
                </div>
                <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '75%' }}>
                  <p style={{ width: '20%' }}>
                    <b>Remarks</b>
                  </p>
                  <p style={{ width: '20%' }}>
                    <b>Advance amount (INR)</b>
                  </p>
                  <p className="text-end" style={{ width: '20%' }}>
                    <b>Allocated amount (INR)</b>
                  </p>
                  <p className="text-end" style={{ width: '20%' }}>
                    <b>Difference Posting Date</b>
                  </p>
                </div>
              </div>
              <div
                className="table-body w-100"
                // style={{ position: 'absolute', bottom: '160px' }}
              >
                {advancePaymentData.map((item: any, index: number) => (
                  <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between" key={index}>
                    <p style={{ width: '20%' }}>
                      <b>{item.payment_term}</b>
                    </p>
                    <p style={{ width: '20%' }}>{item.description}</p>
                    <p style={{ width: '20%' }}>{/* <b>{calculateNewDueDate(dueDate, item.credit_days)}</b> */}</p>
                    <p className="text-end" style={{ width: '20%' }}>
                      <b>{item.invoice_portion}</b>
                    </p>
                    <p className="text-end" style={{ width: '20%' }}>
                      <b>{`${salesData.currency} ${(item.invoice_portion)?.toFixed(2) ?? 0}`}</b>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvancePaymentPopup;
