import { useEffect, useRef } from "react";

const useSupplierHooks = ({
    isQuitModalOpen,
    isAdressFormOpen,
    isBankFormOpen,
    supplierFormData,
    storedAddressList,
    storedBankList,
    setSupplierFormData,

}: any) => {
    const inputRefs = useRef<any>(null);
    const addMoreAddressButtonRef = useRef<any>(null);
    const addMoreBankButtonRef = useRef<any>(null);
    const firstAddressFormInputRef = useRef<any>(null);
    const firstBankFormInputRef = useRef<any>(null);

    useEffect(() => {
        // Move focus to first field of address form
        if (isAdressFormOpen && firstAddressFormInputRef.current) {
            firstAddressFormInputRef.current.focus();
        }
        // Move focus to "Add more" button when "Save" is hidden
        if (!isAdressFormOpen && addMoreAddressButtonRef.current) {
            addMoreAddressButtonRef.current.focus();
        }
    }, [isAdressFormOpen, storedAddressList]);

    useEffect(() => {
        // Move focus to first field of bank form

        if (isBankFormOpen && firstBankFormInputRef.current) {
            firstBankFormInputRef.current.focus();
        }
        // Move focus to "Add more" button when "Save" is hidden
        if (!isBankFormOpen && addMoreBankButtonRef.current) {
            addMoreBankButtonRef.current.focus();
        }
    }, [isBankFormOpen, storedBankList]);

    useEffect(() => {
        if (isBankFormOpen && isAdressFormOpen && storedAddressList?.length === 0 && inputRefs.current) {
            inputRefs.current.focus();
        }

    }, [isAdressFormOpen, isBankFormOpen, isQuitModalOpen]);

    useEffect(() => {
        if (supplierFormData.gstin) {
            setSupplierFormData((prevData: any) => ({
                ...prevData,
                pan: supplierFormData.gstin.slice(2, -3)
            }));
        }

    }, [supplierFormData.gstin]);

    return {
        inputRefs,
        firstAddressFormInputRef,
        firstBankFormInputRef,
        addMoreAddressButtonRef,
        addMoreBankButtonRef,
    };
}

export default useSupplierHooks;