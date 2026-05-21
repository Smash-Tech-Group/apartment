import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { getAdminRides, changeRideStatus } from '../../lib/admin';

const STATUS_COLORS = {
  published: 'bg-emerald-50 text-[#12B76A]',
  draft: 'bg-gray-50 text-gray-500',
  inactive: 'bg-gray-50 text-gray-400',
  pending_approval: 'bg-orange-50 text-[#FF6B00]',
  rejected: 'bg-rose-50 text-[#F04438]',
  suspended: 'bg-rose-50 text-[#F04438]',
};

const AdminRides = () => {
  const [rides, setRides] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState('');

  const fetchRides = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminRides({ status: statusFilter || undefined, search: search || undefined, page, limit: 20 });
      setRides(res.data?.rides || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error('Failed to fetch rides:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, page]);

  useEffect(() => { fetchRides(); }, [fetchRides]);

  const handleStatusChange = async (rideId, newStatus) => {
    const notes = newStatus === 'rejected' ? prompt('Rejection reason:') : null;
    if (newStatus === 'rejected' && notes === null) return;
    setActionLoading(rideId);
    try {
      await changeRideStatus(rideId, newStatus, notes);
      await fetchRides();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-[#1a174d] tracking-tight">Bookings Management</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={e => { e.preventDefault(); setPage(1); fetchRides(); }} className="flex-1 flex gap-2">
            <input 
              type="text" 
              placeholder="Search by pickup location..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-700 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#ff6b00]/50 shadow-sm" 
            />
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-[#ff6b00] hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </form>
          <select 
            value={statusFilter} 
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-[#ff6b00]/50 shadow-sm cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <p className="text-gray-400 text-sm font-semibold">{total} ride{total !== 1 ? 's' : ''} found</p>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : rides.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-bold">No rides found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Ride</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Owner</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Created</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {rides.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-[#1a174d] font-bold capitalize">{r.ride_type} • {r.seat_count} seats</p>
                        <p className="text-gray-400 font-medium text-xs truncate max-w-[200px]">{r.pickup_location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 font-bold">{r.owner_name || '—'}</p>
                        <p className="text-gray-400 font-medium text-xs">{r.owner_email || ''}</p>
                      </td>
                      <td className="px-6 py-4 text-[#1a174d] font-extrabold">{r.currency} {r.price?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[r.status] || 'bg-gray-50 text-gray-500'}`}>
                          {r.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-medium text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {r.status === 'pending_approval' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(r.id, 'published')} 
                                disabled={actionLoading === r.id}
                                className="px-3 py-1.5 text-xs font-bold text-[#12B76A] bg-[#EBFDF5] hover:bg-[#EBFDF5]/80 rounded-xl transition-all shadow-sm"
                              >
                                {actionLoading === r.id ? '...' : 'Approve'}
                              </button>
                              <button 
                                onClick={() => handleStatusChange(r.id, 'rejected')} 
                                disabled={actionLoading === r.id}
                                className="px-3 py-1.5 text-xs font-bold text-[#F04438] bg-[#FEF3F2] hover:bg-[#FEF3F2]/80 rounded-xl transition-all shadow-sm"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {r.status === 'published' && (
                            <button 
                              onClick={() => handleStatusChange(r.id, 'suspended')} 
                              disabled={actionLoading === r.id}
                              className="px-3 py-1.5 text-xs font-bold text-[#FF6B00] bg-[#FFF4ED] hover:bg-[#FFF4ED]/80 rounded-xl transition-all shadow-sm"
                            >
                              Suspend
                            </button>
                          )}
                          {(r.status === 'suspended' || r.status === 'rejected') && (
                            <button 
                              onClick={() => handleStatusChange(r.id, 'published')} 
                              disabled={actionLoading === r.id}
                              className="px-3 py-1.5 text-xs font-bold text-[#12B76A] bg-[#EBFDF5] hover:bg-[#EBFDF5]/80 rounded-xl transition-all shadow-sm"
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl shadow-sm disabled:opacity-40 transition-colors font-bold"
            >
              Previous
            </button>
            <span className="text-gray-400 font-bold text-sm">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl shadow-sm disabled:opacity-40 transition-colors font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRides;
