interface BottomNavbarProps {
  handleSubmit?: () => void;
}

function BottomNavbar({ handleSubmit }: BottomNavbarProps) {
  return (
    <div
      className="bottom-nav-bar w-100 d-flex align-items-center justify-content-start position-absolute pb-2 px-2"
      style={{ bottom: '0', gap: '8px', background: '#b9d8f0' }}
    >
      <div className="tab disabled">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            Q :
          </span>{' '}
          Quit
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            P :
          </span>{' '}
          Payment
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            T :
          </span>{' '}
          T&C
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab" onClick={handleSubmit}>
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            A :
          </span>{' '}
          Accept
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            G :
          </span>{' '}
          GST Summary
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab"></div>
      <div className="tab disabled">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            D :
          </span>{' '}
          Delete
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab disabled">
        <p>
          <span className="fw-bold" style={{ color: '#589dcc' }}>
            X :
          </span>{' '}
          Cancel Vch
        </p>
        <div className="disabled">
          <p style={{ transform: 'rotate(-90deg)', borderLeft: '0' }}>{'>'}</p>
        </div>
      </div>
      <div className="tab"></div>
      <div className="tab"></div>
    </div>
  );
}

export default BottomNavbar;
