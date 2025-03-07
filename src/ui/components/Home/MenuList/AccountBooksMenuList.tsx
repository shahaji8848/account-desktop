import React from "react";
import { highlightLetter } from "../../../utils/highlightLetter";
import { AccountBookSummaryList, AccountBookRegisterList } from "../../../utils/menu_list";

const AccountBooksMenuList = ({ menuItemsRef, selectedIndex, handleKeyDown, handleClick }: any) => {
  return (
    <div className="col-md-5 right-section d-flex flex-column">
      <h6 className="fst-italic text-secondary m-0">Gateway of Tally</h6>
      <h6 className="fst-italic text-secondary m-0">Display More Reports</h6>
      <div className="menu-box">
        <div className="menu-header text-center">Account Books</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            SUMMARY
          </li>
          {AccountBookSummaryList.map((item, index) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            REGISTERS
          </li>
          {AccountBookRegisterList.map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 4] = el)}
              className={`menu-item ${index === 3 || index === 5 || index === 8 ? 'mt-2' : ''} ${index + 4 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 4)}
              onClick={() => handleClick(index + 4)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li
            className={`menu-item mt-3 ${13 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[13] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 13)}
            onClick={() => handleClick(13)}
          >
            <span className="letter_style">Q</span>uit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountBooksMenuList;
