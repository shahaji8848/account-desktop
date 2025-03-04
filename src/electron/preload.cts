
const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  
  saveForm: (args:any) => ipcInvoke('saveForm',args),
  getTaxes: (args:any) => ipcInvoke('getTaxes',args),
  getData: (args:any) => ipcInvoke('getData',args),
  postData: (args:any) => ipcInvoke('postData',args),
  updateData: (args:any) => ipcInvoke('updateData',args),
  getGstinInfo: (args:any) => ipcInvoke('getGstinInfo',args),
  getCurrencyData: (args:any) => ipcInvoke('getCurrencyData',args),

  login: (args:any) => ipcInvoke('login',args),


  salesRegister: (args:any) => {
    return ipcInvoke('salesRegister', args);
  },
  salesBreakupReport: (args:any) => {
    return ipcInvoke('salesBreakupReport', args);
  },
  creditNoteRegister: (args:any) => {
    return ipcInvoke('creditNoteRegister', args);
  },
  creditNoteBreakupReport: (args:any) => {
    return ipcInvoke('creditNoteBreakupReport', args);
  },
  PurchaseInvoiceMonthWiseBreakup: (args:any) => {
    return ipcInvoke('PurchaseInvoiceMonthWiseBreakup', args);
  },
  PurchaseInvoiceBreakupReport: (args:any) => {
    return ipcInvoke('PurchaseInvoiceBreakupReport', args);
  },
  getPaymentReconciliationEntries: (args:any) => {
    return ipcInvoke('getPaymentReconciliationEntries', args);
  },
  getAllocationList: (args:any) => {
    return ipcInvoke('getAllocationList', args);
  },
  ReconcileAmount: (args:any) => {
    return ipcInvoke('ReconcileAmount', args);
  },
} );

function ipcInvoke<Key extends string>(
  key: Key,
  args?: any
): Promise<any> {
  return electron.ipcRenderer.invoke(key, args);
}