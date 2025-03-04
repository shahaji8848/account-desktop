'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from '../CustomTable.module.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getFinancialMonthDates } from '../../../utils/financialMonthDates';
import QuitConfirmationModal from '../../Home/QuitConfirmationModal';
import { registerLabel } from '../../../utils/RegisterData';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root-reducer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Register = ({ homeHookData, globalData, SalesRegisterList, type }: any) => {
    const menuItemsRef = useRef<any>([]);
    const tableRef = useRef<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    const navigate = useNavigate();
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    let closingBalance = 0;
    let totalClosingBalance = 0;

    const chartData = SalesRegisterList?.map((data: any) => {
        if (type === "sales_register" || type === 'debit_note_register') return Math.abs(data?.credit) || 0;
        if (type === "credit_note_register" || type === 'purchase_register') return Math.abs(data?.debit) || 0;
        return 0;
    });

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
        // Focus the total row if no data
        if (SalesRegisterList?.length === 0 && tableRef.current) {
            const element = tableRef.current
            element.focus();
            // Remove focus styles dynamically
            element.style.outline = "none";
            element.style.boxShadow = "none";
        }
    }, [selectedIndex, SalesRegisterList, isQuitModalOpen]);

    const handleKeyDown = (e: React.KeyboardEvent, index?: number, month?: any) => {
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

            if (type === "sales_register") {
                navigate("/sales-voucher-register")
            } else if (type === "credit_note_register") {
                navigate("/credit-note-voucher-register")
            } else if (type === "purchase_register") {
                navigate("/purchase-voucher-register")
            } else if (type === "debit_note_register") {
                navigate("/debit-note-voucher-register")
            }
            const year = new Date().getFullYear();
            // function to get start date and end date of month
            const { start_date, end_date } = getFinancialMonthDates(month, year)
            homeHookData?.setVoucherRegisterMonthDate({
                start_date,
                end_date
            })
            // @ts-expect-error
            const selectedText = menuItems[index]?.textContent;
            if (selectedText === "Create") {

            } else if (selectedText === "Vouchers") {

            } else if (selectedText === "Quit") {

            }
        } else if (e.key === "Escape") {
            setIsQuitModalOpen(true);
            // homeHookData?.setShowSalesRegister(false)
            // homeHookData?.setAccountBooksList(true)

        }
    };

    return (
        <div className="container-fluid p-0 mt-4">
            <Table bordered className="text-center">
                {/* Table Header */}
                <thead className='register_table'>
                    <tr>
                        <th className='text-start align-middle' style={{ width: "80%" }} rowSpan={3}>Particulars</th>
                        <th colSpan={3} className="transactionsHeader">
                            <div className="text-center">
                                <span className="text-secondary font-italic">{registerLabel[type]}</span>
                                <br />
                                <span>{companyName}</span>
                                <br />
                                <span className="text-secondary">For 1-Apr-24</span>
                            </div>
                        </th>
                    </tr>

                    <tr>
                        <th colSpan={2}>Transactions</th>
                        <th rowSpan={2}>Closing Balance</th>
                    </tr>

                    <tr>
                        <th className='text-start' style={{ width: '10%' }}>Debit</th>
                        <th className='text-start' style={{ width: '10%' }}>Credit</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {SalesRegisterList?.length > 0 && SalesRegisterList.map((data: any, index: number) => {
                        // Calculate closing balance (current credit + previous closing balance)
                        if (type === 'sales_register' || type === 'debit_note_register') {
                            closingBalance += Math.abs(data?.credit);
                        } else if (type === 'credit_note_register' || type === 'purchase_register') {
                            closingBalance += Math.abs(data?.debit);
                        }
                        totalClosingBalance += closingBalance; // Add current closing balance to total

                        return (
                            <tr
                                key={index}
                                ref={(el) => (menuItemsRef.current[index] = el)}
                                className={`ps-2 ${styles.noBordeAll} ${index === selectedIndex ? "active" : ""}`}
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, index, data?.month)}
                            >
                                <td className={`text-start ${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{data.month}</td>

                                {(type === 'sales_register' || type === 'debit_note_register') && (
                                    <>
                                        <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}></td>
                                        <td className={`text-start ${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{data?.credit === 0 ? '' : Math.abs(data?.credit?.toFixed(2))}</td>

                                    </>
                                )}

                                {(type === 'credit_note_register' || type === 'purchase_register') && (
                                    <>
                                        <td className={`text-start ${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{Math.abs(data?.debit) === 0 ? '' : Math.abs(data?.debit?.toFixed(2))}</td>
                                        <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}></td>
                                    </>
                                )}
                                <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{closingBalance === 0 ? "" : closingBalance?.toFixed(2)}</td>
                            </tr>
                        );
                    })}

                    {/* Blank row for spacing */}
                    <tr className={`${styles.noBordeAll}`} style={{ height: '40px' }}>
                        <td colSpan={4} className={`${styles.noBordeAll}`}></td>
                    </tr>

                    {/* Grand Total Row */}
                    <tr
                        className={`fw-bold grand_tota_row`}
                        ref={(el) => (tableRef.current = el)}
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e)}
                    >
                        <td className={`text-start ${styles.noBordeAll}`}>Grand Total</td>

                        {(type === 'sales_register' || type === 'debit_note_register') && (
                            <>
                                <td className={`${styles.noBordeAll}`}></td>
                                <td className={`text-start ${styles.noBordeAll}`}>{closingBalance?.toFixed(2)}</td>
                            </>
                        )}

                        {(type === 'credit_note_register' || type === 'purchase_register') && (
                            <>
                                <td className={`text-start ${styles.noBordeAll}`}>{closingBalance?.toFixed(2)}</td>
                                <td className={`${styles.noBordeAll}`}></td>
                            </>
                        )}

                        <td className={`${styles.noBordeAll}`}>{totalClosingBalance?.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>

            <div className="mt-4" style={{ height: '200px' }}>
                <Bar
                    data={{
                        labels: SalesRegisterList?.map((data: any) => data?.month) || [],
                        datasets: [
                            {
                                label: registerLabel[type] || "Unknown",
                                data: chartData,
                                backgroundColor: 'red',
                            }
                        ]
                    }}
                />
            </div>
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

export default Register;


