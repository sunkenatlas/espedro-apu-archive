import React from 'react';

interface ApuSealProps {
  size?: number;
  className?: string;
}

/**
 * Handcrafted circular crest inspired directly by the official stamp visible on 35降神.png:
 * "CITY OF ESPEDRO · NORTH AMERICA · ANOMALOUS PHENOMENA UNIT"
 */
export const ApuSeal: React.FC<ApuSealProps> = ({ size = 38, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.82" />
      <circle
        cx="50"
        cy="50"
        r="39"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="2.5 2.5"
        strokeOpacity="0.55"
      />
      <circle cx="50" cy="50" r="27" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.72" />
      {/* Stylized Espedro Skyline + Watchtower */}
      <path
        d="M32 63H68M36 63V51H41V63M43 63V45H47V63M49 63V33L50 30L51 33V63M53 63V47H58V63M60 63V53H64V63"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      {/* Red/Blue Cardinal Micro-Markers */}
      <circle cx="50" cy="11" r="2.2" fill="#c43f35" />
      <circle cx="50" cy="89" r="2.2" fill="#4686b5" />
      <line x1="11" y1="50" x2="18" y2="50" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" />
      <line x1="82" y1="50" x2="89" y2="50" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" />
    </svg>
  );
};
