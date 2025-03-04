// // @ts-nocheck
// import { useEffect, useRef, useState } from 'react';
// import './CustomerForm.css';
// import { toast } from 'react-toastify';

// const InputField = ({ label, isIndented = false, inputRef, onKeyDown, onChange, value }: { label: string; isIndented?: boolean; inputRef?: any; onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void }) => (
//     <div className="row d-flex">
//         <label className={isIndented ? "label-indent ms-4" : "label-width"}>{label}</label>
//         <span className="colon-span">:</span>
//         <input type="text" className="form-control input-width" ref={inputRef} onKeyDown={onKeyDown} onChange={onChange} value={value} />
//     </div>
// );

// const SectionTitle = ({ title, marginTop }: any) => (
//     <div className="row" style={{ marginTop }}>
//         <label className="section-title">{title}</label>
//     </div>
// );

// const CustomerForm = () => {
//     const inputRefs = useRef<HTMLInputElement[]>([]);
//     const [customerFormData, setCustomerFormData] = useState({});

//     useEffect(() => {
//         // Focus on the first input field when the component mounts
//         if (inputRefs.current.length > 0 && inputRefs.current[0]) {
//             inputRefs.current[0].focus();
//         }
//     }, []);

//     const handleInputChange = (e: any, key: any) => {
//         setCustomerFormData(prev => ({ ...prev, [key]: e.target.value }));
//     };

//     console.log("customerFormData", customerFormData)
//     const handleCustomerFormSubmit = async (customerFormData: any) => {
//         console.log("customerFormData>", customerFormData)
//         return
//         try {
//             const x = await window.electron.postData({
//                 customerFormData
//             });
//             console.log(JSON.stringify(customerFormData));
//             if (x !== undefined) {
//                 toast.success('Form is submitted!', {
//                     autoClose: 2000,
//                     className: 'custom-toast',
//                 });


//             } else {
//                 toast.error('Something went wrong. Please Re-enter all the data!', {
//                     autoClose: 2000,
//                     className: 'custom-toast',
//                 });
//             }
//         } catch (error) {
//             console.error('Error fetching taxes or saving form:', error);
//         }
//     };



//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         if (e.key === 'Tab') {
//             e.preventDefault();
//             const nextIndex = (index + 1) % inputRefs.current.length; // Loop back to first field when last field is reached
//             if (inputRefs.current[nextIndex]) {
//                 inputRefs.current[nextIndex].focus();
//             }
//         } else if (e.ctrlKey && e.key === 'a') {
//             e.preventDefault();
//             handleCustomerFormSubmit(customerFormData);
//         }
//     };

//     const customerFormFields = [
//         {
//             label: 'Name',
//             name: 'customer_name'
//         },
//         {
//             label: 'alias',
//             name: 'alias'
//         },
//         {
//             label: 'Under',
//             name: 'under'
//         },
//         {
//             label: 'Maintain balances bill-by-bill',
//             name: 'maintain_balances_bill'
//         },
//         {
//             label: 'Default credit period',
//             name: 'default_credit_period'
//         },
//         {
//             label: 'Check for credit days during voucher entry',
//             name: 'credit_days_during_voucher_entry'
//         },
//         {
//             label: 'aliaIs TDS Deductibles',
//             name: 'is_tds_deductible'
//         },
//         {
//             label: 'aliaIs TDS Deductibles',
//             name: 'is_tds_deductible'
//         },
//         {
//             label: 'Name',
//             name: 'mailing_name'
//         },
//         {
//             label: 'Address',
//             name: 'mailing_address'
//         },
//         {
//             label: 'State',
//             name: 'mailing_state'
//         },
//         {
//             label: 'Country',
//             name: 'mailing_country'
//         },
//         {
//             label: 'Pincode',
//             name: 'mailing_pincode'
//         },
//         {
//             label: 'Provided Bank Details',
//             name: 'bank_details'
//         },
//         {
//             label: 'PAN/IT No.',
//             name: 'pan'
//         },
//         {
//             label: ' Registration Type',
//             name: 'gst_category'
//         },
//         {
//             label: 'GSTIN/UIN',
//             name: 'gstin'
//         },
//         {
//             label: 'Set/After additional GST details',
//             name: 'additional_gst_details'
//         },
//     ]
//     return (
//         <div className="container formContainer" onKeyDown={handleKeyDown}>
//             <div className="row full-width">
//                 {/* First Row */}
//                 <div className="col-md-12 border-bottom">
//                     <div className="row row-height">
//                         <div className="col-md-9 pt-2">
//                             <div className="d-flex align-items-center">
//                                 <label className="fw-bold" style={{ flexBasis: '20%' }}>Name</label>
//                                 <span className='colon-span'>:</span>
//                                 <input
//                                     type="text"
//                                     className="form-control input-width"
//                                     ref={(el) => el && (inputRefs.current[0] = el)}
//                                     onKeyDown={(e: any) => handleKeyDown(e, 0)}
//                                     onChange={(e) => handleInputChange(e, "customer_name".toLowerCase())}
//                                     value={customerFormData["customer_name".toLowerCase()] || ""}
//                                 />
//                             </div>
//                             <div className="d-flex align-items-center">
//                                 <label className="fst-italic" style={{ flexBasis: '20%' }}>(alias)</label>
//                                 <span className='colon-span'>:</span>
//                                 <input
//                                     type="text"
//                                     className="form-control input-width"
//                                     ref={(el) => el && (inputRefs.current[1] = el)}
//                                     onKeyDown={(e: any) => handleKeyDown(e, 1)}
//                                     onChange={(e) => handleInputChange(e, "alias".toLowerCase())}
//                                     value={customerFormData["alias".toLowerCase()] || ""}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-md-3 border-left">
//                             <p className="fw-bold">Top Opening Balance</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Left Column */}
//                 <div className="col-md-6 under border-right pt-2">
//                     {["Under", "Maintain balances bill-by-bill", "Default credit period", "Check for credit days during voucher entry"].map((label, index) => (
//                         <InputField
//                             key={label}
//                             label={label}
//                             isIndented={index >= 2}
//                             inputRef={(el) => el && (inputRefs.current[index + 2] = el)}
//                             onKeyDown={(e) => handleKeyDown(e, index + 2)}
//                             onChange={(e) => handleInputChange(e, label.toLowerCase())}
//                             value={customerFormData[label.toLowerCase()] || ""}
//                         />
//                     ))}
//                     <SectionTitle title="Statutory Details" marginTop='70px' />
//                     <InputField
//                         label="Is TDS Deductible"
//                         inputRef={(el: any) => el && (inputRefs.current[6] = el)}
//                         inputRef={(el) => el && (inputRefs.current[6] = el)}
//                         onKeyDown={(e) => handleKeyDown(e, 6)}
//                         onChange={(e) => handleInputChange(e, "Is TDS Deductible".toLowerCase())}
//                         value={customerFormData["Is TDS Deductible".toLowerCase()] || ""}
//                     />
//                 </div>

//                 {/* Right Column */}
//                 <div className="col-md-6 padding-bottom">
//                     <SectionTitle title="Mailing Details" marginTop='10px' />
//                     {["Name", "Address"].map((label, index) => (
//                         <InputField
//                             key={label}
//                             label={label}
//                             inputRef={(el) => el && (inputRefs.current[index + 7] = el)}
//                             onKeyDown={(e) => handleKeyDown(e, index + 7)}
//                             onChange={(e) => handleInputChange(e, label.toLowerCase())}
//                             value={customerFormData[label.toLowerCase()] || ""}
//                         />
//                     ))}
//                     <div className='mt-5'>
//                         {["State", "Country", "Pincode"].map((label, index) => (
//                             <InputField
//                                 key={label}
//                                 label={label}
//                                 inputRef={(el: any) => el && (inputRefs.current[index + 9] = el)}
//                                 onKeyDown={(e) => handleKeyDown(e, index + 9)}
//                                 onChange={(e) => handleInputChange(e, label.toLowerCase())}
//                                 value={customerFormData[label.toLowerCase()] || ""}
//                             />
//                         ))}
//                     </div>

//                     <SectionTitle title="Banking Details" marginTop="20px" />
//                     <InputField
//                         label="Provided Bank Details"
//                         inputRef={(el: any) => el && (inputRefs.current[12] = el)}
//                         onKeyDown={(e) => handleKeyDown(e, 12)}
//                         onChange={(e) => handleInputChange(e, "Banking Details".toLowerCase())}
//                         value={customerFormData["Banking Details".toLowerCase()] || ""}
//                     />

//                     <SectionTitle title="Tax Registration Details" marginTop='20px' />
//                     <InputField
//                         label="PANIT No"
//                         inputRef={(el: any) => el && (inputRefs.current[13] = el)}
//                         onKeyDown={(e) => handleKeyDown(e, 13)}
//                         onChange={(e) => handleInputChange(e, "pan".toLowerCase())}
//                         value={customerFormData["pan".toLowerCase()] || ""}
//                     />

//                     <div className="under mt-5">
//                         {["Registration Type", "GSTINUN", "Set/After additional GST details"].map((label, index) => (
//                             <InputField
//                                 key={label}
//                                 label={label}
//                                 isIndented={index > 0}
//                                 inputRef={(el: any) => el && (inputRefs.current[index + 14] = el)}
//                                 onKeyDown={(e) => handleKeyDown(e, index + 14)}
//                                 onChange={(e) => handleInputChange(e, label.toLowerCase())}
//                                 value={customerFormData[label.toLowerCase()] || ""}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <hr className="no-margin" />

//             {/* Opening Balance */}
//             <div className="mb-3 row text-center">
//                 <label className="col-form-label">Opening Balance (on 1-Apr-24)</label>
//             </div>
//         </div>
//     );
// };

// export default CustomerForm;










// // import React, { useEffect, useRef, useState } from 'react';
// // import './CustomerForm.css';
// // import ShowFilter from '../common/ShowFilter';

// // const InputField = ({ label, isIndented = false, inputRef, onKeyDown }: { label: string; isIndented?: boolean; inputRef?: any; onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void }) => (
// //     <div className="row d-flex">
// //         <label className={isIndented ? "label-indent ms-4" : "label-width"}>{label}</label>
// //         <span className="colon-span">:</span>
// //         <input type="text" className="form-control input-width" ref={inputRef} onKeyDown={onKeyDown} />
// //     </div>
// // );

// // const SectionTitle = ({ title, marginTop }: any) => (
// //     <div className="row" style={{ marginTop }}>
// //         <label className="section-title">{title}</label>
// //     </div>
// // );

// // const SectionBtn = ({ title, marginTop }: any) => (
// //     <div className="row" style={{ marginTop }}>
// //         <label className="">{title}</label>
// //     </div>
// // );

// // const CustomerForm = () => {
// //     const inputRefs = useRef<HTMLInputElement[]>([]);
// //     const [showFilter, setShowFilter] = useState(false);
// //     const [selectedIndex, setSelectedIndex] = useState(0);
// //     const customerTypeFilter = ['Company', 'Individual', 'Partnership'];
// //     const Tax_withHolding_Category = ["tax1",'tax2','tax3']

// //     useEffect(() => {
// //         // Focus on the first input field when the component mounts
// //         if (inputRefs.current.length > 0 && inputRefs.current[0]) {
// //             inputRefs.current[0].focus();
// //         }
// //     }, []);

// //     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
// //         if (e.key === 'Tab') {
// //             e.preventDefault();
// //             const nextIndex = (index + 1) % inputRefs.current.length; // Loop back to first field when last field is reached
// //             if (inputRefs.current[nextIndex]) {
// //                 inputRefs.current[nextIndex].focus();
// //             }
// //         } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
// //             e.preventDefault();
// //             setShowFilter(true);
// //             const newIndex = e.key === 'ArrowDown' 
// //                 ? (selectedIndex + 1) % customerTypeFilter.length 
// //                 : (selectedIndex - 1 + customerTypeFilter.length) % customerTypeFilter.length;
// //             setSelectedIndex(newIndex);
// //         } else if (e.key === 'Enter' && showFilter) {
// //             e.preventDefault();
// //             inputRefs.current[index].value = customerTypeFilter[selectedIndex];
// //             setShowFilter(false);
// //         }
// //     };

// //     const handleItemClick = (item: string) => {
// //         inputRefs.current[2].value = item;
// //         setShowFilter(false);
// //     };

// //     return (
// //         <div className="container formContainer">
// //             <div className="row full-width">
// //                 {/* First Row */}
// //                 <div className="col-md-12 border-bottom">
// //                     <div className="row row-height">
// //                         <div className="col-md-9 pt-2">
// //                             <div className="d-flex align-items-center">
// //                                 <label className="fw-bold" style={{ flexBasis: '20%' }}>Name</label>
// //                                 <span className='colon-span'>:</span>
// //                                 <input
// //                                     type="text"
// //                                     className="form-control input-width"
// //                                     ref={(el) => el && (inputRefs.current[0] = el)}
// //                                     onKeyDown={(e) => handleKeyDown(e, 0)}
// //                                 />
// //                             </div>
// //                             <div className="d-flex align-items-center">
// //                                 <label className="fst-italic" style={{ flexBasis: '20%' }}>(alias)</label>
// //                                 <span className='colon-span'>:</span>
// //                                 <input
// //                                     type="text"
// //                                     className="form-control input-width"
// //                                     ref={(el) => el && (inputRefs.current[1] = el)}
// //                                     onKeyDown={(e) => handleKeyDown(e, 1)}
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="col-md-3 border-left">
// //                             <p className="fw-bold">Top Opening Balance</p>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Left Column */}
// //                 <div className="col-md-6 under border-right pt-2">
// //                     {["Customer Type"].map((label, index) => (
// //                         <InputField
// //                             key={label}
// //                             label={label}
// //                             isIndented={index >= 2}
// //                             inputRef={(el: any) => el && (inputRefs.current[index + 2] = el)}
// //                             onKeyDown={(e) => handleKeyDown(e, index + 2)}
// //                         />
// //                     ))}
// //                     <SectionTitle title="Statutory Details" marginTop='70px' />
// //                     {["Tax WithHolding Category", 'GSTIN', 'GST Category', 'PAN'].map((label, index) => (
// //                         <InputField
// //                             key={label}
// //                             label={label}
// //                             inputRef={(el: any) => el && (inputRefs.current[index + 4] = el)}
// //                             onKeyDown={(e) => handleKeyDown(e, index + 2)}
// //                         />
// //                     ))}
// //                 </div>

// //                 {/* Right Column */}
// //                 <div className="col-md-6 padding-bottom">
// //                     <SectionTitle title="Mailing Details" marginTop='10px' />
// //                     <SectionBtn title="Add Address" marginTop="20px" />

// //                     <SectionTitle title="Banking Details" marginTop="20px" />
// //                     <SectionBtn title="Add Bank Account" marginTop="20px" />

// //                 </div>
// //             </div>

// //             <hr className="no-margin" />

// //             {/* Opening Balance */}
// //             <div className="mb-3 row text-center">
// //                 <label className="col-form-label">Opening Balance (on 1-Apr-24)</label>
// //             </div>

// //             {showFilter && (
// //                 <ShowFilter
// //                     filteredItems={customerTypeFilter}
// //                     selectedIndex={selectedIndex}
// //                     handleClick={handleItemClick}
// //                     handleItemFocus={(index: number) => setSelectedIndex(index)}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default CustomerForm;






// // working code 

// // import React, { useEffect, useRef, useState } from 'react';
// // import './CustomerForm.css';
// // import ShowFilter from '../common/ShowFilter';

// // const InputField = ({ label, isIndented = false, inputRef, onKeyDown }: { label: string; isIndented?: boolean; inputRef?: any; onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void }) => (
// //     <div className="row d-flex">
// //         <label className={isIndented ? "label-indent ms-4" : "label-width"}>{label}</label>
// //         <span className="colon-span">:</span>
// //         <input type="text" className="form-control input-width" ref={inputRef} onKeyDown={onKeyDown} />
// //     </div>
// // );

// // const SectionTitle = ({ title, marginTop }: any) => (
// //     <div className="row" style={{ marginTop }}>
// //         <label className="section-title">{title}</label>
// //     </div>
// // );

// // const SectionBtn = ({ title, marginTop }: any) => (
// //     <div className="row" style={{ marginTop }}>
// //         <label className="">{title}</label>
// //     </div>
// // );

// // const CustomerForm = () => {
// //     const inputRefs = useRef<HTMLInputElement[]>([]);
// //     const [showFilter, setShowFilter] = useState(false);
// //     const [selectedIndex, setSelectedIndex] = useState(0);
// //     const [currentFilterList, setCurrentFilterList] = useState<string[]>([]);
// //     const [currentInputIndex, setCurrentInputIndex] = useState<number | null>(null);

// //     const customerTypeFilter = ['Company', 'Individual', 'Partnership'];
// //     const Tax_withHolding_Category = ["tax1", "tax2", "tax3"];
// //     const GstCategoryList = ['GST1', 'GST2', 'GST3'];

// //     useEffect(() => {
// //         // Focus on the first input field when the component mounts
// //         if (inputRefs.current.length > 0 && inputRefs.current[0]) {
// //             inputRefs.current[0].focus();
// //         }
// //     }, []);

// //     const handleCustomerFormSubmit =()=>{

// //     }

// //     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
// //         if (e.key === 'Tab') {
// //             e.preventDefault();
// //             const nextIndex = (index + 1) % inputRefs.current.length; // Loop back to first field when last field is reached
// //             if (inputRefs.current[nextIndex]) {
// //                 inputRefs.current[nextIndex].focus();
// //             }
// //         } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
// //             e.preventDefault();
// //             setShowFilter(true);
// //             setCurrentInputIndex(index); // Track which input field is currently focused

// //             // Determine which filter list to use based on the input field
// //             if (index === 2) {
// //                 setCurrentFilterList(customerTypeFilter);
// //             } else if (index === 4) {
// //                 setCurrentFilterList(Tax_withHolding_Category);
// //             } else if (index === 6) {
// //                 setCurrentFilterList(GstCategoryList);
// //             }

// //             const newIndex = e.key === 'ArrowDown' 
// //                 ? (selectedIndex + 1) % currentFilterList.length 
// //                 : (selectedIndex - 1 + currentFilterList.length) % currentFilterList.length;
// //             setSelectedIndex(newIndex);
// //         } else if (e.key === 'Enter' && showFilter) {
// //             e.preventDefault();
// //             if (currentInputIndex !== null) {
// //                 inputRefs.current[currentInputIndex].value = currentFilterList[selectedIndex];
// //                 setShowFilter(false);
// //             }
// //         }
// //         else if (e.ctrlKey && e.key === 'a') {
// //             e.preventDefault();
// //             handleCustomerFormSubmit();
// //         }
// //     };

// //     const handleItemClick = (item: string) => {
// //         if (currentInputIndex !== null) {
// //             inputRefs.current[currentInputIndex].value = item;
// //             setShowFilter(false);
// //         }
// //     };

// //     return (
// //         <div className="container formContainer">
// //             <div className="row full-width">
// //                 {/* First Row */}
// //                 <div className="col-md-12 border-bottom">
// //                     <div className="row row-height">
// //                         <div className="col-md-9 pt-2">
// //                             <div className="d-flex align-items-center">
// //                                 <label className="fw-bold" style={{ flexBasis: '20%' }}>Name</label>
// //                                 <span className='colon-span'>:</span>
// //                                 <input
// //                                     type="text"
// //                                     className="form-control input-width"
// //                                     ref={(el) => el && (inputRefs.current[0] = el)}
// //                                     onKeyDown={(e) => handleKeyDown(e, 0)}
// //                                 />
// //                             </div>
// //                             <div className="d-flex align-items-center">
// //                                 <label className="fst-italic" style={{ flexBasis: '20%' }}>(alias)</label>
// //                                 <span className='colon-span'>:</span>
// //                                 <input
// //                                     type="text"
// //                                     className="form-control input-width"
// //                                     ref={(el) => el && (inputRefs.current[1] = el)}
// //                                     onKeyDown={(e) => handleKeyDown(e, 1)}
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="col-md-3 border-left">
// //                             <p className="fw-bold">Top Opening Balance</p>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Left Column */}
// //                 <div className="col-md-6 under border-right pt-2">
// //                     {["Customer Type"].map((label, index) => (
// //                         <InputField
// //                             key={label}
// //                             label={label}
// //                             isIndented={index >= 2}
// //                             inputRef={(el: any) => el && (inputRefs.current[index + 2] = el)}
// //                             onKeyDown={(e) => handleKeyDown(e, index + 2)}
// //                         />
// //                     ))}
// //                     <SectionTitle title="Statutory Details" marginTop='70px' />
// //                     {["Tax WithHolding Category", 'GSTIN', 'GST Category', 'PAN'].map((label, index) => (
// //                         <InputField
// //                             key={label}
// //                             label={label}
// //                             inputRef={(el: any) => el && (inputRefs.current[index + 4] = el)}
// //                             onKeyDown={(e) => handleKeyDown(e, index + 4)}
// //                         />
// //                     ))}
// //                 </div>

// //                 {/* Right Column */}
// //                 <div className="col-md-6 padding-bottom">
// //                     <SectionTitle title="Mailing Details" marginTop='10px' />
// //                     <SectionBtn title="Add Address" marginTop="20px" />

// //                     <SectionTitle title="Banking Details" marginTop="20px" />
// //                     <SectionBtn title="Add Bank Account" marginTop="20px" />
// //                 </div>
// //             </div>

// //             <hr className="no-margin" />

// //             {/* Opening Balance */}
// //             <div className="mb-3 row text-center">
// //                 <label className="col-form-label">Opening Balance (on 1-Apr-24)</label>
// //             </div>

// //             {showFilter && (
// //                 <ShowFilter
// //                     filteredItems={currentFilterList}
// //                     selectedIndex={selectedIndex}
// //                     handleClick={handleItemClick}
// //                     handleItemFocus={(index: number) => setSelectedIndex(index)}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default CustomerForm;




