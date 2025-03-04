import React from "react";
import { highlightLetter } from "../../../utils/highlightLetter";
import { DisplayMoreReportAccounts, DisplayMoreReportInventory, DisplayMoreReportStatutory, DisplayMoreReportException } from "../../../utils/menu_list";

const MoreReportMenuList = ({ menuItemsRef, selectedIndex, handleKeyDown, handleClick }: any) => {
  return (
    <div className="col-md-5 right-section d-flex flex-column">
      <h6 className="fst-italic text-secondary">Gateway of Tally</h6>
      <div className="menu-box">
        <div className="menu-header text-center">Display More Reports</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            ACCOUNTING
          </li>
          {DisplayMoreReportAccounts.map((item, index) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === 4 ? 'mt-3' : ''} ${index === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            INVENTORY
          </li>
          {DisplayMoreReportInventory.map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 6] = el)}
              className={`menu-item ${index + 6 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 6)}
              onClick={() => handleClick(index + 6)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            STATUTORY
          </li>
          {DisplayMoreReportStatutory.map((item, index) => (
            <li
              key={index + 5}
              ref={(el) => (menuItemsRef.current[index + 8] = el)}
              className={`menu-item ${index + 8 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 8)}
              onClick={() => handleClick(index + 8)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            EXCEPTION
          </li>
          {DisplayMoreReportException.map((item, index) => (
            <li
              key={index + 9}
              ref={(el) => (menuItemsRef.current[index + 9] = el)}
              className={`menu-item ${index + 9 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 9)}
              onClick={() => handleClick(index + 9)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li
            className={`menu-item mt-3 ${11 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[11] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 11)}
            onClick={() => handleClick(11)}
          >
            <span className="letter_style">Q</span>uit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoreReportMenuList;
