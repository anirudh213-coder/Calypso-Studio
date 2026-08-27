export default function BackgroundVideo() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden bg-[#080808]"
      aria-hidden="true"
    >
      <video
        className="h-full w-full object-cover opacity-50 scale-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/background-loop.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,.62)_72%)]" />
    </div>
  );
}