import React, { useState } from 'react';
import { User, Building2, UploadCloud, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { signUpWithEmailAPI } from '../action';

function Step3RoleSelection({ formData: globalFormData, onComplete, signUpWithEmail }) {
  const [role, setRole] = useState(null); // 'individual' | 'business_owner'
  const [formData, setFormData] = useState({
    identity_proof_link: '',
    id_type: 'aadhar',
    id_number: '',
    company_domain: '',
    business_registration_number: '',
    documentBase64: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalUserId = globalFormData.userId;

      // 1. Create Firebase User NOW if this was an email signup
      if (!globalFormData.isOAuth && !finalUserId) {
        const user = await signUpWithEmail(globalFormData.name, globalFormData.email, globalFormData.password);
        if (user && user.uid) {
          finalUserId = user.uid;
        } else {
          throw new Error("Failed to create Firebase account");
        }
      }

      // 2. Register User in Backend (Sync with Firebase)
      const registerRes = await axios.post('http://localhost:3001/api/v2/auth/register', {
        name: globalFormData.name || 'User',
        email: globalFormData.email,
        firebaseUid: finalUserId, // Link Fastify DB to Firebase
        role: role,
        company: formData.company_domain || ''
      });

      const userId = registerRes.data.userId || finalUserId;

      // 3. Verify User & Upload Files
      const docs = formData.documentBase64 ? [formData.documentBase64] : [];
      
      await axios.post('http://localhost:3001/api/v2/auth/verify', {
        userId,
        faceImage: globalFormData.faceImage,
        documents: docs
      });
      
      onComplete({ role, verified: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error occurred during signup');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!role ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">How will you use this platform?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setRole('individual')}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <span className="font-medium">Individual</span>
            </button>
            <button 
              onClick={() => setRole('business_owner')}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-secondary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 size={24} />
              </div>
              <span className="font-medium">Business Owner</span>
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <button 
              type="button" 
              onClick={() => setRole(null)} 
              className="text-xs text-gray-400 hover:text-white"
            >
              ← Back
            </button>
            <span className="text-sm font-medium ml-auto flex items-center gap-1 text-primary">
              {role === 'individual' ? <User size={14} /> : <Building2 size={14} />}
              {role === 'individual' ? 'Individual Setup' : 'Business Setup'}
            </span>
          </div>

          {role === 'individual' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400 pl-1">Professional Proof Link (e.g., Portfolio, GitHub, Website)</label>
                <input 
                  type="url" 
                  name="identity_proof_link"
                  required
                  value={formData.identity_proof_link}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="https://github.com/username" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 pl-1">Select ID Type</label>
                  <select
                    name="id_type"
                    value={formData.id_type}
                    onChange={handleInputChange}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option value="aadhar" className="bg-[#1c1c24]">Aadhar Card</option>
                    <option value="pan" className="bg-[#1c1c24]">PAN Card</option>
                    <option value="driving" className="bg-[#1c1c24]">Driving License</option>
                    <option value="passport" className="bg-[#1c1c24]">Passport</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 pl-1">ID Number</label>
                  <input 
                    type="text" 
                    name="id_number"
                    required
                    value={formData.id_number}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter ID number" 
                  />
                </div>
              </div>
              
              <div className="border border-dashed border-white/20 rounded-xl p-6 text-center bg-black/20 relative cursor-pointer">
                <UploadCloud className="mx-auto text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-300 mb-1">{formData.documentBase64 ? 'Document Selected' : 'Upload Official ID'}</p>
                <p className="text-xs text-gray-500">Optional for basic tier, required for verified badge.</p>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, documentBase64: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {role === 'business_owner' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400 pl-1">Company Domain</label>
                <input 
                  type="text" 
                  name="company_domain"
                  required
                  value={formData.company_domain}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="company.com" 
                />
                <p className="text-xs text-gray-500 pl-1 mt-1 flex items-center gap-1">
                  <CheckCircle size={10} className="text-green-500" /> Must match your email domain
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400 pl-1">Business Registration Number</label>
                <input 
                  type="text" 
                  name="business_registration_number"
                  required
                  value={formData.business_registration_number}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="e.g. 12345678" 
                />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-8">
            {loading ? 'Finalizing...' : 'Complete Signup'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpWithEmail: (name, email, password) => dispatch(signUpWithEmailAPI(name, email, password))
});

export default connect(null, mapDispatchToProps)(Step3RoleSelection);
