import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ progress = 0 }) {
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <div className="w-full h-2 rounded-full bg-orange-100 relative overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="h-full bg-orange-400 rounded-full"
      />
    </div>
  );
}




