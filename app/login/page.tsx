"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.message || "Login failed");
			}
			router.replace("/dashboard/home");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-black font-goldman px-4">
			<div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-6 text-center">Second Brain Login</h2>
				<form className="space-y-5" onSubmit={handleSubmit}>
					<div>
						<label className="block text-blue-300 mb-1" htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
							placeholder="Email"
							required
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label className="block text-blue-300 mb-1" htmlFor="password">Password</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
								placeholder="Password"
								required
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400"
								onClick={() => setShowPassword((prev) => !prev)}
								tabIndex={-1}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? (
									<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
										<path stroke="currentColor" strokeWidth="2" d="M3 3l18 18M10.7 10.7a3 3 0 004.6 4.6M7.5 7.5A7.97 7.97 0 003 12c2.5 4 6.5 7 9 7 1.1 0 2.2-.3 3.2-.8M17.5 17.5A7.97 7.97 0 0021 12c-2.5-4-6.5-7-9-7-1.1 0-2.2.3-3.2.8"/>
									</svg>
								) : (
									<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
										<path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
										<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
									</svg>
								)}
							</button>
						</div>
					</div>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition disabled:opacity-60"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					<div className="text-center mt-2">
						<a href="#" className="text-blue-400 hover:text-blue-600 text-xs">Forgot password?</a>
					</div>
					<div className="text-center mt-2">
						<Link href="/register" className="text-white hover:text-blue-400 text-sm">Create new account?</Link>
					</div>
				</form>
			</div>
			<style jsx>{`
				@keyframes fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
				@keyframes slide-down { from { opacity: 0; transform: translateY(-20px);} to { opacity: 1; transform: translateY(0);} }
				.animate-fade-in { animation: fade-in 0.8s ease; }
				.animate-slide-down { animation: slide-down 0.7s ease; }
			`}</style>
		</div>
	);
};

export default Page;