import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FaQrcode, FaPlay, FaStop, FaTimes } from 'react-icons/fa';
import assetnixLogo from '@/assets/images/assetnix-logo.svg';
import Image from 'next/image';

// Declare jsQR as a global variable
declare global {
  interface Window {
    jsQR: any;
  }
}

interface QRScannerModalProps {
  show: boolean;
  onHide: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ show, onHide }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Ready to scan');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [jsQRLoaded, setJsQRLoaded] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Load jsQR from CDN
    if (!window.jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.onload = () => {
        setJsQRLoaded(true);
        console.log('jsQR library loaded successfully');
        setStatus('QR detection ready');
      };
      script.onerror = () => {
        console.error('Failed to load jsQR library');
        setJsQRLoaded(false);
        setStatus('Failed to load QR detection library');
        showNotification('Failed to load QR detection library. Please refresh the page.', 'error');
      };
      document.head.appendChild(script);
    } else {
      setJsQRLoaded(true);
      setStatus('QR detection ready');
    }

    if (!show) {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [show]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const startScanner = async () => {
    try {
      // Check if jsQR is loaded
      if (!jsQRLoaded || !window.jsQR) {
        setStatus('QR detection library not ready');
        showNotification('QR detection library not ready. Please wait or refresh the page.', 'error');
        return;
      }

      setStatus('Initializing camera...');

      // Enhanced camera constraints for better quality
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'environment',
          frameRate: { ideal: 30, min: 10 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });

        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }

        setIsScanning(true);
        setStatus('Scanning for QR codes...');
        showNotification('Scanner started successfully!');
        
        // Start scanning with optimized timing
        setTimeout(() => {
          scanFrame();
        }, 100);
      }
    } catch (error) {
      console.error('Error starting scanner:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to start scanner'}`);
      showNotification('Failed to start scanner. Please check camera permissions.', 'error');
    }
  };

  const stopScanner = () => {
    setIsScanning(false);
    setStatus('Scanner stopped');
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const scanFrame = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw video frame to canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Get image data from canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Use jsQR for QR code detection
        if (jsQRLoaded && window.jsQR) {
          try {
            const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });

            if (code) {
              console.log('QR Code detected:', code.data);
              handleQRCodeDetected(code.data);
              return;
            }
          } catch (error) {
            // Continue scanning if error occurs
            console.log('Scanning in progress...');
          }
        }
      }

      // Continue scanning
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    } catch (error) {
      console.error('Error scanning frame:', error);
      setStatus('Error scanning frame');
    }
  };

  const handleQRCodeDetected = (data: string) => {
    setScannedData(data);
    showNotification(`QR Code detected: ${data}`, 'success');
    stopScanner();
    
    // Handle the scanned data (e.g., redirect, show details, etc.)
    console.log('QR Code data:', data);
    
    // Check if the scanned data is a valid URL and redirect
    if (isValidUrl(data)) {
      showNotification(`Redirecting to: ${data}`, 'info');
      // Redirect to the URL after a short delay to show the notification
      setTimeout(() => {
        window.location.href = data;
      }, 1500);
    } else {
      // For non-URL data, just show the data without redirecting
      showNotification(`QR Code data: ${data}`, 'info');
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

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
            <Image 
              src={assetnixLogo} 
              alt="AssetNix logo" 
              width={140} 
              height={24}
            />
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
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="scanner-video"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="scanner-overlay">
              <div className="scanner-frame">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>
            </div>
            
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

          {scannedData && (
            <div className="p-3 border-top">
              <h6>Scanned Data:</h6>
              <p className="mb-2">{scannedData}</p>
              {isValidUrl(scannedData) && (
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => window.open(scannedData, '_blank')}
                >
                  Open URL
                </Button>
              )}
            </div>
          )}
        </div>
      </Modal.Body>

      {notification && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <Alert 
            variant={notification.type === 'error' ? 'danger' : notification.type === 'info' ? 'info' : 'success'}
            onClose={() => setNotification(null)}
            dismissible
          >
            {notification.message}
          </Alert>
        </div>
      )}

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
        
        .scanner-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .scanner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .scanner-frame {
          position: relative;
          width: 200px;
          height: 200px;
        }
        
        .corner {
          position: absolute;
          width: 25px;
          height: 25px;
          border: 3px solid #00ff88;
          border-radius: 3px;
        }
        
        .corner.top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }
        
        .corner.top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }
        
        .corner.bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }
        
        .corner.bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
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
        }
        
        .scanner-controls {
          background: white;
        }
      `}</style>
    </Modal>
  );
};

export default QRScannerModal;
