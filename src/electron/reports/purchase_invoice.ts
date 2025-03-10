const baseUrl = "https://yatish-testing-v15.frappe.cloud/";
const headers = {
  "Content-Type": "application/json",
  Authorization: "token 617c5524f5a912e:aa8ae3123dc7d6d",
};
export async function PurchaseInvoiceMonthWiseBreakup(kwargs: any) {
  const args = {
    doctype: "Purchase Invoice",
    fields: [
      "DATE_FORMAT(posting_date, '%M') as month",
      "MONTH(posting_date) as month_number",
      "SUM(base_grand_total) as total_sales",
    ],
    filters: [
      ["posting_date", "<=", kwargs.filters.to_date],
      ["posting_date", ">=", kwargs.filters.from_date],
      ["company", "=", kwargs.filters.company],
      ["docstatus", "=", 1],
    ],
    group_by: "MONTH(posting_date)",
    order_by: "YEAR(posting_date) ASC, MONTH(posting_date) ASC",
    limit_page_length: "None",
  };

  if (kwargs.filters?.isReturn === 0) {
    args.filters.push(["is_return", "=", 0]);
  }
  if (kwargs.filters?.isReturn === 1) {
    args.filters.push(["is_return", "=", 1]);
  }

  try {
    let response = await fetch(`${baseUrl}/api/method/frappe.desk.reportview.get`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: kwargs?.token,
      },
      body: JSON.stringify(args),
    });

    let data = await response.json();

    if (!data.message || !Array.isArray(data.message.values)) {
      throw new Error("Invalid response format");
    }

    const startDate = new Date(kwargs.filters.from_date);
    const endDate = new Date(kwargs.filters.to_date);
    let allMonths: { [key: string]: number } = {};

    for (
      let d = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      d <= endDate;
      d.setMonth(d.getMonth() + 1)
    ) {
      const monthName = d.toLocaleString("default", { month: "long" });
      allMonths[monthName] = 0;
    }

    data.message.values.forEach(([month, month_number, total_sales]: [string, number, number]) => {
      allMonths[month] = total_sales;
    });

    let formattedData = Object.entries(allMonths).map(([month, total_sales]) => {
      return kwargs.filters?.isReturn === 1
        ? { month, credit: total_sales }
        : { month, debit: total_sales };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return []; // Ensure function always returns an array even on failure
  }
}


export async function PurchaseInvoiceBreakupReport(kwargs: any) {
  const args = {
    filters: [
      ["posting_date", ">=", kwargs.filters.from_date],
      ["posting_date", "<=", kwargs.filters.to_date],
      ["company", "=", kwargs.filters.company],
    ],
    fields: ["name", "supplier as particulars", "base_grand_total", "posting_date"],
    limit_page_length: "None",
  };

  
 if (kwargs.filters?.isReturn == 0) {
    args.filters.push(["is_return", "=", 0]); 
  } 
  if (kwargs.filters?.isReturn == 1) {
    args.filters.push(["is_return", "=", 1]);
  }

  const queryParams = new URLSearchParams({
    filters: JSON.stringify(args.filters),
    fields: JSON.stringify(args.fields),
  });

  console.log(queryParams.toString());

  try {
    let response = await fetch(`${baseUrl}/api/resource/Purchase Invoice?${queryParams}`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: kwargs?.token,
      },
    });

    let data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid response format");
    }

    let formattedData = data.data
      .sort((a: any, b: any) => new Date(a.posting_date).getTime() - new Date(b.posting_date).getTime())
      .map((invoice: any) => ({
        ...invoice,
        vch_type: kwargs.filters.isReturn == 1 ? "Debit Note" : "Purchase Invoice",
      }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching Purchase Invoice Breakup Report:", error);
  }
}
