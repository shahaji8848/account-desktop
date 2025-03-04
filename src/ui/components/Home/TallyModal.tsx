import { useEffect, useRef, useState } from "react";
import BottomNavbar from "../Sales/BottomNavbar";
import "./TallyModal.css";
import { useNavigate } from "react-router-dom";

function MainBody({ isModalOpen, setShowCustomerForm, setShowSupplierForm }: any) {
  const formRef = useRef<HTMLDivElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLLIElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const allItems = [
    "Group", "Ledger", "Currency", "Customer", "Supplier",
    "Stock Group", "Stock Category", "Stock Item", "Unit", "Godown",
    "GST Registration", "GST Classification",
    "Company GST Details", "PAN/CIN Details"
  ];

  const accountingMasters = ["Group", "Ledger", "Currency", "Customer", "Supplier"];
  //   const inventoryMasters = ["Stock Group", "Stock Category", "Stock Item", "Unit", "Godown"];
  //   const statutoryMasters = ["GST Registration", "GST Classification"];
  //   const statutoryDetails = ["Company GST Details", "PAN/CIN Details"];

  useEffect(() => {
    if (isModalOpen) {
      setSelectedIndex(1);
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();

    const focusableElements = Array.from(
      formRef.current?.querySelectorAll(
        "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) || []
    ) as HTMLElement[];

    const index = focusableElements.indexOf(e.currentTarget as HTMLElement);

    if (e.key === "ArrowDown") {
      const nextIndex = (index + 1) % focusableElements.length;
      setSelectedIndex(nextIndex);
      focusableElements[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
      setSelectedIndex(prevIndex);
      focusableElements[prevIndex]?.focus();
    } else if (e.key === "Enter") {
      const item = (e.currentTarget as HTMLElement).textContent;
      if (item === "Customer") {
        navigate('/customer-form')
      } else if (item === "Supplier") {
        navigate('/supplier-form')
      }
    }
  };

  const handleClick = (item: any) => {
    if (item === "Customer") {
      navigate('/customer-form')
    } else if (item === "Supplier") {
      navigate('/supplier-form')
    }
  }

  return (
    <>
      <div className="popup" style={{ display: isModalOpen ? "flex" : "none" }}>
        <div className="popup-body" style={{ background: "transparent" }}>
          <div className="list-of-masters mb-5" style={{ width: "400px" }} ref={formRef}>
            <div className="master-creation">
              <p>Master Creation</p>
              <input
                type="text"
                className="master-input"
                // ref={inputRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="masters-header">
              <p>List of Masters</p>
            </div>
            <div
              className="text-end"
              style={{ height: "60px", borderBottom: "1px solid black" }}
            >
              <span className="float-right pe-2">Change Company | Show More</span>
            </div>
            <ul className="masters-list">
              <li><strong>Accounting Masters</strong></li>
              {allItems.slice(0, 5).map((item, index) => (
                <li
                  ref={item === 'Group' ? inputRef : null}
                  key={index}
                  className={`modal-menu-item ${selectedIndex === index + 1 ? "highlight" : ""}`}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </li>
              ))}

              <li><strong>Inventory Masters</strong></li>
              {allItems.slice(5, 10).map((item, index) => (
                <li
                  key={index + 6}
                  className={`modal-menu-item ${selectedIndex === index + 6 ? "highlight" : ""}`}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {item}
                </li>
              ))}

              <li><strong>Statutory Masters</strong></li>
              {allItems.slice(10, 12).map((item, index) => (
                <li
                  key={index + 11}
                  className={`modal-menu-item ${selectedIndex === index + 11 ? "highlight" : ""}`}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {item}
                </li>
              ))}

              <li><strong>Statutory Details</strong></li>
              {allItems.slice(12).map((item, index) => (
                <li
                  key={index + 13}
                  className={`modal-menu-item ${selectedIndex === index + 13 ? "highlight" : ""}`}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}

export default MainBody;
