function JournalItemsPopup({
  journalPopup,
  entries,
  journalPopupID,
  handleInputChange,
  handleKeyDown,
  handleInputFocus
}: any) {
  return (
    <div
      className="popup table-popup"
      style={{
        display: journalPopup ? 'flex' : 'none',
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
          if (entry.id === journalPopupID) {
            return (
              <>
                <div className="d-flex align-items-start flex-column w-50 gap-1">
                  <div className="d-flex align-items-center w-100">
                    <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                      <label className="ps-1 pe-3">Account*</label>
                      <p>: </p>
                    </div>
                    <input
                      name="particulars"
                      value={entry.particulars}
                      onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                      onKeyDown={(e) => handleKeyDown(e, 'particulars', entry.id)}
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
                      name="bank_account"
                      value={entry.bank_account}
                      onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                      onKeyDown={(e) => handleKeyDown(e, 'bank_account', entry.id)}
                      onFocus={(e) => handleInputFocus(e, entry.id)}
                      className="ms-2"
                      style={{ outline: 'none', width: '63%' }}
                    />
                  </div>
                  <div className="d-flex align-items-center w-100">
                    <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                      <label className="ps-1 pe-3">Party Type</label>
                      <p>: </p>
                    </div>
                    <input
                      name="party_type"
                      value={entry.party_type}
                      onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                      onKeyDown={(e) => handleKeyDown(e, 'party_type', entry.id)}
                      onFocus={(e) => handleInputFocus(e, entry.id)}
                      className="ms-2"
                      style={{ outline: 'none', width: '63%' }}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100">
                    <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                      <label className="ps-1 pe-3">Party</label>
                      <p>: </p>
                    </div>
                    <input
                      name="party"
                      value={entry.party}
                      onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                      onKeyDown={(e) => handleKeyDown(e, 'party', entry.id)}
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
                      disabled={entry.debit==="disabled"}
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
                      disabled={entry.credit==="disabled"}
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

export default JournalItemsPopup;
