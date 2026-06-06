'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string
  created_at: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setBlogs(data)
        setLoading(false)
      })
  }, [])

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Blog</h1>
            <p className="text-blue-200 text-lg">Tips, guides & insights on loans and finance</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin w-10 h-10 border-4 border-[#1e3a8a] border-t-transparent rounded-full" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 text-gray-400 text-lg">
              No posts yet — check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {blog.cover_image_url ? (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={blog.cover_image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[#1e3a8a]/10 to-[#1e3a8a]/5 flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#1e3a8a]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(blog.created_at)}</p>
                    <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    {blog.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
                    )}
                    <span className="text-[#1e3a8a] text-sm font-semibold inline-flex items-center gap-1">
                      Read more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
