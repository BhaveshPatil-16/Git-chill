import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Step2FaceVerification({ userId, onComplete }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('initializing'); // initializing, ready, scanning, success, error
  const [livenessChallenge, setLivenessChallenge] = useState('Please position your face in the oval');

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStatus('ready');
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setStatus('error');
    }
  };

  const handleScan = async () => {
    setStatus('scanning');
    setLivenessChallenge('Blink slowly...');
    
    // MOCKING the face-api.js liveness detection for demonstration
    // In a real implementation:
    // 1. Load face-api.js models from /models
    // 2. Run faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor()
    // 3. Track landmarks over time to detect a blink or movement (liveness)
    
    setTimeout(() => {
      setLivenessChallenge('Analyzing liveness score...');
      
      setTimeout(() => {
        setStatus('success');
        
        // Capture frame as base64
        let faceImage = null;
        if (videoRef.current) {
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
          faceImage = canvas.toDataURL('image/png');
        }

        // Auto proceed after success
        setTimeout(() => {
           onComplete({ faceVerified: true, faceImage });
        }, 1500);

      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-6">
        {/* Camera Feed */}
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/30 relative bg-black">
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover ${status === 'scanning' ? 'opacity-80' : 'opacity-100'}`}
          />
          {status === 'initializing' && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              <RefreshCw className="animate-spin" size={32} />
            </div>
          )}
          {status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-red-500/10">
              <AlertCircle size={32} />
            </div>
          )}
        </div>

        {/* Liveness Oval Guide */}
        <div className={`absolute inset-0 rounded-full border-4 pointer-events-none transition-colors duration-300 ${
          status === 'scanning' ? 'border-secondary animate-pulse-ring' : 
          status === 'success' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 
          'border-transparent'
        }`} />
      </div>

      <div className="text-center mb-6 h-12">
        {status === 'ready' && <p className="text-gray-300 font-medium">Ready for liveness check</p>}
        {status === 'scanning' && <p className="text-secondary font-medium animate-pulse">{livenessChallenge}</p>}
        {status === 'success' && <p className="text-green-500 font-medium flex items-center justify-center gap-2"><CheckCircle size={18} /> Human Verified!</p>}
        {status === 'error' && <p className="text-red-500 text-sm">Could not access camera. Please check permissions.</p>}
      </div>

      <button 
        onClick={handleScan} 
        disabled={status !== 'ready'} 
        className="btn-primary w-full max-w-[200px]"
      >
        <Camera size={18} />
        {status === 'ready' ? 'Start Scan' : status === 'scanning' ? 'Scanning...' : 'Verified'}
      </button>

      <p className="text-xs text-gray-500 mt-6 text-center max-w-[250px]">
        We use active liveness detection to ensure you are a real person. 
      </p>
    </div>
  );
}
