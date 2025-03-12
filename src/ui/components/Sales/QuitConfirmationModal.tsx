import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const QuitConfirmationModal = ({ isOpen, setIsQuitModalOpen }: any) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && formRef.current) {
      setTimeout(() => {
        formRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Y' || e.key === 'y' || e.key === 'Yes' || e.key === 'yes' || e.key === 'Enter') {
      navigate('/');
      setIsQuitModalOpen(false);
      // homeHookData?.setSelectedIndex(0);
    } else if (e.key === 'N' || e.key === 'n' || e.key === 'No' || e.key === 'no') {
      setTimeout(() => {
        setIsQuitModalOpen(false);
      }, 0);
    }
  };

  const handleClick = (btn_type: any) => {
    if (btn_type === 'yes') {
      navigate('/');
      setIsQuitModalOpen(false);
      // homeHookData?.setSelectedIndex(0); //for renedering menu list of Home page
    } else if (btn_type === 'no') {
      setTimeout(() => {
        setIsQuitModalOpen(false);
      }, 0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" ref={formRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="modal-content" style={{ backgroundColor: '#ffff' }}>
        <h3>Quit?</h3>
        <p style={{ paddingTop: '25px' }}>
          {' '}
          <span className="me-2" style={{ color: '#589dcc', cursor: 'pointer' }} onClick={() => handleClick('yes')}>
            Yes
          </span>{' '}
          <span>or </span>
          <span className="ms-2 me-2" style={{ color: '#589dcc', cursor: 'pointer' }} onClick={() => handleClick('no')}>
            No
          </span>
        </p>
      </div>
    </div>
  );
};

export default QuitConfirmationModal;
