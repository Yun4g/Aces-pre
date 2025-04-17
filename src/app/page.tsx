 import Footer from "@/components/footer"
import HeroSection from "@/components/herosection"
import Navbar from "@/components/navbar"
import Section2 from "@/components/section2"
import Section3 from "@/components/section3"
import SectionFive from "@/components/sectionfive"
import SectionSix from "@/components/sectionSix"

export default function Home() {
  return (
    <>
       <Navbar/>
       <HeroSection/>
       <Section2/>
       <Section3/>
       <SectionFive/>
       <SectionSix/>
       <Footer/>
    </>
  )
}
