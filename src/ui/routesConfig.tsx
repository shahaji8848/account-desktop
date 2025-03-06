import CustomerFormMaster from './components/CustomerForm/CustomerFormMaster';
import SupplierFormMaster from './components/SupplierForm/SupplierFormMaster';
import SalesVoucherRegister from './components/AccountBooks/SalesRegister/SalesVoucherRegister';
import SalesRegister from './components/AccountBooks/SalesRegister/SalesRegister';
import CreditNoteRegister from './components/AccountBooks/CreditNoteRegister/CreditNoteRegister';
import CreditNoteVoucherRegister from './components/AccountBooks/CreditNoteRegister/CreditNoteVoucherRegister';
import PurchaseRegister from './components/AccountBooks/PurchaseRegister/PurchaseRegister';
import PurchaseVoucherRegister from './components/AccountBooks/PurchaseRegister/PurchaseVoucherRegister';
import DebitNoteRegister from './components/AccountBooks/DebitNoteRegister/DebitNoteRegister';
import DebitNoteVoucherRegister from './components/AccountBooks/DebitNoteRegister/DebitNoteVoucherRegister';
import PaymentReconciliationMaster from './components/PaymentReconciliation/PaymentReconciliationMaster';
import JournalRegister from './components/AccountBooks/JournalRegister/JournalRegister';
import JournalVoucherRegister from './components/AccountBooks/JournalRegister/JournalVoucherRegister';
import PaymentRegister from './components/AccountBooks/PaymentRegister/PaymentRegister';
import PaymentVoucherRegister from './components/AccountBooks/PaymentRegister/PaymentVoucherRegister';
import ReceiptRegister from './components/AccountBooks/ReceiptRegister/ReceiptRegister';
import ReceiptVoucherRegister from './components/AccountBooks/ReceiptRegister/ReceiptVoucherRegister';
import ContraRegister from './components/AccountBooks/ContraRegister/ContraRegister';
import ContraVoucherRegister from './components/AccountBooks/ContraRegister/ContraVoucherRegister';
import JournalMaster from './components/Journal/JournalMaster';

const routesConfig = [
    { path: "/customer-form", component: CustomerFormMaster },
    { path: "/supplier-form", component: SupplierFormMaster },
    { path: "/sales-register", component: SalesRegister },
    { path: "/sales-voucher-register", component: SalesVoucherRegister },
    { path: "/credit-note-register", component: CreditNoteRegister },
    { path: "/credit-note-voucher-register", component: CreditNoteVoucherRegister },
    { path: "/purchase-register", component: PurchaseRegister },
    { path: "/purchase-voucher-register", component: PurchaseVoucherRegister },
    { path: "/debit-note-register", component: DebitNoteRegister },
    { path: "/debit-note-voucher-register", component: DebitNoteVoucherRegister },
    { path: "/journal-register", component: JournalRegister },
    { path: "/journal-voucher-register", component: JournalVoucherRegister },
    { path: "/payment-register", component: PaymentRegister },
    { path: "/payment-voucher-register", component: PaymentVoucherRegister },
    { path: "/receipt-register", component: ReceiptRegister },
    { path: "/receipt-voucher-register", component: ReceiptVoucherRegister },
    { path: "/contra-register", component: ContraRegister },
    { path: "/contra-voucher-register", component: ContraVoucherRegister },
    { path: "/payment-reconciliation", component: PaymentReconciliationMaster },
    { path: "/journal", component: JournalMaster },
];

export default routesConfig;
