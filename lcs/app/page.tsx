'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    loanType: '',
    loanAmount: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeLoan, setActiveLoan] = useState<null | typeof loanDetails[0]>(null)

  const loanDetails = [
    {
      title: 'Home Loan',
      img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
      color: '#FF6B2C',
      desc: 'Own Your Dream Home',
      about: 'A Home Loan helps you purchase, construct, or renovate a residential property. Repayment tenure can go up to 30 years with competitive interest rates starting from 8.5% p.a.',
      eligibility: ['Indian resident aged 21–65 years', 'Salaried or self-employed with stable income', 'Minimum monthly income ₹25,000', 'Good CIBIL score (700+)'],
      documents: ['Aadhaar Card & PAN Card', 'Last 3 months salary slips / ITR for 2 years', 'Bank statements (6 months)', 'Property documents / Sale agreement', 'Passport size photographs', 'Form 16 / Business proof (self-employed)'],
    },
    {
      title: 'Personal Loan',
      img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
      color: '#14B8A6',
      desc: 'Quick Personal Loans',
      about: 'A Personal Loan is an unsecured loan for any personal need — medical emergency, travel, wedding, education, or debt consolidation. Quick disbursal with minimal paperwork.',
      eligibility: ['Age 21–60 years', 'Salaried employee or self-employed', 'Minimum monthly income ₹15,000', 'CIBIL score 700 or above'],
      documents: ['Aadhaar Card & PAN Card', 'Last 3 months salary slips', 'Bank statements (3–6 months)', 'Employment letter / ID proof', 'Passport size photographs'],
    },
    {
      title: 'Car Loan',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
      color: '#1e40af',
      desc: 'Drive Your New Car',
      about: 'Finance your new or used car with easy EMIs and attractive interest rates starting from 7.5% p.a. Loan amount up to 100% of on-road price for new cars.',
      eligibility: ['Age 21–65 years', 'Salaried or self-employed', 'Minimum monthly income ₹20,000', 'Valid driving licence', 'CIBIL score 700+'],
      documents: ['Aadhaar Card & PAN Card', 'Last 3 months salary slips / ITR', 'Bank statements (3 months)', 'Vehicle quotation / RC (used car)', 'Passport size photographs', 'Driving licence'],
    },
    {
      title: 'Mortgage Loan',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      color: '#1e3a8a',
      desc: 'Loan Against Property',
      about: 'A Mortgage Loan (Loan Against Property) lets you unlock the value of your property — residential or commercial — to meet large financial needs. Interest rates start from 9% p.a. with repayment tenure up to 20 years.',
      eligibility: ['Indian resident aged 21–65 years', 'Salaried or self-employed with stable income', 'Minimum monthly income ₹30,000', 'Property must be free of legal disputes', 'CIBIL score 650 or above'],
      documents: ['Aadhaar Card & PAN Card', 'Last 3 months salary slips / ITR for 2 years', 'Bank statements (6 months)', 'Property ownership documents / Title deed', 'Approved building plan / Encumbrance certificate', 'Property tax receipts', 'Passport size photographs'],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          loan_type: formData.loanType,
          loan_amount: formData.loanAmount
        }])

      if (error) throw error

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      setFormData({ name: '', phone: '', loanType: '', loanAmount: '' })
      toast.custom(() => (
        <div className="bg-white rounded-xl shadow-2xl border border-green-100 px-6 py-5 flex flex-col items-center gap-2 max-w-sm w-full">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">✅</div>
          <p className="font-bold text-[#1e3a8a] text-lg text-center">Thank You!</p>
          <p className="text-gray-600 text-sm text-center">We will contact you soon.</p>
        </div>
      ), { duration: 5000 })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-[54px] md:pt-[68px]">

      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(37,99,235,0.6) 60%, rgba(37,99,235,0.4) 100%), url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80")'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-14">
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 lg:gap-12 items-start">
            
            {/* LEFT: Heading + Buttons */}
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-2">
                Get Instant
              </h1>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 text-[#FDB913]">
                Loan Assistance
              </h1>
              <p className="text-sm md:text-lg lg:text-xl mb-6 font-medium">
                Home Loan • Personal Loan • Mortgage Loan • Car Loan
              </p>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://wa.me/919596601094?text=Hi%20I%20want%20to%20apply%20for%20the%20Loan"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md font-semibold text-sm md:text-base flex items-center gap-2 shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.25"/>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* RIGHT: Form Card */}
            <div className="bg-white rounded-xl shadow-2xl p-5 md:p-6 w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto lg:-mt-72">
              <h2 className="text-xl md:text-2xl font-bold text-[#1e3a8a] mb-4">Get a Quick Loan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <select
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white"
                  value={formData.loanType}
                  onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                >
                  <option value="">Select Loan Type</option>
                  <option>Home Loan</option>
                  <option>Personal Loan</option>
                  <option>Car Loan</option>
                  <option>Business Loan</option>
                  <option>Mortgage Loan</option>
                  <option>Education Loan</option>
                  <option>Two Wheeler Loan</option>
                  <option>Gold Loan</option>
                  <option>Loan Against Property</option>
                  <option>Loan Against Securities</option>
                  <option>Microfinance Loan</option>
                  <option>Working Capital Loan</option>
                  <option>Overdraft Loan</option>
                  <option>Agriculture Loan</option>
                  <option>Medical Loan</option>
                  <option>Travel Loan</option>
                  <option>Wedding Loan</option>
                  <option>Home Renovation Loan</option>
                  <option>Plot / Land Loan</option>
                  <option>Commercial Vehicle Loan</option>
                </select>
                <input
                  type="text"
                  placeholder="Loan Amount"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-md font-bold text-base shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Apply Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR LOAN SERVICES ===== */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1e3a8a] mb-6 md:mb-10">
            Our Loan Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {loanDetails.map((service, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setActiveLoan(service)}
              >
                <div className="h-36 md:h-44 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div style={{ backgroundColor: service.color }} className="px-3 py-2 md:py-3 text-center">
                  <h3 className="font-bold text-sm md:text-base text-white leading-tight">{service.title}</h3>
                  <p className="text-[10px] md:text-xs text-white/90 leading-tight mt-0.5">{service.desc}</p>
                  <p className="text-[9px] md:text-[11px] text-white/70 mt-1">Tap to know more →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-white py-8 md:py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1e3a8a] mb-6 md:mb-10">
            Why Choose Us?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '⏱️', title: 'Fast Approval' },
              { icon: '🏛️', title: '6+ Bank Partners' },
              { icon: '🎧', title: 'Expert Advisors' },
              { icon: '🛡️', title: '100% Secure Process' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-blue-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-md">
                  <span className="text-3xl md:text-4xl">{item.icon}</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-gray-800 leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIMPLE LOAN PROCESS ===== */}
      <section className="relative bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white py-8 md:py-14">
        {/* Top wave */}
        <div className="absolute -top-1 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-6 md:h-10 fill-white" preserveAspectRatio="none">
            <path d="M0,40 Q360,0 720,40 T1440,40 L1440,0 L0,0 Z"></path>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 md:pt-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10">
            Simple Loan Process
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { num: '1', title: 'Apply Online' },
              { num: '2', title: 'Get Expert Advice' },
              { num: '3', title: 'Bank Approval' },
              { num: '4', title: 'Receive Your Funds' }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 md:gap-3">
                <span className="text-3xl md:text-5xl font-bold leading-none">{step.num}.</span>
                <h3 className="text-sm md:text-lg font-semibold pt-1 md:pt-2">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOW CIBIL SECTION ===== */}
      <section 
        className="relative bg-cover bg-center min-h-[280px] md:min-h-[380px]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-blue-100/20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 flex justify-center md:justify-end">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 md:p-8 w-full md:w-[50%] lg:w-[45%]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-2 md:mb-3 text-center">
              Low CIBIL Score?
            </h2>
            <div className="h-px bg-gray-300 my-3"></div>
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 font-medium text-center">
              Improve Your Credit Score & Get a Loan
            </p>
            <a
              href="https://wa.me/919596601094?text=Hi%2C%20I%20want%20to%20check%20and%20improve%20my%20CIBIL%20score"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-md font-bold text-sm md:text-base shadow-md w-full transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.25"/>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ===== LOAN DETAILS MODAL ===== */}
      {activeLoan && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLoan(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-44 overflow-hidden rounded-t-2xl">
              <img src={activeLoan.img} alt={activeLoan.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h2 className="text-2xl font-bold text-white">{activeLoan.title}</h2>
                <p className="text-sm text-white/80">{activeLoan.desc}</p>
              </div>
              <button
                onClick={() => setActiveLoan(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* About */}
              <div>
                <h3 className="font-bold text-[#1e3a8a] text-base mb-1">About this Loan</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{activeLoan.about}</p>
              </div>

              {/* Eligibility */}
              <div>
                <h3 className="font-bold text-[#1e3a8a] text-base mb-2">Eligibility Criteria</h3>
                <ul className="space-y-1">
                  {activeLoan.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-bold text-[#1e3a8a] text-base mb-2">Documents Required</h3>
                <ul className="space-y-1">
                  {activeLoan.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 mt-0.5">📄</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/919596601094?text=Hi%20I%20want%20to%20apply%20for%20${encodeURIComponent(activeLoan.title)}`}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-xl font-bold text-sm mt-2 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.25"/>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                Apply for {activeLoan.title} on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}