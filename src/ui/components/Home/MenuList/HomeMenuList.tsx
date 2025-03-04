import React from "react";
import { highlightLetter } from "../../../utils/highlightLetter";
import { HomeMenuMasterList, HomeMenuTransactionList, HomeMenuUtilitiesList, HomeMenuReportsList } from "../../../utils/menu_list";

const HomeMenuList = ({ menuItemsRef, selectedIndex, handleKeyDown, handleClick }: any) => {
  return (
    <div className="col-md-5 right-section">
      <div className="menu-box">
        <div className="menu-header text-center">Gateway of Tally</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: "#87bde6" }}>
            MASTERS
          </li>
          {HomeMenuMasterList.map((item, index) => (
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
            TRANSACTIONS
          </li>
          {HomeMenuTransactionList.map((item, index) => (
            <li
              key={index + 3}
              ref={(el) => (menuItemsRef.current[index + 3] = el)}
              className={`menu-item ${index + 3 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 3)}
              onClick={() => handleClick(index + 3)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            UTILITIES
          </li>
          {HomeMenuUtilitiesList.map((item, index) => (
            <li
              key={index + 5}
              ref={(el) => (menuItemsRef.current[index + 5] = el)}
              className={`menu-item ${index + 5 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 5)}
              onClick={() => handleClick(index + 5)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li className="menu-category mt-3" style={{ color: "#87bde6" }}>
            REPORTS
          </li>
          {HomeMenuReportsList.map((item, index) => (
            <li
              key={index + 6}
              ref={(el) => (menuItemsRef.current[index + 6] = el)}
              className={`menu-item ${index === 4 ? 'mt-3' : ''} ${index + 6 === selectedIndex ? "active" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index + 6)}
              onClick={() => handleClick(index + 6)}
            >
              {highlightLetter(item.name, item.letter)}
            </li>
          ))}

          <li
            className={`menu-item mt-3 ${12 === selectedIndex ? "active" : ""}`}
            ref={(el) => (menuItemsRef.current[12] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 12)}
          >
            <span className="letter_style">Q</span>uit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeMenuList;
