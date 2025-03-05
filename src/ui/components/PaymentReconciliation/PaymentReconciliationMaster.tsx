import React from 'react';
import PaymentReconciliation from './PaymentReconciliation';
import PaymentReconciliationRework from './PaymentReconciliationRework';

const PaymentReconciliationMaster = ({ homeHookData, globalData }: any) => {
  return (
    <div>
      <div>
        <PaymentReconciliationRework homeHookData={homeHookData} globalData={globalData} />
        {/* <PaymentReconciliation homeHookData={homeHookData} globalData={globalData} /> */}
      </div>
    </div>
  );
};

export default PaymentReconciliationMaster;
