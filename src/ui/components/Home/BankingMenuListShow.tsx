'use client';

const BankingMenuListShow = ({ menuItemsRef, selectedIndex, handleKeyDown, handleClick, menuItems }: any) => {
  return (
    <div className="col-md-5 right-section">
      <div className="menu-box">
        <div className="menu-header text-center">Gateway of Tally</div>
        <ul className="list-unstyled text-center mt-5">
          <li className="menu-category" style={{ color: '#87bde6' }}>
            Statements
          </li>
          {menuItems.map((item: any, index: number) => (
            <li
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              className={`menu-item ${index === selectedIndex ? 'active' : ''}`}
              tabIndex={0} // Only the selected item is focusable
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
            >
              {item?.label}
            </li>
          ))}
          <li
            className={`menu-item mt-3 ${2 === selectedIndex ? 'active' : ''}`}
            ref={(el) => (menuItemsRef.current[2] = el)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            onClick={() => handleClick(2)}
          >
            <span className="letter_style">Q</span>uit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankingMenuListShow;
