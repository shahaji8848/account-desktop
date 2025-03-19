const baseUrl = 'https://yatish-testing-v15.frappe.cloud/';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token 617c5524f5a912e:aa8ae3123dc7d6d',
};


export async function UploadFile(args: any) {
  try {
    let api_url = 'api/method/upload_file';
    const currentTime = new Date();
    let params: any = {
      file: args.file,
      doctype: "Bank Statement Import",
      fieldname: "import_file",
      docname: `Bank Statement Import on ${currentTime}`
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
        data_import: args.attached_to_name,
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