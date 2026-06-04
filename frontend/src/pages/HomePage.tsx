import CallToAction from "../components/landing/CallToAction"
import FamilySection from "../components/landing/FamilySection"
import FeatureSection from "../components/landing/FeatureSection"
import Footer from "../components/landing/Footer"
import HeroSection from "../components/landing/HeroSection"
import Navbar from "../components/landing/Navbar"

function HomePage() {
    return (
        <>
        <Navbar/>
        <HeroSection/>
        <FeatureSection/>
        <FamilySection />
        <CallToAction />
        <Footer />
        </>
    )

}

export default HomePage