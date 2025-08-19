"use client" ;

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Content = {
	_id: string;
	link?: string;
	title: string;
	description?: string;
	type: string;
	tags?: string[];
	createdAt?: string;
}

const Page = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [contents, setContents] = useState<Content[]>([]);
	const [form, setForm] = useState({ link: "", type: "article", title: "", tags: "", description: "" });

	async function fetchContent(){
		setError("");
		try{
			const res = await fetch('/api/dashboard/home', { cache: 'no-store' });
			if(!res.ok){
				const data = await res.json().catch(()=>({}));
				throw new Error(data?.message || 'Failed to load');
			}
			const data = await res.json();
			setContents(data?.data || []);
		} catch(err: unknown){
			const message = err instanceof Error ? err.message : '';
			if(message.toLowerCase().includes('unauthorized') || message.includes('login')){
				router.replace('/login');
				return;
			}
			setError(message || 'Something went wrong');
		} finally{
			setLoading(false);
		}
	}

	async function fetchAllContent(){
		setError("");
		try{
			const res = await fetch('/api/content/all', { cache: 'no-store' });
			if(!res.ok){
				const data = await res.json().catch(()=>({}));
				throw new Error(data?.message || 'Failed to load');
			}
			const data = await res.json();
			setContents(data?.data || []);
		} catch(err: unknown){
			const message = err instanceof Error ? err.message : '';
			if(message.toLowerCase().includes('unauthorized') || message.includes('login')){
				router.replace('/login');
				return;
			}
			setError(message || 'Something went wrong');
		}
	}

	async function fetchSearch(query: string){
		setError("");
		try{
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
			if(!res.ok){
				const data = await res.json().catch(()=>({}));
				throw new Error(data?.message || 'Failed to search');
			}
			const data = await res.json();
			setContents(data?.data || []);
		} catch(err: unknown){
			const message = err instanceof Error ? err.message : '';
			if(message.toLowerCase().includes('unauthorized') || message.includes('login')){
				router.replace('/login');
				return;
			}
			setError(message || 'Something went wrong');
		}
	}

	useEffect(() => {
		const all = searchParams.get('all');
		const search = searchParams.get('search');
		if(all){
			fetchAllContent();
		}else if(search){
			fetchSearch(search);
		}else{
			fetchContent();
		}

	}, [searchParams])

	async function handleCreate(event: React.FormEvent<HTMLFormElement>){
		event.preventDefault();
		setError("");
		const res = await fetch('/api/dashboard/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});
		if(!res.ok){
			const data = await res.json().catch(()=>({}));
			setError(data?.message || 'Failed to create');
			return;
		}
		setForm({ link: "", type: "article", title: "", tags: "", description: "" });
		fetchContent();
	}

	async function handleDelete(id: string){
		const res = await fetch('/api/dashboard/delete', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		if(!res.ok){
			const data = await res.json().catch(()=>({}));
			setError(data?.message || 'Failed to delete');
			return;
		}
		setContents(prev => prev.filter(c => c._id !== id));
	}

	return (
		<div className='bg-black min-h-screen w-full text-white px-4 py-6'>
			<div className='max-w-5xl mx-auto'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
					<h1 className='text-2xl sm:text-3xl font-goldman'>Your Second Brain</h1>
					<div className='flex items-center gap-3'>
						<button onClick={fetchAllContent} className='px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800'>Get All Content</button>
						<button
							onClick={async()=>{ await fetch('/api/logout', { method: 'POST' }); router.replace('/'); }}
							className='px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800'
						>
							Logout
						</button>
					</div>
				</div>

				<form onSubmit={handleCreate} className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800 mb-8'>
					<input className='bg-black border border-gray-700 rounded px-3 py-2' placeholder='Title' required value={form.title} onChange={(e)=>setForm(v=>({...v, title: e.target.value}))} />
					<select className='bg-black border border-gray-700 rounded px-3 py-2' value={form.type} onChange={(e)=>setForm(v=>({...v, type: e.target.value}))}>
						<option value='article'>Article</option>
						<option value='image'>Image</option>
						<option value='video'>Video</option>
						<option value='audio'>Audio</option>
						<option value='tweet'>Tweet</option>
					</select>
					<input className='bg-black border border-gray-700 rounded px-3 py-2 sm:col-span-2' placeholder='Link (optional for some types)' value={form.link} onChange={(e)=>setForm(v=>({...v, link: e.target.value}))} />
					<input className='bg-black border border-gray-700 rounded px-3 py-2 sm:col-span-2' placeholder='Tags comma separated' value={form.tags} onChange={(e)=>setForm(v=>({...v, tags: e.target.value}))} />
					<textarea className='bg-black border border-gray-700 rounded px-3 py-2 sm:col-span-2' placeholder='Description' value={form.description} onChange={(e)=>setForm(v=>({...v, description: e.target.value}))} />
					<button className='bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl sm:col-span-2'>Add</button>
				</form>

				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p className='text-red-400'>{error}</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{contents.map(item => (
							<div key={item._id} className='border border-gray-800 rounded-xl p-4 bg-gray-900/40'>
								<div className='flex items-start justify-between gap-3'>
									<h3 className='text-lg font-semibold'>{item.title}</h3>
									<button onClick={()=>handleDelete(item._id)} className='text-sm text-red-400 hover:text-red-300'>Delete</button>
								</div>
								{item.link && <a className='text-blue-400 break-all' href={item.link} target='_blank' rel='noreferrer'>{item.link}</a>}
								{item.description && <p className='text-gray-300 mt-2 text-sm'>{item.description}</p>}
								{item.tags && item.tags.length > 0 && (
									<div className='mt-3 flex flex-wrap gap-2'>
										{item.tags.map((tag, idx)=> (
											<span key={idx} className='px-2 py-1 rounded bg-gray-800 text-xs'>#{tag}</span>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Page