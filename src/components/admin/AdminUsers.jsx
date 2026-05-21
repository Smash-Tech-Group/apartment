import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getAdminUsers, changeUserRole, changeUserStatus } from '../../lib/admin';

const ROLE_BADGES = {
  user: 'bg-gray-50 text-gray-500',
  vendor: 'bg-purple-50 text-[#8B5CF6]',
  superadmin: 'bg-orange-50 text-[#FF6B00]',
};

const AdminUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || '');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers({ search: search || undefined, role: roleFilter || undefined, page, limit: 20 });
      setUsers(res.data?.users || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    setActionLoading(userId);
    try {
      await changeUserStatus(userId, !currentStatus);
      await fetchUsers();
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
        <h1 className="text-3xl font-extrabold text-[#1a174d] tracking-tight">Users Management</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, or username..."
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
            value={roleFilter}
            onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-700 text-sm focus:outline-none focus:border-[#ff6b00]/50 shadow-sm cursor-pointer"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-gray-400 text-sm font-semibold">{total} user{total !== 1 ? 's' : ''} found</p>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-bold">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Vendor Status</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Joined</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                            {u.first_name?.[0]}{u.last_name?.[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[#1a174d] font-bold truncate">{u.first_name} {u.last_name}</p>
                            <p className="text-gray-400 font-medium text-xs truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${ROLE_BADGES[u.role] || ROLE_BADGES.user}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.role === 'vendor' ? (
                          <span className={`text-xs font-bold inline-flex items-center px-2.5 py-1 rounded-full ${u.vendor_verified ? 'text-[#12B76A] bg-[#EBFDF5]' : 'text-[#FF6B00] bg-[#FFF4ED]'}`}>
                            {u.vendor_verified ? '✓ Verified' : '⏳ Pending'}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${u.is_active ? 'bg-[#12B76A]' : 'bg-[#F04438]'}`}></span>
                        <span className={`text-xs font-bold ${u.is_active ? 'text-[#12B76A]' : 'text-[#F04438]'}`}>
                          {u.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-medium text-xs">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/users/${u.id}`}
                            className="px-3 py-1.5 text-xs font-bold text-[#ff6b00] bg-orange-50 hover:bg-[#FFF4ED]/80 rounded-xl transition-all shadow-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(u.id, u.is_active)}
                            disabled={actionLoading === u.id}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                              u.is_active
                                ? 'text-[#F04438] bg-[#FEF3F2] hover:bg-[#FEF3F2]/80'
                                : 'text-[#12B76A] bg-[#EBFDF5] hover:bg-[#EBFDF5]/80'
                            }`}
                          >
                            {actionLoading === u.id ? '...' : u.is_active ? 'Deactivate' : 'Activate'}
                          </button>
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

export default AdminUsers;
