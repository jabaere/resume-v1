import React, { useState } from 'react';

interface SideBarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * Each button owns its OWN isHovered state.
 * No shared state → no possible bleed between buttons.
 * No CSS :hover → no R3F portal selector issues.
 * All visual transitions are driven purely by this component's local state.
 */
export const SideBarButton = ({ icon, label, onClick }: SideBarButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '12px 16px',
        borderRadius: 10,
        border: `1px solid ${hovered ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.2)'}`,
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        marginLeft: 8,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        background: hovered
          ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(250,204,21,0.15))'
          : 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(250,204,21,0.08))',
        boxShadow: hovered
          ? '0 8px 24px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
          : 'none',
      }}
    >
      {/* Icon wrapper — scale only when THIS button is hovered */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 8,
          borderRadius: 8,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.3s cubic-bezier(0.4,0,0.2,1)',
          transform: hovered ? 'scale3d(1.15,1.15,1) rotate(5deg)' : 'scale3d(1,1,1) rotate(0deg)',
          filter: hovered ? 'drop-shadow(0 0 15px rgba(249,115,22,0.6))' : 'none',
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <p
        style={{
          margin: 0,
          padding: 0,
          textTransform: 'uppercase',
          fontSize: '0.85em',
          letterSpacing: hovered ? '0.15em' : '0.12em',
          fontFamily: 'var(--header-font)',
          fontWeight: 600,
          cursor: 'pointer',
          backgroundImage: 'linear-gradient(135deg, #c2410c 0%, #f97316 60%, #facc15 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: hovered ? 1 : 0.9,
          userSelect: 'none',
          transition: 'opacity 0.3s ease, letter-spacing 0.3s ease',
          width: 'auto',
        }}
      >
        {label}
      </p>
    </div>
  );
};