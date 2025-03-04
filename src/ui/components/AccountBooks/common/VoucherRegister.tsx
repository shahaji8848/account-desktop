'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from '../CustomTable.module.css';
import { formatDateToShort } from '../../../utils/formatDateToShort';
import QuitConfirmationModal from '../../Home/QuitConfirmationModal';


const VoucherRegister = ({ homeHookData, globalData, VoucherRegisterList, type }: any) => {
    const { voucherRegisterMonthDate } = homeHookData
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    // const [VoucherRegisterList, setVoucherRegisterList] = useState<any>([]);
    const menuItemsRef = useRef<any>([]);
    const tableRef = useRef<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [monthDate, setMonthDate] = useState({
        start_date: '',
        end_date: ''
    });

    let totalAmount = 0;

    useEffect(() => {
        const dateValue = formatDateToShort(voucherRegisterMonthDate?.start_date, voucherRegisterMonthDate?.end_date)
        setMonthDate(dateValue)
    }, [voucherRegisterMonthDate]);

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

    const handleKeyDown = (e: React.KeyboardEvent, index?: number) => {
        const menuItems = menuItemsRef.current.filter((item: any) => item !== null); // Filter out null values

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex: any) =>
                prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex: any) =>
                prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            // @ts-expect-error
            const selectedText = menuItems[index]?.textContent;
            if (selectedText === "Create") {

            } else if (selectedText === "Vouchers") {

            } else if (selectedText === "Quit") {

            }
        } else if (e.key === "Escape") {
            setIsQuitModalOpen(true)
        }
    };

    return (
        <div className={`${styles.tableContainer}`}>
            <div className='d-flex justify-content-between pb-2 ps-1 pe-1'
                ref={(el) => (tableRef.current = el)}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e)}
            >
                {type === 'sales_voucher_register' && <p className='fw-bold'>List of All Sales Vouchers</p>}
                {type === 'credit_note_voucher_register' && <p className='fw-bold'>List of All Credit Note Vouchers</p>}
                {type === 'purchase_voucher_register' && <p className='fw-bold'>List of All Purchase Invoice Vouchers</p>}
                {type === 'debit_note_voucher_register' && <p className='fw-bold'>List of All Debit Note Vouchers</p>}
                <p className='fw-bold'>{monthDate?.start_date} to {monthDate?.end_date}</p>
            </div>

            <Table
                bordered
                className={styles.voucherTable}

            >
                <thead>
                    <tr>
                        <th className={styles.noBorderSides}>Date</th>
                        <th className={styles.noBorderSides}>Particulars</th>
                        <th className={styles.noBorderSides}>Vch Type</th>
                        <th className={styles.noBorderSides}>Vch No.</th>
                        <th className={styles.noBorderSides}>Debit Amount</th>
                        <th className={styles.noBorderSides}>Credit Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {VoucherRegisterList?.length > 0 && VoucherRegisterList.map((data: any, index: any) => {
                        totalAmount += Math.abs(data?.base_grand_total)
                        return (
                            <tr
                                key={index}
                                className={`${styles.noBordeAll}`}
                                ref={(el) => (menuItemsRef.current[index] = el)}
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            >
                                <td
                                    className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    {data?.posting_date}
                                </td>
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    <strong>{data?.customer}</strong>
                                </td>
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    <strong>{data?.vch_type}</strong>
                                </td>
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    {data?.name}
                                </td>
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    <strong>{(type === 'sales_voucher_register' || type === 'debit_note_voucher_register') && Math.abs(data?.base_grand_total)}</strong>
                                </td>
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>
                                    <strong>{(type === 'credit_note_voucher_register' || type === 'purchase_voucher_register') && Math.abs(data?.base_grand_total)}</strong>
                                </td>
                            </tr>
                        )
                    })}
                    {/* Total row  */}
                    <tr className={`d-flex position-absolute ${styles.voucher_total}`}>
                        <td colSpan={4} className={`${styles.noBordeAll}`} style={{ flexBasis: '55%' }}></td>
                        <td colSpan={4} className={`fw-bold ${styles.noBordeAll}`} style={{ flexBasis: '15%' }}>Total:</td>
                        {/* debit field  */}
                        <td className={`fw-bold ${styles.noBordeAll}`} style={{ flexBasis: '15%' }}>{(type === 'sales_voucher_register' || type === 'debit_note_voucher_register') && totalAmount}</td>
                        {/* credit field  */}
                        <td className={`fw-bold ${styles.noBordeAll}`} style={{ flexBasis: '15%' }}>{(type === 'credit_note_voucher_register' || type === 'purchase_voucher_register') && totalAmount}</td>
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

export default VoucherRegister;
