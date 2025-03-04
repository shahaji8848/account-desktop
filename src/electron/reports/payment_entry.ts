const baseUrl = "https://yatish-testing-v15.frappe.cloud/";
const headers = {
  "Content-Type": "application/json",
  Authorization: "token 617c5524f5a912e:aa8ae3123dc7d6d",
};

export async function PaymentEntryBreakupReport(kwargs: any) {
    const payload = {
      doctype: "Payment Entry",
      filters: [
        ["posting_date", ">=", kwargs.filters.from_date],
        ["posting_date", "<=", kwargs.filters.to_date],
        ["company", "=", kwargs.filters.company],
        ["docstatus", "!=", 0],
      ],
      fields: ["name", "posting_date", "docstatus"],
      limit_page_length: "None",
    };
    if (kwargs.filters?.payment_type) {
      payload.filters.push(["payment_type", "=", kwargs.filters.payment_type]);
    }

      try {
      const response = await fetch(`${baseUrl}/api/method/frappe.desk.reportview.get`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        return { error: true, message: `Failed to fetch Payment Entry breakup data: ${response.statusText}` };
      }
  
      const data = await response.json();
      const formattedArray: any = data.message.values.map((item: any) =>
          Object.fromEntries(data.message.keys.map((key: any, index: any) => [key, item[index]]))
      );

      let monthSummary: any = {};

      formattedArray.forEach((item: any) => {
          const dateObj = new Date(item.posting_date);
          const month = dateObj.getMonth(); 
          const year = dateObj.getFullYear();
          const monthYearDisplay = dateObj.toLocaleString("en-US", { month: "long", year: "numeric" }); 
          const monthYearSortable = `${year}-${month.toString().padStart(2, "0")}`; 

          if (!(monthYearSortable in monthSummary)) {
              monthSummary[monthYearSortable] = {
                  month: monthYearDisplay,
                  total_entries: 0,
                  cancelled: 0,
              };
          }

          monthSummary[monthYearSortable].total_entries += 1;
          if (item.docstatus === 2) {
              monthSummary[monthYearSortable].cancelled += 1;
          }
      });

      const finalArray = Object.entries(monthSummary)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([_, value]) => value);

      return finalArray;

    } catch (error) {
      console.error("Error in PaymentEntryBreakupReport:", error);
      return { error: true, message: "An unexpected error occurred while fetching Payment Entry breakup data." };
    }
}


export async function PaymentEntryDetailBreakup(kwargs: any) {
  const args = {
    filters: [
      ["posting_date", ">=", kwargs.filters.from_date],
      ["posting_date", "<=", kwargs.filters.to_date],
      ["company", "=", kwargs.filters.company],
      ["docstatus", "!=", 0],
    ],
    fields: ["name", "docstatus", "posting_date", "party_name as particulars","paid_amount", "payment_type"],
    limit_page_length: "None",
  };
  if (kwargs.filters?.payment_type) {
    args.filters.push(["payment_type", "=", kwargs.filters.payment_type]);
  }


  const queryParams = new URLSearchParams({
    filters: JSON.stringify(args.filters),
    fields: JSON.stringify(args.fields),
  });


  try {
    let response = await fetch(`${baseUrl}/api/resource/Payment Entry?${queryParams}`, {
      method: "GET",
      headers,
    });

    let data = await response.json();
    if (!data || !data.data) {
      throw new Error("Invalid response format");
    }

    let formattedData = data.data
      .sort((a: any, b: any) => new Date(a.posting_date).getTime() - new Date(b.posting_date).getTime())
      .map((invoice: any) => ({
        ...invoice,
        status: invoice.docstatus == 2 ? "Cancelled" : "Submitted",
        vch_type: invoice.payment_type === "Internal Transfer" ? "Contra" : invoice.payment_type,
      }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching Payment Entry Breakup Report:", error);
  }
}




  