import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[#08090A]" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logo.png"
            alt="Soham Kolhe Logo"
            className="w-4 h-4 rounded object-contain opacity-70"
            width={16}
            height={16}
          />
          <span>© 2026 SOHAM KOLHE</span>
        </div>
        <div>DESIGNED &amp; BUILT WITH INTENT</div>
      </div>
    </footer>
  );
};
