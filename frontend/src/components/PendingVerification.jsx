import React, { useEffect } from 'react';
import { Clock, ShieldAlert, LogOut, RefreshCw } from 'lucide-react';
import { connect } from 'react-redux';
import { signOutAPI, refreshUserAPI } from '../action';
import { useNavigate } from 'react-router-dom';

const PendingVerification = ({ user, signOut, refreshUser }) => {
  const navigate = useNavigate();
  const isRejected = user?.verificationStatus === 'rejected';

  // Poll Firestore every 5 seconds to check verification status
  useEffect(() => {
    if (isRejected) return;
    const interval = setInterval(() => {
      refreshUser();
    }, 5000);
    return () => clearInterval(interval);
  }, [isRejected, refreshUser]);

  // Redirect as soon as status becomes 'verified'
  useEffect(() => {
    if (user?.verificationStatus === 'verified') {
      const target = user.role === 'business_owner' ? '/organizer' : '/feed';
      navigate(target);
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className={`max-w-md w-full bg-white/5 backdrop-blur-xl border rounded-[36px] p-10 text-center shadow-[0_32px_64px_rgba(0,0,0,0.5)] ${isRejected ? 'border-red-500/25' : 'border-white/10'}`}>

        {/* Icon */}
        <div className="relative mb-8">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto ${isRejected ? 'bg-red-500/10' : 'bg-[#a855f7]/10'}`}>
            {isRejected
              ? <ShieldAlert className="text-red-500" size={52} />
              : <Clock className="text-[#a855f7]" size={52} />
            }
          </div>
          {!isRejected && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-[#a855f7]/30 animate-ping opacity-30" />
          )}
        </div>

        {/* Text */}
        <h1 className={`text-[28px] font-black mb-4 tracking-tight ${isRejected ? 'text-red-500' : 'text-white'}`}>
          {isRejected ? 'Access Denied' : 'Account Under Review'}
        </h1>

        <p className="text-white/40 text-[15px] leading-relaxed mb-8">
          {isRejected
            ? 'Your registration has been declined due to suspicious activity. Your access has been permanently restricted.'
            : 'Your profile has been submitted to the admin team. We are verifying your credentials to ensure a safe environment for all professionals.'}
        </p>

        {/* Status pill */}
        {!isRejected && (
          <div className="inline-flex items-center gap-2 bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] px-5 py-2.5 rounded-full mb-8 text-[13px] font-bold">
            <RefreshCw size={14} className="animate-spin" />
            Checking status automatically...
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {!isRejected && (
            <button
              onClick={refreshUser}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(168,85,247,0.3)]"
            >
              <RefreshCw size={16} /> Check Status Now
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-2 text-[14px] font-medium"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-[11px] text-white/20 uppercase tracking-widest font-bold">
            Average review time: 2–4 hours
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.userState.user });
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
  refreshUser: () => dispatch(refreshUserAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingVerification);
