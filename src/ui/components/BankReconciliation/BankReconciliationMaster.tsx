import React from 'react';
import BankReconciliationRework from './BankReconciliationRework';

const BankReconciliationMaster = ({ homeHookData, globalData }: any) => {
  return (
    <div>
      <div>
        <BankReconciliationRework homeHookData={homeHookData} globalData={globalData} />
      </div>
    </div>
  );
};

export default BankReconciliationMaster;
