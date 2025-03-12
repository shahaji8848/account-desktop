/* eslint-disable @typescript-eslint/no-explicit-any */
function Table({
  tableData,
  tableBodyRef,
  activeIndex,
  handleValueChange,
  salesData,
  textAreaRef,
  handleValueKeyDown,
  taxData,
  setSalesData,
  setActiveIndex,
  taxInfo,
  setTaxInfo,
  taxInfoRef,
  handleTaxValueChange,
  handleTaxKeyDown,
  taxIndex,
  setTaxIndex,
  getTotal,
  shippingTaxData,
  paymentData,
  termsData,
  paymentTermsOpen,
  gstData,
  gstTableOpen,
  salesDataRef,
  handleFocus,
  productData,
  setType,
}: any) {
  return (
    <div className="my-table pb-1">
      <div className="table-head d-flex px-1 py-1 mb-2 align-items-center justify-content-between">
        <div className="table-left" style={{ width: '70%' }}>
          <p>
            <b>Name of Item *</b>
          </p>
        </div>
        <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '30%' }}>
          <p style={{ width: '20%' }}>
            <b>Quantity</b>
          </p>
          <p style={{ width: '25%', textAlign: 'end' }}>
            <b>Rate *</b>
          </p>
          <p style={{ width: '25%', textAlign: 'center' }}>per</p>
          <p className="text-end" style={{ width: '30%' }}>
            <b>Amount *</b>
          </p>
        </div>
      </div>
      {tableData?.length > 0 && (
        <>
          {tableData.map((item: any, index: number) => (
            <div
              className={`table-body px-1 my-1 d-flex align-items-center justify-content-between ${activeIndex === index ? 'active' : ''}`}
              key={index}
              ref={(el) => {
                if (tableBodyRef.current) {
                  tableBodyRef.current[index] = el;
                }
              }}
            >
              <div className="table-left" style={{ width: '70%' }}>
                <input
                  name="item_name"
                  value={item.item_name}
                  onChange={(e) => handleValueChange(e, 'table', index)}
                  onKeyDown={(e: any) => handleValueKeyDown(e, tableBodyRef.current['per'])}
                  onFocus={() => setActiveIndex(index)}
                  // className="ms-2"
                  style={{ outline: 'none' }}
                />
              </div>
              <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '30%' }}>
                <input
                  name="qty"
                  // type="number"
                  value={item.qty}
                  onChange={(e) => handleValueChange(e, 'table', index)}
                  onKeyDown={(e: any) => handleValueKeyDown(e, tableBodyRef)}
                  onBlur={(e) => {
                    const { name, value } = e.target;
                    const data = [...salesData.table];
                    data[index][name] = value === '' ? data[index][name] : value;
                    if (data[index]['rate'] !== '') {
                      data[index]['amt'] = Number(value) * Number(data[index]['rate']);
                    }
                    setSalesData({ ...salesData, table: data });
                    (tableBodyRef.current[index].childNodes[1].childNodes[1] as HTMLElement).focus();
                  }}
                  onFocus={() => {
                    setActiveIndex(index);
                    (tableBodyRef.current[index].childNodes[1].childNodes[0] as HTMLElement).focus();
                    setType('');
                  }}
                  // className="ms-2"
                  style={{ outline: 'none', width: '20%' }}
                />
                <input
                  name="rate"
                  value={item.rate || ''}
                  onChange={(e) => handleValueChange(e, 'table', index)}
                  onKeyDown={(e: any) => handleValueKeyDown(e, tableBodyRef)}
                  onFocus={() => setActiveIndex(index)}
                  // className="ms-2"
                  // onBlur={(e) => {
                  //   if (e.target.value !== "") {
                  //     let data = [...salesData.table];
                  //     data[activeIndex]["amt"] =
                  //       Number(data[activeIndex]["qty"] || 0) *
                  //       Number(e.target.value);

                  //     data[activeIndex]["per"] = "Nos";

                  //     setSalesData({
                  //       ...salesData,
                  //       table: [...data],
                  //     });
                  //   }
                  // }}
                  style={{ outline: 'none', width: '25%', textAlign: 'end' }}
                />
                <input
                  name="per"
                  value={item.uom}
                  onChange={(e) => handleValueChange(e, 'table', index)}
                  onKeyDown={(e: any) => handleValueKeyDown(e, tableBodyRef.current['per'])}
                  // className="ms-2"
                  style={{ outline: 'none', width: '25%', textAlign: 'center' }}
                  disabled
                />
                <input
                  name="amt"
                  value={`${salesData.currency} ${Number(item.amt).toFixed(2)}` || ''}
                  onChange={(e) => handleValueChange(e, 'table', index)}
                  onKeyDown={(e: any) => handleValueKeyDown(e, tableBodyRef.current['amt'])}
                  // className="ms-2"
                  style={{ outline: 'none', width: '30%', textAlign: 'end' }}
                  disabled
                />
              </div>
            </div>
          ))}
          {productData.map((item: any, index: number) => (
            <div
              className={`table-body px-1 my-1 d-flex align-items-center justify-content-between ${activeIndex === index ? 'active' : ''}`}
              key={index}
            >
              <div className="table-left" style={{ width: '70%' }}>
                <input name="item_name" value={item.item_name} style={{ outline: 'none' }} disabled />
              </div>
              <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '30%' }}>
                <input name="qty" value={item.qty} disabled style={{ outline: 'none', width: '20%' }} />
                <input name="rate" value={Number(item.rate).toFixed(2) || ''} disabled style={{ outline: 'none', width: '25%', textAlign: 'end' }} />
                <input name="per" value={item.uom} style={{ outline: 'none', width: '25%', textAlign: 'center' }} disabled />
                <input
                  name="amt"
                  value={`${salesData.currency} ${Number(item.amt).toFixed(2)}` || ''}
                  style={{ outline: 'none', width: '30%', textAlign: 'end' }}
                  disabled
                />
              </div>
            </div>
          ))}
          <div className="pt-2 pb-1">
            {taxData?.length > 0 &&
              taxData.map((item: any, index: number) => (
                <div className="table-body px-1 pt-1 pb-1 d-flex align-items-center justify-content-between" key={index}>
                  <div
                    className="table-left d-flex align-items-center"
                    style={{ width: '70%', color: 'light-dark(rgb(84, 84, 84), rgb(170, 170, 170))' }}
                  >
                    <p style={{ width: '25%' }}>
                      <b>{item.charge_type}</b>
                    </p>
                    <p style={{ width: '25%' }}>
                      <b>{item.description}</b>
                    </p>
                  </div>
                  <div
                    className="table-right justify-content-between d-flex align-items-center"
                    style={{ width: '30%', color: 'light-dark(rgb(84, 84, 84), rgb(170, 170, 170))' }}
                  >
                    <p style={{ width: '25%' }}>
                      <b></b>
                    </p>
                    <p style={{ width: '25%' }}>
                      <b></b>
                    </p>
                    <p className="text-end" style={{ width: '50%' }}>
                      <b>{`${salesData.currency} ${(item.amt && item.amt.toFixed(2)) || 0}`}</b>
                    </p>
                  </div>
                </div>
              ))}
            {shippingTaxData?.length > 0 &&
              shippingTaxData.map((item: any, index: number) => (
                <div className="table-body px-1 pt-1 pb-1 d-flex align-items-center justify-content-between" key={index}>
                  <div className="table-left d-flex align-items-center" style={{ width: '70%' }}>
                    <p style={{ width: '25%' }}>
                      <b>{item.charge_type}</b>
                    </p>
                    <p style={{ width: '25%' }}>
                      <b>{item.description}</b>
                    </p>
                  </div>
                  <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '30%' }}>
                    <p style={{ width: '25%' }}>
                      <b></b>
                    </p>
                    <p style={{ width: '25%' }}>
                      <b></b>
                    </p>
                    <p className="text-end" style={{ width: '50%' }}>
                      <b>{`${salesData.currency} ${item.amt && item.amt.toFixed(2)}`}</b>
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {taxInfo?.map((item: any, index: number) => (
            <div
              className={`table-body px-1 py-0 d-flex align-items-center justify-content-between ${activeIndex === index ? 'active' : ''}`}
              key={index}
              ref={(el) => {
                if (taxInfoRef.current) {
                  taxInfoRef.current[index] = el;
                }
              }}
            >
              <div className="table-left" style={{ width: '70%' }}>
                <input
                  name="charge_type"
                  value={item.charge_type}
                  onChange={(e) => handleTaxValueChange(e, index)}
                  onKeyDown={(e: any) => handleTaxKeyDown(e)}
                  onFocus={() => setTaxIndex(index)}
                  // className="ms-2"
                  style={{ outline: 'none', width: '25%' }}
                />
                <input
                  name="account_head"
                  value={item.account_head}
                  onChange={(e) => handleTaxValueChange(e, index)}
                  onKeyDown={(e: any) => handleTaxKeyDown(e)}
                  onFocus={() => setTaxIndex(index)}
                  // className="ms-2"
                  style={{ outline: 'none', width: '25%' }}
                />
              </div>
              <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '30%' }}>
                <p
                  // className="ms-2"
                  style={{ outline: 'none', width: '25%' }}
                />
                <input
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleTaxValueChange(e, index)}
                  onKeyDown={(e: any) => handleTaxKeyDown(e)}
                  onFocus={() => setTaxIndex(index)}
                  // className="ms-2"
                  // onBlur={(e) => {
                  //   if (e.target.value !== "") {
                  //     let data = [...salesData.table];
                  //     data[activeIndex]["amt"] =
                  //       Number(data[activeIndex]["qty"] || 0) *
                  //       Number(e.target.value);

                  //     data[activeIndex]["per"] = "Nos";

                  //     setSalesData({
                  //       ...salesData,
                  //       table: [...data],
                  //     });
                  //   }
                  // }}
                  style={{ outline: 'none', width: '25%', textAlign: 'end' }}
                  disabled={item.charge_type === 'Actual'}
                />
                <p
                  // className="ms-2"
                  style={{ outline: 'none', width: '5%' }}
                />
                <input
                  name="amt"
                  value={item.charge_type !== 'Actual' ? `${salesData.currency} ${Number(item.amt).toFixed(2)}` || '' : item.amt}
                  onChange={(e) => handleTaxValueChange(e, index)}
                  onKeyDown={(e: any) => handleTaxKeyDown(e)}
                  onFocus={() => setTaxIndex(index)}
                  // className="ms-2"
                  style={{ outline: 'none', width: '45%', textAlign: 'end' }}
                  disabled={item.charge_type !== 'Actual'}
                />
              </div>
            </div>
          ))}
          <div className="table-body w-100" style={{ position: 'absolute', bottom: '160px' }}>
            <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-start flex-column" style={{ width: '33%' }}>
                <label htmlFor="additional_discount_account">Additional Discount On :</label>
                <input
                  name="apply_discount_on"
                  value={salesData.apply_discount_on}
                  onChange={(e: any) => handleValueChange(e)}
                  onKeyDown={handleValueKeyDown}
                  ref={(el) => (salesDataRef.current.apply_discount_on = el)}
                  onFocus={handleFocus}
                  placeholder="Apply Discount On"
                  // className="ms-2"
                  style={{ outline: 'none', width: '100%' }}
                />
              </div>
              <div className="d-flex align-items-end flex-column" style={{ width: '33%' }}>
                <label htmlFor="additional_discount_account">Additional Discount Percentage :</label>
                <input
                  name="additional_discount_percentage"
                  value={salesData.additional_discount_percentage}
                  onChange={(e: any) => handleValueChange(e)}
                  onKeyDown={handleValueKeyDown}
                  ref={(el) => (salesDataRef.current.additional_discount_percentage = el)}
                  // onFocus={handleFocus}
                  placeholder="Additional Discount Percentage"
                  // className="ms-2"
                  style={{ outline: 'none', width: '100%', textAlign: 'end' }}
                />
              </div>
              <div className="d-flex align-items-end flex-column" style={{ width: '33%' }}>
                <label htmlFor="additional_discount_account">Additional Discount Amount :</label>
                <input
                  name="additional_discount_amount"
                  value={`${salesData.currency} ${Number(salesData.additional_discount_amount).toFixed(2)}` || ''}
                  onChange={(e: any) => handleValueChange(e)}
                  onKeyDown={handleValueKeyDown}
                  ref={(el) => (salesDataRef.current.additional_discount_amount = el)}
                  // onFocus={handleFocus}
                  // placeholder="Additional Discount Amount"
                  disabled
                  // className="ms-2"
                  style={{ outline: 'none', width: '100%', textAlign: 'end' }}
                />
              </div>
            </div>
            {salesData.apply_discount_on === 'Grand Total' && (
              <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between">
                <label htmlFor="is_cash_or_non_trade_discount" className="w-100">
                  <input
                    name="is_cash_or_non_trade_discount"
                    checked={salesData.is_cash_or_non_trade_discount}
                    onChange={(e: any) => handleValueChange(e)}
                    onKeyDown={handleValueKeyDown}
                    ref={(el) => (salesDataRef.current.is_cash_or_non_trade_discount = el)}
                    // onFocus={handleFocus}
                    type="checkbox"
                    // className="ms-2"
                    style={{ outline: 'none', width: 'fit-content' }}
                  />{' '}
                  Is Cash or Non Trade Discount
                </label>
              </div>
            )}
            {salesData.is_cash_or_non_trade_discount && (
              <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-start flex-column" style={{ width: '33%' }}>
                  <label htmlFor="additional_discount_account">Additional Discount Account :</label>
                  <input
                    name="additional_discount_account"
                    value={salesData.additional_discount_account}
                    onChange={(e: any) => handleValueChange(e)}
                    onKeyDown={handleValueKeyDown}
                    ref={(el) => (salesDataRef.current.additional_discount_account = el)}
                    onFocus={handleFocus}
                    placeholder="Additional Discount Account"
                    // className="ms-2"
                    style={{ outline: 'none', width: '100%' }}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="table-body px-1 pt-0 pb-1 d-flex w-100 align-items-center justify-content-between"
            style={{ position: 'absolute', bottom: '40px' }}
          >
            <div className="table-left" style={{ width: '70%' }}>
              <p>Narration</p>
              <textarea
                name="narration"
                value={salesData.narration}
                onChange={(e) => handleValueChange(e)}
                ref={textAreaRef}
                style={{ outline: 'none' }}
              />
            </div>
            <div className="table-head justify-content-between mt-3 d-flex align-items-center pt-0" style={{ width: '30%' }}>
              <p style={{ width: '25%' }}>{tableData.reduce((sum: any, item: any) => sum + Number(item.qty), 0)} </p>
              <p style={{ width: '25%' }}>
                <b></b>
              </p>
              {/* <p style={{ width: '25%' }}>
                <b></b>
              </p> */}
              <p className="text-end" style={{ width: '50%' }}>
                <b>
                  <i>
                    {salesData.additional_discount_amount !== '' && salesData.apply_discount_on !== 'Net Total'
                      ? `${salesData.currency || 'Rs. '} ${Number(getTotal() - salesData.additional_discount_amount).toFixed(2)}`
                      : `${salesData.currency || 'Rs. '} ${Number(getTotal()).toFixed(2) || 0}`}
                  </i>
                </b>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Table;
