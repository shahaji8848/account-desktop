function AdvancePaymentPopup({
  advancePaymentPopup,
  advancePaymentData,
  getAdvancePaymentData,
  salesData,
  handleValueChange,
  handleValueKeyDown,
  salesDataRef,
  advancePaymentRef,
  setAdvancePaymentIndex,
  handleAdvancePaymentDelete,
}: any) {
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
          maxWidth: '1000px',
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
          <div className="d-flex w-100 align-items-center py-2 justify-content-start">
            <button
              className=" btn btn-primary"
              onKeyDown={handleValueKeyDown}
              ref={(el) => (salesDataRef.current.get_advances = el)}
              onClick={getAdvancePaymentData}
            >
              Get Advances Received
            </button>
          </div>
        )}
        <div className="my-table pb-1 w-100">
          {advancePaymentData?.length > 0 && (
            <div className="w-100">
              <div
                className="table-head d-flex px-1 py-1 mb-2 align-items-center justify-content-between w-100"
                // style={{ position: 'absolute', bottom: '210px' }}
              >
                <p style={{ width: '20%' }}>
                  <b>Reference Name</b>
                </p>
                <p style={{ width: '15%' }}>
                  <b>Remarks</b>
                </p>
                <p className="text-end" style={{ width: '20%' }}>
                  <b>Advance amount (INR)</b>
                </p>
                <p className="text-end" style={{ width: '20%' }}>
                  <b>Allocated amount (INR)</b>
                </p>
                <p className="text-end" style={{ width: '20%' }}>
                  <b>Difference Posting Date</b>
                </p>
                <p className="text-end" style={{ width: '5%' }}>
                  <b></b>
                </p>
              </div>
              <div
                className="table-body w-100"
                // style={{ position: 'absolute', bottom: '160px' }}
              >
                {advancePaymentData.map((item: any, index: number) => (
                  <div
                    className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between"
                    key={index}
                    ref={(el) => {
                      if (advancePaymentRef.current) {
                        advancePaymentRef.current[index] = el;
                      }
                    }}
                  >
                    <p style={{ width: '20%' }}>
                      <b>{item.reference_name}</b>
                    </p>
                    <p style={{ width: '15%' }}>{item.remarks?.slice(0, 22)}...</p>
                    <p className="text-end" style={{ width: '20%' }}>
                      <b>{item.advance_amount}</b>
                    </p>
                    <input
                      name="allocated_amount"
                      type="text"
                      value={item.allocated_amount}
                      onChange={handleValueChange}
                      onKeyDown={handleValueKeyDown}
                      // ref={(el) => (salesDataRef.current.allocated_amount = el)}
                      className="text-end"
                      style={{ outline: 'none', width: '20%' }}
                      onFocus={() => setTimeout(() => setAdvancePaymentIndex(index), 0)}
                    />
                    <input
                      name="difference_posting_date"
                      value={item.difference_posting_date}
                      onChange={(e: any) => handleValueChange(e)}
                      onKeyDown={handleValueKeyDown}
                      // ref={(el) => (advancePaymentRef.current.difference_posting_date = el)}
                      className="text-end"
                      style={{ outline: 'none', width: '20%' }}
                      type="date"
                      onFocus={() => setTimeout(() => setAdvancePaymentIndex(index), 0)}
                    />
                    <button
                      style={{
                        width: '5%',
                        border: '0',
                        color: 'red',
                        background: 'transparent',
                        cursor: 'pointer', // Ensures it looks clickable
                        fontSize: 'inherit', // Matches surrounding text
                        textAlign: 'end',
                      }}
                      name="delete_advance_payment"
                      onKeyDown={(e) => {
                        if (e.ctrlKey && e.key === 'Enter') {
                          handleAdvancePaymentDelete(index);
                        }
                        if (!e.ctrlKey && e.key === 'Enter') {
                          if (index < advancePaymentData.length - 1) {
                            setTimeout(() => {
                              (salesDataRef.current.allocate_advances_automatically as HTMLElement).focus();
                            });
                          } else {
                            setTimeout(() => {
                              (advancePaymentRef.current[index + 1].childNodes[3] as HTMLElement).focus();
                              setAdvancePaymentIndex(index + 1);
                            }, 0);
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                    {/* <label style={{ width: '5%', color: 'red', cursor: 'pointer' }}>
                      Delete
                      <input
                        type="button"
                        style={{ border: '0', color: 'red', background: 'transparent' }}
                        placeholder="Delete"
                        name="delete_advance_payment"
                      />
                    </label> */}
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
