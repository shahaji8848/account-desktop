import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./receipt.module.css";
import QuitConfirmationModal from "../Home/QuitConfirmationModal";
import ShowFilter from "../common/ShowFilter";
import { isAdvanceList, journalEntryType, seriesList, partyTypeList, referenceTypeList, accountTypeList } from "../../utils/journalFormData";
import { paymentTypeList, AccountPaidToList } from "../../utils/receiptFormData";
import useFetchData from "../../hooks/fetchData"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { nanoid } from "nanoid";
import ReceiptItemsPopup from "./ReceiptItemsPopup";
// import JournalItemsPopup from "./JournalItemsPopup";


const ReceiptTable = ({ homeHookData, globalData, companyGstin }: any) => {
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
    const [accountPaidTo, setAccountPaidTo] = useState('')
    const [referenceNumber, setReferenceNumber] = useState('')
    const [ReferenceDate, setReferenceDate] = useState<any>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [userRemark, setUserRemark] = useState('')
    const [entries, setEntries] = useState<any>([
        {
            id: nanoid(),
            party_type: "",
            party: "",
            paid_amount: "",
            curBalance: 0,
            party_account_currency: '',
            party_account: '',
            naming_series: "ACC-PAY-.YYYY.-",
            payment_type: '',

            cost_center: '',
            target_exchange_rate: 1.0000,
            reference_no: '',
            reference_date: ''
        }
    ]);
    const [referenceNameLsit, setReferenceNameLsit] = useState<any>([])
    const [receiptPopupID, setReceiptPopupID] = useState<any>([]);
    const [receiptPopup, setReceiptPopup] = useState<boolean>(false);

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


        } else if (name === 'posting_date') {
            setDate({ ...date, [name]: value });
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
            if (receiptPopup) {
                setReceiptPopup(false)
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
            if ((field === "paid_amount") && value) {

                setEntries((prevEntries: any) => {
                    const newEntries = [
                        ...prevEntries,
                        {
                            id: nanoid(), // Generate a new unique ID
                            party_type: "",
                            party: "",
                            paid_amount: "",
                            curBalance: 0,
                            bank_account: '',
                            cost_center: '',
                            party_account_currency: '',
                            exchange_rate: 1.0000,
                            reference_number: '',
                            reference_date: ''
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
            if (field === "party_type" || field === "party" || field === 'payment_type' || field === 'cost_center') {

                setEntries((prevEntries: any) =>
                    prevEntries.map((entry: any) =>
                        entry.id === id
                            ? { ...entry, [field]: currentFilterList[selectedIndex]?.name || "" }
                            : entry
                    )
                )

                if (field === "party") {
                    const selectedRowData = entries.find((entry: any) => entry.id === id);
                    //fetching party_balance and other data for selected party type and party
                    const filters = {
                        company: companyName,
                        party_type: selectedRowData?.party_type,
                        party: currentFilterList[selectedIndex]?.name
                    }
                    console.log("filters", filters)
                    try {
                        const partyDataResponse = await window.electron.getData({
                            doctype: "Payment Entry Party Details",
                            filters,
                            token
                        })
                        if (partyDataResponse?.message) {
                            console.log("partyData", partyDataResponse.message)
                            const partyData = partyDataResponse.message

                            setEntries((prevEntries: any) =>
                                prevEntries.map((entry: any) =>
                                    entry.id === id
                                        ? {
                                            ...entry,
                                            curBalance: partyData?.party_balance,
                                            party_account_currency: partyData?.party_account_currency,
                                            party_account: partyData?.party_account
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
                }

            }else if (field === "paid_to"){
                setAccountPaidTo(currentFilterList[selectedIndex]?.name || '')
            }
            setShowFilter(false);
            setSelectedIndex(0);
        } else if (e.ctrlKey && e.key === 's' && field === 'party') {
            setReceiptPopupID(id)
            setReceiptPopup(true)
            setShowFilter(false)
        }
        else if (e.ctrlKey && e.key === 'a') {
            handleSubmit()

        }
    }



    const handleInputFocus = async (e: React.FocusEvent<HTMLInputElement>, id: any) => {
        const { name: field, value } = e.target;
        setShowFilter(false);
        if (field === 'party_type') {
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

        } else if (field === 'payment_type') {
            setShowFilter(true);
            setCurrentFilterList(paymentTypeList);
            setSelectedIndex(0)
        } else if (field === 'cost_center') {
            setShowFilter(true);
            setCurrentFilterList(CostCenterList);
            setSelectedIndex(0)
        } else if (field === "paid_to") {
            setShowFilter(true);
            setCurrentFilterList(AccountPaidToList);
            setSelectedIndex(0)
        }

    }


    const handleSubmit = async () => {
        const Accountdata = entries.flatMap((entry: any) => {
            // let result = [];

            // Check if any key in the entry is empty 
            const requiredKeys = ["particulars", "party_type", "party"];
            const hasEmptyKey = requiredKeys.some((key) => entry[key] === "");

            // if (!hasEmptyKey) {
            //     // Handle debit
            //     if (entry.debit !== "disabled") {
            //         result.push({
            //             account: entry.particulars,
            //             party_type: entry.party_type,
            //             party: entry.party,
            //             debit_in_account_currency: parseFloat(entry.debit),
            //             cost_center: entry.cost_center,
            //             account_currency: entry.account_currency,
            //             exchange_rate: entry.exchange_rate,
            //             reference_type: entry.reference_type,
            //             is_advance: entry.is_advance,
            //             reference_name: entry.reference_name,
            //             user_remark: entry.user_remark
            //         });
            //     }

            //     // Handle credit
            //     if (entry.credit !== "disabled") {
            //         result.push({
            //             account: entry.particulars,
            //             party_type: entry.party_type,
            //             party: entry.party,
            //             credit_in_account_currency: parseFloat(entry.credit),
            //             cost_center: entry.cost_center,
            //             account_currency: entry.account_currency,
            //             exchange_rate: entry.exchange_rate,
            //             reference_type: entry.reference_type,
            //             is_advance: entry.is_advance,
            //             reference_name: entry.reference_name,
            //             user_remark: entry.user_remark

            //         });
            //     }
            // }





            // return result;
        });

        const journalData = {
            naming_series: accountPaidTo || "ACC-JV-.YYYY.-",
            company: companyName,
            company_gstin: companyGstin,
            posting_date: date?.posting_date,
            cheque_no: referenceNumber,
            cheque_date: ReferenceDate,
            user_remark: userRemark,
            accounts: Accountdata
        };

        console.log("journalData", JSON.stringify(journalData))
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
    // const totalDebit = entries.reduce((sum: any, entry: any) => sum + (parseFloat(entry.debit) || 0), 0);
    const totalAmount = entries.reduce((sum: any, entry: any) => sum + (parseFloat(entry.paid_amount) || 0), 0);
    console.log("entries", entries)
    return (
        <div
            className={`container-fluid ${styles.journal_table_container}`}
            ref={formRef}
        >
            <div className="row  pb-2 ps-1 pe-1">
                <div className="col-1">
                    <p className={`${styles.journal_label}`}>Receipt</p>
                </div>

                {/* entry field  */}
                <div className="col-4">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center">
                            <label className="fw-bold" style={{ flexBasis: '20%' }}>Account</label>
                            <span className='colon-span me-2'>:</span>
                            <input
                                type="text"
                                className="form-control"
                                ref={(el) => el && (entryRefs.current = el)}
                                onKeyDown={(e) => handleKeyDown(e, 'paid_to', 0)}
                                name="paid_to"
                                onFocus={(e) => handleInputFocus(e, 0)}
                                onChange={(e) => { handleInputChange(e, 0) }}
                                value={accountPaidTo}
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
                <div className="col-3">Party Type</div>
                <div className="col-3">Party</div>
                {/* <div className="col-2">Reference Number</div>
                <div className="col-2 text-center">Reference Date</div>
                <div className="col-2">Cost Center</div> */}
                <div className="col-2 offset-4 text-end">Amount</div>
            </div>

            {/* Dynamic Entry Rows */}
            {entries.map((entry: any, index: any) => (
                <div key={index} className={`row align-items-center ${styles.entryRow}`}>
                    {/* Party type */}
                    <div className={`col-3 ${styles.voucherRowActive}`}>
                        <input
                            type="text"
                            className={`form-control p-0 ${styles.voucherRowActive}`}
                            ref={(el) => (inputRefs.current[index] = el)}
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

                    {/* dummy col for gap  fill up */}
                    <div className={`col-4 d-flex justify-content-center ${styles.voucherRowActive}`} style={{ height: '20px' }}></div>

                    {/* Amount */}
                    <div className={`col-2 d-flex justify-content-center ${styles.voucherRowActive}`} style={{ height: '20px' }}>
                        <input
                            type="text"
                            className={`form-control text-center p-0 ${styles.voucherRowActive}`}
                            // style={{ width: '20%' }}
                            name="paid_amount"
                            value={entry.paid_amount}

                            onChange={(e) => handleInputChange(e, entry.id, 'entry_row')}
                            onKeyDown={(e) => handleKeyDown(e, 'paid_amount', entry.id)}
                        />
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
                <div className="col-2 offset-10 d-flex justify-content-between">
                    <p className="text-center fw-bold">{totalAmount.toFixed(2)}</p>
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

            <ReceiptItemsPopup
                receiptPopup={receiptPopup}
                entries={entries}
                receiptPopupID={receiptPopupID}
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

export default ReceiptTable;
