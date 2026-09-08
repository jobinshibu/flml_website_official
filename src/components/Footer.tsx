export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-12 px-8 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex flex-col font-sans font-bold text-sm tracking-widest leading-tight">
          <span>FIRST LOGIC</span>
          <span className="text-brand-blue">META LAB</span>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 text-right">
          <div className="flex items-center gap-6">
            <a href="/career" className="text-xs font-mono tracking-widest uppercase text-white hover:text-brand-blue-light transition-colors">
              CAREERS
            </a>
            <a href="mailto:info@firstlogicmetalab.com" className="text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors">
              info@firstlogicmetalab.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50">
            <a href="https://wa.me/919745437355" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 9745 43 73 55</a>
          </div>
        </div>

      </div>
      <div className="max-w-[1400px] mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-white/30 uppercase">
        <p>© {new Date().getFullYear()} First Logic Meta Lab Pvt Ltd. All rights reserved.</p>
        <p>Puthanveettil Tower, Bypass Road, Perinthalmanna, Kerala</p>
      </div>
    </footer>
  );
}
