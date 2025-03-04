export const getFinancialMonthDates = (month:any, current_finance_year:any) => {
    // Define the mapping of month names to numbers
    const monthMapping:any = {
        "April": 4, "May": 5, "June": 6, "July": 7,
        "August": 8, "September": 9, "October": 10, "November": 11,
        "December": 12, "January": 1, "February": 2, "March": 3
    };

    // Get the corresponding month number
    const monthNumber = monthMapping[month];

    if (!monthNumber) {
        return { error: "Invalid month name" };
    }

    // Determine the correct year based on the financial year
    const startYear = current_finance_year - 1; // FY starts in April of the previous year
    const year = monthNumber >= 4 ? startYear : current_finance_year;

    // Get start and end dates
    const start_date = `${year}-${String(monthNumber).padStart(2, "0")}-01`;

    // Get the last day of the month correctly
    const lastDay = new Date(year, monthNumber, 0).getDate();
    const end_date = `${year}-${String(monthNumber).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    return { start_date, end_date };
};