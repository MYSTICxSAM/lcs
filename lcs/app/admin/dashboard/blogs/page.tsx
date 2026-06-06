'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Blog {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
}

export default function AdminBlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin'); return }
      fetchBlogs()
    })
  }, [router])

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('id, title, slug, published, created_at')
      .order('created_at', { ascending: false })
    if (data) setBlogs(data)
    setLoading(false)
  }

  const togglePublish = async (blog: Blog) => {
    await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id)
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: !b.published } : b))
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('blogs').delete().eq('id', id)
    setBlogs(prev => prev.filter(b => b.id !== id))
    setDeleting(null)
  }

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="font-bold text-white text-sm">Blog Management</h1>
              <p className="text-slate-400 text-xs">Create & manage blog posts</p>
            </div>
          </div>
          <Link
            href="/admin/dashboard/blogs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-slate-400 gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Loading...
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <svg className="w-12 h-12 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="mb-4">No blog posts yet</p>
              <Link href="/admin/dashboard/blogs/new" className="text-blue-400 hover:underline text-sm">
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {blogs.map(blog => (
                <div key={blog.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-700/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${blog.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-600/30 text-slate-400 border-slate-600/50'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-slate-500 text-xs">{formatDate(blog.created_at)}</span>
                    </div>
                    <h3 className="text-white font-semibold truncate pr-4">{blog.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">/blog/{blog.slug}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublish(blog)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${blog.published ? 'border-slate-600 text-slate-400 hover:text-white hover:border-slate-400' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}
                    >
                      {blog.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/admin/dashboard/blogs/${blog.id}/edit`}
                      className="text-xs px-3 py-1.5 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      disabled={deleting === blog.id}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium transition-colors disabled:opacity-50"
                    >
                      {deleting === blog.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
