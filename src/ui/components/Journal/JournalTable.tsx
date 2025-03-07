import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./journal.module.css";
import QuitConfirmationModal from "../Home/QuitConfirmationModal";
import ShowFilter from "../common/ShowFilter";
import { ledgerAccountList, journalEntryType, seriesList, partyTypeList } from "../../utils/journalFormData";
import useFetchData from "../../hooks/fetchData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";




const JournalTable = ({ homeHookData, globalData }: any) => {
    const { date, setDate } = globalData
    const formRef = useRef<any>(null);
    const entryRefs = useRef<any>(null);
    const inputRefs = useRef<any>([]);
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
    // State to manage input values for multiple rows
    const [entryType, setEntryType] = useState('');
    const [journalSeries, setJournalSeries] = useState('')
    const [entries, setEntries] = useState<any>([
        {
            type: "",
            particulars: "",
            party_type: "",
            party: "",
            debit: "",
            credit: "",
            curBalance: 0
        }
    ]);
    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '';
    const AccountList = useFetchData("Account", {});

    // console.log("entries",entries)
    useEffect(() => {
        if (entryRefs.current) {
            entryRefs.current.focus();
        }
    }, []);
    // Handle input changes for different fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, rowType?: any) => {
        const { name, value } = e.target;

        if (rowType === 'entry_row') {
            const newEntries = [...entries];
            newEntries[index][name] = value;
            // Enable/Disable fields based on type value
            if (name === "type") {
                if (value.toLowerCase() === "dr") {
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
        } else if (name === 'posting_date') {
            setDate({ ...date, [name]: value });
        }

    };


    // Handle key press (Enter to add new row, Escape to close modal)
    const handleKeyDown = async (e: any, field: any, index: number) => {
        const { value } = e.target;
        const focusableElements = Array.from(
            formRef.current?.querySelectorAll(
                "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
            ) || []
        ) as HTMLElement[];

        const focusIndex = focusableElements.indexOf(e.currentTarget);

        if (e.key === "Escape") {
            setIsQuitModalOpen(true);
        } else if (e.key === "Enter" && !showFilter) {
            const newEntries = [...entries];

            if (field === "debit") {
                const debitValue = parseFloat(newEntries[index].debit) || 0;
                newEntries[index].curBalance -= debitValue; // Subtract from balance
            } else if (field === "credit") {
                const creditValue = parseFloat(newEntries[index].credit) || 0;
                newEntries[index].curBalance += creditValue; // Add to balance
            }

            setEntries(newEntries);

            // Add new row when Enter is pressed in Debit or Credit field
            if ((field === "debit" || field === "credit") && value) {
                setEntries([...newEntries, { type: "", particulars: "", debit: "", credit: "", curBalance: 0 }]);

                setTimeout(() => {
                    if (inputRefs.current[index + 1]) {
                        inputRefs.current[index + 1].focus(); // Focus on "type" field of new row
                    }
                }, 0);

            }

            // Enter: Move focus forward
            if (focusIndex < focusableElements.length - 1) {
                focusableElements[focusIndex + 1].focus();
            }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            // setCurrentField(field);

            const newIndex = e.key === 'ArrowDown'
                ? (selectedIndex + 1) % currentFilterList?.length
                : (selectedIndex - 1 + currentFilterList?.length) % currentFilterList?.length;
            setSelectedIndex(newIndex);

        } else if (e.key === 'Enter' && showFilter) {
            e.preventDefault();
            let newEntries = [...entries];
            if (field === 'particulars') {
                newEntries[index][field] = currentFilterList[selectedIndex]?.name || '';
                //fetching current balance for selected account
                try {
                    const accountBalance = await window.electron.getData({ doctype: 'Journal Entry Accounts', filters: { account: currentFilterList[selectedIndex]?.name, company: companyName }, token: 'token 617c5524f5a912e:aa8ae3123dc7d6d' });
                    if (accountBalance !== undefined) {
                        newEntries[index]['curBalance'] = accountBalance?.balance;

                    } else {
                        toast.error('Something went wrong with Party', {
                            autoClose: 2000,
                            className: 'custom-toast',
                        });
                    }
                } catch (error) {
                    console.error('Error posting Bank Account:', error);
                }


                setEntries(newEntries);
            } else if (field === 'entry_type') {
                setEntryType(currentFilterList[selectedIndex]?.name || '')
            } else if (field === 'journal_series') {
                setJournalSeries(currentFilterList[selectedIndex]?.name || '')
            } else if (field === 'party_type') {
                newEntries[index][field] = currentFilterList[selectedIndex]?.name || '';
            } else if (field === 'party') {
                newEntries[index][field] = currentFilterList[selectedIndex]?.name || '';
            }
            setShowFilter(false);
            setSelectedIndex(0);
        };
        handleSubmit()
    }

    const handleInputFocus = async (e: React.FocusEvent<HTMLInputElement>, index: number) => {
        const { name: field, value } = e.target;
        setShowFilter(false);
        if (field === 'entry_type') {
            setShowFilter(true);
            setCurrentFilterList(journalEntryType);
            setSelectedIndex(0)
        } else if (field === 'journal_series') {
            setShowFilter(true);
            setCurrentFilterList(seriesList);
            setSelectedIndex(0)
        } else if (field === 'particulars') {
            setShowFilter(true);
            setCurrentFilterList(AccountList);
            setSelectedIndex(0)

        } else if (field === 'party_type') {
            setShowFilter(true);
            setCurrentFilterList(partyTypeList);
            setSelectedIndex(0)
        } else if (field === "party") {
            setShowFilter(true);
            try {
                const fetchedPartyList = await window.electron.getData({ doctype: entries[index]?.party_type });
                if (fetchedPartyList !== undefined) {
                    console.log("fetchedPartyList", fetchedPartyList)
                    setCurrentFilterList(fetchedPartyList);
                    setSelectedIndex(0)

                } else {
                    toast.error('Something went wrong with Party', {
                        autoClose: 2000,
                        className: 'custom-toast',
                    });
                }
            } catch (error) {
                console.error('Error posting Bank Account:', error);
            }

        }

    }


    const handleSubmit = ()=>{
        const Accountdata = entries.flatMap((entry: any) => {
            let result = [];
        
            // Check if any key in the entry is empty (excluding debit/credit "disabled")
            const hasEmptyKey = Object.values(entry).some(value => value === "");
        
            if (!hasEmptyKey) {
                // Handle debit
                if (entry.debit !== "disabled") {
                    result.push({
                        account: entry.particulars,
                        party_type: entry.party_type,
                        party: entry.party,
                        debit_in_account_currency: parseFloat(entry.debit)
                    });
                }
        
                // Handle credit
                if (entry.credit !== "disabled") {
                    result.push({
                        account: entry.particulars,
                        party_type: entry.party_type,
                        party: entry.party,
                        credit_in_account_currency: parseFloat(entry.credit)
                    });
                }
            }
        
            return result;
        });
        
        console.log("Accountdata",Accountdata);
        
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
                <div className="col-1">
                    <p className={`${styles.journal_label}`}>Journal</p>
                </div>

                {/* entry field  */}
                <div className="col-4">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center">
                            <label className="fw-bold" style={{ flexBasis: '20%' }}>Entry Type</label>
                            <span className='colon-span me-2'>:</span>
                            <input
                                type="text"
                                className="form-control"
                                ref={(el) => el && (entryRefs.current = el)}
                                onKeyDown={(e) => handleKeyDown(e, 'entry_type', 0)}
                                name="entry_type"
                                onFocus={(e) => handleInputFocus(e, 0)}
                                onChange={(e) => { handleInputChange(e, 0) }}
                                value={entryType}
                                style={{ height: '20px', flexBasis: '40%' }}
                            />
                        </div>

                        {/* series field  */}
                        <div className="col-12 mt-2 d-flex align-items-center">
                            <label className="fw-bold" style={{ flexBasis: '20%' }}>Series</label>
                            <span className='colon-span me-2'>:</span>
                            <input
                                type="text"
                                className="form-control"
                                onKeyDown={(e) => handleKeyDown(e, 'journal_series', 0)}
                                name="journal_series"
                                onFocus={(e) => handleInputFocus(e, 0)}
                                onChange={(e) => { handleInputChange(e, 0) }}
                                value={journalSeries}
                                style={{ height: '20px', flexBasis: '40%' }}
                            />
                        </div>
                    </div>

                </div>

                {/* date field  */}
                <div className="col-4 d-flex align-items-center" style={{ width: '33%' }}>
                    <div className="d-flex align-items-center justify-content-between" style={{ width: '45.7%' }}>
                        <label className="ps-1 pe-3">Posting Date *</label>
                        <p>: </p>
                    </div>
                    <input
                        name="posting_date"
                        value={date.posting_date}
                        onChange={(e) => { handleInputChange(e, 0) }}
                        onKeyDown={(e) => handleKeyDown(e, 'posting_date', 0)}
                        className="ms-2 w-50"
                        style={{ outline: 'none' }}
                        type="date"
                    />
                </div>

            </div>

            {/* Header Row */}
            <div
                className={`row py-2 fw-bold`}
                style={{ border: '1px solid lightgray' }}
            >
                <div className="col-1">{' '}</div>
                <div className="col-3">Particulars</div>
                <div className="col-2">Party Type</div>
                <div className="col-2">Party</div>
                <div className="col-2 text-center">Debit</div>
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
                            onChange={(e) => handleInputChange(e, index, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'particulars', index)}

                        />
                    </div>

                    {/* Particulars */}
                    <div className={`col-3 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="particulars"
                            value={entry.particulars}
                            onChange={(e) => handleInputChange(e, index, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'particulars', index)}
                            onFocus={(e) => handleInputFocus(e, index)}
                        />
                    </div>

                    {/* Party type */}
                    <div className={`col-2 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="party_type"
                            value={entry.party_type}
                            onChange={(e) => handleInputChange(e, index, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'party_type', index)}
                            onFocus={(e) => handleInputFocus(e, index)}
                        />
                    </div>

                    {/* Party */}
                    <div className={`col-2 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="party"
                            value={entry.party}
                            onChange={(e) => handleInputChange(e, index, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'party', index)}
                            onFocus={(e) => handleInputFocus(e, index)}
                        />
                    </div>

                    {/* Debit Amount */}
                    <div className={`col-2 d-flex justify-content-center fw-bold ${styles.voucherRowActive}`} style={{ height: '32px' }}>
                        {entry.debit === "disabled" ? <span style={{ visibility: 'hidden' }}>debit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control text-center ${styles.voucherRowActive}`}
                                    // style={{ width: '20%' }}
                                    name="debit"
                                    value={entry.debit}
                                    disabled={entry.debit === "disabled"} // Disable if "Cr" was typed
                                    onChange={(e) => handleInputChange(e, index, 'entry_row')}
                                    onKeyDown={(e) => handleKeyDown(e, 'debit', index)}
                                />
                            )
                        }

                    </div>

                    {/* Credit Amount */}
                    <div className={`col-2 d-flex justify-content-center ${styles.voucherRowActive}`} style={{ height: '32px' }}>
                        {entry.credit === "disabled" ? <span style={{ visibility: 'hidden' }}>credit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control text-center ${styles.voucherRowActive}`}
                                    // style={{ width: '20%' }}
                                    name="credit"
                                    value={entry.credit}
                                    disabled={entry.credit === "disabled"} // Disable if "Dr" was typed
                                    onChange={(e) => handleInputChange(e, index, 'entry_row')}
                                    onKeyDown={(e) => handleKeyDown(e, 'credit', index)}
                                />
                            )
                        }

                    </div>


                    {/* Cur Balance Row */}
                    <div className="col-3">
                        <div className={`text-muted text-center ${entry.curBalance < 0 ? styles.negativeBalance : styles.curBal}`}>
                            Cur Bal: <i>{Math.abs(entry.curBalance)?.toFixed(2)}</i>
                        </div>
                    </div>


                </div>
            ))}

            {/* Narration Row */}
            <div className={`row border-top py-2 position-absolute ${styles.narrationRow}`}>
                <div className="col-6 text-muted">Narration:</div>
                {/* Footer (Total Debit  Amount) */}
                <div className="col-3 text-center fw-bold">{totalDebit.toFixed(2)}</div>
                {/* Footer (Total Credit Amount) */}
                <div className="col-3 text-center fw-bold">{totalCredit.toFixed(2)}</div>
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
