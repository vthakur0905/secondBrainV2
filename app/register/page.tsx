"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
	const router = useRouter();
	const [step, setStep] = useState<"register" | "verify">("register");
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setMessage("");
		setLoading(true);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data?.message || "Registration failed");
			setMessage("Account created. Enter the verification code sent to your email.");
			setStep("verify");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setMessage("");
		setLoading(true);
		try {
			const res = await fetch("/api/auth/register/verifyUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: form.email, code: Number(code) }),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data?.message || "Verification failed");
			setMessage("Email verified. Redirecting to login...");
			setTimeout(() => router.replace("/login"), 800);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-black font-goldman px-4">
			<div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-700">
				<h2 className="text-2xl font-bold text-white mb-6 text-center">Create your account</h2>
				{step === "register" ? (
					<form onSubmit={handleRegister} className="space-y-4">
						<input
							type="text"
							placeholder="Name"
							className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
							required
							value={form.name}
							onChange={(e)=>setForm(v=>({...v, name: e.target.value}))}
						/>
						<input
							type="email"
							placeholder="Email"
							className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
							required
							value={form.email}
							onChange={(e)=>setForm(v=>({...v, email: e.target.value}))}
						/>
						<input
							type="password"
							placeholder="Password (min 6 chars)"
							className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
							required
							minLength={6}
							value={form.password}
							onChange={(e)=>setForm(v=>({...v, password: e.target.value}))}
						/>
						{error && <p className="text-red-400 text-sm">{error}</p>}
						{message && <p className="text-green-400 text-sm">{message}</p>}
						<button className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition disabled:opacity-60" disabled={loading}>
							{loading ? "Creating..." : "Create account"}
						</button>
					</form>
				) : (
					<form onSubmit={handleVerify} className="space-y-4">
						<input
							type="text"
							placeholder="6-digit code"
							className="w-full px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
							required
							pattern="\\d{6}"
							value={code}
							onChange={(e)=>setCode(e.target.value.replace(/[^0-9]/g, '').slice(0,6))}
						/>
						{error && <p className="text-red-400 text-sm">{error}</p>}
						{message && <p className="text-green-400 text-sm">{message}</p>}
						<button className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition disabled:opacity-60" disabled={loading}>
							{loading ? "Verifying..." : "Verify email"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Page;


