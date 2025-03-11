import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./journal.module.css";
import QuitConfirmationModal from "../Home/QuitConfirmationModal";
import ShowFilter from "../common/ShowFilter";
import { isAdvanceList, journalEntryType, seriesList, partyTypeList, referenceTypeList, accountTypeList } from "../../utils/journalFormData";
import useFetchData from "../../hooks/fetchData"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { nanoid } from "nanoid";
import JournalItemsPopup from "./JournalItemsPopup";


const JournalTable = ({ homeHookData, globalData, companyGstin }: any) => {
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
    const [referenceNumber, setReferenceNumber] = useState('')
    const [ReferenceDate, setReferenceDate] = useState<any>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [userRemark, setUserRemark] = useState('')
    const [entries, setEntries] = useState<any>([
        {
            id: nanoid(),
            type: "",
            particulars: "",
            party_type: "",
            party: "",
            debit: "",
            credit: "",
            curBalance: 0,
            bank_account: '',
            cost_center: '',
            account_currency: '',
            exchange_rate: 1.0000,
            reference_type: '',
            is_advance: '',
            reference_name: '',
            user_remark: '',
            Reference_due_date: ''
        }
    ]);
    const [referenceNameLsit, setReferenceNameLsit] = useState<any>([])
    const [journalPopupID, setJournalPopupID] = useState<any>([]);
    const [journalPopup, setJournalPopup] = useState<boolean>(false);


    const companyName = useSelector((state: RootState) => state.companyDataReducer?.company_name) || '8848 Digital LLP';
    const token = localStorage.getItem('account_desktop_token');
    const AccountList = useFetchData("Account", {}, token);
    const BankAccountList = useFetchData("Bank Account", {}, token);
    const CostCenterList = useFetchData("Cost Center", {}, token);

    useEffect(() => {
        if (entryRefs.current) {
            entryRefs.current.focus();
        }
    }, []);

    // Handle input changes for different fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: any, rowType?: any) => {
        const { name, value } = e.target;

        if (rowType === 'entry_row') {
            setEntries((prevEntries: any) =>
                prevEntries.map((entry: any) =>
                    entry.id === id ? { ...entry, [name]: value } : entry
                )
            );
            // Enable/Disable fields based on type value
            // if (name === "type") {
            //     setEntries((prevEntries: any) =>
            //         prevEntries.map((entry: any) =>
            //             entry.id === id
            //                 ? {
            //                     ...entry,
            //                     debit: value.toLowerCase() === "dr" ? "" : "disabled",
            //                     credit: value.toLowerCase() === "cr" ? "" : "disabled",
            //                 }
            //                 : entry
            //         )
            //     );
            // }

        } else if (name === 'posting_date') {
            setDate({ ...date, [name]: value });
        } else if (name === 'main_user_remark') {
            setUserRemark(value)
        } else if (name === 'main_reference_name') {
            setReferenceNumber(value)
        } else if (name === 'main_reference_date') {
            setReferenceDate(value)
        }

    };


    // Handle key press (Enter to add new row, Escape to close modal)
    const handleKeyDown = async (e: any, field: any, id: any, index?: number) => {
        const { value } = e.target;
        const focusableElements = Array.from(
            formRef.current?.querySelectorAll(
                "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
            ) || []
        ) as HTMLElement[];

        const focusIndex = focusableElements.indexOf(e.currentTarget);

        if (e.key === "Escape") {
            if (journalPopup) {
                setJournalPopup(false)
            } else {
                setIsQuitModalOpen(true);

            }
        } else if (e.key === "Enter" && !showFilter) {
            // const newEntries = [...entries];

            setEntries((prevEntries: any) =>
                prevEntries.map((entry: any) => {
                    if (entry.id === id) {
                        let updatedEntry = { ...entry };

                        if (field === "debit") {
                            const debitValue = parseFloat(entry.debit) || 0;
                            updatedEntry.curBalance -= debitValue; // Subtract from balance
                        } else if (field === "credit") {
                            const creditValue = parseFloat(entry.credit) || 0;
                            updatedEntry.curBalance += creditValue; // Add to balance
                        }

                        return updatedEntry;
                    }
                    return entry;
                })
            );

            // Add new row when Enter is pressed in Debit or Credit field
            if ((field === "debit" || field === "credit") && value) {
                // setEntries((prevEntries: any) => [
                //     ...prevEntries,
                //     {
                //         id: nanoid(), // Generate a new unique ID
                //         type: "",
                //         particulars: "",
                //         party_type: "",
                //         party: "",
                //         debit: "",
                //         credit: "",
                //         curBalance: 0,
                //         bank_account: '',
                //         cost_center: '',
                //         account_currency: '',
                //         exchange_rate: 1.0000,
                //         reference_type: '',
                //         is_advance: '',
                //         reference_name: '',
                //         user_remark: '',
                //         Reference_due_date: ''
                //     }
                // ]);

                // setTimeout(() => {
                //     // @ts-ignore
                //     if (inputRefs.current[index + 1]) {
                //         // @ts-ignore
                //         inputRefs.current[index + 1].focus(); // Focus on "type" field of new row
                //     }
                // }, 0);

                setEntries((prevEntries: any) => {
                    const newEntries = [
                        ...prevEntries,
                        {
                            id: nanoid(), // Generate a new unique ID
                            type: "",
                            particulars: "",
                            party_type: "",
                            party: "",
                            debit: "",
                            credit: "",
                            curBalance: 0,
                            bank_account: '',
                            cost_center: '',
                            account_currency: '',
                            exchange_rate: 1.0000,
                            reference_type: '',
                            is_advance: '',
                            reference_name: '',
                            user_remark: '',
                            Reference_due_date: ''
                        }
                    ];
            
                    // Delay focus to ensure state update is completed
                    setTimeout(() => {
                        const nextIndex = newEntries.length - 1; // Get the latest row index
                        if (inputRefs.current[nextIndex]) {
                            inputRefs.current[nextIndex].focus(); // Focus on "type" field of new row
                        }
                    }, 50);
            
                    return newEntries;
                });

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
            // let newEntries = [...entries];
            if (field === 'particulars') {
                setEntries((prevEntries: any) => {
                    return prevEntries.map((entry: any) => {
                        return entry.id === id
                            ? { ...entry, [field]: currentFilterList[selectedIndex]?.name || "" }
                            : entry;
                    });
                });
                //fetching current balance for selected account
                try {
                    const accountBalance = await window.electron.getData({ doctype: 'Journal Entry Accounts', filters: { account: currentFilterList[selectedIndex]?.name, company: companyName }, token });
                    if (accountBalance !== undefined) {
                        setEntries((prevEntries: any) =>
                            prevEntries.map((entry: any) =>
                                entry.id === id
                                    ? {
                                        ...entry,
                                        curBalance: accountBalance?.balance,
                                        account_currency: accountBalance?.account_currency
                                    }
                                    : entry
                            )
                        );

                    } else {
                        toast.error('Something went wrong with Party', {
                            autoClose: 2000,
                            className: 'custom-toast',
                        });
                    }
                } catch (error) {
                    console.error('Error posting Bank Account:', error);
                }


            } else if (field === 'reference_type') {
                setEntries((prevEntries: any) => {
                    return prevEntries.map((entry: any) => {
                        return entry.id === id
                            ? { ...entry, [field]: currentFilterList[selectedIndex]?.name || "" }
                            : entry;
                    });
                });

                const selectedRowData = entries.find((entry: any) => entry.id === id);

                //fetching Reference Name for selected reference type
                try {
                    const referenceName = await window.electron.getData({
                        doctype: "Journal Receipt Names",
                        filters: {
                            account: selectedRowData?.particulars,
                            reference_type: currentFilterList[selectedIndex]?.name,
                            cost_center: selectedRowData?.cost_center
                        },
                        token
                    })
                    if (referenceName) {
                        setReferenceNameLsit(referenceName?.data || [])

                    } else {
                        toast.error('Something went wrong with Party', {
                            autoClose: 2000,
                            className: 'custom-toast',
                        });
                    }
                } catch (error) {
                    console.error('Error posting Bank Account:', error);
                }


                // setEntries(newEntries);
            } else if (field === 'entry_type') {
                setEntryType(currentFilterList[selectedIndex]?.name || '')
            } else if (field === 'journal_series') {
                setJournalSeries(currentFilterList[selectedIndex]?.name || '')
            } else if (field === "type" || field === "party_type" || field === "party" || field === 'bank_account' || field === 'cost_center' || field === 'is_advance' || field === 'reference_name') {
                if (field === 'reference_name') {
                    setEntries((prevEntries: any) =>
                        prevEntries.map((entry: any) =>
                            entry.id === id
                                ? { ...entry, [field]: referenceNameLsit[selectedIndex]?.name || "" }
                                : entry
                        )
                    )
                } else if (field === 'type') {
                    setEntries((prevEntries: any) =>
                        prevEntries.map((entry: any) =>
                            entry.id === id
                                ? {
                                    ...entry,
                                    [field]: currentFilterList[selectedIndex]?.name || "",
                                    debit: currentFilterList[selectedIndex]?.name.toLowerCase() === "dr" ? "" : "disabled",
                                    credit: currentFilterList[selectedIndex]?.name.toLowerCase() === "cr" ? "" : "disabled",
                                }
                                : entry
                        )
                    )
                } else {
                    setEntries((prevEntries: any) =>
                        prevEntries.map((entry: any) =>
                            entry.id === id
                                ? { ...entry, [field]: currentFilterList[selectedIndex]?.name || "" }
                                : entry
                        )
                    )
                }
            }
            setShowFilter(false);
            setSelectedIndex(0);
        } else if (e.ctrlKey && e.key === 's' && field === 'particulars') {
            setJournalPopupID(id)
            setJournalPopup(true)
            setShowFilter(false)
        }
        else if (e.ctrlKey && e.key === 'a') {
            handleSubmit()

        }
    }



    const handleInputFocus = async (e: React.FocusEvent<HTMLInputElement>, id: any) => {
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
        } else if (field === 'type') {
            setShowFilter(true);
            setCurrentFilterList(accountTypeList);
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
                const doctype = entries.find((entry: any) => entry.id === id)?.party_type;
                const fetchedPartyList = await window.electron.getData({ doctype, filters: {}, token });
                if (fetchedPartyList !== undefined) {
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

        } else if (field === 'bank_account') {
            setShowFilter(true);
            setCurrentFilterList(BankAccountList);
            setSelectedIndex(0)
        } else if (field === 'cost_center') {
            setShowFilter(true);
            setCurrentFilterList(CostCenterList);
            setSelectedIndex(0)
        } else if (field === 'is_advance') {
            setShowFilter(true);
            setCurrentFilterList(isAdvanceList);
            setSelectedIndex(0)
        } else if (field === 'reference_type') {
            setShowFilter(true);
            setCurrentFilterList(referenceTypeList);
            setSelectedIndex(0)
        } else if (field === 'reference_name') {
            setShowFilter(true);
            setCurrentFilterList(referenceNameLsit);
            setSelectedIndex(0)
        }

    }


    const handleSubmit = async () => {
        const Accountdata = entries.flatMap((entry: any) => {
            let result = [];

            // Check if any key in the entry is empty 
            const requiredKeys = ["particulars", "party_type", "party"];
            const hasEmptyKey = requiredKeys.some((key) => entry[key] === "");

            if (!hasEmptyKey) {
                // Handle debit
                if (entry.debit !== "disabled") {
                    result.push({
                        account: entry.particulars,
                        party_type: entry.party_type,
                        party: entry.party,
                        debit_in_account_currency: parseFloat(entry.debit),
                        cost_center: entry.cost_center,
                        account_currency: entry.account_currency,
                        exchange_rate: entry.exchange_rate,
                        reference_type: entry.reference_type,
                        is_advance: entry.is_advance,
                        reference_name: entry.reference_name,
                        user_remark: entry.user_remark
                    });
                }

                // Handle credit
                if (entry.credit !== "disabled") {
                    result.push({
                        account: entry.particulars,
                        party_type: entry.party_type,
                        party: entry.party,
                        credit_in_account_currency: parseFloat(entry.credit),
                        cost_center: entry.cost_center,
                        account_currency: entry.account_currency,
                        exchange_rate: entry.exchange_rate,
                        reference_type: entry.reference_type,
                        is_advance: entry.is_advance,
                        reference_name: entry.reference_name,
                        user_remark: entry.user_remark

                    });
                }
            }





            return result;
        });

        const journalData = {
            naming_series: journalSeries || "ACC-JV-.YYYY.-",
            company: companyName,
            company_gstin: companyGstin,
            posting_date: date?.posting_date,
            cheque_no: referenceNumber,
            cheque_date: ReferenceDate,
            user_remark: userRemark,
            accounts: Accountdata
        };

        console.log("journalData",JSON.stringify(journalData))
        try {
            const journalResponse = await window.electron.postData({ doctype: "Journal Entry", data: journalData, token });
            if (journalResponse !== undefined) {
                toast.success('Journal Form is submitted!', {
                    autoClose: 2000,
                    className: 'custom-toast',
                });

            } else {
                toast.error('Something went wrong with Journal submission!', {
                    autoClose: 2000,
                    className: 'custom-toast',
                });
            }
        } catch (error) {
            console.error('Error posting Address:', error);
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
                <div className="col-4 offset-3 d-flex align-items-center" style={{ width: '33%' }}>
                    <div className="d-flex align-items-center justify-content-between" style={{ width: '30%' }}>
                        <label className="ps-1 pe-3">Posting Date * :</label>
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
                <div className="col-3">Party Type</div>
                <div className="col-3">Party</div>
                <div className="col-1 text-center">Debit</div>
                <div className="col-1 text-end">Credit</div>
            </div>

            {/* Dynamic Entry Rows */}
            {entries.map((entry: any, index: any) => (
                <div key={index} className={`row align-items-center ${styles.entryRow}`}>
                    {/* Left Icon Input */}
                    <div className={`col-1 d-flex align-items-center ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control p-0 ${styles.voucherRowActive}`}
                            ref={(el) => (inputRefs.current[index] = el)}
                            name="type"
                            value={entry.type}
                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'type', entry.id, index)}
                            onFocus={(e) => handleInputFocus(e, entry.id)}

                        />
                    </div>

                    {/* Particulars */}
                    <div className={`col-3 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control p-0 ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="particulars"
                            value={entry.particulars}
                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'particulars', entry.id)}
                            onFocus={(e) => handleInputFocus(e, entry.id)}
                        />
                    </div>

                    {/* Party type */}
                    <div className={`col-3 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control p-0 ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="party_type"
                            value={entry.party_type}
                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'party_type', entry.id)}
                            onFocus={(e) => handleInputFocus(e, entry.id)}
                        />
                    </div>

                    {/* Party */}
                    <div className={`col-3 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control p-0 ${styles.voucherRowActive}`}
                            // style={{ width: '25%' }}
                            name="party"
                            value={entry.party}
                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'party', entry.id)}
                            onFocus={(e) => handleInputFocus(e, entry.id)}
                        />
                    </div>

                    {/* Debit Amount */}
                    <div className={`col-1 d-flex justify-content-center fw-bold ${styles.voucherRowActive}`} style={{ height: '20px' }}>
                        {entry.debit === "disabled" ? <span style={{ visibility: 'hidden' }}>debit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control text-center p-0 ${styles.voucherRowActive}`}
                                    // style={{ width: '20%' }}
                                    name="debit"
                                    value={entry.debit}
                                    disabled={entry.debit === "disabled"} // Disable if "Cr" was typed
                                    onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                    onKeyDown={(e) => handleKeyDown(e, 'debit', entry.id)}
                                />
                            )
                        }

                    </div>

                    {/* Credit Amount */}
                    <div className={`col-1 d-flex justify-content-center ${styles.voucherRowActive}`} style={{ height: '20px' }}>
                        {entry.credit === "disabled" ? <span style={{ visibility: 'hidden' }}>credit</span>
                            : (
                                <input
                                    type="text"
                                    className={`form-control text-center p-0 ${styles.voucherRowActive}`}
                                    // style={{ width: '20%' }}
                                    name="credit"
                                    value={entry.credit}
                                    disabled={entry.credit === "disabled"} // Disable if "Dr" was typed
                                    onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                                    onKeyDown={(e) => handleKeyDown(e, 'credit', entry.id)}
                                />
                            )
                        }

                    </div>


                    {/* Cur Balance Row */}
                    <div className="col-3">
                        <div className={`text-muted text-center ${entry.curBalance < 0 ? styles.negativeBalance : styles.curBal}`}>
                            <p>  Cur Bal: <i>{Math.abs(entry.curBalance)?.toFixed(2)}</i></p>
                        </div>
                    </div>


                </div>
            ))}



            {/* Narration Row */}
            <div className={`row border-top py-2 position-absolute ${styles.narrationRow}`}>
                <div className="col-6">
                    {/* reference fields  */}
                    <div className="d-flex align-items-center" style={{ width: '50%' }}>
                        <div className="d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                            <label className="ps-1 pe-3">Reference Number</label>
                            <p>: </p>
                        </div>
                        <input
                            name="main_reference_name"
                            value={referenceNumber}
                            onChange={(e: any) => handleInputChange(e, 0)}
                            onKeyDown={(e) => handleKeyDown(e, 'main_reference_name', 0)}
                            className="ms-2"
                            style={{ outline: 'none', width: '63%' }}
                        />
                    </div>

                    <div className="d-flex align-items-center" style={{ width: '50%' }}>
                        <div className="d-flex align-items-start justify-content-between" style={{ width: '35%' }}>
                            <label className="ps-1 pe-3">Reference Date</label>
                            <p>: </p>
                        </div>
                        <input
                            name="main_reference_date"
                            type="date"
                            value={ReferenceDate}
                            onChange={(e: any) => handleInputChange(e, 0)}
                            onKeyDown={(e) => handleKeyDown(e, 'main_reference_date', 0)}
                            className="ms-2"
                            style={{ outline: 'none', width: '63%' }}
                        />
                    </div>

                    <div className="">
                        <p className="ps-1">Narration:</p>
                        <textarea
                            name="main_user_remark"
                            value={userRemark}
                            onChange={(e: any) => handleInputChange(e, 0)}
                            onKeyDown={(e) => handleKeyDown(e, 'narration_user_remark', 0)}
                            className="ms-2"
                            style={{ outline: 'none', width: '80%', minHeight: '100px', resize: 'none', overflowY: 'auto', whiteSpace: 'pre-wrap' }}
                        />
                    </div>
                </div>

                <div className="col-2 offset-4 d-flex justify-content-between">
                    {/* Footer (Total Debit  Amount) */}
                    <div className="col-3 text-center fw-bold">{totalDebit.toFixed(2)}</div>
                    {/* Footer (Total Credit Amount) */}
                    <div className="col-3 text-center fw-bold">{totalCredit.toFixed(2)}</div>
                </div>


            </div>

            {/* Filter Dropdown */}
            {showFilter && (
                <ShowFilter
                    filteredItems={currentFilterList}
                    selectedIndex={selectedIndex}
                    handleItemFocus={(index: number) => setSelectedIndex(index)}
                />
            )}

            {/* row pop-up form */}

            <JournalItemsPopup
                journalPopup={journalPopup}
                entries={entries}
                journalPopupID={journalPopupID}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                handleInputFocus={handleInputFocus}
            />

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
