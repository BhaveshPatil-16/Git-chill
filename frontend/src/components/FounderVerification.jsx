import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ShieldCheck, Building, FileText, CheckCircle, AlertCircle, Send } from 'lucide-react';

const FounderVerification = ({ user }) => {
  const [formData, setFormData] = useState({ entityName: '', documentUrl: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3001/api/v2/investment/verify-owner', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', msg: 'Verification docs submitted! Admin will review shortly.' });
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Connection failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user?.founderStatus === 'verified') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={40} className="text-green-500" />
        </div>
        <h2 className="text-[28px] font-black text-white mb-2">You are a Verified Founder</h2>
        <p className="text-white/40 max-w-[400px]">Your entity ownership has been confirmed. You can now list deals with the 'Verified Founder' badge.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto space-y-8 py-10 animate-fadeIn">
      <div className="text-center space-y-3">
        <h1 className="text-[36px] font-black text-white tracking-tight">Founder Verification</h1>
        <p className="text-white/40 font-medium">Upload proof of ownership to unlock direct investor handshake privileges.</p>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-[32px] p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-black text-white/30 uppercase tracking-widest">Entity / Company Name</label>
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="e.g. Acme Corp Industries"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:border-purple-500/50 transition-all outline-none"
                value={formData.entityName}
                onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-black text-white/30 uppercase tracking-widest">Ownership Document URL (Cloud Link)</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="url"
                placeholder="https://drive.google.com/..."
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:border-purple-500/50 transition-all outline-none"
                value={formData.documentUrl}
                onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                required
              />
            </div>
            <p className="text-[11px] text-white/20 pl-2">Upload your Incorporation Certificate or Shareholding pattern to a secure drive and paste the link.</p>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || user?.founderStatus === 'pending'}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-black text-[16px] shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : user?.founderStatus === 'pending' ? 'Review in Progress' : <><Send size={20} /> Submit for Founder Verification</>}
          </button>
        </form>

        {status.msg && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-[14px] font-bold border ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {status.msg}
          </div>
        )}
      </div>

      <div className="bg-white/3 border border-white/5 rounded-[24px] p-6 text-center">
         <p className="text-[13px] text-white/30 font-medium">
           Your data is encrypted and only visible to authorized platform administrators during the verification process.
         </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.userState.user });
export default connect(mapStateToProps)(FounderVerification);
