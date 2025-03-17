import React, { useEffect, useRef, useState } from "react";
import "./CustomTable.css";

// const tableData = [
//     {
//         account: "Debtors - 8DL",
//         currency: "INR",
//         due_date: "2024-11-10",
//         exchange_rate: 1,
//         invoice_amount: 118000,
//         outstanding_amount: 14146,
//         payment_amount: 103854,
//         posting_date: "2024-11-10",
//         voucher_no: "SINV-24-00062",
//         voucher_type: "Sales Invoice",
//     },
//     {
//         account: "Debtors - 8DL",
//         currency: "INR",
//         due_date: "2025-03-12",
//         exchange_rate: 1,
//         invoice_amount: 1087.97,
//         outstanding_amount: 1077.97,
//         payment_amount: 10,
//         posting_date: "2025-03-12",
//         voucher_no: "SINV-25-00215",
//         voucher_type: "Sales Invoice",
//     },
// ];

function ReferenceTablePopUp({
    referenceTablePopUp,
    setReferenceTablePopUp,
    setSelectedReferenceRowData,
    tableData,
    referenceId,
    entries,
    receiptPopupID,
    handleInputChange,
    handleKeyDown,
    handleInputFocus,
    updateReferenceById
}: any) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);


    useEffect(() => {
        if (referenceTablePopUp) {
            setSelectedIndex(0); // Reset to first row
            setTimeout(() => {
                rowRefs.current[0]?.focus();
            }, 100);
        }
    }, [referenceTablePopUp]);

    useEffect(() => {
        if (rowRefs.current[selectedIndex]) {
            rowRefs.current[selectedIndex]?.focus();
        }
    }, [selectedIndex]);

    const handleRowKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, index: number) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < tableData.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Escape") {
            e.preventDefault();
            setReferenceTablePopUp(false);
        } else if (e.key === "Enter") {
            setSelectedIndex(index);
            const selectedRowData = {
                name: tableData[index].voucher_no,
                grandTotal: tableData[index].invoice_amount,
                outstanding: tableData[index].outstanding_amount,
                allocated: tableData[index].payment_amount,
            };
            setSelectedReferenceRowData(selectedRowData);
            updateReferenceById(referenceId, selectedRowData);
            setReferenceTablePopUp(false);
        }
    };

    const handleRowClick = (index: number) => {
        setSelectedIndex(index);
        const selectedRowData = {
            name: tableData[index].voucher_no,
            grandTotal: tableData[index].invoice_amount,
            outstanding: tableData[index].outstanding_amount,
            allocated: tableData[index].payment_amount,
        };
        setSelectedReferenceRowData(selectedRowData);
        updateReferenceById(referenceId, selectedRowData);
        setReferenceTablePopUp(false);
    };



    return (
        <div
            className="popup table-popup"
            style={{
                display: referenceTablePopUp ? "flex" : "none",
            }}
        >
            <div
                className="popup-body d-flex align-items-start justify-content-between w-100 flex-row gap-4"
                style={{
                    marginLeft: "-32%",
                    maxWidth: "850px",
                }}
            >
                <div className="container mt-4">
                    <table className="custom-table table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Type <span className="text-danger">*</span></th>
                                <th>Name <span className="text-danger">*</span></th>
                                <th>Grand Total (INR)</th>
                                <th>Outstanding (INR)</th>
                                <th>Allocated (INR)</th>
                                <th><i className="bi bi-gear"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row: any, index: any) => (
                                <tr
                                    key={index}
                                    ref={(el) => (rowRefs.current[index] = el)}
                                    tabIndex={0}
                                    className={selectedIndex === index ? "highlight-row" : ""}
                                    onClick={() => handleRowClick(index)}
                                    onKeyDown={(e) => handleRowKeyDown(e, index)}
                                >
                                    <td>{index + 1}</td>
                                    <td className="fw-bold">{row.voucher_type}</td>
                                    <td className="fw-bold text-dark">{row.voucher_no}</td>
                                    <td>{row.invoice_amount.toLocaleString("en-IN")}</td>
                                    <td>{row.outstanding_amount.toLocaleString("en-IN")}</td>
                                    <td>{row.payment_amount.toLocaleString("en-IN")}</td>
                                    <td><i className="bi bi-pencil edit-icon"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReferenceTablePopUp;
