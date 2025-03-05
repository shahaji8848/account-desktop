import React, { useRef, useState } from "react";
import './AccountsTable.css'
import useFetchData from "../../hooks/fetchData";

// Input Component
export const Input = ({ value, onChange, placeholder = "", className = "", type = "text", onKeyDown, onFocus, inputRef, fieldType }: any) => {
    return (
        <input
            ref={(fieldType === 'company') ? inputRef : null}
            type={type}
            className={`form-control ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
        />
    );
};

const AccountsTable = ({
    setShowFilter,
    showFilter,
    setCurrentFilterList,
    currentFilterList,
    setSelectedIndex,
    selectedIndex,
    setRows,
    rows,
    formRef
}: any) => {
    const [accountList, setAccountList] = useState([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const addRowRef = useRef<HTMLButtonElement | null>(null);
    const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const token = localStorage.getItem('token');
    const companyList = useFetchData("Company", {}, token);
    // Add a new row dynamically
    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            company: "",
            account: "",
            isEditing: true,
        };
        const updatedRows = [...rows, newRow];
        setRows(updatedRows);

        setTimeout(() => {
            // Find the first row that has an empty company name and focus its first input field
            const firstEmptyRow = updatedRows.find((row) => !row.company);
            if (firstEmptyRow && inputRefs.current[firstEmptyRow.id]) {
                inputRefs.current[firstEmptyRow.id]?.focus();
            }
        }, 0);
    };

    const fetchAccountList = async (company: any) => {
        const x = await window.electron.getData({ doctype: "Account", filters: { 'root_type': "Asset", account_type: "Receivable", company: company, is_group: 0 }, token });
        setAccountList(x)
    };

    // Update input values in the table rows
    const handleInputChange = (id: any, field: any, value: any) => {

        fetchAccountList(value)
        const updatedRows = [...rows];
        const newRows = updatedRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );

        setRows(newRows);
    };

    // Show the filter dropdown
    const handleCompanyFocus = (filterList: any) => {
        setCurrentFilterList(filterList || []);
        setShowFilter(true);
    };

    // Handle keyboard navigation and filtering logic
    const handleKeyDown = (e: any, field?: any, id?: any,) => {
        const focusableElements = Array.from(
            formRef.current?.querySelectorAll(
                "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
            ) || []
        ) as HTMLElement[];

        const index = focusableElements.indexOf(e.currentTarget);

        if (e.ctrlKey && e.key === "Enter") {
            if (field === 'add_row') {
                addRow()

            } else if (field === 'checkbox' && id) {
                handleCheckboxChange(id)
            } else if (field === 'checkbox') {
                handleSelectAll()
            } else if (field === 'delete_row') {
                deleteSelectedRows()
            }

        } else if (e.key === 'Enter' && !showFilter) {

            e.preventDefault(); // Prevent form submission


            if (e.shiftKey) {
                // Shift + Enter: Move focus backward
                if (index > 0) {
                    focusableElements[index - 1].focus();
                }
            } else {
                // Enter: Move focus forward
                if (index < focusableElements.length - 1) {
                    focusableElements[index + 1].focus();
                }
            }

        } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setShowFilter(true);
            const list = field === 'company' ? companyList : accountList;

            const newIndex =
                e.key === "ArrowDown"
                    ? (selectedIndex + 1) % list.length
                    : (selectedIndex - 1 + list.length) % list.length;
            setSelectedIndex(newIndex);
        } else if (e.key === "Enter" && showFilter) {
            e.preventDefault();
            handleInputChange(id, field, currentFilterList[selectedIndex].name);
            setShowFilter(false);
            setSelectedIndex(0);
        } else if (e.key === "Escape") {
            setShowFilter(false);
        }

    };

    // Handle checkbox selection
    const handleCheckboxChange = (id: number) => {
        let updatedSelection;
        if (selectedRows.includes(id)) {
            updatedSelection = selectedRows.filter((rowId) => rowId !== id);
        } else {
            updatedSelection = [...selectedRows, id];
        }
        setSelectedRows(updatedSelection);
        setSelectAll(updatedSelection.length === rows.length);
    };

    // Handle header checkbox (Select All)
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(rows.map((row: any) => row.id));
        }
        setSelectAll(!selectAll);
    };

    // Delete selected rows
    const deleteSelectedRows = () => {
        const remainingRows = rows.filter((row: any) => !selectedRows.includes(row.id));
        setRows(remainingRows);
        setSelectedRows([]);
        setSelectAll(false);

        if (addRowRef.current) {
            addRowRef.current.focus();
        }
    };


    return (
        <div className="p-4">
            <table className="w-100 border">
                <thead className="account_table_head">
                    <tr className="bg-gray-100">
                        <th className="p-2 border text-center">
                            <input type="checkbox" onKeyDown={(e: any) => handleKeyDown(e, 'checkbox')} checked={selectAll} onChange={handleSelectAll} />
                        </th>
                        <th className="p-2 border">No.</th>
                        <th className="p-2 border">Company *</th>
                        <th className="p-2 border">Default Account</th>
                        {/* <th className="p-2 border"></th> */}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: any, index: any) => (
                        <tr key={row.id} style={{ borderTop: 'none' }}>
                            <td className="p-2 border text-center">
                                <input type="checkbox"
                                    onKeyDown={(e: any) => handleKeyDown(e, "checkbox", row.id)}
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            </td>
                            <td className="p-2 border text-center">{index + 1}</td>
                            <td className="p-2 border">
                                {row.isEditing ? (
                                    <Input
                                        inputRef={(el: any) => (inputRefs.current[row.id] = el)}
                                        value={row.company}
                                        onChange={(e: any) => handleInputChange(row.id, "company", e.target.value)}
                                        onFocus={() => handleCompanyFocus(companyList)}
                                        onKeyDown={(e: any) => handleKeyDown(e, "company", row.id)}
                                        placeholder="Enter company"
                                        fieldType='company'
                                    />
                                ) : (
                                    row.company
                                )}
                            </td>
                            <td className="p-2 border">
                                {row.isEditing ? (
                                    <Input
                                        value={row.account}
                                        onChange={(e: any) => handleInputChange(row.id, "account", e.target.value)}
                                        placeholder="Enter default account"
                                        onFocus={() => handleCompanyFocus(accountList)}
                                        onKeyDown={(e: any) => handleKeyDown(e, "account", row.id)}
                                    />
                                ) : (
                                    row.defaultAccount
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <button
                ref={addRowRef}
                className={`border-0 btn btn-secondary mt-2`}
                style={{ backgroundColor: '#ededed', color: '#383838' }}
                onClick={addRow}
                onKeyDown={(e: any) => handleKeyDown(e, "add_row")}
            >
                Add Row
            </button>

            {selectedRows.length > 0 && (
                <button
                    className="btn btn-danger mt-2 ms-3"
                    onClick={deleteSelectedRows}
                    onKeyDown={(e: any) => handleKeyDown(e, "delete_row")}
                >
                    Delete
                </button>
            )}

        </div>
    );
};

export default AccountsTable;
