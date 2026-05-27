import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getAdminUserDetail, changeUserRole, verifyVendor, changeUserStatus } from '../../lib/admin';
import { isPendingVendorRequest, isVendorVerifiedBySuperAdmin } from '../../lib/vendorEligibility';

const AdminUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const res = await getAdminUserDetail(id);
      setUser(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, [id]);

  const handleRoleChange = async (newRole) => {
    if (!confirm(`Change role to "${newRole}"?`)) return;
    setActionLoading('role');
    try {
      const res = await changeUserRole(id, newRole);
      setUser(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleVerifyVendor = async (action) => {
    const reason = action === 'reject' ? prompt('Reason for rejection:') : null;
    if (action === 'reject' && reason === null) return;
    setActionLoading('verify');
    try {
      const res = await verifyVendor(id, action, reason);
      setUser(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleToggleStatus = async () => {
    setActionLoading('status');
    try {
      const res = await changeUserStatus(id, !user.is_active);
      setUser(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !user) {
    return (
      <AdminLayout>
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-[#F04438] font-bold">{error || 'User not found'}</p>
          <Link to="/admin/users" className="text-[#ff6b00] font-bold text-sm mt-3 inline-block hover:underline">← Back to Users</Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back link */}
        <Link to="/admin/users" className="text-gray-400 hover:text-gray-600 text-sm font-bold flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Users
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-100" />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </div>
              )}
              <h3 className="text-[#1a174d] text-lg font-bold">{user.first_name} {user.last_name}</h3>
              <p className="text-gray-500 font-semibold text-sm">{user.email}</p>
              {user.username && <p className="text-gray-400 text-xs font-semibold mt-1">@{user.username}</p>}

              <div className="flex items-center justify-center gap-2 mt-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  user.role === 'superadmin' ? 'bg-orange-50 text-[#FF6B00]' :
                  user.role === 'vendor' ? 'bg-purple-50 text-[#8B5CF6]' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {user.role}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${user.is_active ? 'bg-emerald-50 text-[#12B76A]' : 'bg-rose-50 text-[#F04438]'}`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-[#1a174d] font-bold text-sm mb-4">Account Status</h4>
              <button
                onClick={handleToggleStatus}
                disabled={actionLoading === 'status'}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  user.is_active
                    ? 'bg-rose-50 text-[#F04438] hover:bg-rose-100 border border-rose-200/50'
                    : 'bg-emerald-50 text-[#12B76A] hover:bg-emerald-100 border border-emerald-200/50'
                }`}
              >
                {actionLoading === 'status' ? 'Processing...' : user.is_active ? 'Deactivate Account' : 'Activate Account'}
              </button>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-[#1a174d] font-bold text-lg mb-5 border-b border-gray-50 pb-2">Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="Phone" value={user.phone_number} />
                <InfoItem label="Address" value={user.address} />
                <InfoItem label="Email Verified" value={user.is_verified ? 'Yes ✓' : 'No'} />
                <InfoItem label="Joined" value={new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
              </div>
            </div>

            {/* ID Verification */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-[#1a174d] font-bold text-lg mb-5 border-b border-gray-50 pb-2">ID Verification</h4>
              <div className="space-y-4">
                <InfoItem label="Status" value={user.id_verification_status || 'none'} />
                {user.id_verification_url ? (
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Document:</p>
                    <a href={user.id_verification_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-orange-50 text-[#ff6b00] hover:bg-[#FFF4ED]/80 text-xs font-bold rounded-xl transition-all shadow-sm">
                      View Document →
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm font-semibold">No document uploaded.</p>
                )}
              </div>
            </div>

            {/* Vendor Verification */}
            {(user.role === 'vendor' || isPendingVendorRequest(user) || isVendorVerifiedBySuperAdmin(user)) && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h4 className="text-[#1a174d] font-bold text-lg mb-5 border-b border-gray-50 pb-2">Vendor Verification</h4>
                <div className="space-y-4">
                  <InfoItem label="Verified" value={isVendorVerifiedBySuperAdmin(user) ? 'Yes ✓' : 'No'} />
                  {!isVendorVerifiedBySuperAdmin(user) && isPendingVendorRequest(user) && (
                    <InfoItem label="Request Status" value="Pending Super Admin Review" />
                  )}
                  {user.vendor_verified_at && (
                    <InfoItem label="Verified At" value={new Date(user.vendor_verified_at).toLocaleString()} />
                  )}
                  {!isVendorVerifiedBySuperAdmin(user) && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleVerifyVendor('approve')}
                        disabled={actionLoading === 'verify'}
                        className="px-5 py-2.5 bg-[#12B76A] hover:bg-[#12B76A]/90 text-white text-sm font-bold rounded-xl transition-all shadow-md"
                      >
                        {actionLoading === 'verify' ? '...' : 'Approve Vendor'}
                      </button>
                      <button
                        onClick={() => handleVerifyVendor('reject')}
                        disabled={actionLoading === 'verify'}
                        className="px-5 py-2.5 bg-rose-50 text-[#F04438] hover:bg-rose-100 border border-rose-200/50 text-sm font-bold rounded-xl transition-all shadow-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Role Management */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-[#1a174d] font-bold text-lg mb-5 border-b border-gray-50 pb-2">Role Management</h4>
              <p className="text-gray-400 text-sm font-semibold mb-4">Current role: <span className="text-[#1a174d] font-bold">{user.role}</span></p>
              <div className="flex flex-wrap gap-3">
                {['user', 'vendor', 'superadmin'].filter(r => r !== user.role).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    disabled={actionLoading === 'role'}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold text-xs rounded-xl border border-gray-200/50 transition-all shadow-sm"
                  >
                    {actionLoading === 'role' ? '...' : `Change to ${role}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
    <p className="text-[#1a174d] font-bold text-sm">{value || <span className="text-gray-400 font-medium">—</span>}</p>
  </div>
);

export default AdminUserDetail;
