import ShowFilter from '../common/ShowFilter';
import Table from './Table';
import Input from './Input';
import BottomNavbar from './BottomNavbar';
import TableItemsPopup from './TableItemsPopup';
import TaxInfoPopup from './TaxInfoPopup';
import PartyNamePopup from './PartyNamePopup';
import TermsPopup from './TermsPopup';
import PaymentDataTablePopup from './PaymentDataTablePopup';
import GstDataTablePopup from './GstDataTablePopup';
// import CompanyPopup from "../common/CompanyPopup";

function MainBody({ salesDataRef, ...salesHookData }: any) {
  const {
    salesData,
    handleValueChange,
    handleValueKeyDown,
    handleItemClick,
    handleItemFocus,
    filteredItems,
    showFilter,
    tableBodyRef,
    selectedIndex,
    taxData,
    checkHandleSubmit,
    textAreaRef,
    activeIndex,
    submitted,
    // handleShowFilter,
    setSalesData,
    handleRate,
    partyNamePopup,
    setPartyNamePopup,
    dateRef,
    date,
    tableItemsPopup,
    tablePopupRef,
    itemsData,
    setActiveIndex,
    taxInfo,
    setTaxInfo,
    taxInfoRef,
    handleTaxValueChange,
    handleTaxKeyDown,
    taxIndex,
    setTaxIndex,
    taxInfoPopup,
    taxInfoPopupRef,
    getTotal,
    shippingTaxData,
    paymentData,
    termsData,
    termsPopup,
    paymentTermsOpen,
    gstData,
    gstTableOpen,
    productData,
    setFieldName,
    setType,
    filterListName,
    handleTermsPopup,
    handlePartyNamePopup,
    handleGstPopup,
    setDate
  } = salesHookData;

  const handleFocus = (e: any) => {
    e.preventDefault();
    if (e.target.name === 'party_name') {
      setPartyNamePopup(true);
      setTimeout(() => {
        if (salesDataRef.current.party_name) {
          salesDataRef.current.party_name.focus();
        }
      }, 0);
    }
    setType('dropdown');
    // handleShowFilter(e.target.name);
  };

  return (
    <div className="body-with-filter d-flex align-items-stretch justify-content-between position-relative" style={{ minHeight: 'calc(100% - 11px)' }}>
      <div className="main-body-left w-100">
        <div className="data-main pe-1">
          <div className="d-flex w-100 align-items-center pt-2 pb-0 justify-content-between">
            {/* <Input
              label="Sales"
              placeholder="No."
              value={salesData['sales_no']}
              handleValueChange={handleValueChange}
              handleValueKeyDown={handleValueKeyDown}
              name="sales_no"
              dataRef={(el: any) => (salesDataRef.current['sales_no'] = el)}
              style={{ background: '#2a66b0', color: 'white' }}
              disabled={submitted}
            /> */}
            <div className="salesNo d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label style={{ background: '#2a66b0', color: 'white' }} className="px-5">
                  Series *
                </label>
                <p>: </p>
              </div>
              <input
                name="naming_series"
                value={salesData.naming_series}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.naming_series = el)}
                className="ms-2 w-50"
                style={{ outline: 'none' }}
                onFocus={handleFocus}
              />
            </div>
            {salesData.naming_series !== '' && (
              <div className="d-flex align-items-center ps-1 ms-1">
                <label
                  className="ps-1 pe-3"
                  style={{
                    background: 'transparent',
                    color: '#747573',
                    fontStyle: 'italic',
                  }}
                >
                  status
                </label>
                <p
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  :{' '}
                </p>
                <p className="ps-2 font-bold" style={{ fontWeight: 'bold' }}>
                  {submitted ? 'Draft' : 'null'}
                </p>
              </div>
            )}
            <div className="salesNo d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Posting Date *</label>
                <p>: </p>
              </div>
              <input
                name="posting_date"
                value={date.posting_date}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (dateRef.current.posting_date = el)}
                className="ms-2 w-50"
                style={{ outline: 'none' }}
                type="date"
              />
            </div>
          </div>
          <div className="d-flex w-100 align-items-center pt-0 pb-0 justify-content-between">
            <div className="d-flex align-items-center" style={{ width: '42%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '35.9%' }}>
                <label className="ps-1 pe-3">Party A/C Name *</label>
                <p>: </p>
              </div>
              <input
                name="party_name"
                value={salesData.party_details['party_name']}
                // onChange={(e: any) => handleValueChange(e)}
                // ref={(el) => (salesDataRef.current.party_name = el)}
                // onKeyDown={handleValueKeyDown}
                className="ms-2"
                style={{ outline: 'none', width: '50%' }}
                onFocus={handleFocus}
                // readOnly
              />
            </div>
            <div className="salesNo d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Due Date *</label>
                <p>: </p>
              </div>
              <input
                name="due_date"
                value={date.due_date}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (dateRef.current.due_date = el)}
                className="ms-2 w-50"
                style={{ outline: 'none' }}
                type="date"
              />
            </div>
          </div>
          <div className="d-flex w-100 align-items-center pt-0 pb-0 justify-content-between" style={{ minHeight: '21.6px' }}>
            <div className="d-flex align-items-center" style={{ width: '43.8%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '34.5%' }}>
                <label className="ps-1 pe-3">Billing Address</label>
                <p>: </p>
              </div>
              <p className="ps-2 font-bold" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {salesData.party_details.billing_address_line1 ? `${salesData.party_details.billing_address_line1?.slice(0, 35)}...` : ''}
              </p>
            </div>
            <div className="d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Shipping Address</label>
                <p>: </p>
              </div>
              <p className="ps-2 font-bold" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {salesData.party_details.shipping_address_line1 ? `${salesData.party_details.shipping_address_line1?.slice(0, 35)}...` : ''}
              </p>
            </div>
          </div>
          {/* <div className="d-flex w-100 align-items-center pt-0 pb-0 justify-content-between"></div> */}
          <div className="d-flex w-100 align-items-center pt-0 pb-0 justify-content-between" style={{ minHeight: '21.6px' }}>
            <div className="d-flex align-items-center" style={{ width: '43.8%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '34.5%' }}>
                <label className="ps-1 pe-3">Billing GSTIN No.</label>
                <p>: </p>
              </div>
              <p className="ps-2 font-bold w-50" style={{ fontWeight: 'bold' }}>
                {salesData.party_details.billing_gstin}
              </p>
            </div>
            <div className="d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Shipping GSTIN No.</label>
                <p>: </p>
              </div>
              <p className="ps-2 font-bold w-50" style={{ fontWeight: 'bold' }}>
                {salesData.party_details.shipping_gstin}
              </p>
            </div>
          </div>
          {/* <div className="d-flex w-100 align-items-center pt-0 pb-0 justify-content-between"></div> */}
          <div className="d-flex w-100 align-items-center pt-0 justify-content-between">
            <div className="d-flex align-items-center" style={{ width: '35.4%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '42.5%' }}>
                <label className="ps-1 pe-3">Cost Center</label>
                <p>: </p>
              </div>
              <input
                name="cost_center"
                value={salesData.cost_center}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.cost_center = el)}
                className="ms-2"
                style={{ outline: 'none' }}
                onFocus={handleFocus}
              />
            </div>
            <div className="d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Shipping Detail</label>
                <p>: </p>
              </div>
              <input
                name="shipping_detail"
                value={salesData.shipping_detail}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.shipping_detail = el)}
                className="ms-2"
                style={{ outline: 'none', width: '50%' }}
                onFocus={handleFocus}
              />
            </div>
          </div>
          <div className="d-flex w-100 pt-0 align-items-center justify-content-between">
            <div className="d-flex align-items-center" style={{ width: '35.4%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '42.5%' }}>
                <label className="ps-1 pe-3">Payment Terms</label>
                <p>: </p>
              </div>
              <input
                name="payment_terms"
                value={salesData.payment_terms}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.payment_terms = el)}
                className="ms-2"
                style={{ outline: 'none' }}
                onFocus={handleFocus}
              />
            </div>

            <div className="d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Update Stock</label>
                <p>: </p>
              </div>
              <input
                name="update_stock"
                type="checkbox"
                // value={salesData.update_stock}
                checked={salesData.update_stock ? true : false}
                onChange={handleValueChange}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.update_stock = el)}
                className="ms-2"
                style={{ outline: 'none' }}
                // onFocus={handleFocus}
              />
            </div>
          </div>
          <div className="d-flex w-100 align-items-center py-0 justify-content-between">
            <div className="d-flex align-items-center" style={{ width: '35.4%' }}>
              {salesData.update_stock && (
                <>
                  <div className="d-flex align-items-center justify-content-between" style={{ width: '42.5%' }}>
                    <label className="ps-1 pe-3">Source Warehouse</label>
                    <p>: </p>
                  </div>
                  <input
                    name="source_warehouse"
                    value={salesData.source_warehouse}
                    onChange={(e: any) => handleValueChange(e)}
                    onKeyDown={handleValueKeyDown}
                    ref={(el) => (salesDataRef.current.source_warehouse = el)}
                    onFocus={handleFocus}
                    className="ms-2"
                    style={{ outline: 'none' }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="d-flex w-100 pt-0 pb-1 align-items-center justify-content-between">
            <div className="d-flex align-items-center" style={{ width: '35.4%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '42.5%' }}>
                <label className="ps-1 pe-3">Currency *</label>
                <p>: </p>
              </div>
              <input
                name="currency"
                value={salesData.currency}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.currency = el)}
                className="ms-2"
                style={{ outline: 'none', width: '50%' }}
                onFocus={handleFocus}
              />
            </div>
            <div className="d-flex align-items-center" style={{ width: '33%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                <label className="ps-1 pe-3">Exchange Rate</label>
                <p>: </p>
              </div>
              <input
                name="conversion_rate"
                value={salesData.conversion_rate}
                onChange={(e: any) => handleValueChange(e)}
                onKeyDown={handleValueKeyDown}
                ref={(el) => (salesDataRef.current.conversion_rate = el)}
                className="ms-2"
                style={{ outline: 'none', width: '50%' }}
                // onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
        <Table
          tableData={salesData.table}
          tableBodyRef={tableBodyRef}
          handleValueChange={handleValueChange}
          handleValueKeyDown={handleValueKeyDown}
          textAreaRef={textAreaRef}
          activeIndex={activeIndex}
          salesData={salesData}
          taxData={taxData}
          setSalesData={setSalesData}
          handleRate={handleRate}
          setActiveIndex={setActiveIndex}
          taxInfo={taxInfo}
          setTaxInfo={setTaxInfo}
          taxInfoRef={taxInfoRef}
          handleTaxValueChange={handleTaxValueChange}
          handleTaxKeyDown={handleTaxKeyDown}
          taxIndex={taxIndex}
          setTaxIndex={setTaxIndex}
          getTotal={getTotal}
          shippingTaxData={shippingTaxData}
          paymentData={paymentData}
          termsData={termsData}
          paymentTermsOpen={paymentTermsOpen}
          gstData={gstData}
          gstTableOpen={gstTableOpen}
          handleFocus={handleFocus}
          salesDataRef={salesDataRef}
          productData={productData}
          setType={setType}
        />
      </div>
      {showFilter && (
        <ShowFilter
          filteredItems={filteredItems || []}
          selectedIndex={selectedIndex}
          handleClick={handleItemClick}
          handleItemFocus={handleItemFocus}
          filterListName={filterListName}
        />
      )}
      <PaymentDataTablePopup
        paymentData={paymentData}
        getTotal={getTotal}
        dueDate={date.due_date}
        salesData={salesData}
        tableData={salesData.table}
        paymentTermsOpen={paymentTermsOpen}
        setDate={setDate}
      />
      <GstDataTablePopup gstTableOpen={gstTableOpen} salesData={salesData} gstData={gstData} />
      <PartyNamePopup
        partyNamePopup={partyNamePopup}
        salesData={salesData}
        handleValueChange={handleValueChange}
        handleValueKeyDown={handleValueKeyDown}
        salesDataRef={salesDataRef}
        handleFocus={handleFocus}
      />
      <TableItemsPopup
        tableItemsPopup={tableItemsPopup}
        itemsData={itemsData}
        tablePopupRef={tablePopupRef}
        handleValueChange={handleValueChange}
        handleValueKeyDown={handleValueKeyDown}
        handleFocus={handleFocus}
        salesData={salesData}
        setFieldName={setFieldName}
        setType={setType}
      />
      <TaxInfoPopup
        taxInfoPopup={taxInfoPopup}
        taxIndex={taxIndex}
        taxInfo={taxInfo}
        handleTaxKeyDown={handleTaxKeyDown}
        handleTaxValueChange={handleTaxValueChange}
        taxInfoPopupRef={taxInfoPopupRef}
      />
      <TermsPopup
        termsPopup={termsPopup}
        salesData={salesData}
        handleValueChange={handleValueChange}
        handleValueKeyDown={handleValueKeyDown}
        handleFocus={handleFocus}
        salesDataRef={salesDataRef}
      />
      <BottomNavbar
        handleSubmit={checkHandleSubmit}
        handleTermsPopup={handleTermsPopup}
        handlePartyNamePopup={handlePartyNamePopup}
        handleGstPopup={handleGstPopup}
      />
    </div>
  );
}

export default MainBody;
