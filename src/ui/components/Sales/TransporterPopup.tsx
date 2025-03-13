function TransporterPopup({ transporterPopup, transporterData, handleValueChange, handleValueKeyDown, transporterRef, handleFocus }: any) {
  return (
    <>
      <div className="popup company-popup" style={{ display: transporterPopup ? 'flex' : 'none' }}>
        <div className="popup-body">
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Transporter</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="transporter"
              value={transporterData['transporter']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.transporter = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Transporter Name</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="transporter_name"
              value={transporterData['transporter_name']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.transporter_name = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
              disabled
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>GST Transporter ID</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="gst_transporter_id"
              value={transporterData['gst_transporter_id']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.gst_transporter_id = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              // onFocus={handleFocus}
              disabled
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Mode Of Transport</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="mode_of_transport"
              value={transporterData['mode_of_transport']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.mode_of_transport = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Driver</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="driver"
              value={transporterData['driver']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.driver = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Driver Name</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="driver_name"
              value={transporterData['driver_name']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.driver_name = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              // onFocus={handleFocus}
              disabled
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Transport Receipt No</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="lr_no"
              value={transporterData['lr_no']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.lr_no = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Transport Receipt Date</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="lr_date"
              value={transporterData['lr_date']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.lr_date = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
              type="date"
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Vehicle No.</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="vehicle_no"
              value={transporterData['vehicle_no']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.vehicle_no = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>Distance (In KM)</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="distance"
              value={transporterData['distance']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.distance = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
          <div className="d-flex align-items-center w-100">
            <div className="salesNo d-flex align-items-center justify-content-between" style={{ width: '33%' }}>
              <label className="ps-1 pe-3">
                <b>GST Vehicle Type</b>
              </label>
              <p>: </p>
            </div>
            <input
              name="gst_vehicle_type"
              value={transporterData['gst_vehicle_type']}
              onChange={(e: any) => handleValueChange(e)}
              ref={(el) => (transporterRef.current.gst_vehicle_type = el)}
              onKeyDown={handleValueKeyDown}
              className="ms-2"
              style={{ outline: 'none', width: '63%' }}
              onFocus={handleFocus}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TransporterPopup;
