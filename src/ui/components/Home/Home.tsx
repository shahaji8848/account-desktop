import TallyUI from "./TallyUI";
import Sidebar from "../Sales/Sidebar";
import { homeSideBarData } from "../../utils/data";

const Home = ({ globalData, homeHookData }: any) => {
  const { isModalOpen, setIsModalOpen, setShowCustomerForm, setShowSupplierForm, setSelectedIndex,
    selectedIndex } = homeHookData;

  return (
    <div
      className="w-100 d-flex align-items-stretch justify-content-between"
      style={{ overflow: "hidden" }}
    >
      <div className="main-body" style={{ width: "86%" }}>
        {!isModalOpen ? (
          <div
            className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
            style={{ background: "#87bde6", zIndex: "999" }}
          >
            <p style={{ width: "30%" }}>Gateway of Tally</p>

            <p
              style={{ width: "5%", cursor: "pointer" }}
              className="text-end cursor-pointer"
            >
              X
            </p>
          </div>
        ) : (
          <div
            className="ps-3 pe-1 infobar py-0 d-flex align-items-center justify-content-between position-relative"
            style={{
              background: "#87bde6",
              zIndex: "999",

              display: isModalOpen ? "flex" : "none",
            }}
          >
            <p className="text-center" style={{ width: "95%" }}>
              <span style={{ paddingLeft: "270px" }}>8848 digital</span>
            </p>

            <p
              onClick={() => setIsModalOpen(false)}
              style={{ width: "5%", cursor: "pointer" }}
              className="text-end cursor-pointer"
            >
              X
            </p>
          </div>
        )}

        <TallyUI
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsSales={globalData.setIsSales}
          setShowCustomerForm={setShowCustomerForm}
          setShowSupplierForm={setShowSupplierForm}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
          globalData={globalData}
          homeHookData={homeHookData}
        />
      </div>
      {!isModalOpen ? (
        <Sidebar
          dateRef={homeHookData.dateRef}
          openCompanyDropdown={homeHookData.openCompanyDropdown}
          sideBarData={homeSideBarData}
        />
      ) : (
        <Sidebar
          dateRef={homeHookData.dateRef}
          openCompanyDropdown={homeHookData.openCompanyDropdown}
        />
      )}
    </div>
  );
};

export default Home;




