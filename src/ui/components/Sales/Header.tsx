function Header() {
  return (
    <div className="header px-0 py-2">
      <div
        className="container-fluid d-flex align-items-stretch justify-content-start px-0"
        style={{ gap: "0%" }}
      >
        <div
          className="main-header d-flex align-items-stretch justify-content-between px-3"
          style={{ width: "86%" }}
        >
          <div className="left d-flex justify-content-start"  style={{ width: "45%" }}>
            <div className="logo">
              <p style={{ borderBottom: "0", minHeight: '12px' }}></p>
              <h2>ERPNext</h2>
              {/* <img src="" alt="" /> */}
            </div>
            <div className="menu ps-5 d-flex align-items-start justify-content-between flex-column">
              <p style={{ width: "100%" }}>Manage</p>
              <div className="menu-items d-flex align-items-center justify-content-start">
                <p>
                  <span>K</span> : Company
                </p>
                <p>
                  <span>Y</span> : Data
                </p>
                <p>
                  <span>Z</span> : Exchange
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: "15%" }} className="menu d-flex align-items-center justify-content-between flex-column">
            <div></div>
            <div className="menu-items d-flex align-items-center justify-content-start">
              <div className="goto-btn">
                <span>G</span> : Go to
              </div>
            </div>
          </div>
          <div style={{ width: "40%" }} className="ps-5 menu d-flex align-items-start justify-content-between flex-column">
            <div></div>
            <div className="menu-items d-flex align-items-center justify-content-start">
              <p>
                <span>O</span> : Import
              </p>
              <p>
                <span>E</span> : Export
              </p>
              <p>
                <span>M</span> : Share
              </p>
              <p className="pe-0">
                <span>P</span> : Print
              </p>
            </div>
          </div>
        </div>
        <div
          className="side-header ps-1 pe-3 d-flex align-items-stretch justify-content-start"
          style={{ width: "14%" }}
        >
          <div className="menu d-flex align-items-start justify-content-between flex-column">
            <div></div>
            <div className="menu-items d-flex align-items-center justify-content-start">
              <p>
                <span style={{ borderBottom: "0" }}>F1</span> : Help
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
