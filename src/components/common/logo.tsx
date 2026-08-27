import React from 'react';

interface LogoProps {
className?: string;
}

export const Logo: React.FC<LogoProps> = ({
className = "w-40 h-auto text-white",
}) => {
return <svg
   viewBox="0 0 220 50"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   className={className}
   aria-label="CALYPSO"
   role="img"
 >
{/* Geometric accent */} 

    <path
     d="M10 25 L15 17 L20 25 L15 33 Z"
     fill="currentColor"
     className="opacity-90"
   />

  {/* Main brand */}
  <text
    x="35"
    y="31"
    fill="currentColor"
    style={{
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
    }}
    fontSize="20"
    fontWeight="300"
    letterSpacing="0.35em"
  >
    CALYPSO
  </text>

  {/* Subtitle */}
  <text
    x="37"
    y="45"
    fill="currentColor"
    style={{
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
    }}
    fontSize="7"
    fontWeight="500"
    letterSpacing="0.4em"
    className="opacity-40"
  >
    FLUID INTERFACES
  </text>
</svg>
};
