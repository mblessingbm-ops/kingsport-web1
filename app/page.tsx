import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import CategoryGrid from '@/components/home/CategoryGrid'
import SectorsServed from '@/components/home/SectorsServed'
import AboutSnippet from '@/components/home/AboutSnippet'
import TrustedBy from '@/components/home/TrustedBy'
import CtaBanner from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <SectorsServed />
      <AboutSnippet />
      <TrustedBy />
      <CtaBanner />
    </>
  )
}
