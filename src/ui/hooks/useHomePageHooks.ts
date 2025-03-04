import React, { useState } from "react";

function useHomePageHooks() {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showSalesRegister, setShowSalesRegister] = useState(false);
  const [showVoucherRegister, setShowVoucherRegister] = useState(false);
  const [showCreditNoteRegister, setShowCreditNoteRegister] = useState(false);
  const [showCreditNoteVoucherRegister, setShowCreditNoteVoucherRegister] = useState(false);
  const [moreReportList, setMoreReportList] = useState(false);
  const [accountBooksList, setAccountBooksList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [voucherRegisterMonthDate, setVoucherRegisterMonthDate] = useState({
    start_date:'',
    end_date:''
  });
  

  const dataRef: any = '';
  const openCompanyDropdown: any = ''

  const handlekeyfunctions = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
      setSelectedIndex(0)

    }
  };
  return {
    dataRef,
    openCompanyDropdown,
    handlekeyfunctions,
    isModalOpen,
    setIsModalOpen,
    showCustomerForm,
    setShowCustomerForm,
    showSupplierForm,
    setShowSupplierForm,
    setSelectedIndex,
    selectedIndex,
    showSalesRegister,
    setShowSalesRegister,
    showVoucherRegister,
    setShowVoucherRegister,
    moreReportList,
    setMoreReportList,
    accountBooksList,
    setAccountBooksList,
    voucherRegisterMonthDate,
    setVoucherRegisterMonthDate,
    showCreditNoteRegister,
    setShowCreditNoteRegister,
    showCreditNoteVoucherRegister,
    setShowCreditNoteVoucherRegister

  };
}

export default useHomePageHooks;
