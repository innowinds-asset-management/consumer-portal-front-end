import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaQrcode } from 'react-icons/fa';
import QRScannerModal from '@/components/QRScannerModal';

const ScannerIcon: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScannerClick = () => {
    setShowScanner(true);
  };

  const handleScannerClose = () => {
    setShowScanner(false);
  };

  return (
    <>
      <Button
        variant="link"
        className="text-white p-2 d-flex align-items-center justify-content-center"
        onClick={handleScannerClick}
        title="QR Code Scanner"
        style={{
          minWidth: '40px',
          height: '40px',
          borderRadius: '50%',
          transition: 'all 0.2s ease-in-out',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <FaQrcode size={18} />
      </Button>

      <QRScannerModal 
        show={showScanner} 
        onHide={handleScannerClose} 
      />
    </>
  );
};

export default ScannerIcon;
