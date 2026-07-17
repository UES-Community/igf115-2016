import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import CourseInfoBar from '@/components/course-info-bar'
import UnitsGrid from '@/components/units-grid'
import FeaturesSection from '@/components/features-section'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CourseInfoBar />
      <main className="flex-1">
        <HeroSection />
        <UnitsGrid />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
