const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  saveForm: (args: any) => ipcInvoke('saveForm', args),
  getTaxes: (args: any) => ipcInvoke('getTaxes', args),
  getData: (args: any) => ipcInvoke('getData', args),
  getAdvancePaymentEntries: (args: any) => ipcInvoke('getAdvancePaymentEntries', args),
  getPrintFormatData: (args: any) => {
    return ipcInvoke('getPrintFormatData', args);
  },
  postData: (args: any) => ipcInvoke('postData', args),
  updateData: (args: any) => ipcInvoke('updateData', args),
  getGstinInfo: (args: any) => ipcInvoke('getGstinInfo', args),
  getCurrencyData: (args: any) => ipcInvoke('getCurrencyData', args),

  login: (args: any) => ipcInvoke('login', args),

  salesRegister: (args: any) => {
    return ipcInvoke('salesRegister', args);
  },
  salesBreakupReport: (args: any) => {
    return ipcInvoke('salesBreakupReport', args);
  },
  creditNoteRegister: (args: any) => {
    return ipcInvoke('creditNoteRegister', args);
  },
  creditNoteBreakupReport: (args: any) => {
    return ipcInvoke('creditNoteBreakupReport', args);
  },
  PurchaseInvoiceMonthWiseBreakup: (args: any) => {
    return ipcInvoke('PurchaseInvoiceMonthWiseBreakup', args);
  },
  PurchaseInvoiceBreakupReport: (args: any) => {
    return ipcInvoke('PurchaseInvoiceBreakupReport', args);
  },
  getPaymentReconciliationEntries: (args: any) => {
    return ipcInvoke('getPaymentReconciliationEntries', args);
  },
  getAllocationList: (args: any) => {
    return ipcInvoke('getAllocationList', args);
  },
  ReconcileAmount: (args: any) => {
    return ipcInvoke('ReconcileAmount', args);
  },
  getAccountBalance: (args: any) => {
    return ipcInvoke('getAccountBalance', args);
  },
  getErpTransaction: (args: any) => {
    return ipcInvoke('getErpTransaction', args);
  },
  getBankTransaction: (args: any) => {
    return ipcInvoke('getBankTransaction', args);
  },
  getReconcileBankTransaction: (args: any) => {
    return ipcInvoke('getReconcileBankTransaction', args);
  },
  getAllocateEntries: (args: any) => {
    return ipcInvoke('getAllocateEntries', args);
  },
  JournalEntryBreakupReport: (args: any) => {
    return ipcInvoke('JournalEntryBreakupReport', args);
  },
  JournalEntryDetailBreakup: (args: any) => {
    return ipcInvoke('JournalEntryDetailBreakup', args);
  },
  PaymentEntryBreakupReport: (args: any) => {
    return ipcInvoke('PaymentEntryBreakupReport', args);
  },
  PaymentEntryDetailBreakup: (args: any) => {
    return ipcInvoke('PaymentEntryDetailBreakup', args);
  },
 
  getAllAccounts: (args: any) => {
    return ipcInvoke('getAllAccounts', args);
  },
  paymentEntryAccountsDetails: (args: any) => {
    return ipcInvoke('paymentEntryAccountsDetails', args);
  },
  generatekeys: (args: any) => {
    return ipcInvoke('generatekeys', args);
  },
  getSid: () => {
    return ipcInvoke('getSid');
  },
  
});

function ipcInvoke<Key extends string>(key: Key, args?: any): Promise<any> {
  return electron.ipcRenderer.invoke(key, args);
}
