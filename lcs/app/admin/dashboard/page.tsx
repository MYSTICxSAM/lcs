'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Lead {
  id: number
  name: string
  phone: string
  loan_type: string
  loan_amount: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin')
      return
    }
    fetchLeads()
  }

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setLeads(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    l.loan_type.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dt: string) => {
    return new Date(dt).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const loanTypeColor: Record<string, string> = {
    'Home Loan': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Personal Loan': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    'Car Loan': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Business Loan': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">Lending Capital Solution</h1>
              <p className="text-slate-400 text-xs">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length, icon: '👥', color: 'blue' },
            { label: 'Home Loans', value: leads.filter(l => l.loan_type === 'Home Loan').length, icon: '🏠', color: 'indigo' },
            { label: 'Personal Loans', value: leads.filter(l => l.loan_type === 'Personal Loan').length, icon: '💰', color: 'teal' },
            { label: 'Business Loans', value: leads.filter(l => l.loan_type === 'Business Loan').length, icon: '💼', color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Table */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="font-semibold text-white">All Leads</h2>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full md:w-64"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Loading leads...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No leads found</div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Phone</th>
                      <th className="px-6 py-3 text-left">Loan Type</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                      <th className="px-6 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filtered.map((lead, i) => (
                      <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-slate-500 text-sm">{i + 1}</td>
                        <td className="px-6 py-4 font-medium text-white text-sm">{lead.name}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">
                          <a href={`tel:${lead.phone}`} className="hover:text-blue-400 transition-colors">{lead.phone}</a>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${loanTypeColor[lead.loan_type] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                            {lead.loan_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 text-sm">₹{lead.loan_amount}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{formatDate(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-slate-700/50">
                {filtered.map((lead, i) => (
                  <div key={lead.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{lead.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${loanTypeColor[lead.loan_type] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                        {lead.loan_type}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300">{lead.phone}</div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>₹{lead.loan_amount}</span>
                      <span>{formatDate(lead.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}