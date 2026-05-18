import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-[54px] md:pt-[68px]">

      <Navbar />

      {/* ===== HERO BANNER ===== */}
      <section
        className="relative bg-cover bg-center py-16 md:py-24"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(30,58,138,0.90) 0%, rgba(37,99,235,0.75) 100%), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80")',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center text-white">
          <p className="text-[#FDB913] font-semibold text-sm md:text-base uppercase tracking-widest mb-2">Jammu, J&K</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            About Lending Capital Solutions
          </h1>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto">
            Born in Jammu. Built for the people of Jammu.
          </p>
        </div>
      </section>

      {/* ===== ABOUT INTRO ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#FF6B2C] font-semibold uppercase tracking-widest text-sm mb-2">A Complete Guide to Smarter Loan Solutions</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">About Lending Capital Solutions</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                In today's fast-moving world, access to the right financial support can make all the difference — whether it's buying your dream home, purchasing a car, or managing personal needs. This is where <strong>Lending Capital Solutions</strong> steps in as your trusted financial partner.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Lending Capital Solutions is a dedicated financial service provider that helps individuals secure the right loan with ease, transparency, and speed. We specialize in simplifying the loan process, ensuring that customers don't have to deal with complex paperwork or confusing procedures.
              </p>
              <p className="text-[#1e3a8a] font-semibold text-base">
                Our goal is simple: Make loans easy, accessible, and stress-free for everyone.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80"
                alt="Indian bank"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-8 text-center">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: '🏠', title: 'Home Loan', desc: 'Buying a home is one of the biggest decisions in life. We help you secure the best home loan options with competitive interest rates and smooth approvals.' },
              { icon: '🚗', title: 'Car Loan', desc: 'Whether it\'s your first car or an upgrade, we make car financing quick and hassle-free so you can drive your dream vehicle without delays.' },
              { icon: '💼', title: 'Personal Loan', desc: 'Need funds for emergencies, travel, or personal goals? Our personal loan solutions provide quick access to funds with minimal documentation.' },
              { icon: '🏢', title: 'Mortgage Loan', desc: 'Unlock the value of your property with our mortgage loan services. Get higher loan amounts with flexible repayment options.' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <span className="text-4xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1e3a8a] text-lg mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVING J&K ===== */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <span className="text-3xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mt-2 mb-4">Serving Jammu &amp; Kashmir</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We proudly serve customers across Jammu &amp; Kashmir, helping individuals and families achieve their financial goals with confidence and trust.
          </p>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1e3a8a] mb-8">⚡ Why Choose Lending Capital Solutions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '✔️', title: 'Low Interest Rates', desc: 'We connect you with the best available options from 50+ banks and NBFCs.' },
              { icon: '✔️', title: 'Quick Approvals', desc: 'Faster processing to save your time — no unnecessary delays.' },
              { icon: '✔️', title: 'Easy Documentation', desc: 'Minimal paperwork, maximum convenience at every step.' },
              { icon: '✔️', title: 'Trusted Support', desc: 'Expert guidance at every step of your loan journey.' },
            ].map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                <span className="text-green-500 text-xl shrink-0 mt-0.5">{w.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1e3a8a] text-base mb-0.5">{w.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION ===== */}
      <section className="py-12 md:py-14 bg-[#1e3a8a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">Our Vision</h2>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">
            At Lending Capital Solutions, we aim to become a leading financial solutions provider, known for trust, transparency, and customer satisfaction. We believe that everyone deserves access to financial opportunities — without unnecessary complications.
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to get your loan?</h2>
          <p className="text-white/80 mb-6 text-base">Talk to our team today — we are just a message away.</p>
          <a
            href="https://wa.me/919596601094?text=Hi%20I%20want%20to%20apply%20for%20the%20Loan"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.25"/>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            Chat with Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
