import BackgroundVideo from "./components/layout/BackgroundVideo";
import WorkingArea from "./components/layout/WorkingArea";
import Navbar from "./components/layout/Navbar";
import CustomCursor from "./features/cursor/CustomCursor";
import HeroSection from "./components/sections/HeroSection";
import PhilosophySection from "./components/sections/PhilosophySection";
import ArchiveSection from "./components/sections/ArchiveSection";
import ConnectSection from "./components/sections/ConnectSection";
import Marquee from "./components/common/Marquee";
import { MainLayout } from "./components/layout/MainLayout";

export default function App() {
  return (
    <MainLayout>
      {/* Background layer */}
      <BackgroundVideo />

      {/* Navigation & Cursor */}
      <Navbar />
      <CustomCursor />

      {/* Content wrapper */}
      <WorkingArea>
        <HeroSection />
        <PhilosophySection />
        <Marquee />
        <ArchiveSection />
        <ConnectSection />
      </WorkingArea>
    </MainLayout>
  );
}
