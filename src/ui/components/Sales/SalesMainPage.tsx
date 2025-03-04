// import useSalesHook from "../../hooks/useSalesHook";
// import { sideBarData } from "../../utils/data";
import MainBody from "./MainBody";
// import Sidebar from "./Sidebar";

function SalesMainPage({salesHookData, globalData}:any) {
  return (
    <div className="main-body" style={{ width: "86%" }}>
      <div
        className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
        style={{ background: "#87bde6", zIndex: "999" }}
      >
        <p style={{ width: "30%" }}>Accounting Voucher Creation</p>
        <p style={{ width: "25%" }} className="text-center">
          Company Name: {globalData.companyData.company_name || ""}
        </p>
        <p style={{ width: "15%" }} className="text-center">
          Address:{" "}
          {`${globalData.companyData.company_address.slice(0, 10)}...` || ""}
        </p>
        <p style={{ width: "25%" }} className="text-center">
          GSTIN No.: {globalData.companyData.company_gstin || ""}
        </p>
        <p
          onClick={salesHookData.handleFilterClose}
          style={{ width: "5%", cursor: "pointer" }}
          className="text-end cursor-pointer"
        >
          X
        </p>
      </div>
      <MainBody salesDataRef={salesHookData.salesDataRef} {...salesHookData} />
    </div>
  );
}

export default SalesMainPage;
