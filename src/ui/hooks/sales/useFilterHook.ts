/**
 * Custom hook for filtering data based on the selected field.
 * @param {Object} filterData - The dataset used for filtering.
 * @param {Object} salesData - Sales-related data.
 * @param {Object} companyData - Company-related data.
 * @param {Object} itemsData - Item-related data.
 * @param {Object} taxInfo - Tax-related information.
 * @param {number} taxIndex - Index for taxInfo array.
 * @param {boolean} isSelecting - Prevents filtering when selecting.
 * @param {boolean} tableItemsPopup - Indicates if table items popup is open.
 * @param {boolean} taxInfoPopup - Indicates if tax info popup is open.
 * @param {number} activeIndex - Current active index for table selection.
 * @param {string[]} chargeTypeData - Default charge type options.
 * @returns {{ handleFilter: Function, filteredItems: string[], selectedIndex: number }}
 */
const useFilterHook = ({
  filterData,
  salesData,
  companyData,
  itemsData,
  taxInfo,
  taxIndex,
  isSelecting,
  tableItemsPopup,
  taxInfoPopup,
  activeIndex,
  chargeTypeData,
  setFilteredItems,
  setSelectedIndex,
  fieldName,
}: any) => {
  const handleFilter = () => {
    if (!isSelecting) {
      let filtered: string[] = [];

      if (fieldName === 'cost_center' && !tableItemsPopup && !taxInfoPopup) {
        filtered = filterData[fieldName].filter((item: any) => item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'cost_center' && tableItemsPopup) {
        filtered = filterData[fieldName].filter((item: any) => item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'cost_center' && taxInfoPopup) {
        filtered = filterData[fieldName].filter((item: any) =>
          item?.toLowerCase().includes((taxInfo[taxIndex][fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'party_name' || fieldName === 'contact_person') {
        console.log(filterData[fieldName]);
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.toLowerCase().includes((salesData.party_details[fieldName] as string)?.toLowerCase() || '')
        );
      }
      if (fieldName === 'batch_no') {
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || '')
        );
      }
      if (fieldName === 'company_name') {
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.toLowerCase().includes((companyData[fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'income_account' || fieldName === 'expense_account' || fieldName === 'account_head') {
        // console.log(filterData, tableItemsPopup ? itemsData[fieldName] : taxInfo[taxIndex][fieldName], "trial")
        filtered = filterData['account_data']?.filter((item: any) =>
          item?.toLowerCase().includes((tableItemsPopup ? itemsData[fieldName] : (taxInfo[taxIndex][fieldName] as string))?.toLowerCase() || '')
        );
      }

      if (fieldName === 'additional_discount_account') {
        // console.log(filterData, tableItemsPopup ? itemsData[fieldName] : taxInfo[taxIndex][fieldName], "trial")
        filtered = filterData['account_data']?.filter((item: any) =>
          item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || '')
        );
      }
      
      if (fieldName === 'receivable_account') {
        // console.log(filterData, tableItemsPopup ? itemsData[fieldName] : taxInfo[taxIndex][fieldName], "trial")
        filtered = filterData['account_data']?.filter((item: any) =>
          item?.toLowerCase().includes((salesData.party_details[fieldName] as string)?.toLowerCase() || '')
        );
      }
      
      if (fieldName === 'currency') {
        // console.log(filterData, tableItemsPopup ? itemsData[fieldName] : taxInfo[taxIndex][fieldName], "trial")
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'source_warehouse') {
        filtered = filterData['warehouse']?.filter((item: any) =>
          item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'warehouse') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'uom') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'hsn') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'margin_type') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'item_tax_template') {
        const data = filterData[fieldName]?.filter((item: any) =>
          item.name?.toLowerCase().includes((itemsData[fieldName] as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }

      if (fieldName === 'company_name') {
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.toLowerCase().includes((companyData[fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'charge_type') {
        filtered =
          filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((taxInfo[taxIndex][fieldName] as string)?.toLowerCase() || '')) ||
          chargeTypeData;
      }

      if (fieldName === 'naming_series' || fieldName === 'shipping_detail' || fieldName === 'incoterm') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'apply_discount_on') {
        filtered = filterData[fieldName]?.filter((item: any) => item?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || ''));
      }

      if (fieldName === 'payment_terms' || fieldName === 'terms_and_conditions') {
        filtered = filterData[fieldName]?.filter((item: any) =>
          item?.name?.toLowerCase().includes((salesData[fieldName] as string)?.toLowerCase() || '')
        );
      }

      if (fieldName === 'billing_address') {
        const data = filterData[fieldName]?.filter((item: any) =>
          item?.name?.toLowerCase().includes((salesData.party_details[fieldName]?.name as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'shipping_address') {
        const data = filterData[fieldName]?.filter((item: any) =>
          item?.name?.toLowerCase().includes((salesData.party_details[fieldName]?.name as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'company_address') {
        const data = filterData[fieldName]?.filter((item: any) =>
          item?.name?.toLowerCase().includes((companyData[fieldName] as string)?.toLowerCase() || '')
        );
        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'table') {
        const itemsForFirstTable = activeIndex === 0 ? filterData[fieldName] : [{ name: '' }, ...filterData[fieldName]];

        const currentItem = salesData.table[activeIndex]; // Safely reference the table row
        const data = currentItem?.item_code
          ? itemsForFirstTable.filter((item: any) => item.name?.toLowerCase().includes((currentItem.item_code as string)?.toLowerCase()))
          : itemsForFirstTable;

        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'item_name' && tableItemsPopup) {
        const itemsForFirstTable = activeIndex === 0 ? filterData[fieldName] : [{ name: '' }, ...filterData[fieldName]];

        // console.log(fieldName, filterData[fieldName]);
        const data = itemsData?.item_name
          ? itemsForFirstTable.filter((item: any) => item.name?.toLowerCase().includes((itemsData.item_name as string)?.toLowerCase()))
          : itemsForFirstTable;

        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }
      if (fieldName === 'item_name' && !tableItemsPopup) {
        const itemsForFirstTable = activeIndex === 0 ? filterData[fieldName] : [{ name: '' }, ...filterData[fieldName]];

        // console.log(fieldName, filterData[fieldName]);
        const data = salesData.table[activeIndex]?.item_name
          ? itemsForFirstTable.filter((item: any) => item.name?.toLowerCase().includes((salesData.table[activeIndex].item_name as string)?.toLowerCase()))
          : itemsForFirstTable;

        data?.map((item: any) => {
          filtered = [...filtered, item.name];
        });
      }

      setFilteredItems(filtered);

      // console.log(filtered, "filtered", fieldName, filterData);

      setSelectedIndex(0);
    }
  };

  return { handleFilter };
};

export default useFilterHook;
