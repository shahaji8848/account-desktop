import React, { useState, useRef, useEffect } from 'react';
import ShowFilter from '../common/ShowFilter';
import { nanoid } from 'nanoid';

const addressTypeList = [
    { name: 'Billing' },
    { name: 'Shipping' },
    { name: 'Office' },
    { name: 'Personal' },
];

const gstCategoryList = [
    { name: 'Registered Regular' },
    { name: 'Registered Composition' },
    { name: 'Unregistered' },
    { name: 'SEZ' },
    { name: 'Overseas' },
    { name: 'Deemed Export' },
    { name: 'UIN Holders' },
    { name: 'Tax Deductor' },
    { name: 'Tax Collector' },
    { name: 'Input Service Distributor' },
];

const NewAddressForm = ({ setIsAdressModal, customerName, setIsBankModal, setStoredAddressList, initialData }: any) => {
    console.log("initialData", initialData)
    const [formData, setFormData] = useState({
        linkDocumentType: 'Customer',
        linkName: customerName || '',
        gstin: '',
        addressType: '',
        gstCategory: '',
        postalCode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        country: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                linkDocumentType: initialData?.links?.link_doctype || 'Customer',
                linkName: initialData?.links?.link_name || customerName,
                gstin: initialData?.gstin,
                addressType: initialData?.address_type,
                gstCategory: initialData?.gst_category,
                postalCode: initialData?.postal_code,
                city: initialData?.city,
                addressLine1: initialData?.address_line1,
                addressLine2: initialData?.address_line2,
                state: initialData?.state,
                country: initialData?.country
            });
        }
    }, [initialData]);

    const [showFilter, setShowFilter] = useState(false);
    const [currentFilterList, setCurrentFilterList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentField, setCurrentField] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleAddressFormSubmit = async () => {

        if (initialData && Object.keys(initialData)?.length > 0) {
            const addressList = {
                address_type: formData?.addressType,
                address_line1: formData?.addressLine1,
                city: formData?.city,
                state: formData?.state,
                gstin: formData?.gstin,
                gst_category: formData?.gstCategory,
                links: [
                    {
                        link_doctype: formData?.linkDocumentType,
                        link_name: formData?.linkName
                    }
                ],
                postal_code: formData?.postalCode,
                country: formData?.country
            }

            const updatedAddressList = { ...initialData, ...addressList }
            // Update existing address
            setStoredAddressList((prevList: any) =>
                prevList.map((addr: any) => addr?.id === updatedAddressList?.id ? updatedAddressList : addr)
            );
        }
        else {
            const a = {
                id: nanoid(),
                address_type: formData?.addressType,
                address_line1: formData?.addressLine1,
                city: formData?.city,
                state: formData?.state,
                gstin: formData?.gstin,
                gst_category: formData?.gstCategory,
                links: [
                    {
                        link_doctype: formData?.linkDocumentType,
                        link_name: formData?.linkName
                    }
                ],
                postal_code: formData?.postalCode,
                country: formData?.country
            }

            setStoredAddressList((previous: any) => [...previous, a]);
        }


    };

    const handleKeyDown = (e: any, field: any) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (field === "addressType" || field === "gstCategory") {
                e.preventDefault();
                setShowFilter(true);
                setCurrentField(field);

                const list: any = field === 'addressType' ? addressTypeList : gstCategoryList;
                setCurrentFilterList(list);

                const newIndex = e.key === 'ArrowDown'
                    ? (selectedIndex + 1) % list.length
                    : (selectedIndex - 1 + list.length) % list.length;
                setSelectedIndex(newIndex);
            }
        } else if (e.key === 'Enter' && showFilter) {
            e.preventDefault();
            // @ts-ignore
            setFormData({ ...formData, [currentField]: currentFilterList[selectedIndex].name });
            setShowFilter(false);
        }
        else if (e.key === "Escape") {
            setShowFilter(false);
            setIsAdressModal(false);
            setIsBankModal(false);
        }
        else if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            handleAddressFormSubmit();
        }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name: field } = e.target
        setShowFilter(false);
        if (field === "addressType" || field === "gstCategory") {
            setShowFilter(true);
            setCurrentField(field);
            setSelectedIndex(0)
        }

        if (field === "addressType" || field === "gstCategory") {
            setShowFilter(true);
            setCurrentField(field);

            const list: any = field === 'addressType' ? addressTypeList : gstCategoryList;
            setCurrentFilterList(list);
        }

    };

    const handleItemClick = (item: any) => {
        setFormData({ ...formData, [currentField]: item.name });
        setShowFilter(false);
    };


    return (
        <div className="container mt-4 p-5 " style={{ backgroundColor: 'white' }}>
            <h4>New Address</h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Link Document Type</label>
                    <input type="text" className="form-control" name="linkDocumentType" value={formData.linkDocumentType} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'linkDocumentType')} onFocus={handleInputFocus} />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Link Name</label>
                    <input type="text" className="form-control" name="linkName" value={formData.linkName} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'linkName')} onFocus={handleInputFocus} />
                </div>
            </div>

            <div className="mb-3">
                <label>GSTIN / UIN</label>
                <input type="text" className="form-control" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="Autofill party information by entering their GSTIN" onKeyDown={(e) => handleKeyDown(e, 'gstin')} onFocus={handleInputFocus} />
            </div>

            <div className="mb-3">
                <label>Address Type *</label>
                <input type="text" className="form-control" name="addressType" value={formData.addressType} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'addressType')} onFocus={handleInputFocus} />
            </div>

            <div className="mb-3">
                <label>GST Category *</label>
                <input type="text" className="form-control" name="gstCategory" value={formData.gstCategory} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'gstCategory')} onFocus={handleInputFocus} />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Postal Code *</label>
                    <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'postalCode')} onFocus={handleInputFocus} />
                </div>
                <div className="col-md-6 mb-3">
                    <label>City/Town *</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'city')} onFocus={handleInputFocus} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Address Line 1 *</label>
                    <input type="text" className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'addressLine1')} onFocus={handleInputFocus} />
                </div>
                <div className="col-md-6 mb-3">
                    <label>State/Province *</label>
                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'state')} onFocus={handleInputFocus} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Address Line 2</label>
                    <input type="text" className="form-control" name="addressLine2" value={formData.addressLine2} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'addressLine2')} onFocus={handleInputFocus} />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Country *</label>
                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 'country')} onFocus={handleInputFocus} />
                </div>
            </div>



            {showFilter && (
                <ShowFilter
                    filteredItems={currentFilterList}
                    selectedIndex={selectedIndex}
                    handleClick={handleItemClick}
                    handleItemFocus={(index: any) => setSelectedIndex(index)}
                />
            )}
            {/* </form> */}
        </div>
    );
};

export default NewAddressForm;
