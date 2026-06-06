'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image_url: string
  created_at: string
}

function renderContent(content: string) {
  return content.split('\n\n').map((para, i) => (
    <p key={i} className="mb-6 text-gray-700 leading-8 text-lg">
      {para.split('\n').map((line, j, arr) => (
        <span key={j}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  ))
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        if (data) setBlog(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin w-10 h-10 border-4 border-[#1e3a8a] border-t-transparent rounded-full" />
      </div>
    </>
  )

  if (notFound) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-xl mb-6">Post not found.</p>
        <Link href="/blog" className="text-[#1e3a8a] font-semibold hover:underline inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50">
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[#1e3a8a] text-sm font-medium hover:underline mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {blog!.cover_image_url && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={blog!.cover_image_url}
                alt={blog!.title}
                className="w-full object-cover max-h-96"
              />
            </div>
          )}

          <p className="text-sm text-gray-400 mb-3">
            {new Date(blog!.created_at).toLocaleDateString('en-IN', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {blog!.title}
          </h1>

          <div className="border-t border-gray-100 pt-8">
            {renderContent(blog!.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1e40af] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
