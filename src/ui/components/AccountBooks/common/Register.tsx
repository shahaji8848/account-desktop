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
import RegisterTableHead from './RegisterTableHead';
import RegisterTableHeadCancelledList from './RegisterTableHeadCancelledList';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Register = ({ homeHookData, globalData, registerList, type }: any) => {
    const menuItemsRef = useRef<any>([]);
    const tableRef = useRef<any>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    const navigate = useNavigate();
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    let closingBalance = 0;
    let totalClosingBalance = 0;
    let totalVoucher = 0;
    let totalCancelled = 0;

    const chartData = registerList?.map((data: any) => {
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
        if (registerList?.length === 0 && tableRef.current) {
            const element = tableRef.current
            element.focus();
            // Remove focus styles dynamically
            element.style.outline = "none";
            element.style.boxShadow = "none";
        }
    }, [selectedIndex, registerList, isQuitModalOpen]);

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
            } else if (type === "journal_register") {
                navigate("/journal-voucher-register")
            } else if (type === "payment_register") {
                navigate("/payment-voucher-register")
            } else if (type === "receipt_register") {
                navigate("/receipt-voucher-register")
            } else if (type === "contra_register") {
                navigate("/contra-voucher-register")
            }
            const year = new Date().getFullYear();
            // function to get start date and end date of month
            const month_name = month.split(" ")[0];
            const { start_date, end_date } = getFinancialMonthDates(month_name, year)
            homeHookData?.setVoucherRegisterMonthDate({
                start_date,
                end_date
            })

        } else if (e.key === "Escape") {
            setIsQuitModalOpen(true);
        }
    };

    const handleClick = (month: any) => {
        if (type === "sales_register") {
            navigate("/sales-voucher-register")
        } else if (type === "credit_note_register") {
            navigate("/credit-note-voucher-register")
        } else if (type === "purchase_register") {
            navigate("/purchase-voucher-register")
        } else if (type === "debit_note_register") {
            navigate("/debit-note-voucher-register")
        } else if (type === "journal_register") {
            navigate("/journal-voucher-register")
        } else if (type === "payment_register") {
            navigate("/payment-voucher-register")
        } else if (type === "receipt_register") {
            navigate("/receipt-voucher-register")
        } else if (type === "contra_register") {
            navigate("/contra-voucher-register")
        }
        const year = new Date().getFullYear();
        // function to get start date and end date of month
        const month_name = month.split(" ")[0];
        const { start_date, end_date } = getFinancialMonthDates(month_name, year)
        homeHookData?.setVoucherRegisterMonthDate({
            start_date,
            end_date
        })
    }

    return (
        <div className="container-fluid p-0 mt-4">
            <Table bordered className="text-center">
                {/* Table Header */}
                <thead className='register_table'>
                    {(type === 'sales_register' || type === 'credit_note_register' || type === 'purchase_register' || type === 'debit_note_register') && <RegisterTableHead companyName={companyName} registerLabel={registerLabel[type]} />}
                    {(type === 'journal_register' || type === 'payment_register' || type === 'receipt_register' || type === 'contra_register') && <RegisterTableHeadCancelledList companyName={companyName} registerLabel={registerLabel[type]} />
                    }
                </thead>

                {/* Table Body */}
                <tbody>
                    {registerList?.length > 0 && registerList.map((data: any, index: number) => {
                        // Calculate closing balance (current credit + previous closing balance)
                        if (type === 'sales_register' || type === 'debit_note_register') {
                            closingBalance += Math.abs(data?.credit);
                        } else if (type === 'credit_note_register' || type === 'purchase_register') {
                            closingBalance += Math.abs(data?.debit);
                        } else if (type === 'journal_register' || type === 'payment_register' || type === 'receipt_register' || type === 'contra_register') {
                            totalVoucher += data?.total_entries;
                            totalCancelled += data?.cancelled;
                        }
                        totalClosingBalance += closingBalance; // Add current closing balance to total

                        return (
                            <tr
                                key={index}
                                ref={(el) => (menuItemsRef.current[index] = el)}
                                className={`ps-2 ${styles.noBordeAll} ${index === selectedIndex ? "active" : ""}`}
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, index, data?.month)}
                                onClick={() => handleClick(data?.month)}
                                style={{ cursor: 'pointer' }}
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

                                {(type === 'journal_register' || type === 'payment_register' || type === 'receipt_register' || type === 'contra_register') && (
                                    <>
                                        <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}></td>

                                        <td className={`text-start ${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{data?.total_entries}</td>
                                        <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>({data?.cancelled})</td>
                                    </>
                                )}
                                {/* closing balance of row  */}
                                {(type === 'sales_register' || type === 'debit_note_register' || type === 'credit_note_register' || type === 'purchase_register') &&
                                    <td className={`${styles.noBordeAll} ${index === selectedIndex ? styles.voucherRowActive : ""}`}>{closingBalance === 0 ? "" : closingBalance?.toFixed(2)}</td>}
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

                        {(type === 'journal_register' || type === 'payment_register' || type === 'receipt_register' || type === 'contra_register') && (
                            <>
                                <td className={`${styles.noBordeAll}`}></td>
                                <td className={`text-start ${styles.noBordeAll}`}>{totalVoucher}</td>
                                <td className={`${styles.noBordeAll}`}>({totalCancelled})</td>
                            </>
                        )}

                        {(type === 'sales_register' || type === 'debit_note_register' || type === 'credit_note_register' || type === 'purchase_register') &&
                            <td className={`${styles.noBordeAll}`}>{totalClosingBalance?.toFixed(2)}</td>}
                    </tr>
                </tbody>
            </Table>

            {(type === "sales_register" || type === 'debit_note_register' || type === "credit_note_register" || type === 'purchase_register')
                && (
                    <div className="mt-4" style={{ height: '200px', width: '80%' }}>
                        <Bar
                            data={{
                                labels: registerList?.map((data: any) => data?.month) || [],
                                datasets: [
                                    {
                                        label: registerLabel[type] || "Unknown",
                                        data: chartData,
                                        backgroundColor: 'red',
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        ticks: { font: { size: 14 } },
                                    },
                                    y: {
                                        ticks: { font: { size: 14 } },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            font: { size: 14 }, // Make legend clearer
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )
            }
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


