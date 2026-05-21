import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { getAdminProperties, changePropertyStatus, getAdminPropertyDetail } from '../../lib/admin';
import { X, Bed, Bath, Users, MapPin, Info, Play } from 'lucide-react';

const STATUS_COLORS = {
  active: 'bg-emerald-50 text-[#12B76A]',
  pending_approval: 'bg-orange-50 text-[#FF6B00]',
  rejected: 'bg-rose-50 text-[#F04438]',
  suspended: 'bg-rose-50 text-[#F04438]',
};

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminProperties({ status: statusFilter || undefined, search: search || undefined, page, limit: 20 });
      setProperties(res.data?.properties || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, page]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const handleStatusChange = async (propertyId, newStatus) => {
    const notes = newStatus === 'rejected' ? prompt('Rejection reason:') : null;
    if (newStatus === 'rejected' && notes === null) return;
    setActionLoading(propertyId);
    try {
      await changePropertyStatus(propertyId, newStatus, notes);
      await fetchProperties();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleViewProperty = async (propertyId) => {
    try {
      const res = await getAdminPropertyDetail(propertyId);
      setSelectedProperty(res.data);
      setActivePhotoIdx(0);
    } catch (err) {
      alert("Failed to load listing details: " + err.message);
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-[#1a174d] tracking-tight">Listings Management</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={e => { e.preventDefault(); setPage(1); fetchProperties(); }} className="flex-1 flex gap-2">
            <input 
              type="text" 
              placeholder="Search by name or location..." 
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
            <option value="active">Active</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <p className="text-gray-400 text-sm font-semibold">{total} propert{total !== 1 ? 'ies' : 'y'} found</p>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-bold">No properties found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Property</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Owner</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Created</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-bold text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {properties.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                      <td 
                        onClick={() => handleViewProperty(p.id)}
                        className="px-6 py-4 cursor-pointer group/cell"
                      >
                        <p className="text-[#1a174d] font-bold truncate max-w-[200px] group-hover/cell:text-[#ff6b00] group-hover/cell:underline transition-all">{p.name}</p>
                        <p className="text-gray-400 font-medium text-xs truncate max-w-[200px]">{p.location}</p>
                      </td>
                      <td 
                        onClick={() => handleViewProperty(p.id)}
                        className="px-6 py-4 cursor-pointer group/cell"
                      >
                        <p className="text-gray-700 font-bold group-hover/cell:text-[#ff6b00] group-hover/cell:underline transition-all">{p.owner_name || '—'}</p>
                        <p className="text-gray-400 font-medium text-xs">{p.owner_email || ''}</p>
                      </td>
                      <td className="px-6 py-4 text-[#1a174d] font-extrabold">₦{p.price?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[p.status] || 'bg-gray-50 text-gray-500'}`}>
                          {p.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-medium text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.status === 'pending_approval' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(p.id, 'active')} 
                                disabled={actionLoading === p.id}
                                className="px-3 py-1.5 text-xs font-bold text-[#12B76A] bg-[#EBFDF5] hover:bg-[#EBFDF5]/80 rounded-xl transition-all shadow-sm"
                              >
                                {actionLoading === p.id ? '...' : 'Approve'}
                              </button>
                              <button 
                                onClick={() => handleStatusChange(p.id, 'rejected')} 
                                disabled={actionLoading === p.id}
                                className="px-3 py-1.5 text-xs font-bold text-[#F04438] bg-[#FEF3F2] hover:bg-[#FEF3F2]/80 rounded-xl transition-all shadow-sm"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {p.status === 'active' && (
                            <button 
                              onClick={() => handleStatusChange(p.id, 'suspended')} 
                              disabled={actionLoading === p.id}
                              className="px-3 py-1.5 text-xs font-bold text-[#FF6B00] bg-[#FFF4ED] hover:bg-[#FFF4ED]/80 rounded-xl transition-all shadow-sm"
                            >
                              Suspend
                            </button>
                          )}
                          {(p.status === 'suspended' || p.status === 'rejected') && (
                            <button 
                              onClick={() => handleStatusChange(p.id, 'active')} 
                              disabled={actionLoading === p.id}
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

        {/* Full Details Modal Overlay */}
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-[#1a174d]">{selectedProperty.name}</h2>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{selectedProperty.type} • Listing ID: {selectedProperty.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Photo Gallery Carousel */}
                {selectedProperty.photos && selectedProperty.photos.length > 0 ? (
                  <div className="space-y-2">
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                      <img 
                        src={selectedProperty.photos[activePhotoIdx] || selectedProperty.photos[0]} 
                        alt="Property listing" 
                        className="w-full h-full object-cover"
                      />
                      {selectedProperty.photos.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
                          {activePhotoIdx + 1} of {selectedProperty.photos.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail selector */}
                    {selectedProperty.photos.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                        {selectedProperty.photos.map((photo, index) => (
                          <button 
                            key={index}
                            onClick={() => setActivePhotoIdx(index)}
                            className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                              activePhotoIdx === index ? 'border-[#ff6b00]' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-orange-50 to-[#FFF5F0] rounded-2xl flex flex-col items-center justify-center text-[#ff6b00]/40 border border-orange-100">
                    <Info className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-sm font-bold mt-2">No photos uploaded</span>
                  </div>
                )}

                {/* Detailed Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Description</span>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed whitespace-pre-line">
                        {selectedProperty.description || "No description provided."}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl text-center">
                        <Bed className="w-5 h-5 text-[#ff6b00] mx-auto mb-1" />
                        <span className="text-xs text-gray-400 font-bold block">Beds</span>
                        <span className="text-sm text-[#1a174d] font-extrabold">{selectedProperty.beds || 0}</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl text-center">
                        <Bath className="w-5 h-5 text-[#ff6b00] mx-auto mb-1" />
                        <span className="text-xs text-gray-400 font-bold block">Baths</span>
                        <span className="text-sm text-[#1a174d] font-extrabold">{selectedProperty.baths || 0}</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl text-center">
                        <Users className="w-5 h-5 text-[#ff6b00] mx-auto mb-1" />
                        <span className="text-xs text-gray-400 font-bold block">Guests</span>
                        <span className="text-sm text-[#1a174d] font-extrabold">
                          {typeof selectedProperty.guests === 'object' 
                            ? (selectedProperty.guests?.adults || 1) + (selectedProperty.guests?.children || 0) 
                            : selectedProperty.guests || 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing, Location, Owner */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                        <span className="text-xs text-gray-400 font-bold">Price per night</span>
                        <span className="text-lg text-[#1a174d] font-black">₦{selectedProperty.price?.toLocaleString()}</span>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-gray-600 block">Location</span>
                          <span className="truncate block font-medium">{selectedProperty.location}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-gray-500 pt-1 border-t border-gray-200/50">
                        <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-gray-600 block">Current Status</span>
                          <span className="capitalize font-extrabold text-[#ff6b00]">{selectedProperty.status?.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Owner card */}
                    <div className="bg-[#FFF5F0]/30 border border-[#ff6b00]/10 p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Listed By</span>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ff6b00] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {selectedProperty.owner_name?.[0] || 'O'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#1a174d] text-sm font-bold truncate">{selectedProperty.owner_name || 'Owner'}</p>
                          <p className="text-gray-400 text-xs truncate">{selectedProperty.owner_email || 'No email'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities Section */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">Amenities</span>
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 border border-orange-100/30 text-[#ff6b00] text-xs font-bold rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs italic">No amenities specified for this property.</p>
                  )}
                </div>

                {/* Video tour section if video_url exists */}
                {selectedProperty.video_url && (
                  <div className="border-t border-gray-100 pt-4">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">Video Tour</span>
                    <a 
                      href={selectedProperty.video_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#ff6b00] hover:text-orange-600 transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Watch Video Tour</span>
                    </a>
                  </div>
                )}

                {/* Rejection reason / Admin notes */}
                {selectedProperty.admin_notes && (
                  <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold text-[#F04438] tracking-wider block">Admin Notes / Remarks</span>
                    <p className="text-gray-600 text-xs mt-1 italic font-medium">"{selectedProperty.admin_notes}"</p>
                  </div>
                )}

              </div>

              {/* Modal Actions Footer */}
              <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-end gap-2 rounded-b-3xl">
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-500 font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Close
                </button>

                {selectedProperty.status === 'pending_approval' && (
                  <>
                    <button 
                      onClick={() => {
                        handleStatusChange(selectedProperty.id, 'active');
                        setSelectedProperty(prev => ({ ...prev, status: 'active' }));
                      }} 
                      disabled={actionLoading === selectedProperty.id}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#12B76A] hover:bg-[#12B76A]/90 rounded-xl transition-all shadow-md"
                    >
                      {actionLoading === selectedProperty.id ? '...' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => {
                        handleStatusChange(selectedProperty.id, 'rejected');
                        setSelectedProperty(null);
                      }} 
                      disabled={actionLoading === selectedProperty.id}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#F04438] hover:bg-[#F04438]/90 rounded-xl transition-all shadow-md"
                    >
                      Reject
                    </button>
                  </>
                )}
                {selectedProperty.status === 'active' && (
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedProperty.id, 'suspended');
                      setSelectedProperty(prev => ({ ...prev, status: 'suspended' }));
                    }} 
                    disabled={actionLoading === selectedProperty.id}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#FF6B00] hover:bg-orange-600 rounded-xl transition-all shadow-md"
                  >
                    Suspend
                  </button>
                )}
                {(selectedProperty.status === 'suspended' || selectedProperty.status === 'rejected') && (
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedProperty.id, 'active');
                      setSelectedProperty(prev => ({ ...prev, status: 'active' }));
                    }} 
                    disabled={actionLoading === selectedProperty.id}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#12B76A] hover:bg-emerald-600 rounded-xl transition-all shadow-md"
                  >
                    Reactivate
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
