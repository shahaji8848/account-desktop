import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "react-toastify";

const useSubmitHooks = ({ setIsAdressFormOpen, setIsBankFormOpen, rows, setRows }: any) => {
    const [editingAddress, setEditingAddress] = useState<any>({});
    const [editingBank, setEditingBank] = useState<any>({});
    const [storedAddressList, setStoredAddressList] = useState([]);
    const [storedBankList, setStoredBankList] = useState([]);
    const [customerFormData, setCustomerFormData] = useState({
        customer_name: '',
        alias: '',
        customer_type: '',
        default_currency: '',
        tax_withholding_category: '',
        gstin: '',
        pan: '',
        gst_category: '',
        accounts: ''
    })
    const [addressFormData, setAddressFormData] = useState({
        linkDocumentType: 'Customer',
        linkName: '',
        address_gstin: '',
        addressType: 'Billing',
        gstCategory: '',
        postalCode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        country: ''
    });

    const [bankFormData, setBankFormData] = useState({
        account_name: '',
        bank: '',
        account_type: '',
        party_type: 'Customer',
        party: '',
        branch_code: '',
        bank_account_no: '',
    });

    const token = localStorage.getItem('token');

    //customer submit with full form submitt

    const handleCustomerFormSubmit = async () => {

        const accountData = rows.map(({ account, company }: any) => ({
            account,
            company
        }));
        const customerPayload = {
            customer_name: customerFormData?.customer_name,
            customer_type: customerFormData?.customer_type,
            default_currency: customerFormData?.default_currency,
            tax_withholding_category: customerFormData?.tax_withholding_category,
            gstin: customerFormData?.gstin,
            pan: customerFormData?.pan,
            gst_category: customerFormData?.gst_category,
            accounts: accountData || []
        };

        // validation check 
        if (!customerPayload?.customer_name) {
            toast.warning('Customer form Name field is required', {
                autoClose: 2000,
                className: 'custom-toast',
            });
            return
        }

        if (storedAddressList?.length === 0) {
            toast.warning('Address form: All fields are required', {
                autoClose: 2000,
                className: 'custom-toast',
            });
            return;
        }

        if (storedBankList?.length === 0) {
            toast.warning('Bank form: All fields are required', {
                autoClose: 2000,
                className: 'custom-toast',
            });
            return;
        }

        try {
            const x = await window.electron.postData({ doctype: "Customer", data: customerPayload, token });
            if (x !== undefined) {
                toast.success('Customer Form is submitted!', {
                    autoClose: 2000,
                    className: 'custom-toast',
                });
                // clear customer form fields
                setCustomerFormData({
                    customer_name: '',
                    alias: '',
                    customer_type: '',
                    default_currency: '',
                    tax_withholding_category: '',
                    gstin: '',
                    pan: '',
                    gst_category: '',
                    accounts: ''
                });

                setRows([])
                const updatedStoredAddressList = storedAddressList.map(({ id, ...rest }: any) => rest);
                if (updatedStoredAddressList?.length > 0) {
                    for (const address of updatedStoredAddressList) {
                        try {
                            const addressResponse = await window.electron.postData({ doctype: "Address", data: address, token });
                            if (addressResponse !== undefined) {
                                toast.success('Address Form is submitted!', {
                                    autoClose: 2000,
                                    className: 'custom-toast',
                                });

                            } else {
                                toast.error('Something went wrong with Address submission!', {
                                    autoClose: 2000,
                                    className: 'custom-toast',
                                });
                            }
                        } catch (error) {
                            console.error('Error posting Address:', error);
                        }
                    }

                    // clear address form fields
                    setAddressFormData({
                        linkDocumentType: 'Customer',
                        linkName: '',
                        address_gstin: '',
                        addressType: 'Billing',
                        gstCategory: '',
                        postalCode: '',
                        city: '',
                        addressLine1: '',
                        addressLine2: '',
                        state: '',
                        country: ''
                    });

                    setStoredAddressList([])
                    setIsAdressFormOpen(true)

                }

                const updatedStoredBankList = storedBankList.map(({ id, ...rest }: any) => rest);
                if (updatedStoredBankList?.length > 0) {
                    for (const bank of updatedStoredBankList) {
                        try {
                            const bankResponse = await window.electron.postData({ doctype: "Bank Account", data: bank, token });
                            if (bankResponse !== undefined) {
                                toast.success('Bank Form is submitted!', {
                                    autoClose: 2000,
                                    className: 'custom-toast',
                                });


                            } else {
                                toast.error('Something went wrong with Bank submission!', {
                                    autoClose: 2000,
                                    className: 'custom-toast',
                                });
                            }
                        } catch (error) {
                            console.error('Error posting Bank Account:', error);
                        }
                    }
                    // clear bank form fields
                    setBankFormData({
                        account_name: '',
                        bank: '',
                        account_type: '',
                        party_type: 'Customer',
                        party: '',
                        branch_code: '',
                        bank_account_no: '',
                    })
                    setStoredBankList([])
                    setIsBankFormOpen(true)
                }

            } else {
                toast.error('Something went wrong. Please Re-enter all the data!', {
                    autoClose: 2000,
                    className: 'custom-toast',
                });
            }
        } catch (error) {
            console.error('Error fetching taxes or saving form:', error);
        }

    };
    // for address 
    const handleAddressFormSubmit = async () => {
        const excludedKeys = ['address_gstin'];

        const isAddressFormInvalid = Object.entries(addressFormData)
            .filter(([key]) => !excludedKeys.includes(key)) // Exclude certain keys
            .some(([_, value]) => value === ''); // Check for empty values

        if (isAddressFormInvalid) {
            toast.warning('Address form: All fields are required', {
                autoClose: 2000,
                className: 'custom-toast',
            });
            return;
        }


        if (editingAddress && Object.keys(editingAddress)?.length > 0) {
            const addressList = {
                address_type: addressFormData?.addressType,
                address_line1: addressFormData?.addressLine1,
                city: addressFormData?.city,
                state: addressFormData?.state,
                gstin: addressFormData?.address_gstin,
                gst_category: addressFormData?.gstCategory,
                links: [
                    {
                        link_doctype: addressFormData?.linkDocumentType,
                        link_name: addressFormData?.linkName
                    }
                ],
                pincode: addressFormData?.postalCode,
                country: addressFormData?.country
            }
            const updatedAddressList = { ...editingAddress, ...addressList }
            // Update existing address
            setStoredAddressList((prevList: any) =>
                // @ts-ignore
                prevList.map((addr: any) => addr?.id === updatedAddressList?.id ? updatedAddressList : addr)
            );
        }
        else {
            const a = {
                id: nanoid(),
                address_type: addressFormData?.addressType,
                address_line1: addressFormData?.addressLine1,
                address_line2: addressFormData?.addressLine2,
                city: addressFormData?.city,
                state: addressFormData?.state,
                gstin: addressFormData?.address_gstin,
                gst_category: addressFormData?.gstCategory,
                links: [
                    {
                        link_doctype: addressFormData?.linkDocumentType,
                        link_name: addressFormData?.linkName
                    }
                ],
                pincode: addressFormData?.postalCode,
                country: addressFormData?.country
            }

            // @ts-ignore
            setStoredAddressList((previous: any) => [...previous, a]);
        }

        setIsAdressFormOpen(false)
        // @ts-ignore
        setAddressFormData({
            linkDocumentType: 'Customer',
            linkName: customerFormData?.customer_name || '',
            address_gstin: '',
            addressType: 'Billing',
            gstCategory: '',
            postalCode: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            country: ''
        })
        setEditingAddress({})

    };

    //for bank
    const handleFormBankSubmit = async () => {
        const isBankFormInvalid = Object.values(bankFormData).some(value => value === '');

        if (isBankFormInvalid) {
            toast.warning('Bank form: All fields are required', {
                autoClose: 2000,
                className: 'custom-toast',
            });
            return;
        }

        if (editingBank && Object.keys(editingBank)?.length > 0) {
            const bankDetailList = {
                account_name: bankFormData?.account_name,
                bank: bankFormData?.bank,
                account_type: bankFormData?.account_type,
                party_type: bankFormData?.party_type,
                party: bankFormData?.party,
                branch_code: bankFormData?.branch_code,
                bank_account_no: bankFormData?.bank_account_no
            }

            const updatedBankDetailList = { ...editingBank, ...bankDetailList }
            // Update existing address
            setStoredBankList((prevList: any) =>
                // @ts-ignore
                prevList.map((bank: any) => bank?.id === updatedBankDetailList?.id ? updatedBankDetailList : bank)
            );
        }
        else {
            let a = {
                id: nanoid(),
                account_name: bankFormData?.account_name,
                bank: bankFormData?.bank,
                account_type: bankFormData?.account_type,
                party_type: bankFormData?.party_type,
                party: bankFormData?.party,
                branch_code: bankFormData?.branch_code,
                bank_account_no: bankFormData?.bank_account_no
            }
            // @ts-ignore
            setStoredBankList((previous: any) => [...previous, a])
        }

        setIsBankFormOpen(false)
        // @ts-ignore
        setBankFormData({
            account_name: customerFormData?.customer_name || '',
            bank: '',
            account_type: '',
            party_type: 'Customer',
            party: customerFormData?.customer_name || '',
            branch_code: '',
            bank_account_no: '',
        })
        setEditingBank({})
    };
    return {
        handleAddressFormSubmit,
        handleFormBankSubmit,
        handleCustomerFormSubmit,
        customerFormData,
        addressFormData,
        bankFormData,
        editingAddress,
        editingBank,
        storedAddressList,
        storedBankList,
        setStoredAddressList,
        setCustomerFormData,
        setAddressFormData,
        setBankFormData,
        setEditingAddress,
        setEditingBank,
        setStoredBankList,
    }
}

export default useSubmitHooks