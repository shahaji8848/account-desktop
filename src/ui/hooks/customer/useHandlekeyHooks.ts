import { useState } from "react";
import { customerTypeFilter, addressTypeList, gstCategoryList, satutoryDetailFields, addressFields, bankFields } from '../../utils/customerFormData'
import useFetchData from "../fetchData";

const useHandlekeyHooks = ({
    customerFormData,
    addressFormData,
    bankFormData,
    homeHookData,
    formRef,
    handleAddressFormSubmit,
    handleEditAddress,
    handleDeleteAddress,
    handleEditbank,
    handleDeleteBank,
    handleCustomerFormSubmit,
    handleFormBankSubmit,
    setIsAdressFormOpen,
    setIsBankFormOpen,
    setAddressFormData,
    setCustomerFormData,
    setBankFormData,
    setIsQuitModalOpen
}: any) => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentFilterList, setCurrentFilterList] = useState<any[]>([]);
    const [masterList, setMasterList] = useState<any[]>([]);
    const [currentField, setCurrentField] = useState('');

    const taxWithHoldingList = useFetchData("Tax Withholding Category");
    const bankList = useFetchData("Bank");
    const accountTypeList = useFetchData("Bank Account Type");
    const currencyList = useFetchData("Currency");

    const fetchGSTInfo = async (gstinNumber: any) => {
        const x = await window.electron.getGstinInfo({ gstin: gstinNumber || '' });
        return x;
    };

    const handleKeyDown = async (e: any, field?: any, type?: any, payload?: any) => {

        if (field === 'customer_name') {
            setAddressFormData({ ...addressFormData, ['linkName']: e.target.value })
            setBankFormData({
                ...bankFormData,
                ['party']: e.target.value,
                ['account_name']: e.target.value
            })
        }
        const focusableElements = Array.from(
            formRef.current?.querySelectorAll(
                "input, button, select, textarea, [tabindex]:not([tabindex='-1'])"
            ) || []
        ) as HTMLElement[];

        const index = focusableElements.indexOf(e.currentTarget);

        if (e.ctrlKey && e.key === "Enter") {
            if (field === 'add_address_btn') {
                setIsAdressFormOpen(true)

            }
            if (field === 'save_address_btn') {
                handleAddressFormSubmit()
            }
            if (field === 'edit_address_btn') {
                handleEditAddress(payload)
            }
            if (field === 'delete_address_btn') {
                handleDeleteAddress(payload)
            }
            if (field === 'add_bank_btn') {
                setIsBankFormOpen(true)
            }
            if (field === 'save_bank_btn') {
                handleFormBankSubmit()
            }
            if (field === 'edit_bank_btn') {
                handleEditbank(payload)
            }
            if (field === 'delete_bank_btn') {
                handleDeleteBank(payload)
            }
        } else if (e.key === 'Enter' && !showFilter) {
            e.preventDefault();

            // for fetching data based on gstin number and filling data in form 


            if (field === "address_gstin" && type === 'address') {
                const gstData = await fetchGSTInfo(addressFormData?.address_gstin || '');

                if (gstData.message && Object.keys(gstData.message)?.length > 0) {

                    const { gst_category, permanent_address } = gstData.message

                    const updatedAddressFormData = {
                        addressLine1: permanent_address?.address_line1,
                        addressLine2: permanent_address?.address_line2,
                        gstCategory: gst_category,
                        postalCode: permanent_address?.pincode,
                        city: permanent_address?.city,
                        state: permanent_address?.state,
                        country: permanent_address?.country

                    }

                    setAddressFormData({
                        ...addressFormData, ...updatedAddressFormData
                    })
                }

            }

            if (e.shiftKey) {
                // Shift + Enter: Move focus backward
                if (index > 0) {
                    focusableElements[index - 1].focus();
                }
            } else {
                // Enter: Move focus forward
                if (index < focusableElements.length - 1) {
                    focusableElements[index + 1].focus();
                }
            }

        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setCurrentField(field);

            const newIndex = e.key === 'ArrowDown'
                ? (selectedIndex + 1) % currentFilterList?.length
                : (selectedIndex - 1 + currentFilterList?.length) % currentFilterList?.length;
            setSelectedIndex(newIndex);

        } else if (e.key === 'Enter' && showFilter) {
            e.preventDefault();
            if (type === 'customer') {
                setCustomerFormData({ ...customerFormData, [currentField]: currentFilterList[selectedIndex]?.name ? currentFilterList[selectedIndex]?.name : currentFilterList[selectedIndex] })

            } else if (type === 'address') {
                setAddressFormData({ ...addressFormData, [currentField]: currentFilterList[selectedIndex]?.name ? currentFilterList[selectedIndex]?.name : currentFilterList[selectedIndex] })
            } else if (type === 'bank') {
                setBankFormData({ ...bankFormData, [currentField]: currentFilterList[selectedIndex]?.name ? currentFilterList[selectedIndex]?.name : currentFilterList[selectedIndex] })
            }
            setShowFilter(false);
            setSelectedIndex(0);
        } else if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            handleCustomerFormSubmit();
        } else if (e.key === "Escape" && showFilter) {
            setShowFilter(false)
        } else if (e.key === "Escape") {
            setIsQuitModalOpen(true)
            // homeHookData?.setShowCustomerForm(false)
        }

    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name: field } = e.target
        setShowFilter(false);
        if (field === 'customer_type' || field === 'tax_withholding_category' || field === 'gst_category' || field === 'gstCategory' || field === 'addressType' || field === 'bank' || field === 'account_type' || field === 'default_currency') {
            setShowFilter(true);
            setCurrentField(field);
            setSelectedIndex(0)
        }

        if (field === 'customer_type') {
            setCurrentFilterList(customerTypeFilter);
            setMasterList(customerTypeFilter)
        } else if (field === 'default_currency') {
            setCurrentFilterList(currencyList);
            setMasterList(currencyList)
        } else if (field === 'tax_withholding_category') {
            setCurrentFilterList(taxWithHoldingList);
            setMasterList(taxWithHoldingList)
        } else if (field === 'gst_category' || field === 'gstCategory') {
            setCurrentFilterList(gstCategoryList);
            setMasterList(gstCategoryList)
        } else if (field === 'addressType') {
            setCurrentFilterList(addressTypeList);
            setMasterList(addressTypeList)
        } else if (field === 'bank') {
            setCurrentFilterList(bankList);
            setMasterList(bankList)
        }
        else if (field === 'account_type') {
            setCurrentFilterList(accountTypeList);
            setCurrentFilterList(accountTypeList);
        }
    };


    const handleFilter = (value: string, isFilterList?: any) => {
        if (isFilterList) {
            if (value.trim() === "") {
                // If input is empty, reset to master list
                setCurrentFilterList(masterList);
            } else {
                setCurrentFilterList(
                    masterList.filter((data) =>
                        data.name.toLowerCase().includes(value.toLowerCase())
                    )
                );
            }
        }
    };

    const handleInputChange = (e: any, type: any, isFilterList?: any) => {
        const { name, value } = e.target;
        handleFilter(value, isFilterList)
        if (type === 'customer') {
            setCustomerFormData((prevData: any) => ({
                ...prevData,
                [name]: value
            }));

        }
        if (type === 'address') {
            setAddressFormData({ ...addressFormData, [name]: value });

        }

        if (type === 'bank') {
            setBankFormData({ ...bankFormData, [name]: value });

        }
    };

    return {
        showFilter,
        selectedIndex,
        currentFilterList,
        handleKeyDown,
        handleInputFocus,
        setShowFilter,
        setSelectedIndex,
        setCurrentFilterList,
        setCurrentField,
        handleInputChange
    };
}

export default useHandlekeyHooks;