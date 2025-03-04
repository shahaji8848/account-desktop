import React, { useEffect, useRef, useState } from 'react';
import './CustomerForm.css';
import ShowFilter from '../common/ShowFilter';
import AccountsTable from './AccountsTable';
import AddressCard from './AddressCard';
import BankCard from './BankCard';
import { satutoryDetailFields, addressFields, bankFields } from '../../utils/customerFormData'
import { InputField, SectionTitle } from './customerFormFields';
import useSubmitHooks from '../../hooks/customer/useSubmitHooks';
import useEditHooks from '../../hooks/customer/useEditHooks';
import useHandlekeyHooks from '../../hooks/customer/useHandlekeyHooks';
import useCustomerHooks from '../../hooks/customer/useCustomerHooks';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';


const CustomerForm = ({ homeHookData, globalData }: any) => {
    const formRef = useRef<any>(null);
    const [rows, setRows] = useState([]);
    const [isAdressFormOpen, setIsAdressFormOpen] = useState(true);//stay here
    const [isBankFormOpen, setIsBankFormOpen] = useState(true)

    const { isQuitModalOpen, setIsQuitModalOpen } = globalData


    const {
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
        setCustomerFormData,
        setAddressFormData,
        setBankFormData,
        setEditingAddress,
        setEditingBank,
        setStoredAddressList,
        setStoredBankList,
    } = useSubmitHooks({ setIsAdressFormOpen, setIsBankFormOpen, rows, setRows })

    const { handleEditAddress, handleEditbank, handleDeleteAddress, handleDeleteBank } = useEditHooks(
        {
            storedAddressList,
            storedBankList,
            setEditingAddress,
            setEditingBank,
            setAddressFormData,
            setBankFormData,
            setIsAdressFormOpen,
            setIsBankFormOpen,
            setStoredAddressList,
            setStoredBankList
        })

    const {
        showFilter,
        selectedIndex,
        currentFilterList,
        handleKeyDown,
        handleInputFocus,
        handleInputChange,
        setShowFilter,
        setSelectedIndex,
        setCurrentFilterList
    } = useHandlekeyHooks(
        {
            customerFormData,
            formRef,
            addressFormData,
            bankFormData,
            homeHookData,
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
        }
    );

    const {
        inputRefs,
        firstAddressFormInputRef,
        firstBankFormInputRef,
        addMoreAddressButtonRef,
        addMoreBankButtonRef
    } = useCustomerHooks(
        {
            isAdressFormOpen,
            isBankFormOpen,
            customerFormData,
            storedAddressList,
            storedBankList,
            setCustomerFormData,
            isQuitModalOpen
        }
    )

    return (
        <>
            <div className="container formContainer">
                <div className="row w-100 h-100 m-0" ref={formRef}>
                    <div className="col-md-12 border-bottom">
                        <div className="row h-100">
                            <div className="col-12 pt-2">
                                <div className="d-flex align-items-center">
                                    <label className="fw-bold" style={{ flexBasis: '10%' }}>Name</label>
                                    <span className='colon-span me-2'>:</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        ref={(el) => el && (inputRefs.current = el)}
                                        onKeyDown={(e) => handleKeyDown(e, 'customer_name', 'customer')}
                                        name="customer_name"
                                        onFocus={(e) => handleInputFocus(e)}
                                        onChange={(e) => { handleInputChange(e, 'customer',) }}
                                        value={customerFormData?.customer_name}
                                        style={{ height: '20px', flexBasis: '30%' }}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <label className="fst-italic" style={{ flexBasis: '10%' }}>(alias)</label>
                                    <span className='colon-span me-2'>:</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyDown={(e) => handleKeyDown(e, "alias", 'customer')}
                                        name="alias"
                                        onFocus={(e) => handleInputFocus(e)}
                                        onChange={(e) => { handleInputChange(e, 'customer') }}
                                        value={customerFormData?.alias}
                                        style={{ height: '20px', flexBasis: '30%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 under border-right pt-2">
                        {["Customer Type"].map((label, index) => (
                            <InputField
                                key={label}
                                label={label}
                                isIndented={index >= 2}
                                onKeyDown={(e: any) => handleKeyDown(e, 'customer_type', 'customer')}
                                name='customer_type'
                                onFocus={(e: any) => handleInputFocus(e)}
                                onChange={(e: any) => { handleInputChange(e, 'customer', true) }}
                                value={customerFormData?.customer_type}
                            />
                        ))}

                        <SectionTitle title="Default Accounts" marginTop='70px' />
                        <AccountsTable
                            setShowFilter={setShowFilter}
                            showFilter={showFilter}
                            setCurrentFilterList={setCurrentFilterList}
                            currentFilterList={currentFilterList}
                            setSelectedIndex={setSelectedIndex}
                            selectedIndex={selectedIndex}
                            setRows={setRows}
                            rows={rows}
                            formRef={formRef}
                        />

                        <InputField
                            label='Billing Currency'
                            onKeyDown={(e: any) => handleKeyDown(e, 'default_currency', 'customer')}
                            name="default_currency"
                            onFocus={(e: any) => handleInputFocus(e)}
                            onChange={(e: any) => { handleInputChange(e, 'customer', true) }}
                            value={customerFormData?.default_currency}
                        />

                        <SectionTitle title="Statutory Details" marginTop='70px' />
                        {satutoryDetailFields?.map((data, index) => (
                            <InputField
                                key={index}
                                label={data?.label}
                                onKeyDown={(e: any) => handleKeyDown(e, data?.name, 'customer')}
                                name={data?.name}
                                onFocus={(e: any) => handleInputFocus(e)}
                                onChange={(e: any) => { handleInputChange(e, 'customer', data?.isFilterList) }}
                                // @ts-ignore
                                value={customerFormData[data?.name]}
                            />
                        ))}

                        <InputField
                            label='PAN'
                            onKeyDown={(e: any) => handleKeyDown(e, 'pan', 'customer')}
                            name="pan"
                            onFocus={(e: any) => handleInputFocus(e)}
                            onChange={(e: any) => { handleInputChange(e, 'customer') }}
                            value={customerFormData?.pan}
                        />
                    </div>

                    <div className="col-md-6 padding-bottom">
                        <SectionTitle title="Mailing Details" marginTop='10px' />
                        {storedAddressList?.length > 0 && storedAddressList?.map((data, index) => (
                            <AddressCard
                                data={data}
                                handleEditAddress={handleEditAddress}
                                handleKeyDown={handleKeyDown}
                                handleDeleteAddress={handleDeleteAddress}
                            />
                        ))}
                        {isAdressFormOpen && addressFields?.map((data, index) => (
                            <InputField
                                key={index}
                                type='address'
                                firstAddressFormInputRef={firstAddressFormInputRef}
                                label={data?.label}
                                name={data?.name}
                                onChange={(e: any) => { handleInputChange(e, 'address', data?.isFilterList) }}
                                onKeyDown={(e: any) => handleKeyDown(e, data?.name, 'address')}
                                onFocus={(e: any) => handleInputFocus(e)}
                                // @ts-ignore
                                value={addressFormData[data?.name]}
                            />
                        ))}

                        {/* address btn  */}

                        <div className='d-flex gap-3'>

                            {isAdressFormOpen &&
                                <button
                                    className='bg-transparent'
                                    style={{
                                        marginTop: "20px",
                                        border: '1px solid black'
                                    }}
                                    onClick={handleAddressFormSubmit}
                                    onKeyDown={(e: any) => handleKeyDown(e, 'save_address_btn', 'address')}
                                >
                                    Save
                                </button>}

                            {(editingAddress && Object.keys(editingAddress)?.length === 0) &&
                                <button
                                    className='bg-transparent'
                                    style={{ marginTop: "20px", border: '1px solid black' }}
                                    onClick={() => setIsAdressFormOpen(true)}
                                    onKeyDown={(e: any) => handleKeyDown(e, 'add_address_btn', 'address')}
                                    ref={addMoreAddressButtonRef}

                                >
                                    Add More
                                </button>}

                        </div>


                        <SectionTitle title="Banking Details" marginTop="20px" />
                        {storedBankList?.map((data, index) => (
                            <BankCard
                                data={data}
                                handleEditbank={handleEditbank}
                                handleKeyDown={handleKeyDown}
                                handleDeleteBank={handleDeleteBank}
                            />
                        ))}
                        {isBankFormOpen && bankFields?.map((data, index) => (
                            <InputField
                                key={index}
                                type='bank'
                                firstBankFormInputRef={firstBankFormInputRef}
                                label={data?.label}
                                name={data?.name}
                                onChange={(e: any) => { handleInputChange(e, 'bank', data?.isFilterList) }}
                                onKeyDown={(e: any) => handleKeyDown(e, data?.name, 'bank')}
                                onFocus={(e: any) => handleInputFocus(e)}
                                // @ts-ignore
                                value={bankFormData[data?.name]}
                            />
                        ))}
                        {/* bank button  */}
                        <div className='d-flex gap-3'>

                            {isBankFormOpen && <button
                                className='bg-transparent'
                                style={{ marginTop: "20px", border: '1px solid black' }}
                                onClick={handleFormBankSubmit}
                                onKeyDown={(e: any) => handleKeyDown(e, 'save_bank_btn', 'bank')}
                            >
                                Save
                            </button>}

                            {(editingBank && Object.keys(editingBank)?.length === 0) &&
                                <button
                                    className='bg-transparent'
                                    style={{ marginTop: "20px", border: '1px solid black' }}
                                    onClick={() => setIsBankFormOpen(true)}
                                    onKeyDown={(e: any) => handleKeyDown(e, 'add_bank_btn', 'bank')}
                                    ref={addMoreBankButtonRef}
                                >
                                    Add More
                                </button>}

                        </div>

                    </div>
                </div>
                {showFilter && (
                    <ShowFilter
                        filteredItems={currentFilterList}
                        selectedIndex={selectedIndex}
                        handleItemFocus={(index: number) => setSelectedIndex(index)}
                    />
                )}

                {isQuitModalOpen && (
                    <QuitConfirmationModal
                        type='customer_form'
                        isOpen={isQuitModalOpen}
                        setIsQuitModalOpen={setIsQuitModalOpen}
                        homeHookData={homeHookData}
                    />
                )}
            </div>

        </>
    );
};

export default CustomerForm;










