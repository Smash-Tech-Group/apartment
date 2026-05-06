import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import Lock from '../assets/icons/2.svg';
import { useAuth } from '../context/AuthContext';
import { getPayments } from '../lib/payment';
import { ChevronDown, Download, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [receiptPayment, setReceiptPayment] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef(null);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) fetchPayments();
  }, [authLoading]);

  useEffect(() => {
    if (receiptPayment) {
      generatePDF();
    }
  }, [receiptPayment]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPayments(1, 5);
      setPayments(res.data.items);
      setTotalPages(res.data.pages);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "2-digit", year: "2-digit"
    }).replace(/\//g, "-");
  };

  const formatLongDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const formatPurpose = (purpose) => {
    if (purpose === "car_rental") return "Car Rentals";
    return purpose.charAt(0).toUpperCase() + purpose.slice(1);
  };

  const handleDownloadReceipt = (payment, e) => {
    if (e) e.stopPropagation();
    setReceiptPayment(payment);
  };

  const generatePDF = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${receiptPayment.reference}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setDownloading(false);
      setReceiptPayment(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Payment History</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Payment History</h1>

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 py-4 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-36 ml-auto"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchPayments} className="text-[#FF7D01] underline font-medium">Try again</button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && payments.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No payment history yet.</p>
              </div>
            )}

            {/* Payment List */}
            {!loading && !error && payments.length > 0 && (
              <div>
                <div className="space-y-0">
                  {payments.map((payment) => (
                    <PaymentItem
                      key={payment.id}
                      payment={payment}
                      formatDate={formatDate}
                      formatPurpose={formatPurpose}
                      onClick={() => setSelectedPayment(payment)}
                      onDownload={handleDownloadReceipt}
                      downloading={downloading && receiptPayment?.id === payment.id}
                    />
                  ))}
                </div>

                {page < totalPages && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        const nextPage = page + 1;
                        setPage(nextPage);
                        getPayments(nextPage, 5).then(res => {
                          setPayments(prev => [...prev, ...res.data.items]);
                          setTotalPages(res.data.pages);
                        });
                      }}
                      className="bg-[#FF7D01] text-xs text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      Show More
                      <ChevronDown className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={Lock} text="Personal Details" />
              <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="/contact" icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      {selectedPayment && (
        <TransactionModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          formatLongDate={formatLongDate}
          formatPurpose={formatPurpose}
          onDownload={handleDownloadReceipt}
          downloading={downloading && receiptPayment?.id === selectedPayment.id}
        />
      )}

      {/* Hidden Receipt for PDF Generation */}
      {receiptPayment && (
        <div className="fixed -left-[9999px] -top-[9999px]">
          <div ref={receiptRef}>
            <ReceiptTemplate
              payment={receiptPayment}
              formatLongDate={formatLongDate}
              formatPurpose={formatPurpose}
            />
          </div>
        </div>
      )}

      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b>©</b> 2025 Smash Apartments. All Rights Reserved</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Terms of Use</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ReceiptTemplate({ payment, formatLongDate, formatPurpose }) {
  const statusLabel = payment.status === "success" ? "Successful" :
    payment.status === "failed" ? "Failed" : "Pending";
  const statusColor = payment.status === "success" ? "#22c55e" :
    payment.status === "failed" ? "#ef4444" : "#f59e0b";

  return (
    <div style={{
      width: "480px",
      backgroundColor: "#ffffff",
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
    }}>
      {/* Logo */}
      <div style={{ fontSize: "22px", fontWeight: "700", color: "#FF7D01", marginBottom: "32px" }}>
        Smash Apartments
      </div>

      {/* Amount Section */}
      <div style={{
        backgroundColor: "#FFF1E6",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "32px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>Transaction Amount</div>
        <div style={{ fontSize: "36px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>
          ₦{Number(payment.amount).toLocaleString()}
        </div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: statusColor }}>{statusLabel}</div>
      </div>

      {/* Details */}
      {[
        { label: "Reference", value: payment.reference },
        { label: "Purpose", value: formatPurpose(payment.purpose) },
        { label: "Payment Mode", value: payment.mode || "—" },
        { label: "Date", value: formatLongDate(payment.created_at) },
        ...(payment.booking_id ? [{ label: "Booking ID", value: payment.booking_id }] : []),
        ...(payment.car_rental_id ? [{ label: "Car Rental ID", value: payment.car_rental_id }] : []),
      ].map((row, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #f3f4f6",
        }}>
          <span style={{ fontSize: "13px", color: "#333333" }}>{row.label}</span>
          <span style={{ fontSize: "13px", fontWeight: "500", color: "#111827", textAlign: "right", maxWidth: "60%", wordBreak: "break-all" }}>
            {row.value}
          </span>
        </div>
      ))}

      {/* Footer */}
      <div style={{ marginTop: "32px", textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>
        <p>© 2025 Smash Apartments. All Rights Reserved.</p>
        <p style={{ marginTop: "4px" }}>This is an automatically generated receipt.</p>
      </div>
    </div>
  );
}

function PaymentItem({ payment, formatDate, formatPurpose, onClick, onDownload, downloading }) {
  return (
    <div
      onClick={onClick}
      className="py-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition rounded-xl px-2"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 flex-1">
          <div className="min-w-[80px]">
            <p className="text-xs text-[#333333] mb-1">Date</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(payment.created_at)}</p>
          </div>
          <div className="min-w-[100px]">
            <p className="text-xs text-[#333333] mb-1">Purpose</p>
            <p className="text-sm font-medium text-gray-900">{formatPurpose(payment.purpose)}</p>
          </div>
          <div className="min-w-[100px]">
            <p className="text-xs text-[#333333] mb-1">Amount</p>
            <p className="text-sm font-medium text-gray-900">₦{Number(payment.amount).toLocaleString()}</p>
          </div>
          <div className="min-w-[80px]">
            <p className="text-xs text-[#333333] mb-1">Status</p>
            <p className={`text-sm font-semibold ${
              payment.status === "success" ? "text-green-500" :
              payment.status === "failed" ? "text-red-500" :
              "text-yellow-500"
            }`}>
              {payment.status === "success" ? "Successful" :
               payment.status === "failed" ? "Failed" : "Pending"}
            </p>
          </div>
          <div className="min-w-[80px]">
            <p className="text-xs text-[#333333]mb-1">Mode</p>
            <p className="text-sm font-medium text-gray-900">{payment.mode || "—"}</p>
          </div>
        </div>

        <button
          onClick={(e) => onDownload(payment, e)}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#FF7D011A] text-[#FF7D01] text-xs px-4 py-3 rounded-full hover:bg-[#FF7D011A] transition flex-shrink-0 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloading ? "Generating..." : "Download Receipt"}
        </button>
      </div>
    </div>
  );
}

function TransactionModal({ payment, onClose, formatLongDate, formatPurpose, onDownload, downloading }) {
  const statusColor = payment.status === "success" ? "text-green-500" :
    payment.status === "failed" ? "text-red-500" : "text-yellow-500";
  const statusLabel = payment.status === "success" ? "Successful" :
    payment.status === "failed" ? "Failed" : "Pending";
  const statusBg = payment.status === "success" ? "bg-green-50" :
    payment.status === "failed" ? "bg-red-50" : "bg-yellow-50";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 z-10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className={`${statusBg} rounded-2xl p-4 mb-6 flex items-center justify-between`}>
          <div>
            <p className="text-xs text-gray-500 mb-1">Transaction Amount</p>
            <p className="text-2xl font-bold text-gray-900">₦{Number(payment.amount).toLocaleString()}</p>
          </div>
          <span className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</span>
        </div>

        <div className="space-y-4">
          <DetailRow label="Reference" value={payment.reference} />
          <DetailRow label="Purpose" value={formatPurpose(payment.purpose)} />
          <DetailRow label="Payment Mode" value={payment.mode || "—"} />
          <DetailRow label="Date" value={formatLongDate(payment.created_at)} />
          {payment.booking_id && <DetailRow label="Booking ID" value={payment.booking_id} />}
          {payment.car_rental_id && <DetailRow label="Car Rental ID" value={payment.car_rental_id} />}
        </div>

        <button
          onClick={(e) => onDownload(payment, e)}
          disabled={downloading}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-gray-900 text-[#FF7D011A] text-sm px-4 py-4 rounded-full hover:bg-gray-700 transition font-medium disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-[#FF7D011A] bg-[#FF7D011A]" />
          {downloading ? "Generating..." : "Download Receipt"}
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[60%] break-all">{value}</span>
    </div>
  );
}

function ActionItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt={text} className="w-4 h-4 text-gray-400" />
        </div>
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}