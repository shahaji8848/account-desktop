import { app, BrowserWindow, Menu } from 'electron';
import {
  saveForm,
  isDev,
  getTaxes,
  getData,
  updateData,
  postData,
  getGstinInfo,
  getCurrencyData,
  login,
  getAdvancePaymentEntries
} from "../apis/util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { ipcMain } from "electron";
import { salesRegisterMonthWiseSales,salesBreakupReport } from "./reports/sales_register.js";
import { creditNoteRegisterMonthWiseSales,creditNoteBreakupReport } from './reports/credit_note_register.js';
import { PurchaseInvoiceMonthWiseBreakup , PurchaseInvoiceBreakupReport } from "./reports/purchase_invoice.js";
import {getPaymentReconciliationEntries , getAllocationList,ReconcileAmount} from "./apis/payment_reconciliation.js";
import {JournalEntryBreakupReport,JournalEntryDetailBreakup} from "./reports/journal_entry.js";
import {PaymentEntryBreakupReport, PaymentEntryDetailBreakup} from "./reports/payment_entry.js";
import { argv, connected } from 'process';

app.on('ready', () => {
 
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
    ipcMain.handle("postData", async (_ ,kwargs: any) => {
      return await postData(kwargs);

  });
  ipcMain.handle("updateData", async (_ ,kwargs: any) => {
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

  ipcMain.handle("salesRegister", async (_ ,kwargs: any) => {
    return await salesRegisterMonthWiseSales(kwargs);
  });
  ipcMain.handle("salesBreakupReport", async (_ ,kwargs: any) => {
    return await salesBreakupReport(kwargs);
  });
  ipcMain.handle("creditNoteRegister", async (_ ,kwargs: any) => {
    return await creditNoteRegisterMonthWiseSales(kwargs);
  });
  ipcMain.handle("creditNoteBreakupReport", async (_ ,kwargs: any) => {
    return await creditNoteBreakupReport(kwargs);
  });
  ipcMain.handle("PurchaseInvoiceMonthWiseBreakup", async (_ ,kwargs: any) => {
    return await PurchaseInvoiceMonthWiseBreakup(kwargs);
  });
  ipcMain.handle("PurchaseInvoiceBreakupReport", async (_ ,kwargs: any) => {
    return await PurchaseInvoiceBreakupReport(kwargs);
  });
  ipcMain.handle("getAllocationList", async (_ ,kwargs: any) => {
    return await getAllocationList(kwargs);
  });
  ipcMain.handle("ReconcileAmount", async (_ ,kwargs: any) => {
    return await ReconcileAmount(kwargs);
  });

  ipcMain.handle("JournalEntryBreakupReport", async (_ ,kwargs: any) => {
    return await JournalEntryBreakupReport(kwargs);
  });
  ipcMain.handle("JournalEntryDetailBreakup", async (_ ,kwargs: any) => {
    return await JournalEntryDetailBreakup(kwargs);
  });
  ipcMain.handle("PaymentEntryBreakupReport", async (_ ,kwargs: any) => {
    return await PaymentEntryBreakupReport(kwargs);
  });
  ipcMain.handle("PaymentEntryDetailBreakup", async (_ ,kwargs: any) => {
    return await PaymentEntryDetailBreakup(kwargs);
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
