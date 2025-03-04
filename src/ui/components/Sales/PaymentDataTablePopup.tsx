function PaymentDataTablePopup({ paymentTermsOpen, paymentData, tableData, getTotal, salesData, dueDate, setDate }: any) {
  function calculateNewDueDate(dueDate: string, creditDays: number): string {
    const date = new Date(dueDate);
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + creditDays);

    // const [day, month, year] = dueDate.split('-').map(Number);
    // const date = new Date(year, month - 1, day); // Month is 0-based in JS Date

    // date.setDate(date.getDate() + creditDays); // Add credit days

    // // Format the new date as DD/MM/YYYY
    // const newDueDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    // console.log(day, month, year, date, new Date(year, month - 1, day))
    return tomorrow.toISOString().split('T')[0] || '25-2-2025';
  }

  
  return (
    <div
      className="popup table-popup"
      style={{
        display: paymentTermsOpen ? 'flex' : 'none',
      }}
    >
      <div
        className="popup-body d-flex align-items-center justify-content-between w-100 flex-column gap-1"
        style={{
          marginLeft: '-14%',
          maxWidth: '900px',
        }}
      >
        <div className="my-table pb-1 w-100">
          {tableData?.length > 0 && (
            <div className="w-100">
              <div
                className="table-head d-flex px-1 py-1 mb-2 align-items-center justify-content-between w-100"
                // style={{ position: 'absolute', bottom: '210px' }}
              >
                <div className="table-left" style={{ width: '25%' }}>
                  <p>
                    <b>Payment Term</b>
                  </p>
                </div>
                <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '75%' }}>
                  <p style={{ width: '35%' }}>
                    <b>Description</b>
                  </p>
                  <p style={{ width: '15%' }}>
                    <b>Due Date</b>
                  </p>
                  <p className="text-end" style={{ width: '25%' }}>
                    <b>Invoice Portion</b>
                  </p>
                  <p className="text-end" style={{ width: '25%' }}>
                    <b>Amount</b>
                  </p>
                </div>
              </div>
              <div
                className="table-body w-100"
                // style={{ position: 'absolute', bottom: '160px' }}
              >
                {paymentData?.terms?.length > 0 &&
                  paymentData.terms.map((item: any, index: number) => (
                    <div className="table-body px-1 pt-1 pb-1 w-100 d-flex align-items-center justify-content-between" key={index}>
                      <div className="table-left d-flex align-items-center" style={{ width: '25%' }}>
                        <p style={{ width: '100%' }}>
                          <b>{item.payment_term}</b>
                        </p>
                      </div>
                      <div className="table-right justify-content-between d-flex align-items-center" style={{ width: '75%' }}>
                        <p style={{ width: '35%' }}>{item.description}</p>
                        <p style={{ width: '15%' }}>
                          <b>{calculateNewDueDate(dueDate, item.credit_days)}</b>
                        </p>
                        <p className="text-end" style={{ width: '25%' }}>
                          <b>{item.invoice_portion}</b>
                        </p>
                        <p className="text-end" style={{ width: '25%' }}>
                          <b>{`${salesData.currency} ${(getTotal() * (item.invoice_portion / 100))?.toFixed(2) ?? 0}`}</b>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentDataTablePopup;
