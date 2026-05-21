import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getDashboardStats } from '../../lib/admin';
import { 
  Download, 
  Users, 
  Building, 
  TrendingUp, 
  ArrowUpRight,
  Gauge,
  BarChart3
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, trend }) => {
  const styles = {
    green: {
      bg: 'bg-[#EBFDF5]',
      border: 'border-[#12B76A]/20',
      text: 'text-[#12B76A]'
    },
    orange: {
      bg: 'bg-[#FFF4ED]',
      border: 'border-[#FF6B00]/20',
      text: 'text-[#FF6B00]'
    },
    blue: {
      bg: 'bg-[#EFF8FF]',
      border: 'border-[#0070F3]/20',
      text: 'text-[#0070F3]'
    }
  };

  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[150px]">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-semibold text-sm">{label}</span>
        <div className={`w-10 h-10 rounded-xl ${styles[color].bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${styles[color].text}`} />
        </div>
      </div>
      <div className="flex items-end justify-between mt-4">
        <span className="text-3xl font-bold text-[#1a174d] tracking-tight">{value}</span>
        <div className="flex items-center gap-1 text-[#12B76A] bg-[#EBFDF5] px-2 py-1 rounded-md text-xs font-bold">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('90D');
  const [hoveredWeek, setHoveredWeek] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load API stats, falling back to design mockups', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Mock data matching the curve of the chart perfectly for W1 to W8
  const chartData = [
    { week: 'W1', label: 'Week 1', bookings: 240, revenue: 38, bookingsLabel: '240 Bookings', revenueLabel: '₦38M' },
    { week: 'W2', label: 'Week 2', bookings: 490, revenue: 64, bookingsLabel: '490 Bookings', revenueLabel: '₦64M' },
    { week: 'W3', label: 'Week 3', bookings: 210, revenue: 29, bookingsLabel: '210 Bookings', revenueLabel: '₦29M' },
    { week: 'W4', label: 'Week 4', bookings: 90, revenue: 10, bookingsLabel: '90 Bookings', revenueLabel: '₦10M' },
    { week: 'W5', label: 'Week 5', bookings: 480, revenue: 58, bookingsLabel: '480 Bookings', revenueLabel: '₦58M' },
    { week: 'W6', label: 'Week 6', bookings: 560, revenue: 74, bookingsLabel: '560 Bookings', revenueLabel: '₦74M' },
    { week: 'W7', label: 'Week 7', bookings: 310, revenue: 34, bookingsLabel: '310 Bookings', revenueLabel: '₦34M' },
    { week: 'W8', label: 'Week 8', bookings: 360, revenue: 42, bookingsLabel: '360 Bookings', revenueLabel: '₦42M' },
  ];

  // SVG parameters for standard plotting
  const svgWidth = 720;
  const svgHeight = 240;
  const paddingLeft = 50;
  const paddingRight = 50;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartInnerWidth = svgWidth - paddingLeft - paddingRight;
  const chartInnerHeight = svgHeight - paddingTop - paddingBottom;

  const points = chartData.map((d, index) => {
    const x = paddingLeft + (index * (chartInnerWidth / 7));
    // Bookings maps from 0 to 800
    const yBookings = svgHeight - paddingBottom - ((d.bookings / 800) * chartInnerHeight);
    // Revenue maps from 0 to 100
    const yRevenue = svgHeight - paddingBottom - ((d.revenue / 100) * chartInnerHeight);
    return { x, yBookings, yRevenue, ...d };
  });

  // Smooth bezier path generator
  const getCurvePath = (pts, key) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0][key]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0[key];
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
      const cpY2 = p1[key];
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1[key]}`;
    }
    return path;
  };

  const bookingsPath = getCurvePath(points, 'yBookings');
  const revenuePath = getCurvePath(points, 'yRevenue');

  const bookingsAreaPath = `${bookingsPath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z`;
  const revenueAreaPath = `${revenuePath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z`;

  // Dynamic mouse movements
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // calculate index
    const relativeX = x - (paddingLeft / svgWidth) * rect.width;
    const scaleWidth = ((svgWidth - paddingLeft - paddingRight) / svgWidth) * rect.width;
    const index = Math.round((relativeX / scaleWidth) * 7);
    if (index >= 0 && index <= 7) {
      setHoveredWeek(points[index]);
    } else {
      setHoveredWeek(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredWeek(null);
  };

  // Recent Bookings data
  const bookings = [
    { guest: 'Michael Okoye', property: 'Cozy Studio Lekki Phase 1', dates: 'Oct 14 - Oct 20 2025', amount: '₦182,000', status: 'Confirmed' },
    { guest: 'Jesse Tally', property: 'Downtown 2BR Apartment', dates: 'Oct 14 - Oct 20 2025', amount: '₦182,000', status: 'Pending' },
    { guest: 'Aisha Bello', property: 'Modern Duplex Abuja', dates: 'Oct 14 - Oct 20 2025', amount: '₦182,000', status: 'Cancelled' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Title and actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[#1a174d] tracking-tight">Dashboard</h1>
          <button className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 shadow-sm transition-all">
            <Download className="w-4 h-4 text-gray-400" />
            <span>Export</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Revenue" 
            value={stats?.total_revenue ? `₦${stats.total_revenue.toLocaleString()}` : "₦120,000"} 
            icon={Gauge} 
            color="green" 
            trend="12%" 
          />
          <StatCard 
            label="Total Users" 
            value={stats?.total_users || 1202} 
            icon={Users} 
            color="orange" 
            trend="12%" 
          />
          <StatCard 
            label="Active Listings" 
            value={stats?.active_properties || 156} 
            icon={BarChart3} 
            color="blue" 
            trend="12%" 
          />
        </div>

        {/* Graph Segment */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1a174d]">Revenue & Bookings Overview</h2>
            
            {/* Custom Tab selector */}
            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
              {['7D', '30D', '90D', '180D', '12M'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="relative w-full overflow-x-auto">
            <div 
              className="relative min-w-[760px] h-[260px] mx-auto select-none cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Double area chart SVG */}
              <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Definitions for gorgeous gradients */}
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.00" />
                  </linearGradient>
                  <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b19ffb" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#b19ffb" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Horizontal gridlines */}
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                  const yVal = paddingTop + (idx * (chartInnerHeight / 6));
                  return (
                    <line 
                      key={idx} 
                      x1={paddingLeft} 
                      y1={yVal} 
                      x2={svgWidth - paddingRight} 
                      y2={yVal} 
                      stroke="#f1f5f9" 
                      strokeDasharray="4 4" 
                    />
                  );
                })}

                {/* Vertical gridlines */}
                {points.map((pt, idx) => (
                  <line 
                    key={idx} 
                    x1={pt.x} 
                    y1={paddingTop} 
                    x2={pt.x} 
                    y2={svgHeight - paddingBottom} 
                    stroke="#f8fafc" 
                    strokeWidth="1" 
                  />
                ))}

                {/* Left Y Axis Labels (Revenue ₦) */}
                <g className="text-[10px] fill-gray-400 font-semibold">
                  <text x={10} y={paddingTop + 5}>₦100M</text>
                  <text x={10} y={paddingTop + 1 * (chartInnerHeight / 6) + 5}>₦50M</text>
                  <text x={10} y={paddingTop + 2 * (chartInnerHeight / 6) + 5}>₦20M</text>
                  <text x={10} y={paddingTop + 3 * (chartInnerHeight / 6) + 5}>₦10M</text>
                  <text x={10} y={paddingTop + 4 * (chartInnerHeight / 6) + 5}>₦5M</text>
                  <text x={10} y={paddingTop + 5 * (chartInnerHeight / 6) + 5}>₦1M</text>
                  <text x={10} y={svgHeight - paddingBottom + 5}>0</text>
                </g>

                {/* Right Y Axis Labels (Bookings Count) */}
                <g className="text-[10px] fill-gray-400 font-semibold text-right" style={{ textAnchor: 'end' }}>
                  <text x={svgWidth - 10} y={paddingTop + 5}>800</text>
                  <text x={svgWidth - 10} y={paddingTop + 1 * (chartInnerHeight / 6) + 5}>500</text>
                  <text x={svgWidth - 10} y={paddingTop + 2 * (chartInnerHeight / 6) + 5}>300</text>
                  <text x={svgWidth - 10} y={paddingTop + 3 * (chartInnerHeight / 6) + 5}>200</text>
                  <text x={svgWidth - 10} y={paddingTop + 4 * (chartInnerHeight / 6) + 5}>100</text>
                  <text x={svgWidth - 10} y={svgHeight - paddingBottom + 5}>0</text>
                </g>

                {/* Area under curves */}
                <path d={bookingsAreaPath} fill="url(#bookingsGrad)" />
                <path d={revenueAreaPath} fill="url(#revenueGrad)" />

                {/* Stroke Lines */}
                <path d={bookingsPath} fill="none" stroke="#b19ffb" strokeWidth="2.5" />
                <path d={revenuePath} fill="none" stroke="#ff6b00" strokeWidth="2.5" />

                {/* Point markers on curves */}
                {points.map((pt, idx) => (
                  <g key={idx}>
                    {/* Bookings Node */}
                    <circle 
                      cx={pt.x} 
                      cy={pt.yBookings} 
                      r="4.5" 
                      fill="white" 
                      stroke="#b19ffb" 
                      strokeWidth="2.5" 
                    />
                    {/* Revenue Node */}
                    <circle 
                      cx={pt.x} 
                      cy={pt.yRevenue} 
                      r="4.5" 
                      fill="white" 
                      stroke="#ff6b00" 
                      strokeWidth="2.5" 
                    />
                  </g>
                ))}

                {/* Dynamic Hover Indicator */}
                {hoveredWeek && (
                  <g>
                    {/* Hover vertical dotted lines */}
                    <line 
                      x1={hoveredWeek.x} 
                      y1={paddingTop} 
                      x2={hoveredWeek.x} 
                      y2={svgHeight - paddingBottom} 
                      stroke="#94a3b8" 
                      strokeWidth="1.5" 
                      strokeDasharray="3 3" 
                    />
                    <circle cx={hoveredWeek.x} cy={hoveredWeek.yBookings} r="7" fill="#b19ffb" fillOpacity="0.4" />
                    <circle cx={hoveredWeek.x} cy={hoveredWeek.yBookings} r="3" fill="#6366f1" />
                    
                    <circle cx={hoveredWeek.x} cy={hoveredWeek.yRevenue} r="7" fill="#ff6b00" fillOpacity="0.4" />
                    <circle cx={hoveredWeek.x} cy={hoveredWeek.yRevenue} r="3" fill="#ff6b00" />
                  </g>
                )}

                {/* X Axis Labels */}
                {points.map((pt, idx) => (
                  <text 
                    key={idx} 
                    x={pt.x} 
                    y={svgHeight - 8} 
                    className="text-[10px] fill-gray-400 font-bold" 
                    style={{ textAnchor: 'middle' }}
                  >
                    {pt.week}
                  </text>
                ))}
              </svg>

              {/* Floating Tooltip card */}
              {hoveredWeek && (
                <div 
                  className="absolute z-20 bg-white border border-gray-100 rounded-xl p-3 shadow-xl pointer-events-none transition-all duration-75 text-xs flex flex-col gap-1 w-36"
                  style={{
                    left: `${Math.min(Math.max((hoveredWeek.x / svgWidth) * 100 - 8, 2), 80)}%`,
                    top: '20px'
                  }}
                >
                  <span className="font-bold text-[#1a174d] text-center border-b border-gray-50 pb-1 mb-1">{hoveredWeek.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff6b00]"></span>
                    <span className="text-gray-500">Rev:</span>
                    <span className="font-bold text-gray-700 ml-auto">{hoveredWeek.revenueLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#b19ffb]"></span>
                    <span className="text-gray-500">Bookings:</span>
                    <span className="font-bold text-gray-700 ml-auto">{hoveredWeek.bookings}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom legend row */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#b19ffb]"></span>
              <span className="text-gray-400">Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff6b00]"></span>
              <span className="text-gray-400">Revenue</span>
            </div>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1a174d]">Recent Bookings</h2>
            <Link to="/admin/rides" className="text-xs font-bold text-[#ff6b00] hover:text-orange-600 transition-colors">
              View All
            </Link>
          </div>

          {/* Dynamic high fidelity Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wider w-[25%]">Guest</th>
                  <th className="text-left py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wider w-[30%]">Property</th>
                  <th className="text-left py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wider w-[20%]">Dates</th>
                  <th className="text-left py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wider w-[12%]">Amount</th>
                  <th className="text-left py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wider w-[13%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {bookings.map((b, idx) => {
                  const statusStyles = {
                    Confirmed: 'text-[#12B76A] bg-[#EBFDF5]',
                    Pending: 'text-[#FF6B00] bg-[#FFF4ED]',
                    Cancelled: 'text-[#F04438] bg-[#FEF3F2]',
                  };

                  return (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="py-4 font-bold text-gray-700">{b.guest}</td>
                      <td className="py-4 text-gray-500 font-medium">{b.property}</td>
                      <td className="py-4 text-gray-400 font-medium">{b.dates}</td>
                      <td className="py-4 font-extrabold text-[#1a174d]">{b.amount}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyles[b.status] || 'text-gray-500 bg-gray-50'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
