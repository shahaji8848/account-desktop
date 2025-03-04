// import { RefObject } from "react";
// import { SalesData } from "../../hooks/useSalesHook";

function Sidebar({ dateRef, openCompanyDropdown, sideBarData }: any) {
  return (
    <div
      className="side-body px-1 d-flex pb-2 flex-column justify-content-between position-relative"
      style={{
        width: "14%",
        background: "#def1fc",
        minHeight: "calc(100vh - 63px)",
        zIndex: "999",
      }}
    >
      <div className="top">
        {sideBarData?.map((item:any, index:number) => (
          <div
            className={`tab ${item.next_tab ? " mt-4" : ""} ${
              item.tab_inactive ? "disabled" : ""
            }`}
            key={index}
            onClick={() => {item.label === "F2" && dateRef.current?.posting_date?.focus();
              item.label === "F3" && openCompanyDropdown();
            }}
          >
            <p>
              <span className="fw-bold" style={{ color: "#589dcc" }}>
                {item.label} :
              </span>{" "}
              {item.text}
            </p>
            <p className={item.arrow_inactive ? "disabled" : ""}>{"<"}</p>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="tab disabled">
          <p>
            <span className="fw-bold" style={{ color: "#589dcc" }}>
              F12 :
            </span>{" "}
            Configure
          </p>
          <p className="disabled">{"<"}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
