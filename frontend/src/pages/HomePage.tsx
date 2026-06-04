import CallToAction from "../components/landing/CallToAction"
import FamilySection from "../components/landing/FamilySection"
import FeatureSection from "../components/landing/FeatureSection"
import HeroSection from "../components/landing/HeroSection"
import StatsSection from "../components/landing/StatsSection"


function HomePage() {
    return (
        <>
        <HeroSection/>
        <FeatureSection/>
        <StatsSection/>
        <FamilySection />
        <CallToAction />
        </>
    )

}

export default HomePage