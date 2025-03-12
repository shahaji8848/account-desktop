function ReceiptItemsPopup({
    receiptPopup,
    entries,
    receiptPopupID,
    handleInputChange,
    handleKeyDown,
    handleInputFocus
}: any) {
    return (
        <div
            className="popup table-popup"
            style={{
                display: receiptPopup ? 'flex' : 'none',
            }}
        >
            <div
                className="popup-body d-flex align-items-start justify-content-between w-100 flex-row gap-4"
                style={{
                    marginLeft: '-32%',
                    maxWidth: '850px',
                }}
            >

                {entries?.map((entry: any, index: number) => {
                    if (entry.id === receiptPopupID) {
                        return (
                            <>
                                <div className="d-flex align-items-start flex-column w-50 gap-1">
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Account*</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="naming_series"
                                            value={entry.naming_series}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'naming_series', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Bank Account</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="payment_type"
                                            value={entry.payment_type}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'payment_type', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Reference Number</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="reference_no"
                                            value={entry.reference_no}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'reference_no', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-start w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Reference Date</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="reference_date"
                                            type='date'
                                            value={entry.reference_date}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'reference_date', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
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
                                            value={entry.cost_center}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'cost_center', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Account Currency</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="account_currency"
                                            value={entry.account_currency}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'account_currency', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        // onFocus={handleFocus}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Exchange Rate</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="exchange_rate"
                                            value={entry.exchange_rate}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'exchange_rate', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Debit</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="debit"
                                            value={entry.debit}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'debit', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                            disabled={entry.debit === "disabled"}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Credit</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="credit"
                                            value={entry.credit}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'credit', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                            disabled={entry.credit === "disabled"}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Reference Type</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="reference_type"
                                            value={entry.reference_type}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'reference_type', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-start flex-column w-50 gap-1">
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Is Advance</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="is_advance"
                                            value={entry.is_advance}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'is_advance', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">Reference Name</label>
                                            <p>: </p>
                                        </div>
                                        <input
                                            name="reference_name"
                                            value={entry.reference_name}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'reference_name', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%' }}
                                        />
                                    </div>
                                    {/* <div className="d-flex align-items-center w-100">
                    <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                      <label className="ps-1 pe-3">Reference Due Date</label>
                      <p>: </p>
                    </div>
                    <input
                      name="Reference_due_date"
                      type="date"
                      value={entry.Reference_due_date}
                      onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                      onKeyDown={(e) => handleKeyDown(e, 'Reference_due_date', entry.id)}
                      onFocus={(e) => handleInputFocus(e, entry.id)}
                      className="ms-2"
                      style={{ outline: 'none', width: '63%' }}
                      
                    />
                  </div> */}
                                    <div className="d-flex align-items-start w-100">
                                        <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                                            <label className="ps-1 pe-3">User Remark</label>
                                            <p>: </p>
                                        </div>
                                        <textarea
                                            name="user_remark"
                                            value={entry.user_remark}
                                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                            onKeyDown={(e) => handleKeyDown(e, 'user_remark', entry.id)}
                                            onFocus={(e) => handleInputFocus(e, entry.id)}
                                            className="ms-2"
                                            style={{ outline: 'none', width: '63%', minHeight: '100px', resize: 'none', overflowY: 'auto', whiteSpace: 'pre-wrap' }}
                                        />
                                    </div>
                                </div>
                            </>
                        );
                    }
                    return null; // Ensure `.map()` always returns a value
                })}

            </div>
        </div>
    );
}

export default ReceiptItemsPopup;
