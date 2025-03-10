// import { useEffect, useState } from 'react';
// import ShowFilter from '../common/ShowFilter';
// import { nanoid } from 'nanoid';

// const BankAccountForm = ({ setIsBankModal, setStoredBankList, initialData }: any) => {
//     const [formData, setFormData] = useState({
//         account_name: '',
//         bank: '',
//         account_type: '',
//         party_type: '',
//         party: '',
//         branch_code: '',
//         bank_account_no: '',
//     });

//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 account_name: initialData?.account_name,
//                 bank: initialData?.bank,
//                 account_type: initialData?.account_type,
//                 party_type: initialData?.party_type,
//                 party: initialData?.party,
//                 branch_code: initialData?.branch_code,
//                 bank_account_no: initialData?.bank_account_no,
//             });
//         }
//     }, [initialData]);

//     const [showFilter, setShowFilter] = useState(false);
//     const [currentFilterList, setCurrentFilterList] = useState([]);
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const [currentField, setCurrentField] = useState('');

//     const [bankList, setBankList] = useState([]);
//     const [accountTypeList, setAccountTypeList] = useState([]);
//     const token = localStorage.getItem('token');

//     const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         console.log(">", name, value)
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFormBankSubmit = async () => {
//         if (initialData && Object.keys(initialData)?.length > 0) {
//             const bankDetailList = {
//                 account_name: formData?.account_name,
//                 bank: formData?.bank,
//                 account_type: formData?.account_type,
//                 party_type: formData?.party_type,
//                 party: formData?.party,
//                 branch_code: formData?.branch_code,
//                 bank_account_no: formData?.bank_account_no
//             }

//             const updatedBankDetailList = { ...initialData, ...bankDetailList }
//             // Update existing address
//             setStoredBankList((prevList: any) =>
//                 prevList.map((bank: any) => bank?.id === updatedBankDetailList?.id ? updatedBankDetailList : bank)
//             );
//         }
//         else {
//             let a = {
//                 id: nanoid(),
//                 account_name: formData?.account_name,
//                 bank: formData?.bank,
//                 account_type: formData?.account_type,
//                 party_type: formData?.party_type,
//                 party: formData?.party,
//                 branch_code: formData?.branch_code,
//                 bank_account_no: formData?.bank_account_no
//             }
//             setStoredBankList((previous: any) => [...previous, a])
//         }
//     };

//     const handleKeyDown = (e: any, field: any) => {
//         if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
//             if (field === "bank" || field === "account_type") {
//                 e.preventDefault();
//                 setShowFilter(true);
//                 setCurrentField(field);

//                 const list = field === 'bank' ? bankList : accountTypeList || [];
//                 setCurrentFilterList(list);

//                 const newIndex =
//                     e.key === 'ArrowDown'
//                         ? (selectedIndex + 1) % list.length
//                         : (selectedIndex - 1 + list.length) % list.length;
//                 setSelectedIndex(newIndex);
//             }
//         } else if (e.key === 'Enter' && showFilter) {
//             e.preventDefault();
//             // @ts-ignore
//             setFormData({ ...formData, [currentField]: currentFilterList[selectedIndex].name });
//             setShowFilter(false);
//         } else if (e.key === 'Escape') {
//             setShowFilter(false);
//             setIsBankModal(false)
//         }
//         else if (e.ctrlKey && e.key === 'a') {
//             e.preventDefault();
//             handleFormBankSubmit();
//         }
//     };

//     const handleItemClick = (item: any) => {
//         setFormData({ ...formData, [currentField]: item.name });
//         setShowFilter(false);
//     };

//     const fetchBankList = async () => {
//         let x = await window.electron.getData({ doctype: "Bank", filters: {}, token });
//         // console.log("fetchTaxwithHolding", x);
//         setBankList(x)
//     };

//     const fetchAccountTypeList = async () => {
//         let x = await window.electron.getData({ doctype: "Bank Account Type", filters: {}, token });
//         // console.log("fetchCompanyList", x);
//         setAccountTypeList(x)

//     };


//     useEffect(() => {
//         fetchBankList();
//         fetchAccountTypeList();
//     }, []);

//     return (
//         <div className="container p-5" style={{ backgroundColor: 'white' }}>

//             {/* Account Information */}
//             <div className="mb-4">
//                 <h5 className="font-weight-bold">Account Information</h5>
//                 <div className="form-group">
//                     <label htmlFor="account_name">
//                         Account Name <span className="text-danger">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="account_name"
//                         name="account_name"
//                         value={formData.account_name}
//                         onChange={handleChange}
//                         onKeyDown={(e) => handleKeyDown(e, 'account_name')}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="bank">
//                         Bank <span className="text-danger">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="bank"
//                         name="bank"
//                         value={formData.bank}
//                         onChange={handleChange}
//                         onKeyDown={(e) => handleKeyDown(e, 'bank')}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="account_type">Account Type</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="account_type"
//                         name="account_type"
//                         value={formData.account_type}
//                         onChange={handleChange}
//                         onKeyDown={(e) => handleKeyDown(e, 'account_type')}
//                     />
//                 </div>

//             </div>

//             {/* Party Details */}
//             <div className="mb-4">
//                 <h5 className="font-weight-bold">Party Details</h5>
//                 <div className="form-row">
//                     <div className="form-group col-md-6">
//                         <label htmlFor="party_type">Party Type</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="party_type"
//                             name="party_type"
//                             value={formData.party_type}
//                             onChange={handleChange}
//                             onKeyDown={(e) => handleKeyDown(e, 'party_type')}
//                         />
//                     </div>
//                     <div className="form-group col-md-6">
//                         <label htmlFor="party">Party</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="party"
//                             name="party"
//                             value={formData.party}
//                             onChange={handleChange}
//                             onKeyDown={(e) => handleKeyDown(e, 'party')}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Account Details */}
//             <div>
//                 <h5 className="font-weight-bold">Account Details</h5>
//                 <div className="form-row">

//                     <div className="form-group col-md-4">
//                         <label htmlFor="branch_code">Branch Code</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="branch_code"
//                             name="branch_code"
//                             value={formData.branch_code}
//                             onChange={handleChange}
//                             onKeyDown={(e) => handleKeyDown(e, 'branch_code')}
//                         />
//                     </div>
//                     <div className="form-group col-md-4">
//                         <label htmlFor="bank_account_no">Bank Account No</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="bank_account_no"
//                             name="bank_account_no"
//                             value={formData.bank_account_no}
//                             onChange={handleChange}
//                             onKeyDown={(e) => handleKeyDown(e, 'bank_account_no')}
//                         />
//                     </div>
//                 </div>
//             </div>



//             {showFilter && (
//                 <ShowFilter
//                     filteredItems={currentFilterList}
//                     selectedIndex={selectedIndex}
//                     handleClick={handleItemClick}
//                     handleItemFocus={(index: any) => setSelectedIndex(index)}
//                 />
//             )}

//         </div>
//     );
// };

// export default BankAccountForm;
