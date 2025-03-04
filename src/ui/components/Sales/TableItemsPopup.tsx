function TableItemsPopup({
  tableItemsPopup,
  itemsData,
  tablePopupRef,
  handleValueChange,
  setFieldName,
  handleValueKeyDown,
  handleFocus,
  salesData,
  setShowFilter,
  setType
}: any) {
  return (
    <div
      className="popup table-popup"
      style={{
        display: tableItemsPopup ? 'flex' : 'none',
      }}
    >
      <div
        className="popup-body d-flex align-items-start justify-content-between w-100 flex-row gap-4"
        style={{
          marginLeft: '-32%',
          maxWidth: '850px',
        }}
      >
        <div className="d-flex align-items-start flex-column w-50 gap-1">
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Item Name</label>
              <p>: </p>
            </div>
            <input
              name="item_name"
              value={itemsData['item_name']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.item_name = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">HSN/SAC</label>
              <p>: </p>
            </div>
            <input
              name="hsn"
              value={itemsData['hsn']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.hsn = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">UOM</label>
              <p>: </p>
            </div>
            <input
              name="uom"
              value={itemsData['uom']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.uom = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Description</label>
              <p>: </p>
            </div>
            <textarea
              name="description"
              value={itemsData['description']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.description = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%', minHeight: '100px' }}
              onFocus={() => tablePopupRef.current.description.focus()}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Warehouse</label>
              <p>: </p>
            </div>
            <input
              name="warehouse"
              value={itemsData['warehouse']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.warehouse = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Qty</label>
              <p>: </p>
            </div>
            <input
              name="qty"
              value={itemsData['qty']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.qty = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Rate</label>
              <p>: </p>
            </div>
            <input
              name="rate"
              value={itemsData['rate']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.rate = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Margin Type</label>
              <p>: </p>
            </div>
            <input
              name="margin_type"
              value={itemsData['margin_type']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.margin_type = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Margin Rate Or Amount</label>
              <p>: </p>
            </div>
            <input
              name="margin_rate_or_amount"
              value={itemsData['margin_rate_or_amount']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.margin_rate_or_amount = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              // onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Rate With Margin</label>
              <p>: </p>
            </div>
            <input
              name="rate_with_margin"
              value={`${salesData.currency} ${Number(itemsData['rate_with_margin']).toFixed(2) || 0}`}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.rate_with_margin = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              disabled
              // onFocus={handleFocus}
            />
          </div>
        </div>
        <div className="d-flex align-items-start flex-column w-50 gap-1">
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Discount Percentage</label>
              <p>: </p>
            </div>
            <input
              name="discount_percentage"
              value={itemsData['discount_percentage']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.discount_percentage = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              // onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Discount Amount</label>
              <p>: </p>
            </div>
            <input
              name="discount_amount"
              value={`${salesData.currency} ${Number(itemsData['discount_amount']).toFixed(2) || 0}`}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.discount_amount = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              disabled
              // onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Amount</label>
              <p>: </p>
            </div>
            <input
              name="amt"
              value={`${salesData.currency} ${Number(itemsData['amt']).toFixed(2) || 0}`}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.amt = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
              disabled
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Item Tax Rate</label>
              <p>: </p>
            </div>
            <input
              name="item_tax_template"
              value={itemsData['item_tax_template']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.item_tax_template = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Income Account</label>
              <p>: </p>
            </div>
            <input
              name="income_account"
              value={itemsData['income_account']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.income_account = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Expense Account</label>
              <p>: </p>
            </div>
            <input
              name="expense_account"
              value={itemsData['expense_account']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.expense_account = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Cost Center</label>
              <p>: </p>
            </div>
            <input
              name="cost_center"
              value={itemsData['cost_center']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.cost_center = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Serial No.</label>
              <p>: </p>
            </div>
            <input
              name="serial_no"
              value={itemsData['serial_no']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.serial_no = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              // onFocus={handleFocus}
              onFocus={() => tablePopupRef.current.serial_no.focus()}
            />
          </div>
          <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Serial No. List</label>
              <p>: </p>
            </div>
            <textarea
              name="serial_no_list"
              value={itemsData['serial_no_list']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.serial_no_list = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%', minHeight: '100px', resize: 'none', overflowY: 'auto', whiteSpace: 'pre-wrap' }}
              disabled
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Batch No.</label>
              <p>: </p>
            </div>
            <input
              name="batch_no"
              value={itemsData['batch_no']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.batch_no = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={() => {
                tablePopupRef.current.batch_no.focus();
                setFieldName('batch_no');
                setShowFilter(true);
                setType('dropdown');
              }}
              // onFocus={handleFocus}
            />
          </div>
          {/* <div className="d-flex align-items-start w-100">
            <div className="salesNo d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
              <label className="ps-1 pe-3">Batch No. List</label>
              <p>: </p>
            </div>
            <textarea
              name="batch_no_list"
              value={itemsData['batch_no_list']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (tablePopupRef.current.batch_no_list = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%', minHeight: '100px', resize: 'none', overflowY: 'auto' }}
              disabled
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TableItemsPopup;
