"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "grid", href: "/dashboard" },
    { name: "All Notes", icon: "file", href: "/dashboard/notes" },
    { name: "Notebooks", icon: "book", href: "/dashboard/notebooks" },
    { name: "Shared", icon: "users", href: "/dashboard/shared" },
  ];

  const folders = [
    { name: "Personal Diary", color: "text-emerald-500" },
    { name: "Work Projects", color: "text-blue-500" },
    { name: "Fitness Goals", color: "text-orange-500" },
  ];

  return (
    <div className="flex min-h-screen bg-[#090b11] text-white font-sans">
      {/* Sidebar - Exact 3.jpg Style */}
      <aside className="w-72 bg-[#0f121a] border-r border-white/5 p-8 flex flex-col fixed h-full overflow-y-auto">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v16.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h10.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/><path d="M15 2v5h5"/><path d="M9 13h6"/><path d="M9 17h3"/></svg>
          </div>
          <span className="text-xl font-black tracking-tight">Note Master</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 text-gray-500 hover:text-white px-4 py-3 text-sm font-bold mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            Collapse
          </button>

          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                pathname === item.href ? "bg-emerald-500/10 text-emerald-400" : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className={pathname === item.href ? "text-emerald-400" : "text-gray-500"}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </div>
              {item.name}
            </Link>
          ))}

          {/* Folders Section */}
          <div className="pt-10 pb-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-5">Recent Folders</span>
          </div>
          {folders.map((folder) => (
            <button key={folder.name} className="w-full flex items-center gap-4 px-5 py-3 text-sm font-bold text-gray-500 hover:text-white transition-all">
              <svg className={folder.color} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2z"/></svg>
              {folder.name}
            </button>
          ))}
        </nav>

        {/* Pro Plan Card */}
        <div className="mt-auto bg-[#161b26] p-6 rounded-[2rem] border border-white/5">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Pro Plan</p>
          <p className="text-xs font-bold text-gray-400 mb-4 leading-relaxed">Get unlimited cloud storage</p>
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-500/20">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        {/* Header / Search bar */}
        <header className="h-24 flex items-center justify-between px-12 sticky top-0 bg-[#090b11]/80 backdrop-blur-md z-50">
          <div className="flex-1 max-w-2xl relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search your digital diary..." 
              className="w-full bg-[#111622] border border-white/5 rounded-2xl py-3.5 pl-14 pr-6 text-sm font-medium outline-none focus:border-emerald-500/30 focus:bg-[#161b26] transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6 ml-8">
            <button className="bg-[#111622] p-3 rounded-xl border border-white/5 text-gray-500 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <Link href="/dashboard/new" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              New Note
            </Link>
          </div>
        </header>

        <div className="px-12 pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}