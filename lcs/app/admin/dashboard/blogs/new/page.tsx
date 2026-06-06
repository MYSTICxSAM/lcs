'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const toSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function NewBlogPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin')
    })
  }, [router])

  const handleTitleChange = (title: string) => {
    setForm(prev => ({ ...prev, title, slug: toSlug(title) }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.')
      return
    }
    setSaving(true)

    let cover_image_url = ''
    if (coverFile) {
      const ext = coverFile.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(path, coverFile, { contentType: coverFile.type })
      if (uploadError) {
        setError('Image upload failed: ' + uploadError.message)
        setSaving(false)
        return
      }
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(uploadData.path)
      cover_image_url = publicUrl
    }

    const { error: insertError } = await supabase.from('blogs').insert([{
      title: form.title.trim(),
      slug: form.slug.trim() || toSlug(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      cover_image_url,
      published: form.published,
    }])

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push('/admin/dashboard/blogs')
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center gap-3">
          <Link href="/admin/dashboard/blogs" className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-bold text-white text-sm">New Blog Post</h1>
            <p className="text-slate-400 text-xs">Write and publish a new article</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Title + Slug + Excerpt */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xl font-medium"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">URL Slug</label>
            <div className="flex items-center bg-slate-900 border border-slate-600 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 text-sm px-3 py-3 border-r border-slate-700 shrink-0">/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                className="flex-1 bg-transparent px-3 py-3 text-white placeholder-slate-500 focus:outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Excerpt
              <span className="text-slate-500 font-normal ml-2">— shown on blog listing page</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A short summary of this post..."
              rows={2}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none text-sm"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <label className="block text-slate-300 text-sm font-medium mb-4">Cover Image</label>
          {coverPreview ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={coverPreview} alt="Cover preview" className="w-full max-h-72 object-cover" />
              <button
                type="button"
                onClick={() => { setCoverFile(null); setCoverPreview('') }}
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-red-600/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <label className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-black/80 transition-colors">
                Change Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-12 cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all">
              <svg className="w-12 h-12 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-slate-300 text-sm font-medium">Click to upload cover image</span>
              <span className="text-slate-500 text-xs mt-1">PNG, JPG, WebP · Max 5MB</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Content */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <label className="block text-slate-300 text-sm font-medium mb-3">
            Content *
            <span className="text-slate-500 font-normal ml-2">— leave a blank line between paragraphs</span>
          </label>
          <textarea
            value={form.content}
            onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
            placeholder={`Write your blog post here...\n\nLeave a blank line to start a new paragraph.\n\nYou can write as much as you like!`}
            rows={22}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-y font-mono text-sm leading-7"
          />
        </div>

        {/* Publish toggle + Submit */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, published: !prev.published }))}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative w-11 h-6 shrink-0">
              <div className={`w-full h-full rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-slate-600'}`} />
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.published ? 'translate-x-5' : ''}`} />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">{form.published ? 'Publish immediately' : 'Save as draft'}</p>
              <p className="text-slate-500 text-xs">{form.published ? 'Visible to everyone on /blog' : 'Only you can see this in admin'}</p>
            </div>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Saving...
              </>
            ) : form.published ? 'Publish Post' : 'Save Draft'}
          </button>
        </div>
      </form>
    </div>
  )
}
