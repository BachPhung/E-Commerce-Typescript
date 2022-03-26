import { HeroSliders } from "../../components/HeroSlider/HeroSlider"
import { Navbar } from "../../components/Navbar/Navbar"

export const LandingPage = () => {
  return (
    <div>
        <Navbar pages="LandingPage"/>
        <HeroSliders/>
    </div>
  )
}
