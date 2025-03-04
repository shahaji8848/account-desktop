function GstDataTablePopup({ gstTableOpen, salesData, gstData }: any) {
  return (
    <div
      className="popup table-popup"
      style={{
        display: gstTableOpen ? 'flex' : 'none',
      }}
    >
      <div
        className="popup-body d-flex align-items-center justify-content-between w-100 flex-column gap-1"
        style={{
          marginLeft: '-14%',
          maxWidth: '900px',
        }}
      >
        <div className="my-table pb-1 w-100">
          {salesData?.table?.length > 0 && (
            <div className="w-100">
              {salesData.tax_template === 'Output GST In-state - 8DL' ? (
                <>
                  <div className="table-head d-flex px-1 py-1 mb-2 align-items-start justify-content-between w-100">
                    <p style={{ width: '25%' }}>
                      <b>Item Name</b>
                    </p>
                    <p className="text-end" style={{ width: '25%' }}>
                      <b>Taxable Amount</b>
                    </p>
                    <p className="text-end" style={{ width: '25%' }}>
                      <b>CGST</b>
                    </p>
                    <p className="text-end" style={{ width: '25%' }}>
                      <b>SGST</b>
                    </p>
                  </div>
                  <div
                    className="table-body w-100"
                    // style={{ position: 'absolute', bottom: '160px' }}
                  >
                    {gstData?.length > 0 &&
                      gstData.map((item: any, index: number) => (
                        <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between" key={index}>
                          <p style={{ width: '25%' }}>
                            <b>{item.item_name}</b>
                          </p>
                          <p className="text-end" style={{ width: '25%' }}>
                            <b>{salesData.currency || 'Rs. '} {Number(item.taxable_amt).toFixed(2) || 0}</b>
                          </p>
                          <p className="text-end" style={{ width: '25%' }}>
                            <b>
                              ({item.cgst_gst_rate / 2}%) {salesData.currency || 'Rs. '} {Number(item.cgst_taxed_amt).toFixed(2) || 0}
                            </b>
                          </p>
                          <p className="text-end" style={{ width: '25%' }}>
                            <b>
                              ({item.sgst_gst_rate / 2}%) {salesData.currency || 'Rs. '} {Number(item.sgst_taxed_amt).toFixed(2) || 0}
                            </b>
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="table-head d-flex px-1 py-1 mb-2 align-items-start justify-content-between w-100">
                    <p style={{ width: '33%' }}>
                      <b>Item Name</b>
                    </p>
                    <p className="text-end" style={{ width: '33%' }}>
                      <b>Taxable Amount</b>
                    </p>
                    <p className="text-end" style={{ width: '33%' }}>
                      <b>IGST</b>
                    </p>
                  </div>
                  <div
                    className="table-body w-100"
                    // style={{ position: 'absolute', bottom: '160px' }}
                  >
                    {gstData?.length > 0 &&
                      gstData.map((item: any, index: number) => (
                        <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between" key={index}>
                          <p style={{ width: '33%' }}>
                            <b>{item.item_name}</b>
                          </p>
                          <p className="text-end" style={{ width: '33%' }}>
                            <b>{salesData.currency || 'Rs. '} {Number(item.taxable_amt).toFixed(2) || 0}</b>
                          </p>
                          <p className="text-end" style={{ width: '33%' }}>
                            <b>
                              ({item.igst_gst_rate}%) {salesData.currency || 'Rs. '} {Number(item.igst_taxed_amt).toFixed(2) || 0}
                            </b>
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GstDataTablePopup;
