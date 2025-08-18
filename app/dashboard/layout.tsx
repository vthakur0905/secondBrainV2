"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [query, setQuery] = useState("");

	return (
		<div className="min-h-screen w-full bg-black text-white">
			<header className="w-full border-b border-gray-800 bg-gray-900/40">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
					<h1 className="text-lg sm:text-xl font-goldman">Second Brain</h1>
					<div className="flex items-center gap-2">
						<input
							type="text"
							placeholder="Search tags... (comma or space separated)"
							className="hidden sm:block bg-black border border-gray-700 rounded px-3 py-2 w-64"
							value={query}
							onChange={(e)=>setQuery(e.target.value)}
							onKeyDown={(e)=>{ if(e.key === 'Enter'){ router.push(`/dashboard/home?search=${encodeURIComponent(query)}`) } }}
						/>
						<button
							onClick={() => router.push(`/dashboard/home?search=${encodeURIComponent(query)}`)}
							className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800"
						>
							Search
						</button>
						<button
							onClick={() => router.push("/dashboard/home?all=1")}
							className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800"
						>
							Get All Content
						</button>
						<button
							onClick={async () => {
								await fetch("/api/logout", { method: "POST" });
								router.replace("/");
							}}
							className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800"
						>
							Logout
						</button>
					</div>
				</div>
			</header>
			<main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
		</div>
	);
}


