import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const QuitConfirmationModal = ({ type, isOpen, setIsQuitModalOpen, onConfirm, homeHookData }: any) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Y' || e.key === 'y' || e.key === 'Yes' || e.key === 'yes' || e.key === 'Enter') {
      if (type === 'customer_form') {
        navigate(-1);
      } else if (type === 'create_list_modal') {
        homeHookData?.setIsModalOpen(false);
      } else if (type === 'supplier_form') {
        navigate(-1);
      } else if (type === 'sales_register') {
        navigate(-1);
      } else if (type === 'sales_voucher_register') {
        navigate(-1);
      } else if (type === 'credit_note_register') {
        navigate(-1);
      } else if (type === 'credit_note_voucher_register') {
        navigate(-1);
      } else if (type === 'purchase_register') {
        navigate(-1);
      } else if (type === 'purchase_voucher_register') {
        navigate(-1);
      } else if (type === 'debit_note_register') {
        navigate(-1);
      } else if (type === 'debit_note_voucher_register') {
        navigate(-1);
      } else if (type === 'journal_register') {
        navigate(-1);
      } else if (type === 'journal_voucher_register') {
        navigate(-1);
      } else if (type === 'payment_register') {
        navigate(-1);
      } else if (type === 'payment_voucher_register') {
        navigate(-1);
      } else if (type === 'receipt_register') {
        navigate(-1);
      } else if (type === 'receipt_voucher_register') {
        navigate(-1);
      } else if (type === 'contra_register') {
        navigate(-1);
      } else if (type === 'contra_voucher_register') {
        navigate(-1);
      } else if (type === 'payment_reconciliation') {
        navigate(-1);
      }else if (type === 'journal_form') {
        navigate(-1);
      }
      // for closing the different menu list
      else if (homeHookData?.accountBooksList) {
        homeHookData?.setAccountBooksList(false);
        homeHookData?.setMoreReportList(true);
      } else if (homeHookData?.moreReportList) {
        homeHookData?.setMoreReportList(false);
      } else if (!homeHookData?.accountBooksList && !homeHookData?.moreReportList) {
        onConfirm();
      }
      setIsQuitModalOpen(false);
      homeHookData?.setSelectedIndex(0); //for renedering menu list of Home page
    } else if (e.key === 'N' || e.key === 'n' || e.key === 'No' || e.key === 'no') {
      setTimeout(() => {
        setIsQuitModalOpen(false);
      }, 0);
    }
  };

  const handleClick = (btn_type: any) => {
    if (btn_type === 'yes') {
      if (type === 'customer_form') {
        navigate(-1)
      } else if (type === 'create_list_modal') {
        homeHookData?.setIsModalOpen(false)
      } else if (type === 'supplier_form') {
        navigate(-1)
      } else if (type === 'sales_register') {
        navigate(-1)
      } else if (type === 'sales_voucher_register') {
        navigate(-1)
      } else if (type === 'credit_note_register') {
        navigate(-1)
      } else if (type === 'credit_note_voucher_register') {
        navigate(-1)
      } else if (type === 'purchase_register') {
        navigate(-1)
      } else if (type === 'purchase_voucher_register') {
        navigate(-1)
      } else if (type === 'debit_note_register') {
        navigate(-1)
      } else if (type === 'debit_note_voucher_register') {
        navigate(-1)
      } else if (type === 'journal_register') {
        navigate(-1)
      } else if (type === 'journal_voucher_register') {
        navigate(-1)
      } else if (type === 'payment_register') {
        navigate(-1)
      } else if (type === 'payment_voucher_register') {
        navigate(-1)
      } else if (type === 'receipt_register') {
        navigate(-1)
      } else if (type === 'receipt_voucher_register') {
        navigate(-1)
      } else if (type === 'contra_register') {
        navigate(-1)
      } else if (type === 'contra_voucher_register') {
        navigate(-1)
      }
      // for closing the different menu list 
      else if (homeHookData?.accountBooksList) {
        homeHookData?.setAccountBooksList(false)
        homeHookData?.setMoreReportList(true)
      } else if (homeHookData?.moreReportList) {
        homeHookData?.setMoreReportList(false)
      } else if (!homeHookData?.accountBooksList && !homeHookData?.moreReportList) {
        onConfirm();
      }
      setIsQuitModalOpen(false)
      homeHookData?.setSelectedIndex(0) //for renedering menu list of Home page
    } else if (btn_type === "no") {
      setTimeout(() => {
        setIsQuitModalOpen(false)
      }, 0)

    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" ref={formRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="modal-content" style={{backgroundColor:'#ffff'}}>
        <h3>Quit?</h3>
        <p style={{ paddingTop: '25px' }}>
          {' '}
          <span
            className="me-2"
            style={{ color: '#589dcc', cursor: 'pointer' }}
            onClick={() => handleClick('yes')}>
            Yes
          </span>{' '}
          <span>or{' '}</span>
          <span
            className='ms-2 me-2'
            style={{ color: '#589dcc', cursor: 'pointer' }}
            onClick={() => handleClick('no')}>
            No
          </span>
        </p>
      </div>
    </div>
  );
};

export default QuitConfirmationModal;
