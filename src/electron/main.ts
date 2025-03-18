import { app, BrowserWindow, Menu, session } from 'electron';
import {
  saveForm,
  isDev,
  getTaxes,
  getData,
  updateData,
  postData,
  getGstinInfo,
  getCurrencyData,
  getAdvancePaymentEntries,
  getPrintFormatData,
} from '../apis/util.js';
import { login, generatekeys } from '../apis/login.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { ipcMain } from 'electron';
import { salesRegisterMonthWiseSales, salesBreakupReport } from '../apis/reports/sales_register.js';
import { creditNoteRegisterMonthWiseSales, creditNoteBreakupReport } from '../apis/reports/credit_note_register.js';
import { PurchaseInvoiceMonthWiseBreakup, PurchaseInvoiceBreakupReport } from '../apis/reports/purchase_invoice.js';
import { getPaymentReconciliationEntries, getAllocationList, ReconcileAmount } from '../apis/payment_reconciliation.js';
import {
  getAccountBalance,
  getErpTransaction,
  getBankTransaction,
  getReconcileBankTransaction,
  getAllocateEntries,
} from '../apis/bank_reconcilation.js';
import { JournalEntryBreakupReport, JournalEntryDetailBreakup } from '../apis/reports/journal_entry.js';
import { PaymentEntryBreakupReport, PaymentEntryDetailBreakup } from '../apis/reports/payment_entry.js';
import { argv, connected } from 'process';
import { paymentEntryAccountsDetails, getAllAccounts } from '../apis/payment_entry_apis.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

app.on('ready', () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = 'https://yatish-testing-v15.frappe.cloud';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders || {}; // Ensure it's not undefined

    responseHeaders['Access-Control-Allow-Origin'] = ['*']; // Allow all origins
    responseHeaders['Access-Control-Allow-Methods'] = ['GET, POST, PUT, DELETE, OPTIONS'];
    responseHeaders['Access-Control-Allow-Headers'] = ['Content-Type, Authorization'];
    console.log(responseHeaders, 'RRRRRRRR');
    callback({ responseHeaders });
  });
  session.defaultSession.cookies.get({}).then((cookies) => {
    console.log('Cookies on startup:', cookies);
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders || {};
    responseHeaders['Set-Cookie'] = responseHeaders['Set-Cookie'] || [];
    callback({ responseHeaders: responseHeaders });
  });

  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: true,
      contextIsolation: true,
    },
    // disables default system frame (dont do this if you want a proper working menu bar)
    frame: true,
    width: 1380,
    height: 600,
  });

  mainWindow.maximize();
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  // pollResources(mainWindow);

  ipcMain.handle('saveForm', async (_, kwargs: any) => {
    return await saveForm(kwargs);
  });
  ipcMain.handle('postData', async (_, kwargs: any) => {
    return await postData(kwargs);
  });
  ipcMain.handle('updateData', async (_, kwargs: any) => {
    return await updateData(kwargs);
  });

  ipcMain.handle('getTaxes', async (_, kwargs: any) => {
    return await getTaxes(kwargs);
  });

  ipcMain.handle('getData', async (_, kwargs: any) => {
    return await getData(kwargs);
  });

  ipcMain.handle('getAdvancePaymentEntries', async (_, kwargs: any) => {
    return await getAdvancePaymentEntries(kwargs);
  });

  ipcMain.handle('getPrintFormatData', async (_, kwargs: any) => {
    return await getPrintFormatData(kwargs);
  });

  ipcMain.handle('getGstinInfo', async (_, kwargs: any) => {
    return await getGstinInfo(kwargs);
  });
  ipcMain.handle('getCurrencyData', async (_, kwargs: any) => {
    return await getCurrencyData(kwargs);
  });

  ipcMain.handle('login', async (_, kwargs: any) => {
    return await login(kwargs);
  });

  ipcMain.handle('getPaymentReconciliationEntries', async (_, kwargs: any) => {
    return await getPaymentReconciliationEntries(kwargs);
  });

  ipcMain.handle('getAccountBalance', async (_, kwargs: any) => {
    return await getAccountBalance(kwargs);
  });

  ipcMain.handle('getErpTransaction', async (_, kwargs: any) => {
    return await getErpTransaction(kwargs);
  });

  ipcMain.handle('getBankTransaction', async (_, kwargs: any) => {
    return await getBankTransaction(kwargs);
  });

  ipcMain.handle('getReconcileBankTransaction', async (_, kwargs: any) => {
    return await getReconcileBankTransaction(kwargs);
  });

  ipcMain.handle('getAllocateEntries', async (_, kwargs: any) => {
    return await getAllocateEntries(kwargs);
  });

  ipcMain.handle('salesRegister', async (_, kwargs: any) => {
    return await salesRegisterMonthWiseSales(kwargs);
  });
  ipcMain.handle('salesBreakupReport', async (_, kwargs: any) => {
    return await salesBreakupReport(kwargs);
  });
  ipcMain.handle('creditNoteRegister', async (_, kwargs: any) => {
    return await creditNoteRegisterMonthWiseSales(kwargs);
  });
  ipcMain.handle('creditNoteBreakupReport', async (_, kwargs: any) => {
    return await creditNoteBreakupReport(kwargs);
  });
  ipcMain.handle('PurchaseInvoiceMonthWiseBreakup', async (_, kwargs: any) => {
    return await PurchaseInvoiceMonthWiseBreakup(kwargs);
  });
  ipcMain.handle('PurchaseInvoiceBreakupReport', async (_, kwargs: any) => {
    return await PurchaseInvoiceBreakupReport(kwargs);
  });
  ipcMain.handle('getAllocationList', async (_, kwargs: any) => {
    return await getAllocationList(kwargs);
  });
  ipcMain.handle('ReconcileAmount', async (_, kwargs: any) => {
    return await ReconcileAmount(kwargs);
  });

  ipcMain.handle('JournalEntryBreakupReport', async (_, kwargs: any) => {
    return await JournalEntryBreakupReport(kwargs);
  });
  ipcMain.handle('JournalEntryDetailBreakup', async (_, kwargs: any) => {
    return await JournalEntryDetailBreakup(kwargs);
  });
  ipcMain.handle('PaymentEntryBreakupReport', async (_, kwargs: any) => {
    return await PaymentEntryBreakupReport(kwargs);
  });
  ipcMain.handle('PaymentEntryDetailBreakup', async (_, kwargs: any) => {
    return await PaymentEntryDetailBreakup(kwargs);
  });
  ipcMain.handle('paymentEntryAccountsDetails', async (_, kwargs: any) => {
    return await paymentEntryAccountsDetails(kwargs.doctype, kwargs.filters, kwargs.token);
  });
  ipcMain.handle('getAllAccounts', async (_, kwargs: any) => {
    return await getAllAccounts(kwargs.doctype, kwargs.filters, kwargs.token);
  });
  ipcMain.handle('generatekeys', async (_, kwargs: any) => {
    return await generatekeys(kwargs);
  });
  ipcMain.handle('getSid', async () => {
    const cookies = await session.defaultSession.cookies.get({ name: 'sid' });
    return cookies.length > 0 ? cookies[0].value : null;
  });

  handleCloseEvents(mainWindow);
  // createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}
