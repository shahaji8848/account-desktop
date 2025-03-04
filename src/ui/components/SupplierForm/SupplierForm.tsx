import React, { useEffect, useRef, useState } from 'react';
import '../CustomerForm/CustomerForm.css';
import ShowFilter from '../common/ShowFilter';
import AccountsTable from './AccountsTable';
import AddressCard from './AddressCard';
import BankCard from './BankCard';
import { satutoryDetailFields, addressFields, bankFields } from '../../utils/customerFormData'
import { InputField, SectionTitle } from './supplierFormFields';
import useSubmitHooks from '../../hooks/supplier/useSubmitHooks';
import useEditHooks from '../../hooks/supplier/useEditHooks';
import useHandlekeyHooks from '../../hooks/supplier/useHandlekeyHooks';
import useSupplierHooks from '../../hooks/supplier/useSupplierHooks';
import QuitConfirmationModal from '../Home/QuitConfirmationModal';


const SupplierForm = ({ homeHookData, globalData }: any) => {
    const formRef = useRef<any>(null);
    const [rows, setRows] = useState([]);
    const [isAdressFormOpen, setIsAdressFormOpen] = useState(true);//stay here
    const [isBankFormOpen, setIsBankFormOpen] = useState(true)
    const { isQuitModalOpen, setIsQuitModalOpen } = globalData

    const {
        handleAddressFormSubmit,
        handleFormBankSubmit,
        handleSupplierFormSubmit,
        supplierFormData,
        addressFormData,
        bankFormData,
        editingAddress,
        editingBank,
        storedAddressList,
        storedBankList,
        setSupplierFormData,
        setAddressFormData,
        setBankFormData,
        setEditingAddress,
        setEditingBank,
        setStoredAddressList,
        setStoredBankList
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
        setCurrentFilterList,
    } = useHandlekeyHooks(
        {
            supplierFormData,
            formRef,
            addressFormData,
            bankFormData,
            homeHookData,
            handleAddressFormSubmit,
            handleEditAddress,
            handleDeleteAddress,
            handleEditbank,
            handleDeleteBank,
            handleSupplierFormSubmit,
            handleFormBankSubmit,
            setIsAdressFormOpen,
            setIsBankFormOpen,
            setAddressFormData,
            setSupplierFormData,
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
    } = useSupplierHooks(
        {
            isAdressFormOpen,
            isBankFormOpen,
            supplierFormData,
            storedAddressList,
            storedBankList,
            setSupplierFormData,
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
                                        onKeyDown={(e) => handleKeyDown(e, 'supplier_name', 'supplier')}
                                        name="supplier_name"
                                        onFocus={(e) => handleInputFocus(e)}
                                        onChange={(e) => { handleInputChange(e, 'supplier',) }}
                                        value={supplierFormData?.supplier_name}
                                        style={{ height: '20px', flexBasis: '30%' }}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <label className="fst-italic" style={{ flexBasis: '10%' }}>(alias)</label>
                                    <span className='colon-span me-2'>:</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyDown={(e) => handleKeyDown(e, "alias", 'supplier')}
                                        name="alias"
                                        onFocus={(e) => handleInputFocus(e)}
                                        onChange={(e) => { handleInputChange(e, 'supplier') }}
                                        value={supplierFormData?.alias}
                                        style={{ height: '20px', flexBasis: '30%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 under border-right pt-2">
                        {["Supplier Type"].map((label, index) => (
                            <InputField
                                key={label}
                                label={label}
                                isIndented={index >= 2}
                                onKeyDown={(e: any) => handleKeyDown(e, 'supplier_type', 'supplier')}
                                name='supplier_type'
                                onFocus={(e: any) => handleInputFocus(e)}
                                onChange={(e: any) => { handleInputChange(e, 'supplier', true) }}
                                value={supplierFormData?.supplier_type}
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
                            onKeyDown={(e: any) => handleKeyDown(e, 'default_currency', 'supplier')}
                            name="default_currency"
                            onFocus={(e: any) => handleInputFocus(e)}
                            onChange={(e: any) => { handleInputChange(e, 'supplier', true) }}
                            value={supplierFormData?.default_currency}
                        />
                        <SectionTitle title="Statutory Details" marginTop='70px' />
                        {satutoryDetailFields?.map((data, index) => (
                            <InputField
                                key={index}
                                label={data?.label}
                                onKeyDown={(e: any) => handleKeyDown(e, data?.name, 'supplier')}
                                name={data?.name}
                                onFocus={(e: any) => handleInputFocus(e)}
                                onChange={(e: any) => { handleInputChange(e, 'supplier', data?.isFilterList) }}
                                // @ts-ignore
                                value={supplierFormData[data?.name]}
                            />
                        ))}

                        <InputField
                            label='PAN'
                            onKeyDown={(e: any) => handleKeyDown(e, 'pan', 'supplier')}
                            name="pan"
                            onFocus={(e: any) => handleInputFocus(e)}
                            onChange={(e: any) => { handleInputChange(e, 'supplier') }}
                            value={supplierFormData?.pan}
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
                        type='supplier_form'
                        isOpen={isQuitModalOpen}
                        setIsQuitModalOpen={setIsQuitModalOpen}
                        homeHookData={homeHookData}
                    />
                )}
            </div>

        </>
    );
};

export default SupplierForm;










