import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./journal.module.css";
import QuitConfirmationModal from "../Home/QuitConfirmationModal";
import ShowFilter from "../common/ShowFilter";
import { ledgerAccountList, journalEntryType } from "../../utils/journalFormData";




const JournalTable = ({ homeHookData, globalData }: any) => {
    const formRef = useRef<any>(null);
    const entryRefs = useRef<any>(null);
    const inputRefs = useRef<any>([]);
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
    // State to manage input values for multiple rows
    const [entryType, setEntryType] = useState('');
    const [entries, setEntries] = useState<any>([
        { type: "", particulars: "", debit: "", credit: "", curBalance: 0 }
    ]);



    useEffect(() => {
        if (entryRefs.current) {
            entryRefs.current.focus();
        }
    }, []);
    // Handle input changes for different fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newEntries = [...entries];
        newEntries[index][name] = value;

        // Enable/Disable fields based on type value
        if (name === "type") {
            if (value.toLowerCase() === "to") {
                newEntries[index].debit = "";
                newEntries[index].credit = "disabled";
            } else if (value.toLowerCase() === "cr") {
                newEntries[index].credit = "";
                newEntries[index].debit = "disabled";
            } else {
                newEntries[index].debit = "";
                newEntries[index].credit = "";
            }
        }

        setEntries(newEntries);
    };

    // Handle key press (Enter to add new row, Escape to close modal)
    const handleKeyDown = (e: any, field: any, index: number) => {
        const { name, value } = e.target;
        const focusableElements = Array.from(
            formRef.current?.querySelectorAll(
                "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
            ) || []
        ) as HTMLElement[];

        const focusIndex = focusableElements.indexOf(e.currentTarget);

        if (e.key === "Escape") {
            setIsQuitModalOpen(true);
        }

        if (e.key === "Enter" && !showFilter) {
            const newEntries = [...entries];

            if (field === "debit") {
                const debitValue = parseFloat(newEntries[index].debit) || 0;
                newEntries[index].curBalance -= debitValue; // Subtract from balance
            }
            else if (field === "credit") {
                const creditValue = parseFloat(newEntries[index].credit) || 0;
                newEntries[index].curBalance += creditValue; // Add to balance
            }

            setEntries(newEntries);

            // Add new row when Enter is pressed in Debit or Credit field
            if ((field === "debit" || field === "credit") && value) {
                setEntries([...newEntries, { type: "", particulars: "", debit: "", credit: "", curBalance: 0 }]);
            }

            setTimeout(() => {
                if (inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1].focus(); // Focus on "type" field of new row
                }
            }, 0);

            // Enter: Move focus forward
            if (focusIndex < focusableElements.length - 1) {
                focusableElements[focusIndex + 1].focus();
            }
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            // setCurrentField(field);

            const newIndex = e.key === 'ArrowDown'
                ? (selectedIndex + 1) % currentFilterList?.length
                : (selectedIndex - 1 + currentFilterList?.length) % currentFilterList?.length;
            setSelectedIndex(newIndex);
        }
        if (e.key === 'Enter' && showFilter) {
            e.preventDefault();
            let newEntries = [...entries];
            if (field === 'particulars') {
                newEntries[index][field] = currentFilterList[selectedIndex]?.name || '';
                newEntries[index]['curBalance'] = currentFilterList[selectedIndex]?.cur_balance;
                setEntries(newEntries);
            } else if (field === 'entry_type') {
                setEntryType(currentFilterList[selectedIndex]?.name || '')
            }
            setShowFilter(false);
            setSelectedIndex(0);
        };

    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name: field, value } = e.target;
        setShowFilter(false);
        if (field === 'particulars') {
            setShowFilter(true);
            setCurrentFilterList(ledgerAccountList);
            setSelectedIndex(0)
        } else if (field === 'entry_type') {
            setShowFilter(true);
            setCurrentFilterList(journalEntryType);
            setSelectedIndex(0)
        }

    }

    // Calculate total debit and credit amounts
    const totalDebit = entries.reduce((sum: any, entry: any) => sum + (parseFloat(entry.debit) || 0), 0);
    const totalCredit = entries.reduce((sum: any, entry: any) => sum + (parseFloat(entry.credit) || 0), 0);

    return (
        <div
            className={`container-fluid ${styles.journal_table_container}`}
            ref={formRef}
        >
            <div className="row  pb-2 ps-1 pe-1">
                <p className={`col-1 ${styles.journal_label}`}>Journal</p>
                <div className="col-5 d-flex align-items-center">
                    <label className="fw-bold" style={{ flexBasis: '20%' }}>Entry Type</label>
                    <span className='colon-span me-2'>:</span>
                    <input
                        type="text"
                        className="form-control"
                        ref={(el) => el && (entryRefs.current = el)}
                        onKeyDown={(e) => handleKeyDown(e, 'entry_type', 0)}
                        name="entry_type"
                        onFocus={handleInputFocus}
                        onChange={(e) => { handleInputChange(e, 0) }}
                        value={entryType}
                        style={{ height: '20px', flexBasis: '40%' }}
                    />
                </div>
            </div>

            {/* Header Row */}
            <div
                className={`row py-2 fw-bold`}
                style={{ border: '1px solid lightgray' }}
            >
                <div className="col-1">{' '}</div>
                <div className="col-5">Particulars</div>
                <div className="col-3 text-center">Debit</div>
                <div className="col-2 text-end">Credit</div>
            </div>

            {/* Dynamic Entry Rows */}
            {entries.map((entry: any, index: any) => (
                <div key={index} className={`row py-2 align-items-center ${styles.entryRow}`}>
                    {/* Left Icon Input */}
                    <div className={`col-1 d-flex align-items-center ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control ${styles.voucherRowActive}`}
                            ref={(el) => (inputRefs.current[index] = el)}
                            name="type"
                            value={entry.type}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, 'particulars', index)}

                        />
                    </div>

                    {/* Particulars */}
                    <div className={`col-5 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control ${styles.voucherRowActive}`}
                            name="particulars"
                            value={entry.particulars}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, 'particulars', index)}
                            onFocus={handleInputFocus}
                        />
                    </div>

                    {/* Debit Amount */}
                    <div className={`col-3 d-flex justify-center fw-bold ${styles.voucherRowActive}`} style={{ height: '32px' }}>
                        {entry.debit === "disabled" ? <span style={{ visibility: 'hidden' }}>debit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control ${styles.voucherRowActive}`}
                                    style={{width:'50%'}}
                                    name="debit"
                                    value={entry.debit}
                                    disabled={entry.debit === "disabled"} // Disable if "Cr" was typed
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, 'debit', index)}
                                />
                            )
                        }

                    </div>

                    {/* Credit Amount */}
                    <div className={`col-3 ${styles.voucherRowActive}`} style={{ height: '32px' }}>
                        {entry.credit === "disabled" ? <span style={{ visibility: 'hidden' }}>credit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control ${styles.voucherRowActive}`}
                                    name="credit"
                                    value={entry.credit}
                                    disabled={entry.credit === "disabled"} // Disable if "To" was typed
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, 'credit', index)}
                                />
                            )
                        }

                    </div>


                    {/* Cur Balance Row */}
                    <div className="col-3">
                        <div className={`text-muted ${entry.curBalance < 0 ? styles.negativeBalance : styles.curBal}`}>
                            Cur Bal: <i>{Math.abs(entry.curBalance)?.toFixed(2)}</i>
                        </div>
                    </div>


                </div>
            ))}

            {/* Narration Row */}
            <div className={`row border-top py-2 ${styles.narrationRow}`}>
                <div className="col-6 text-muted">Narration:</div>
                {/* Footer (Total Debit  Amount) */}
                <div className="col-3 text-end fw-bold">{totalDebit.toFixed(2)}</div>
                {/* Footer (Total Credit Amount) */}
                <div className="col-3 text-end fw-bold">{totalCredit.toFixed(2)}</div>
            </div>

            {/* Filter Dropdown */}
            {showFilter && (
                <ShowFilter
                    filteredItems={currentFilterList}
                    selectedIndex={selectedIndex}
                    handleItemFocus={(index: number) => setSelectedIndex(index)}
                />
            )}

            {/* Quit Confirmation Modal */}
            {isQuitModalOpen && (
                <QuitConfirmationModal
                    type="journal_form"
                    isOpen={isQuitModalOpen}
                    setIsQuitModalOpen={setIsQuitModalOpen}
                    homeHookData={homeHookData}
                />
            )}
        </div>
    );
};

export default JournalTable;
