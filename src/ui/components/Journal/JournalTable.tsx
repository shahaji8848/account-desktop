'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from './journal.module.css'
import QuitConfirmationModal from '../Home/QuitConfirmationModal';



const JournalTable = ({ homeHookData, globalData, VoucherRegisterList, type }: any) => {
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    const menuItemsRef = useRef<any>([]);
    const tableRef = useRef<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        // Focus the first menu item on mount
        if (menuItemsRef.current[selectedIndex]) {
            const element = menuItemsRef.current[selectedIndex];
            element.focus();

            // Remove focus styles dynamically
            element.style.outline = "none";
            element.style.border = "none";
            element.style.boxShadow = "none";
        }

        // Focus the table head if no data
        if (VoucherRegisterList?.length === 0 && tableRef.current) {
            const element = tableRef.current
            element.focus();
            // Remove focus styles dynamically
            element.style.outline = "none";
            element.style.border = "none";
            element.style.boxShadow = "none";
        }
    }, [selectedIndex, VoucherRegisterList, isQuitModalOpen]);

    // const handleKeyDown = (e: React.KeyboardEvent, index?: number) => {
    //     const menuItems = menuItemsRef.current.filter((item: any) => item !== null); // Filter out null values

    //     if (e.key === "ArrowDown") {
    //         e.preventDefault();
    //         setSelectedIndex((prevIndex: any) =>
    //             prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1
    //         );
    //     } else if (e.key === "ArrowUp") {
    //         e.preventDefault();
    //         setSelectedIndex((prevIndex: any) =>
    //             prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1
    //         );
    //     } else if (e.key === "Enter") {
    //         e.preventDefault();
    //         // @ts-expect-error
    //         const selectedText = menuItems[index]?.textContent;
    //         if (selectedText === "Create") {

    //         } else if (selectedText === "Vouchers") {

    //         } else if (selectedText === "Quit") {

    //         }
    //     } else if (e.key === "Escape") {
    //         setIsQuitModalOpen(true)
    //     }
    // };

    return (
        <div className={`${styles.journal_table_container}`}>
            <div className='d-flex justify-content-between pb-2 ps-1 pe-1'
                ref={(el) => (tableRef.current = el)}
                tabIndex={0}
            >
                <p>Journal</p>
            </div>

            <Table
                bordered
                className={styles.voucherTable}

            >
                <thead>
                    <tr>
                        <th className={styles.noBorderSides}></th>
                        <th style={{ width: "80%" }} className={styles.noBorderSides}>Particulars</th>
                        <th className={styles.noBorderSides}>Debit</th>
                        <th className={styles.noBorderSides}>Credit</th>
                    </tr>
                </thead>
                <tbody>

                    <tr
                        className={`${styles.noBordeAll}`}
                        tabIndex={0}

                    >
                        <td className={`${styles.noBordeAll} ${0 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${0 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                                value='cr'
                            />
                        </td>
                        <td className={`${styles.noBordeAll} ${0 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <div className="position-relative d-flex flex-column">
                                <input
                                    type="text"
                                    className={`form-control ${0 === selectedIndex ? styles.voucherRowActive : ""}`}
                                    name="customer_name"
                                    style={{ width: "20%" }} // Adjust width as needed
                                />
                                <span className={`position-absolute ${styles.curBal}`}>
                                    Cur Bal: 1233
                                </span>
                            </div>

                        </td>



                        <td className={`${styles.noBordeAll} ${0 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${0 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                            />
                        </td>


                        <td className={`${styles.noBordeAll} ${0 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${0 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                            />
                        </td>


                    </tr>

                    {/* second row  */}

                    <tr
                        className={`${styles.noBordeAll}`}
                        tabIndex={0}

                    >
                        <td className={`${styles.noBordeAll} ${1 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${1 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                                value='cr'
                            />
                        </td>
                        <td className={`${styles.noBordeAll} ${1 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <div className="position-relative d-flex flex-column">
                                <input
                                    type="text"
                                    className={`form-control ${1 === selectedIndex ? styles.voucherRowActive : ""}`}
                                    name="customer_name"
                                    style={{ width: "20%" }} // Adjust width as needed
                                />
                                <span className={`position-absolute ${styles.curBal}`}>
                                    Cur Bal: 1233
                                </span>
                            </div>

                        </td>



                        <td className={`${styles.noBordeAll} ${1 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${1 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                            />
                        </td>


                        <td className={`${styles.noBordeAll} ${1 === selectedIndex ? styles.voucherRowActive : ""}`}>
                            <input
                                type="text"
                                className={`form-control ${1 === selectedIndex ? styles.voucherRowActive : ""}`}
                                name="customer_name"
                            />
                        </td>


                    </tr>


                    {/* Total row  */}
                    <tr className={`d-flex position-absolute ${styles.voucher_total}`}>
                        <td colSpan={4} className={`${styles.noBordeAll}`} style={{ flexBasis: '55%' }}></td>
                        <td colSpan={4} className={`fw-bold ${styles.noBordeAll}`} style={{ flexBasis: '15%' }}>Total:</td>
                        <td colSpan={4} className={`fw-bold ${styles.noBordeAll}`} style={{ flexBasis: '15%' }}>12234</td>
                    </tr>
                </tbody>
            </Table>
            {isQuitModalOpen && (
                <QuitConfirmationModal
                    type={type}
                    isOpen={isQuitModalOpen}
                    setIsQuitModalOpen={setIsQuitModalOpen}
                    homeHookData={homeHookData}
                />
            )}
        </div>
    );
};

export default JournalTable;
