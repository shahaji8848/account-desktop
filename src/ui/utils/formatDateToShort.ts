 export const formatDateToShort = (start_date:any, end_date:any) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const format = (dateString:any) => {
        const [year, month, day] = dateString.split("-").map(Number);
        return `${day}-${months[month - 1]}-${String(year).slice(-2)}`;
    };

    return {
        start_date: format(start_date),
        end_date: format(end_date)
    };
};