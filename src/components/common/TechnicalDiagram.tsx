import React from 'react';

export interface TechnicalDiagramProps {
  type: 'soil_excavation' | 'footing_rebar' | 'plinth_beam' | 'rcc_slab' | 'masonry_wall' | 'waterproofing' | 'electrical_conduit';
  className?: string;
}

export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({ type, className = 'w-full h-48' }) => {
  switch (type) {
    case 'soil_excavation':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          <path d="M20 60 H380" stroke="#0F172A" strokeWidth="2" strokeDasharray="4 4" />
          <text x="25" y="52" fill="#2563EB" fontSize="10" fontWeight="700">DATUM GROUND LEVEL (100.00m)</text>
          
          <rect x="60" y="60" width="280" height="100" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <path d="M60 80 H340" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
          <text x="70" y="75" fill="#475569" fontSize="9" fontWeight="600">Organic Topsoil (150mm Removed)</text>

          <rect x="120" y="100" width="160" height="60" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
          <text x="140" y="135" fill="#0F172A" fontSize="10" fontWeight="700">Hard Strata (SBC 180 kN/m²)</text>

          <line x1="280" y1="60" x2="280" y2="160" stroke="#2563EB" strokeWidth="1.5" />
          <text x="288" y="115" fill="#2563EB" fontSize="9" fontWeight="700">Depth: 2.2m</text>
        </svg>
      );

    case 'footing_rebar':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          {/* PCC Bed */}
          <rect x="80" y="150" width="240" height="25" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          <text x="140" y="166" fill="#334155" fontSize="9" fontWeight="700">100mm PCC Bed (M10 Grade)</text>

          {/* RCC Footing Trapezoid */}
          <polygon points="100,150 300,150 240,90 160,90" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
          
          {/* Rebar Mesh Bottom */}
          <line x1="110" y1="142" x2="290" y2="142" stroke="#DC2626" strokeWidth="3" />
          <circle cx="130" cy="142" r="3" fill="#2563EB" />
          <circle cx="160" cy="142" r="3" fill="#2563EB" />
          <circle cx="190" cy="142" r="3" fill="#2563EB" />
          <circle cx="220" cy="142" r="3" fill="#2563EB" />
          <circle cx="250" cy="142" r="3" fill="#2563EB" />
          <circle cx="270" cy="142" r="3" fill="#2563EB" />

          {/* Column Stem */}
          <rect x="175" y="30" width="50" height="60" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
          <line x1="185" y1="20" x2="185" y2="142" stroke="#DC2626" strokeWidth="2" />
          <line x1="215" y1="20" x2="215" y2="142" stroke="#DC2626" strokeWidth="2" />

          <text x="235" y="55" fill="#0F172A" fontSize="9" fontWeight="700">Column Verticals (Fe 550D)</text>
          <text x="110" y="132" fill="#DC2626" fontSize="8" fontWeight="700">50mm Clear Cover</text>
        </svg>
      );

    case 'plinth_beam':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          <rect x="140" y="60" width="120" height="100" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
          {/* Stirrup Ties */}
          <rect x="150" y="70" width="100" height="80" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          {/* Main Bars */}
          <circle cx="155" cy="75" r="4" fill="#DC2626" />
          <circle cx="245" cy="75" r="4" fill="#DC2626" />
          <circle cx="155" cy="145" r="4" fill="#DC2626" />
          <circle cx="245" cy="145" r="4" fill="#DC2626" />

          {/* DPC Layer */}
          <rect x="120" y="50" width="160" height="10" fill="#0F172A" />
          <text x="145" y="42" fill="#2563EB" fontSize="10" fontWeight="700">50mm Waterproof DPC</text>

          <text x="155" y="115" fill="#334155" fontSize="10" fontWeight="700">RCC M25 (300x375mm)</text>
        </svg>
      );

    case 'rcc_slab':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          <rect x="40" y="70" width="320" height="60" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
          <line x1="50" y1="100" x2="350" y2="100" stroke="#DC2626" strokeWidth="2.5" />
          <line x1="50" y1="85" x2="350" y2="85" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="6 3" />
          
          {/* Electrical Conduit */}
          <rect x="180" y="80" width="40" height="15" fill="#F59E0B" rx="3" />
          <text x="184" y="91" fill="#FFFFFF" fontSize="8" fontWeight="700">PVC Box</text>

          <text x="50" y="60" fill="#0F172A" fontSize="10" fontWeight="700">125mm Monolithic RCC Slab M25</text>
          <text x="50" y="145" fill="#DC2626" fontSize="9" fontWeight="600">10mm TMT Bar @ 150mm c/c</text>
        </svg>
      );

    case 'masonry_wall':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          <g stroke="#475569" strokeWidth="1.5" fill="#E2E8F0">
            <rect x="80" y="140" width="110" height="35" />
            <rect x="195" y="140" width="110" height="35" />

            <rect x="135" y="102" width="110" height="35" fill="#CBD5E1" />
            <rect x="250" y="102" width="110" height="35" fill="#CBD5E1" />

            <rect x="80" y="65" width="110" height="35" />
            <rect x="195" y="65" width="110" height="35" />
          </g>
          <line x1="75" y1="138" x2="365" y2="138" stroke="#2563EB" strokeWidth="2" />
          <text x="90" y="52" fill="#2563EB" fontSize="10" fontWeight="700">150mm AAC Blockwork (3mm Thin Polymer Joint)</text>
          <text x="145" y="124" fill="#0F172A" fontSize="9" fontWeight="700">Interlocking Staggered Bond</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#F8FAFC" rx="12" />
          <rect x="100" y="50" width="200" height="100" fill="#E2E8F0" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" rx="8" />
          <text x="140" y="105" fill="#0F172A" fontSize="11" fontWeight="700">Technical Schematic</text>
        </svg>
      );
  }
};
