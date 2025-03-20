const baseUrl = 'https://yatish-testing-v15.frappe.cloud/';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};

export async function UploadFile(args: any) {
  try {
    let api_url = 'api/method/upload_file';
    let params: any = new FormData();
    params.append('file', args.file);
    params.append('doctype', 'Bank Statement Import');
    params.append('fieldname', 'import_file');
    params.append('docname', args.docname);

    const response = await fetch(`${baseUrl}${api_url}`, {
      method: 'POST',
      headers: {
        Authorization: args?.token,
      },
      body: params,
    });

    if (!response.ok) {
      return { error: true, message: `Failed to UploadFile: ${response.statusText}` };
    }

    return await response.json();
  } catch (error) {
    console.error('Error in UploadFile:', error);
    return { error: true, message: 'An unexpected error occurred while uploading  File.' };
  }
}

export async function GetPreviewFromTemplate(args: any) {
  try {
    let api_url = 'api/method/erpnext.accounts.doctype.bank_statement_import.bank_statement_import.get_preview_from_template';
    let params: any = {
      import_file: args.file_url,
      data_import: args.docname,
      google_sheets_url: args.google_sheets_url,
    };

    const response = await fetch(`${baseUrl}${api_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: args?.token,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return { error: true, message: `Failed to GetPreviewFromTemplate: ${response.statusText}` };
    }

    return await response.json();
  } catch (error) {
    console.error('Error in GetPreviewFromTemplate:', error);
    return { error: true, message: 'An unexpected error occurred while preview from template.' };
  }
}

export async function DownloadTemplate(args: any) {
  try {
    let api_url = 'api/method/frappe.core.doctype.data_import.data_import.download_template';
    let params: any = {
      doctype: "Bank Transaction",
      export_records: "5_records",
      export_fields: {"Bank Transaction":["date","deposit","withdrawal","description","reference_number","bank_account","currency"]},
    };

    const response = await fetch(`${baseUrl}${api_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: args?.token,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return { error: true, message: `Failed to DownloadTemplate: ${response.statusText}` };
    }

    return await response.json();

  } catch (error) {
    console.error('Error in DownloadTemplate:', error);
    return { error: true, message: 'An unexpected error occurred while Download template.' };
  }
}