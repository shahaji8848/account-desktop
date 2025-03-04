import { useState } from "react";

const useEditHooks = ({
    setEditingAddress,
    setAddressFormData,
    setBankFormData,
    storedAddressList,
    storedBankList,
    setIsAdressFormOpen,
    setIsBankFormOpen,
    setEditingBank,
    setStoredAddressList,
    setStoredBankList
}: any) => {
    // for address form 
    const handleEditAddress = (address: any) => {
        setEditingAddress(address);
        setAddressFormData({
            linkDocumentType: address?.links[0]?.link_doctype || 'Customer',
            linkName: address?.links[0]?.link_name,
            address_gstin: address?.gstin,
            addressType: address?.address_type,
            gstCategory: address?.gst_category,
            postalCode: address?.pincode,
            city: address?.city,
            addressLine1: address?.address_line1,
            addressLine2: address?.address_line2,
            state: address?.state,
            country: address?.country
        });
        setIsAdressFormOpen(true)
    };

    const handleDeleteAddress = (address: any) => {
        const updatedStoredAddress = storedAddressList.filter(
            (addressData: any) => addressData?.id !== address?.id
        );
        setStoredAddressList(updatedStoredAddress);
    };


    // for bank form 
    const handleEditbank = (bank: any) => {
        setEditingBank(bank);
        setBankFormData({
            account_name: bank?.account_name,
            bank: bank?.bank,
            account_type: bank?.account_type,
            party_type: bank?.party_type,
            party: bank?.party,
            branch_code: bank?.branch_code,
            bank_account_no: bank?.bank_account_no,
        });
        setIsBankFormOpen(true);
    };

    const handleDeleteBank = (bank: any) => {
        const updatedStoredBankList = storedBankList.filter(
            (bankData: any) => bankData?.id !== bank?.id
        );
        setStoredBankList(updatedStoredBankList);
    };

    return {
        handleEditAddress,
        handleDeleteAddress,
        handleEditbank,
        handleDeleteBank
    }
}

export default useEditHooks;