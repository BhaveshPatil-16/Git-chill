import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Credentials from '../components/Step1Credentials';
import Step2FaceVerification from '../components/Step2FaceVerification';
import Step3RoleSelection from '../components/Step3RoleSelection';
import { ShieldCheck, UserCircle, Briefcase } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleStepComplete = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (stepData.userId) setUserId(stepData.userId);
    setStep(prev => prev + 1);
  };

  const steps = [
    { id: 1, label: 'Credentials', icon: <UserCircle size={20} /> },
    { id: 2, label: 'Verification', icon: <ShieldCheck size={20} /> },
    { id: 3, label: 'Identity', icon: <Briefcase size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400">Secure verification-first onboarding</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8 relative px-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                step >= s.id ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-surface border border-white/10 text-gray-500'
              }`}>
                {s.icon}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? 'text-primary' : 'text-gray-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-panel p-6 sm:p-8">
          {step === 1 && <Step1Credentials onComplete={handleStepComplete} />}
          {step === 2 && <Step2FaceVerification userId={userId} onComplete={handleStepComplete} />}
          {step === 3 && <Step3RoleSelection formData={formData} onComplete={handleStepComplete} />}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
              <p className="text-gray-400 mb-6">Your identity has been securely verified.</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/profile')}
              >
                Go to Profile
              </button>
            </div>
          )}

          {step === 1 && (
            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button onClick={() => navigate('/signin')} className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
