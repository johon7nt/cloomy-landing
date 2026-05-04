import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfiniteBand from './components/InfiniteBand'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AllFeatures from './components/AllFeatures'
import Demo from './components/Demo'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-bg-page min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <InfiniteBand />
        <Features />
        <HowItWorks />
        <AllFeatures />
        <Demo />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
