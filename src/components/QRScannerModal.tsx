import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FaQrcode, FaPlay, FaStop, FaCheckCircle } from 'react-icons/fa';

interface QRScannerModalProps {
  show: boolean;
  onHide: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ show, onHide }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Ready to scan');
  const [showSuccess, setShowSuccess] = useState(false);

  const scannerRef = useRef<any>(null);

  const startScanner = async () => {
    setStatus('Initializing camera...');
    setShowSuccess(false);
    try {
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: 500, // ensures square scanning box at the center
        fps: 5
      }, false);

      scanner.render(
        (decodedText: string) => {
          console.log('QR Code detected:', decodedText);
          setShowSuccess(true);
          setStatus('QR Code detected successfully!');
          
          // Show success notification for 2 seconds before redirecting
          setTimeout(() => {
            window.location.href = decodedText;
          }, 2000);
          
          stopScanner();
        },
        (errorMessage: string) => {
          console.log("Scan error:", errorMessage);
        }
      );

      scannerRef.current = scanner;
      setIsScanning(true);
      setStatus('Scanning for QR codes...');
    } catch (error) {
      console.error('Error initializing scanner:', error);
      setStatus('Failed to start camera');
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (error) {
        console.log('Scanner cleanup error:', error);
      }
    }
    setIsScanning(false);
    setStatus('Scanner stopped');
  };

  // Cleanup when modal closes
  useEffect(() => {
    if (!show && isScanning) {
      stopScanner();
    }
  }, [show]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear();
        } catch (error) {
          console.log('Scanner cleanup error:', error);
        }
      }
      setIsScanning(false);
    };
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header 
        closeButton={!isScanning}
        style={{
          background: 'linear-gradient(135deg, #0932c1, #1286ae, #082a71)',
          color: 'white'
        }}
      >
        <Modal.Title className="d-flex align-items-center justify-content-center w-100">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <span className="text-white fw-bold fs-4">AssetNix</span>
            </div>
            <span className="text-white">|</span>
            <div className="d-flex align-items-center gap-2">
              <FaQrcode size={22} />
              <span>QR Code Scanner</span>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <div className="scanner-container">
          <div className="camera-container">
            <div id="reader" />

            {!isScanning && (
              <div className="scanner-placeholder">
                <div className="text-center text-white">
                  <FaQrcode size={48} className="mb-3" />
                  <p>Click "Start Scanner" to begin</p>
                </div>
              </div>
            )}

            <div className="scanner-status">
              <span>{status}</span>
            </div>
          </div>

          <div className="scanner-controls p-3">
            <div className="d-flex gap-2 justify-content-center">
              <Button 
                variant="primary" 
                onClick={startScanner} 
                disabled={isScanning}
                className="d-flex align-items-center gap-2"
              >
                <FaPlay />
                Start Scanner
              </Button>
              <Button 
                variant="secondary" 
                onClick={stopScanner} 
                disabled={!isScanning}
                className="d-flex align-items-center gap-2"
              >
                <FaStop />
                Stop Scanner
              </Button>
            </div>
          </div>

          {showSuccess && (
            <div className="p-3 border-top">
              <Alert variant="success" className="d-flex align-items-center gap-2">
                <FaCheckCircle />
                <span>Scanned Successfully! Redirecting...</span>
              </Alert>
            </div>
          )}
        </div>
      </Modal.Body>

      <style jsx>{`
        .scanner-container {
          background: #f8f9fa;
        }
        
        .camera-container {
          position: relative;
          width: 100%;
          height: 400px;
          background: #000;
          overflow: hidden;
        }
        
        .scanner-status {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          text-align: center;
          z-index: 10;
        }
        
        .scanner-controls {
          background: white;
        }
        
        .scanner-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          z-index: 5;
        }

        /* Minimal HTML5-QRCode overrides */
        :global(#reader__scan_region) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        :global(#reader__dashboard),
        :global(#reader__status_span),
        :global(#reader__camera_selection),
        :global(#reader__camera_permission_button) {
          display: none !important;
        }
      `}</style>
    </Modal>
  );
};

export default QRScannerModal;
