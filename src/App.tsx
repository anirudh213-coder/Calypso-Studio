import BackgroundVideo from "./components/layout/BackgroundVideo";
import WorkingArea from "./components/layout/WorkingArea";
import Navbar from "./components/layout/Navbar";
import CustomCursor from "./features/cursor/CustomCursor";
import HeroSection from "./components/sections/HeroSection";
import PhilosophySection from "./components/sections/PhilosophySection";
import ArchiveSection from "./components/sections/ArchiveSection";
import ConnectSection from "./components/sections/ConnectSection";
import Marquee from "./components/common/Marquee";

export default function App() {
return ( <div className="relative min-h-screen bg-black/10">
{/* Layer 0 */} <BackgroundVideo />


  {/* Layer 3 */}
  <Navbar />
  <CustomCursor />

  {/* Layer 1 */}
  <WorkingArea>
    <HeroSection />
    <PhilosophySection />

    <Marquee />

    <ArchiveSection />
    <ConnectSection />
  </WorkingArea>
</div>




);
}
