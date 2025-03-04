function ShowFilter({
  filteredItems,
  selectedIndex,
  fieldname,
  handleClick,
  handleItemFocus,
  handleItemPerClick,
  type = '',
  top,
  right,
  filterListName = 'Items',
}: any) {
  // console.log(filterListName);
  return (
    <div
      className="filter-section position-fixed h-100"
      style={{
        background: '#e1f0fa',
        width: '20%',
        right: right || '14%',
        top: top || '75px',
        border: '1px solid #a4b0ad',
        zIndex: '99',
        overflowY: 'scroll',
      }}
    >
      <div className="title px-2" style={{ background: '#2a66b0', color: 'white' }}>
        List of {filterListName}
      </div>
      <div className="filter-list px-2 pt-2">
        <p className="text-end" style={{ borderBottom: '1px solid #222' }}>
          Create
        </p>
        <div className="list-items">
          <p>&#9670; End of list</p>
          {filteredItems?.map((item: any, index: number) => (
            <p
              key={index}
              className={`filtered-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleClick(item)}
              onFocus={() => handleItemFocus(index)}
              tabIndex={0}
            >
              {item?.name ? item?.name : item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowFilter;
