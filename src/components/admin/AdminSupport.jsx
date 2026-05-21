import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { getAdminTickets, changeTicketStatus } from '../../lib/admin';

const STATUS_COLORS = {
  open: 'bg-rose-50 text-[#F04438]',
  in_progress: 'bg-orange-50 text-[#FF6B00]',
  resolved: 'bg-emerald-50 text-[#12B76A]',
};

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState('');
  const [expanded, setExpanded] = useState(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminTickets({ status: statusFilter || undefined, page, limit: 20 });
      setTickets(res.data?.tickets || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleStatusChange = async (ticketId, newStatus) => {
    setActionLoading(ticketId);
    try {
      await changeTicketStatus(ticketId, newStatus);
      await fetchTickets();
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
        <h1 className="text-3xl font-extrabold text-[#1a174d] tracking-tight">Support Tickets</h1>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <select 
            value={statusFilter} 
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-[#ff6b00]/50 shadow-sm cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <p className="text-gray-400 text-sm font-semibold">{total} ticket{total !== 1 ? 's' : ''} found</p>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl text-center py-16 text-gray-400 font-bold shadow-sm">No tickets found.</div>
          ) : (
            tickets.map(t => (
              <div 
                key={t.id} 
                className="bg-white border border-gray-100/80 rounded-3xl overflow-hidden hover:border-[#ff6b00]/20 hover:shadow-md transition-all shadow-sm"
              >
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[t.status] || 'bg-gray-50 text-gray-500'}`}>
                      {t.status?.replace('_', ' ')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[#1a174d] font-bold text-sm truncate">{t.subject}</p>
                      <p className="text-gray-400 text-xs font-semibold mt-0.5">{t.user_name} • {t.category} • {new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${expanded === t.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {expanded === t.id && (
                  <div className="px-6 pb-6 border-t border-gray-50 pt-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">User</p>
                        <p className="text-[#1a174d] font-bold text-sm">{t.user_name}</p>
                        <p className="text-gray-400 text-xs font-medium">{t.user_email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Category</p>
                        <p className="text-[#1a174d] font-bold text-sm">{t.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Message</p>
                      <p className="text-gray-700 text-sm leading-relaxed bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 font-medium">{t.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {t.status !== 'in_progress' && (
                        <button 
                          onClick={() => handleStatusChange(t.id, 'in_progress')} 
                          disabled={actionLoading === t.id}
                          className="px-4 py-2 text-xs font-bold text-[#FF6B00] bg-[#FFF4ED] hover:bg-[#FFF4ED]/80 rounded-xl transition-all shadow-sm"
                        >
                          {actionLoading === t.id ? '...' : 'Mark In Progress'}
                        </button>
                      )}
                      {t.status !== 'resolved' && (
                        <button 
                          onClick={() => handleStatusChange(t.id, 'resolved')} 
                          disabled={actionLoading === t.id}
                          className="px-4 py-2 text-xs font-bold text-[#12B76A] bg-[#EBFDF5] hover:bg-[#EBFDF5]/80 rounded-xl transition-all shadow-sm"
                        >
                          {actionLoading === t.id ? '...' : 'Mark Resolved'}
                        </button>
                      )}
                      {t.status !== 'open' && (
                        <button 
                          onClick={() => handleStatusChange(t.id, 'open')} 
                          disabled={actionLoading === t.id}
                          className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all shadow-sm border border-gray-200/50"
                        >
                          {actionLoading === t.id ? '...' : 'Reopen'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
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

export default AdminSupport;
