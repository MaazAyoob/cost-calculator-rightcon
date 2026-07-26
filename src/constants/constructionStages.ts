export interface ActivityDetail {
  id: string;
  stageId: string;
  title: string;
  purpose: string;
  estimatedCost: number;
  estimatedQuantity: string;
  estimatedDuration: string;
  materialTags: string[];
  qualityIndicator: 'Standard' | 'Premium' | 'Luxury';
  specifications: {
    label: string;
    value: string;
  }[];
  diagramType: 'soil_excavation' | 'footing_rebar' | 'plinth_beam' | 'rcc_slab' | 'masonry_wall' | 'waterproofing' | 'electrical_conduit';
  checklist: string[];
  commonMistakes: string[];
  expertTips: string[];
  technicalNotes: string;
  relatedActivities: { id: string; title: string }[];
}

export interface ConstructionStage {
  id: string;
  number: string;
  title: string;
  iconName: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  progress: number; // 0 - 100
  estimatedCost: number;
  estimatedDuration: string;
  activities: ActivityDetail[];
}

export const CONSTRUCTION_STAGES: ConstructionStage[] = [
  // Stage 01: Site Preparation
  {
    id: 'stage-01',
    number: '01',
    title: 'Site Preparation',
    iconName: 'Compass',
    status: 'Completed',
    progress: 100,
    estimatedCost: 185000,
    estimatedDuration: '7 Days',
    activities: [
      {
        id: 'act-01-1',
        stageId: 'stage-01',
        title: 'Topsoil Clearing & Land Demarcation',
        purpose: 'Clear debris, vegetation, organic topsoil up to 150mm depth and benchmark plot boundary limits with total station survey equipment.',
        estimatedCost: 65000,
        estimatedQuantity: '2,400 Sq Ft',
        estimatedDuration: '2 Days',
        materialTags: ['Survey Benchmarks', 'Lime Powder', 'Wooden Pegs'],
        qualityIndicator: 'Standard',
        specifications: [
          { label: 'Clearing Depth', value: '150mm - 200mm organic layer removal' },
          { label: 'Survey Accuracy', value: 'Total Station ±2mm tolerance' },
          { label: 'Site Leveling', value: 'Laser-guided grading to baseline' },
        ],
        diagramType: 'soil_excavation',
        checklist: [
          'Verify municipality setback dimensions from main road',
          'Establish fixed site benchmark pillar (100.00m datum level)',
          'Clear all root structures and organic topsoil',
        ],
        commonMistakes: [
          'Failing to locate underground telecom/water utility lines before grading',
          'Relying on physical fences instead of licensed surveyor total station markers',
        ],
        expertTips: [
          'Preserve a 1m clear buffer zone around all boundary lines for scaffolding and material stock movement.',
        ],
        technicalNotes: 'IS 3720 soil clearance specifications require complete removal of top organic humic layer to prevent differential settlement.',
        relatedActivities: [
          { id: 'act-01-2', title: 'Soil Strata & Bearing Capacity Testing' },
          { id: 'act-02-1', title: 'Foundation Excavation & Pit Marking' },
        ],
      },
      {
        id: 'act-01-2',
        stageId: 'stage-01',
        title: 'Soil Strata & Bearing Capacity Testing',
        purpose: 'Conduct core borehole drilling down to 6 meters depth to establish Safe Bearing Capacity (SBC) and water table level.',
        estimatedCost: 45000,
        estimatedQuantity: '3 Core Boreholes',
        estimatedDuration: '3 Days',
        materialTags: ['Bore Core Rig', 'Soil Samples', 'Lab SPT Apparatus'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Bore Depth', value: '6.0 Metres below ground level' },
          { label: 'SBC Range', value: '180 kN/m2 (Target Safe Capacity)' },
          { label: 'Soil Type', value: 'Medium Dense Clayey Sand / Red Loam' },
        ],
        diagramType: 'soil_excavation',
        checklist: [
          'Extract undisturbed soil samples at 1.5m depth increments',
          'Perform Standard Penetration Test (SPT) N-value logging',
          'Check seasonal water table variation level',
        ],
        commonMistakes: [
          'Proceeding with structural foundation design without official geotechnical SBC lab certificate.',
        ],
        expertTips: [
          'In clayey soil, ensure expansive clay swell pressure tests are performed before finalizing footing depth.',
        ],
        technicalNotes: 'SBC testing strictly adheres to IS 1892 and IS 2131 standards.',
        relatedActivities: [
          { id: 'act-02-1', title: 'Foundation Excavation & Pit Marking' },
        ],
      },
      {
        id: 'act-01-3',
        stageId: 'stage-01',
        title: 'Temporary Site Shed & Utility Hookups',
        purpose: 'Erect secure material storage shed, site supervisor office, and connect 3-phase temporary electricity & water line.',
        estimatedCost: 75000,
        estimatedQuantity: '1 Shed Unit (300 Sq Ft)',
        estimatedDuration: '2 Days',
        materialTags: ['GI Sheets', 'MS Tubular Frame', '3-Phase Meter'],
        qualityIndicator: 'Standard',
        specifications: [
          { label: 'Shed Structure', value: 'Galvanized iron corrugated sheet enclosure' },
          { label: 'Electrical Connection', value: 'BESCOM 5kW temporary commercial connection' },
          { label: 'Water Source', value: 'Borewell connection with 2,000L PVC storage tank' },
        ],
        diagramType: 'soil_excavation',
        checklist: [
          'Install weatherproof lockable cement & steel storage room',
          'Provide ELCB earth leakage protection box on main site breaker',
          'Set up temporary toilet facility with soak pit',
        ],
        commonMistakes: [
          'Storing cement bags directly on soil ground without raised wooden pallet isolation.',
        ],
        expertTips: [
          'Stack cement bags on wooden pallets elevated 150mm off the ground and keep 300mm clear from walls.',
        ],
        technicalNotes: 'IS 4082 code for storage of construction materials on site.',
        relatedActivities: [
          { id: 'act-02-1', title: 'Foundation Excavation & Pit Marking' },
        ],
      },
    ],
  },

  // Stage 02: Foundation
  {
    id: 'stage-02',
    number: '02',
    title: 'Foundation',
    iconName: 'Layers',
    status: 'In Progress',
    progress: 65,
    estimatedCost: 1240000,
    estimatedDuration: '21 Days',
    activities: [
      {
        id: 'act-02-1',
        stageId: 'stage-02',
        title: 'Isolated & Combined Footing Excavation',
        purpose: 'Machine and manual excavation for RCC column footings according to structural engineer pit schedule.',
        estimatedCost: 280000,
        estimatedQuantity: '14 Footing Pits (420 Cu M)',
        estimatedDuration: '5 Days',
        materialTags: ['JCB Excavator', 'Anti-Termite Chemical', 'PCC M10'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Pit Size', value: '2.1m x 2.1m x 2.2m (Avg Depth)' },
          { label: 'PCC Bed Thickness', value: '100mm M10 Grade Concrete' },
          { label: 'Termite Protection', value: 'Chlorpyrifos 20% EC emulsion' },
        ],
        diagramType: 'footing_rebar',
        checklist: [
          'Verify footing pit bottom is compacted and level',
          'Apply anti-termite chemical spray at 5 litres per sq metre bottom and sides',
          'Pour 100mm PCC bed M10 grade before rebar placement',
        ],
        commonMistakes: [
          'Pouring footing concrete directly onto loose uncompacted soil without PCC bedding.',
        ],
        expertTips: [
          'Maintain a minimum 50mm clear concrete cover under footing rebar mesh using heavy-duty plastic spacers.',
        ],
        technicalNotes: 'Footing depth adheres to IS 456:2000 requirements for minimum soil overburden.',
        relatedActivities: [
          { id: 'act-02-2', title: 'Column Footing Rebar Cage Binding' },
          { id: 'act-03-1', title: 'Plinth Beam Casting & Backfilling' },
        ],
      },
      {
        id: 'act-02-2',
        stageId: 'stage-02',
        title: 'Column Footing Rebar Mesh & Starter Casting',
        purpose: 'Bind Fe 550D TMT rebar mat mesh and anchor vertical column starter bars into M25 concrete footing pads.',
        estimatedCost: 960000,
        estimatedQuantity: '6.8 Tonnes TMT Rebar / 48 Cu M M25 RMC',
        estimatedDuration: '10 Days',
        materialTags: ['Fe 550D Rebar', 'M25 RMC Concrete', 'Needle Vibrator'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Rebar Grade', value: 'Tata Tiscon Fe 550D High Ductility' },
          { label: 'Concrete Mix', value: 'M25 Ready Mix (25 N/mm2 at 28 days)' },
          { label: 'Clear Cover', value: '50mm bottom & sides' },
        ],
        diagramType: 'footing_rebar',
        checklist: [
          'Ensure 90 degree L-bends (300mm length) on column vertical rebar legs anchored into mesh',
          'Vibrate concrete thoroughly using 40mm needle vibrator to eliminate honeycombing',
          'Wet curing for minimum 14 consecutive days',
        ],
        commonMistakes: [
          'Misaligning column starter bars from grid center line during concrete pour.',
        ],
        expertTips: [
          'Use wooden template frames at top of pit to lock vertical column bars in exact grid position during RMC pour.',
        ],
        technicalNotes: 'Reinforcement detailing conforms to IS 13920 seismic ductile detailing guidelines.',
        relatedActivities: [
          { id: 'act-03-1', title: 'Plinth Beam Casting & Backfilling' },
        ],
      },
      {
        id: 'act-02-3',
        stageId: 'stage-02',
        title: 'Pedestal Column Casting to Plinth Level',
        purpose: 'Cast stub column necks up to plinth bottom level using M25 concrete with rigid shuttering boxes.',
        estimatedCost: 310000,
        estimatedQuantity: '14 Pedestal Columns (12 Cu M)',
        estimatedDuration: '6 Days',
        materialTags: ['M25 Concrete', 'Plywood Formwork', 'Curing Hessian Cloth'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Pedestal Section', value: '300mm x 450mm RCC Column' },
          { label: 'Formwork Type', value: '12mm Marine Plywood with steel stiffeners' },
          { label: 'Curing Period', value: '10 Days continuous hessian cloth wrapping' },
        ],
        diagramType: 'footing_rebar',
        checklist: [
          'Check vertical plumbness using plumb bob on all 4 faces',
          'Wrap poured column with wet gunny bags within 12 hours of stripping formwork',
        ],
        commonMistakes: [
          'Stripping column formwork earlier than 16-24 hours without adequate structural support.',
        ],
        expertTips: [
          'Apply formwork release oil evenly to plywood inner faces for smooth concrete surface finish.',
        ],
        technicalNotes: 'Formwork removal complies with IS 456 Clause 11.3.',
        relatedActivities: [
          { id: 'act-03-1', title: 'Plinth Beam Shuttering & Casting' },
        ],
      },
    ],
  },

  // Stage 03: Plinth
  {
    id: 'stage-03',
    number: '03',
    title: 'Plinth',
    iconName: 'Box',
    status: 'Pending',
    progress: 0,
    estimatedCost: 650000,
    estimatedDuration: '12 Days',
    activities: [
      {
        id: 'act-03-1',
        stageId: 'stage-03',
        title: 'Plinth Beam Shuttering, Rebar & Concrete Pour',
        purpose: 'Construct continuous RCC plinth beam band tying all columns at ground level to absorb differential settlement.',
        estimatedCost: 380000,
        estimatedQuantity: '180 Running Metres (28 Cu M M25)',
        estimatedDuration: '6 Days',
        materialTags: ['Fe 550D Steel', 'M25 RMC', 'Steel Formwork'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Beam Size', value: '230mm x 450mm continuous grid' },
          { label: 'Top & Bottom Bars', value: '4 nos 16mm TMT + 2 nos 12mm stirrups @ 150mm c/c' },
          { label: 'Plinth Height', value: '600mm above road level' },
        ],
        diagramType: 'plinth_beam',
        checklist: [
          'Verify top level alignment using water level tube or auto level',
          'Ensure 40mm clear cover to beam stirrups',
          'Check lap splice positions occur at middle third of beam span',
        ],
        commonMistakes: [
          'Lapping beam main steel at high bending moment locations near column nodes.',
        ],
        expertTips: [
          'Keep plinth level minimum 600mm above adjacent road level to avoid rainwater ingress during extreme floods.',
        ],
        technicalNotes: 'IS 456 beam reinforcement splice and anchorage provisions.',
        relatedActivities: [
          { id: 'act-03-2', title: 'Backfilling & Earth Compaction in Plinth' },
        ],
      },
      {
        id: 'act-03-2',
        stageId: 'stage-03',
        title: 'Backfilling & Earth Compaction in Plinth',
        purpose: 'Fill excavated quarry dust/gravel inside plinth bays in 150mm layers with water soaking and plate vibrator compaction.',
        estimatedCost: 170000,
        estimatedQuantity: '320 Cu M Quarry Dust / Gravel',
        estimatedDuration: '4 Days',
        materialTags: ['Quarry Dust', 'Plate Compactor', 'Water Hose'],
        qualityIndicator: 'Standard',
        specifications: [
          { label: 'Fill Material', value: 'Granular non-cohesive quarry dust & red earth' },
          { label: 'Layer Depth', value: '150mm max per compaction pass' },
          { label: 'Compaction Density', value: '95% Proctor dry density target' },
        ],
        diagramType: 'plinth_beam',
        checklist: [
          'Soak filled earth thoroughly with water 12 hours prior to mechanical compaction',
          'Run 2-tonne plate roller/compactor minimum 4 passes per layer',
        ],
        commonMistakes: [
          'Filling plinth in a single 1-meter thick uncompacted mound causing floor slab settlement after tiling.',
        ],
        expertTips: [
          'Flooding earth with water overnight aids natural consolidation before mechanical rolling.',
        ],
        technicalNotes: 'IS 2720 soil compaction testing protocols.',
        relatedActivities: [
          { id: 'act-03-3', title: 'Damp Proof Course (DPC) & PCC Soling Slab' },
        ],
      },
      {
        id: 'act-03-3',
        stageId: 'stage-03',
        title: 'Damp Proof Course (DPC) & PCC Soling Slab',
        purpose: 'Pour 75mm M15 grade PCC ground slab with waterproofing compound to seal ground moisture rising into walls.',
        estimatedCost: 100000,
        estimatedQuantity: '2,400 Sq Ft (18 Cu M M15)',
        estimatedDuration: '2 Days',
        materialTags: ['PCC M15', 'Dr. Fixit Pidiproof LW+', 'Bitumen Felt'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'DPC Thickness', value: '50mm M20 with integral waterproofer' },
          { label: 'Soling Bed', value: '75mm 40mm metal aggregate base' },
          { label: 'Membrane Coating', value: '2 coats hot bitumen application' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Apply 2 coats hot bitumen seal over top surface of plinth beam',
          'Ensure seamless link between DPC layer and external wall line',
        ],
        commonMistakes: [
          'Omitting DPC coating, leading to capillary dampness stains on ground floor interior walls.',
        ],
        expertTips: [
          'Mix Dr. Fixit LW+ at 200ml per bag of cement in the PCC soling mix for total damp resistance.',
        ],
        technicalNotes: 'IS 3067 code of practice for damp proofing of buildings.',
        relatedActivities: [
          { id: 'act-04-1', title: 'Ground Floor Column Reinforcement & Casting' },
        ],
      },
    ],
  },

  // Stage 04: RCC Structure
  {
    id: 'stage-04',
    number: '04',
    title: 'RCC Structure',
    iconName: 'Building2',
    status: 'Pending',
    progress: 0,
    estimatedCost: 1850000,
    estimatedDuration: '35 Days',
    activities: [
      {
        id: 'act-04-1',
        stageId: 'stage-04',
        title: 'Ground Floor Column Reinforcement & Formwork',
        purpose: 'Extend vertical TMT columns from plinth, assemble stirrup ties at 100mm spacing, and clamp rigid film-faced shuttering.',
        estimatedCost: 520000,
        estimatedQuantity: '14 Columns (3.3m height / 4.2 Tonnes Steel)',
        estimatedDuration: '10 Days',
        materialTags: ['Fe 550D TMT', 'Plywood Boxes', 'Column Clamps'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Column Size', value: '230mm x 450mm & 300mm x 600mm' },
          { label: 'Vertical Bars', value: '8 nos 20mm TMT Fe 550D' },
          { label: 'Stirrup Spacing', value: '8mm @ 100mm c/c at ends, 150mm middle' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Verify cover block spacing of 40mm on all 4 faces',
          'Check plumbness using laser level equipment on orthogonal axes',
          'Ensure shear zone stirrup ties have 135 degree seismic hooks',
        ],
        commonMistakes: [
          'Using 90 degree stirrup hooks instead of 135 degree seismic bent hooks in columns.',
        ],
        expertTips: [
          'Stagger vertical rebar lap joints so no more than 50% of bars are spliced at one height section.',
        ],
        technicalNotes: 'IS 13920 ductile detailing of reinforced concrete structures subjected to seismic forces.',
        relatedActivities: [
          { id: 'act-04-2', title: 'Ground Floor Column M25 RMC Pouring' },
        ],
      },
      {
        id: 'act-04-2',
        stageId: 'stage-04',
        title: 'Ground Floor Column M25 RMC Concrete Pour',
        purpose: 'Pump M25 grade self-compacting RMC into column formwork with continuous needle vibration.',
        estimatedCost: 280000,
        estimatedQuantity: '18 Cu M M25 RMC',
        estimatedDuration: '3 Days',
        materialTags: ['M25 RMC Concrete', 'Concrete Pump', 'Vibrator'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Slump Value', value: '120mm - 140mm pumpable slump' },
          { label: 'Pour Rate', value: '3.0 Metres per hour max lift' },
          { label: 'Cube Testing', value: '6 test cubes per 15 Cu M pour' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Perform slump test on transit mixer batch before discharge',
          'Cast 6 cube specimens for 7-day and 28-day compressive strength lab test',
        ],
        commonMistakes: [
          'Adding extra water to transit mixer on site, reducing 28-day target concrete strength.',
        ],
        expertTips: [
          'Tap shuttering panels externally with rubber mallets alongside internal needle vibration for smooth fair-face finish.',
        ],
        technicalNotes: 'IS 516 methods of tests for strength of concrete.',
        relatedActivities: [
          { id: 'act-05-1', title: 'First Floor Slab Staging & Shuttering' },
        ],
      },
      {
        id: 'act-04-3',
        stageId: 'stage-04',
        title: 'First Floor Columns & Beam Node Assembly',
        purpose: 'Repeat column vertical extension and rigid beam-column joint anchoring for upper floor levels.',
        estimatedCost: 610000,
        estimatedQuantity: '14 Columns (3.3m height / 4.8 Tonnes Steel)',
        estimatedDuration: '12 Days',
        materialTags: ['Fe 550D TMT', 'Scaffolding Pipes', 'U-Jacks'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Joint Rigidity', value: 'Ductile confinement stirrups through beam-column node' },
          { label: 'Scaffolding', value: 'Cuplock heavy-duty steel tubular scaffolding' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Inspect beam-column core stirrup density before closing formwork',
          'Tighten U-jack cup props to rated load capacity',
        ],
        commonMistakes: [
          'Omitting ties inside the beam-column core zone, creating a weak hinge point under lateral wind loads.',
        ],
        expertTips: [
          'Use pre-assembled rebar cages for joint nodes to speed up site placement.',
        ],
        technicalNotes: 'IS 456 Clause 26.5.3 column joint requirements.',
        relatedActivities: [
          { id: 'act-05-1', title: 'First Floor Slab Staging & Shuttering' },
        ],
      },
      {
        id: 'act-04-4',
        stageId: 'stage-04',
        title: 'Staircase RCC Waist Slab & Riser Casting',
        purpose: 'Erect angled waist slab formwork, place double-layer rebar mesh, and cast stair steps in M25 concrete.',
        estimatedCost: 440000,
        estimatedQuantity: '2 Flight Staircase (8.5 Cu M Concrete)',
        estimatedDuration: '10 Days',
        materialTags: ['Fe 550D Steel', 'M25 Concrete', 'Riser Boards'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Waist Slab Thickness', value: '150mm RCC slab' },
          { label: 'Riser / Tread Size', value: '150mm Riser / 300mm Tread' },
          { label: 'Landing Beam', value: '230mm x 350mm intermediate landing beam' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Verify step riser height is uniform 150mm across all steps',
          'Check mid-landing beam anchorage into main column grid',
        ],
        commonMistakes: [
          'Varying riser heights between steps, creating a persistent tripping hazard.',
        ],
        expertTips: [
          'Cut wooden riser shutter boards precisely and brace with diagonal stiffeners to avoid step bulging during concrete placement.',
        ],
        technicalNotes: 'IS 456 staircase design and live load standards.',
        relatedActivities: [
          { id: 'act-05-1', title: 'Roof Slab & Beam Casting' },
        ],
      },
    ],
  },

  // Stage 05: Roof Slab
  {
    id: 'stage-05',
    number: '05',
    title: 'Roof Slab',
    iconName: 'SquareStack',
    status: 'Pending',
    progress: 0,
    estimatedCost: 1420000,
    estimatedDuration: '24 Days',
    activities: [
      {
        id: 'act-05-1',
        stageId: 'stage-05',
        title: 'First Floor Slab Staging, Props & Shuttering',
        purpose: 'Erect Cuplock steel tubular scaffolding, H-beams, and lay 12mm film-faced marine shuttering plywood.',
        estimatedCost: 340000,
        estimatedQuantity: '2,650 Sq Ft Slab Area',
        estimatedDuration: '7 Days',
        materialTags: ['Cuplock System', 'Film-Faced Plywood', 'H20 Timber Beams'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Prop Spacing', value: '900mm x 900mm grid layout' },
          { label: 'Plywood Sheet', value: '12mm 34kg phenolic film-faced marine ply' },
          { label: 'Slab Camber', value: '1:500 upward camber at mid-span' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Seal all plywood sheet joints with PVC masking tape to prevent cement slurry leakage',
          'Check prop verticality and lateral diagonal bracing stability',
          'Apply shuttering oil before rebar placement',
        ],
        commonMistakes: [
          'Using damaged or sagged timber props without base plates on soft soil.',
        ],
        expertTips: [
          'Provide a slight upward camber of 5mm at slab centers to offset deflection under self-weight.',
        ],
        technicalNotes: 'IS 14687 falsework guidelines for concrete structures.',
        relatedActivities: [
          { id: 'act-05-2', title: 'Slab & Beam Rebar Binding with Electrical Conduits' },
        ],
      },
      {
        id: 'act-05-2',
        stageId: 'stage-05',
        title: 'Slab & Beam Rebar Binding with Electrical Conduits',
        purpose: 'Bind main bottom/top TMT mesh, cranked bars, beam cages, and embed PVC electrical junction boxes & conduits.',
        estimatedCost: 580000,
        estimatedQuantity: '7.4 Tonnes TMT Rebar / 450m PVC Conduit',
        estimatedDuration: '8 Days',
        materialTags: ['Tata TMT Fe 550D', 'PVC Heavy Conduits', 'Fan Junction Boxes'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Slab Steel', value: '10mm @ 125mm c/c main, 8mm @ 150mm distribution' },
          { label: 'Slab Thickness', value: '150mm (6 inches) RCC slab' },
          { label: 'Cover Blocks', value: '20mm PVC chair spacer blocks @ 1m grid' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Ensure 20mm clear cover under slab bottom bars using plastic chair spacers',
          'Inspect electrical fan box location against reflected ceiling architectural drawings',
          'Bind top negative bending steel over beam supports securely',
        ],
        commonMistakes: [
          'Stepping on top negative steel during concrete pour without using wooden walking boards.',
        ],
        expertTips: [
          'Place wooden runner boards elevated on chairs for concrete workers to walk on so slab steel mesh is not crushed.',
        ],
        technicalNotes: 'IS 456:2000 two-way slab rebar detailing standards.',
        relatedActivities: [
          { id: 'act-05-3', title: 'Monolithic M25 RMC Slab Pouring & Curing' },
        ],
      },
      {
        id: 'act-05-3',
        stageId: 'stage-05',
        title: 'Monolithic M25 RMC Slab Concrete Pour & Curing',
        purpose: 'Pour M25 RMC continuously using boom pump, surface vibrate, surface power-trowel, and pond cure for 21 days.',
        estimatedCost: 500000,
        estimatedQuantity: '42 Cu M M25 RMC',
        estimatedDuration: '9 Days',
        materialTags: ['M25 RMC', 'Concrete Boom Pump', 'Power Trowel'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Concrete Grade', value: 'M25 (28-day 25 N/mm2 strength)' },
          { label: 'Curing Method', value: 'Clay bund ponding with water for 21 days' },
          { label: 'Surface Finish', value: 'Power trowel smooth float finish' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Construct 50mm mortar bunds across slab bays for 75mm deep water ponding',
          'Keep slab flooded with water continuously for minimum 21 days',
          'Do not strip slab bottom props before 14-21 days',
        ],
        commonMistakes: [
          'Allowing slab surface to dry prematurely in direct sun, causing plastic shrinkage cracks.',
        ],
        expertTips: [
          'Spray micro-silica or curing compound immediately after troweling if ambient temperature exceeds 35°C.',
        ],
        technicalNotes: 'IS 456 Clause 13.5 curing requirements for RCC slabs.',
        relatedActivities: [
          { id: 'act-06-1', title: 'AAC Block Masonry Exterior Walls' },
        ],
      },
    ],
  },

  // Stage 06: Brick Masonry
  {
    id: 'stage-06',
    number: '06',
    title: 'Brick Masonry',
    iconName: 'Grid',
    status: 'Pending',
    progress: 0,
    estimatedCost: 920000,
    estimatedDuration: '20 Days',
    activities: [
      {
        id: 'act-06-1',
        stageId: 'stage-06',
        title: 'AAC Blockwork Outer Perimeter Walls (6 Inch)',
        purpose: 'Construct thermal-insulated 150mm outer perimeter walls using Birla Aerocon AAC blocks and polymer thin-bed adhesive.',
        estimatedCost: 440000,
        estimatedQuantity: '110 Cu M AAC Blocks (6 inch)',
        estimatedDuration: '9 Days',
        materialTags: ['Birla Aerocon AAC', 'Thin-Bed Block Mortar', 'GI Wall Ties'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Block Density', value: '600-650 kg/m3 (Grade 1 AAC)' },
          { label: 'Joint Thickness', value: '3mm thin-bed polymer adhesive joint' },
          { label: 'Wall Reinforcement', value: '2 nos 8mm rebar band every 3rd course' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Dip AAC blocks in water or mist surface before applying polymer adhesive',
          'Install GI L-brackets at RCC column-wall interface junctions every 2 courses',
          'Check wall alignment with spirit level and plumb bob',
        ],
        commonMistakes: [
          'Using thick 12mm conventional cement mortar joints with precision AAC blocks.',
        ],
        expertTips: [
          'Thin-bed polymer mortar (3mm) eliminates thermal bridging and increases wall shear bond strength by 40%.',
        ],
        technicalNotes: 'IS 2185 Part 3 specifications for Autoclaved Aerated Concrete blocks.',
        relatedActivities: [
          { id: 'act-06-2', title: 'AAC Block Inner Partition Walls (4 Inch)' },
        ],
      },
      {
        id: 'act-06-2',
        stageId: 'stage-06',
        title: 'AAC Blockwork Interior Partition Walls (4 Inch)',
        purpose: 'Erect internal room division walls using 100mm AAC blocks with continuous lintel band tie.',
        estimatedCost: 280000,
        estimatedQuantity: '75 Cu M AAC Blocks (4 inch)',
        estimatedDuration: '6 Days',
        materialTags: ['AAC Blocks 4"', 'Polymer Joint Mortar', 'RCC Lintel Band'],
        qualityIndicator: 'Standard',
        specifications: [
          { label: 'Block Thickness', value: '100mm (4 inches)' },
          { label: 'Lintel Band', value: '75mm RCC band with 2 nos 10mm bars at door height' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Provide 75mm RCC lintel band above door/window openings across full wall length',
          'Leave 10mm gap at top of wall under RCC beam, filled with PU expanding foam for flexural movement',
        ],
        commonMistakes: [
          'Jamming top course tight against RCC slab bottom without expansion gap, causing wall top cracking under slab deflections.',
        ],
        expertTips: [
          'Fill top 10mm joint with elastomeric sealant or PU foam to absorb live load deflection of upper floor slab.',
        ],
        technicalNotes: 'IS 1905 code of practice for structural use of unreinforced masonry.',
        relatedActivities: [
          { id: 'act-06-3', title: 'RCC Lintel & Chajja Casting' },
        ],
      },
      {
        id: 'act-06-3',
        stageId: 'stage-06',
        title: 'Precast / Cast-in-Situ RCC Lintels & Weather Shades',
        purpose: 'Cast 150mm RCC lintel beams over window/door openings with 450mm cantilever sunshade chajjas.',
        estimatedCost: 200000,
        estimatedQuantity: '48 Metres Lintel / 18 Metres Chajja',
        estimatedDuration: '5 Days',
        materialTags: ['Fe 550D Steel', 'M20 Concrete', 'Formwork Boards'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Lintel Bearing', value: '230mm minimum bearing length on masonry support' },
          { label: 'Chajja Projection', value: '450mm projection with drip mold edge' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Cast 10mm V-groove drip mold on bottom edge of weather shades',
          'Ensure 150mm minimum side bearing onto supporting masonry piers',
        ],
        commonMistakes: [
          'Forgetting the drip mold groove under chajjas, causing rainwater to streak backward down the external plaster.',
        ],
        expertTips: [
          'Form a sharp 10mm triangular drip groove 25mm in from outer edge under all sunshades.',
        ],
        technicalNotes: 'IS 456 lintel design load rules.',
        relatedActivities: [
          { id: 'act-07-1', title: 'Chicken Mesh Fixing at RCC-Masonry Joints' },
        ],
      },
    ],
  },

  // Stage 07: Internal Plaster
  {
    id: 'stage-07',
    number: '07',
    title: 'Internal Plaster',
    iconName: 'Feather',
    status: 'Pending',
    progress: 0,
    estimatedCost: 780000,
    estimatedDuration: '18 Days',
    activities: [
      {
        id: 'act-07-1',
        stageId: 'stage-07',
        title: 'Chicken Mesh Installation over Joint Dissimilar Materials',
        purpose: 'Fix 200mm wide GI chicken wire mesh (22 gauge) bridging all RCC column/beam to masonry wall junctions.',
        estimatedCost: 95000,
        estimatedQuantity: '850 Running Metres Mesh',
        estimatedDuration: '3 Days',
        materialTags: ['GI Chicken Mesh 22g', 'Concrete Nails', 'Washer Pins'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Mesh Width', value: '200mm (100mm lap on RCC + 100mm lap on AAC)' },
          { label: 'Fixing Pitch', value: 'GI nails @ 200mm staggered centers' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'HACK RCC concrete faces with 300 hacks per sq meter before fixing mesh',
          'Stretch mesh taut without bulges before nailing',
        ],
        commonMistakes: [
          'Omitting wire mesh over RCC-masonry joints, causing vertical hairline cracks in plaster within 6 months.',
        ],
        expertTips: [
          'Mechanical hacking (300 indentations/sqm) on smooth RCC surfaces creates key anchorage for cement mortar.',
        ],
        technicalNotes: 'IS 2402 code of practice for building plastering.',
        relatedActivities: [
          { id: 'act-07-2', title: 'Internal Wall Ready-Mix Cement Plastering' },
        ],
      },
      {
        id: 'act-07-2',
        stageId: 'stage-07',
        title: 'Internal Wall Single Coat Gypsum / Sand-Cement Plastering',
        purpose: 'Apply 12mm-15mm smooth level plaster using Saint-Gobain Gyproc / M-Sand polymer mortar with aluminum screed levelers.',
        estimatedCost: 450000,
        estimatedQuantity: '11,200 Sq Ft Wall Surface',
        estimatedDuration: '10 Days',
        materialTags: ['Saint-Gobain Gypsum', 'M-Sand Cement Mortar', 'Aluminum Screed'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Plaster Thickness', value: '12mm single coat over AAC walls' },
          { label: 'Plumb Tolerance', value: '±2mm in 3 meters using aluminum straight edge' },
          { label: 'Surface Finish', value: 'Right-angle sharp corners and smooth paint-ready finish' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Fix mortar level button pads at 1.5m centers across walls before plastering',
          'Check 90 degree squareness at all room wall corners',
          'Cure sand-cement plaster 7 days (gypsum plaster requires no water curing)',
        ],
        commonMistakes: [
          'Water curing gypsum plaster, which ruins setting chemistry and softens surface bond.',
        ],
        expertTips: [
          'Gypsum plaster provides a mirror-smooth paint finish while saving 10 days of water curing time.',
        ],
        technicalNotes: 'IS 1661 code of practice for application of cement plaster finishes.',
        relatedActivities: [
          { id: 'act-07-3', title: 'External Double-Coat Waterproof Plastering' },
        ],
      },
      {
        id: 'act-07-3',
        stageId: 'stage-07',
        title: 'External Wall Double-Coat Sand-Face Waterproof Plastering',
        purpose: 'Apply 20mm 2-coat waterproof cement plaster (12mm backing coat + 8mm sand-face coat with Dr. Fixit LW+).',
        estimatedCost: 235000,
        estimatedQuantity: '4,500 Sq Ft External Face',
        estimatedDuration: '5 Days',
        materialTags: ['OPC 53 Cement', 'Washed M-Sand', 'Dr. Fixit Pidiproof LW+'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Base Coat', value: '12mm 1:4 cement mortar with waterproofing additive' },
          { label: 'Finish Coat', value: '8mm 1:3 mortar sponge finish' },
          { label: 'Curing', value: '10 Days continuous water spray' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Mix waterproofing liquid at 200ml per bag of cement in both plaster coats',
          'Comb scratch grooves on 1st coat surface after 2 hours to key the 2nd finish coat',
        ],
        commonMistakes: [
          'Applying external plaster in direct hot sunlight without scaffolding shade nets, causing rapid shrinkage cracking.',
        ],
        expertTips: [
          'Hang green shade netting on external scaffolding to shield fresh plaster from hot wind and direct sun during curing.',
        ],
        technicalNotes: 'IS 1661 double coat external plaster rules.',
        relatedActivities: [
          { id: 'act-08-1', title: 'Bathroom & Balcony Waterproof Coating' },
        ],
      },
    ],
  },

  // Stage 08: Flooring
  {
    id: 'stage-08',
    number: '08',
    title: 'Flooring',
    iconName: 'Sparkles',
    status: 'Pending',
    progress: 0,
    estimatedCost: 1650000,
    estimatedDuration: '22 Days',
    activities: [
      {
        id: 'act-08-1',
        stageId: 'stage-08',
        title: 'Bathroom & Balcony 2-Component Polymer Waterproofing',
        purpose: 'Apply 2 coats of Dr. Fixit Fastflex acrylic polymer waterproofing membrane with 300mm vertical wall coving.',
        estimatedCost: 180000,
        estimatedQuantity: '650 Sq Ft Wet Areas',
        estimatedDuration: '4 Days',
        materialTags: ['Dr. Fixit Fastflex', 'Fiberglass Mesh', 'Polymer Elastomeric'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Membrane Type', value: '2-Component polymer modified cementitious slurry' },
          { label: 'Wall Skirting Uplift', value: '300mm vertical turn-up on all bathroom walls' },
          { label: 'Pond Testing', value: '48-hour water ponding test at 100mm depth' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Cast 50mmx50mm fillet coving at all wall-floor junctions',
          'Conduct 48-hour standing water pond test before tile screed bed layer',
          'Verify zero moisture dampness on slab underside below',
        ],
        commonMistakes: [
          'Tiling wet areas without performing mandatory 48-hour standing water pond test.',
        ],
        expertTips: [
          'Pond water to 100mm depth for 48 hours and mark water level lines on walls to detect micro-seepage.',
        ],
        technicalNotes: 'IS 6494 code for waterproofing of wet areas in buildings.',
        relatedActivities: [
          { id: 'act-08-2', title: 'Living & Bedroom Vitrified Tile Laying' },
        ],
      },
      {
        id: 'act-08-2',
        stageId: 'stage-08',
        title: 'Living & Bedroom Vitrified Tile Laying (4x2 ft)',
        purpose: 'Lay 1200x600mm double charged vitrified tiles on 40mm cement mortar bed with 2mm tile spacers and epoxy grouting.',
        estimatedCost: 850000,
        estimatedQuantity: '2,600 Sq Ft Flooring Area',
        estimatedDuration: '10 Days',
        materialTags: ['Kajaria 4x2 Vitrified Tiles', 'MYK Laticrete Adhesive', 'Epoxy Tile Grout'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Tile Size', value: '1200mm x 600mm vitrified slab tile' },
          { label: 'Adhesive Grade', value: 'Type 2 polymer modified tile adhesive' },
          { label: 'Joint Width', value: '2mm spacer joint filled with stainproof epoxy grout' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Use tile leveling wedges and clips to ensure zero lip alignment across large tiles',
          'Ensure 100% full mortar coverage under tile corners to prevent hollow sound when walked on',
          'Apply protective floor paper immediately after grouting to prevent scratch marks during remaining trades',
        ],
        commonMistakes: [
          'Laying 4x2 ft large format tiles with traditional spot dabs instead of full troweled bed, leading to cracked tile corners.',
        ],
        expertTips: [
          'Use double buttering (adhesive on floor AND back of tile) with a notched trowel for 100% bond coverage.',
        ],
        technicalNotes: 'IS 13712 ceramic tile installation standards.',
        relatedActivities: [
          { id: 'act-08-3', title: 'Staircase Granite / Marble Cladding' },
        ],
      },
      {
        id: 'act-08-3',
        stageId: 'stage-08',
        title: 'Staircase Granite / Marble Tread & Riser Cladding',
        purpose: 'Install 20mm thick polished Sadahalli/Telephone Black granite slabs on staircase treads with anti-skid groove lines.',
        estimatedCost: 380000,
        estimatedQuantity: '45 Steps + Landings',
        estimatedDuration: '5 Days',
        materialTags: ['20mm Jet Black Granite', 'Granite Adhesive', 'Brass Inlay Strip'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Tread Thickness', value: '20mm full bullnosed edge granite' },
          { label: 'Safety Feature', value: '3 nos 3mm deep anti-skid machine cut grooves on tread front' },
        ],
        diagramType: 'rcc_slab',
        checklist: [
          'Machine-cut 3 anti-skid grooves on front 50mm edge of all stair treads',
          'Full bullnose or half-round edge polishing on exposed stone edges',
        ],
        commonMistakes: [
          'Installing smooth mirror polished granite steps without anti-skid grooves, creating slippery stairs.',
        ],
        expertTips: [
          'Inlay 3mm brass strips in the tread grooves for an ultra-luxurious metallic accent on steps.',
        ],
        technicalNotes: 'IS 1124 structural granite stone specifications.',
        relatedActivities: [
          { id: 'act-09-1', title: 'Concealed Electrical Wall Chasing & Box Fixing' },
        ],
      },
    ],
  },

  // Stage 09: Electrical
  {
    id: 'stage-09',
    number: '09',
    title: 'Electrical',
    iconName: 'Zap',
    status: 'Pending',
    progress: 0,
    estimatedCost: 890000,
    estimatedDuration: '16 Days',
    activities: [
      {
        id: 'act-09-1',
        stageId: 'stage-09',
        title: 'Concealed Wall Chasing & PVC Conduit Fitting',
        purpose: 'Cut wall grooves using wall chaser machine, embed 25mm FRLS PVC conduits and metal modular switch boxes.',
        estimatedCost: 240000,
        estimatedQuantity: '1,450 Metres Conduit',
        estimatedDuration: '6 Days',
        materialTags: ['Heavy PVC Conduits 25mm', 'GI Modular Boxes', 'Wall Cutter'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Conduit Type', value: '25mm Medium Duty FRLS PVC conduit pipe' },
          { label: 'Switch Boxes', value: 'Galvanized iron modular boxes (1.2mm thickness)' },
          { label: 'Chasing Depth', value: 'Clean machine cut with 15mm mortar cover' },
        ],
        diagramType: 'electrical_conduit',
        checklist: [
          'Route conduits strictly vertical or horizontal (never cut diagonal wall chases)',
          'Secure conduits in grooves using GI clamps @ 500mm centers',
          'Cap conduit ends with plastic plugs to prevent plaster clogging',
        ],
        commonMistakes: [
          'Cutting diagonal wall grooves which weakens masonry and makes future wall drilling dangerous.',
        ],
        expertTips: [
          'Photograph all wall conduit routes with a measuring tape before plastering for future drill reference.',
        ],
        technicalNotes: 'IS 732 code of practice for electrical wiring installations.',
        relatedActivities: [
          { id: 'act-09-2', title: 'FRLS Copper Wire Pulling & Circuit DB Wiring' },
        ],
      },
      {
        id: 'act-09-2',
        stageId: 'stage-09',
        title: 'FRLS Copper Wire Pulling & Circuit Distribution Board Wiring',
        purpose: 'Pull Havells 1.5/2.5/4.0 sq mm flame-retardant copper wires through conduits and wire 3-phase Distribution Board.',
        estimatedCost: 450000,
        estimatedQuantity: '3,800 Metres Wire / 3 DBs',
        estimatedDuration: '6 Days',
        materialTags: ['Havells FRLS Copper Wire', 'Schneider MCB/RCCB', 'Distribution Board'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Lighting Wire', value: '1.5 sq mm FRLS Copper Wire' },
          { label: 'Power Socket Wire', value: '2.5 sq mm FRLS Copper Wire' },
          { label: 'AC / Geyser Wire', value: '4.0 sq mm FRLS Copper Wire' },
          { label: 'Main Incomer Wire', value: '10.0 sq mm Armored Cable' },
        ],
        diagramType: 'electrical_conduit',
        checklist: [
          'Use distinct wire insulation color coding: Red/Yellow/Blue for phases, Black for Neutral, Green for Earth',
          'Install 30mA sensitive RCCB / ELCB breaker on distribution board for shock protection',
          'Perform insulation resistance megger test across all circuits',
        ],
        commonMistakes: [
          'Combining lighting and heavy power socket neutrals on a single undersized neutral wire.',
        ],
        expertTips: [
          'Run dedicated 4.0 sq mm circuit lines directly from DB to each Air Conditioner and Water Geyser.',
        ],
        technicalNotes: 'IS 2086 code for PVC insulated copper cables.',
        relatedActivities: [
          { id: 'act-09-3', title: 'Earthing Pit Construction & Lightning Protection' },
        ],
      },
      {
        id: 'act-09-3',
        stageId: 'stage-09',
        title: 'Chemical Gel Earthing Pit & Copper Lightning Protection',
        purpose: 'Install 2 maintenance-free chemical copper bond earth pits (< 1 Ohm resistance) and roof lightning arrestor.',
        estimatedCost: 200000,
        estimatedQuantity: '2 Chemical Earth Pits + 1 Lightning Rod',
        estimatedDuration: '4 Days',
        materialTags: ['Copper Bonded Electrode', 'Marconite Compound', 'Copper Tape Down-Conductor'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Earth Electrode', value: '50mm dia 3.0 metre length copper bonded pipe' },
          { label: 'Backfill Compound', value: 'Marconite conductive gel backfill' },
          { label: 'Earth Resistance', value: '< 1.0 Ohm certified resistance test' },
        ],
        diagramType: 'electrical_conduit',
        checklist: [
          'Verify earth pit resistance measures below 1.0 Ohm using digital earth tester',
          'Connect dedicated earth line to main electrical panel and solar inverter frame',
        ],
        commonMistakes: [
          'Using old salt and charcoal earthing which corrodes away within 3 years needing water pouring.',
        ],
        expertTips: [
          'Chemical gel earthing requires zero water pouring maintenance and maintains low earth resistance for 20+ years.',
        ],
        technicalNotes: 'IS 3043 code of practice for earthing.',
        relatedActivities: [
          { id: 'act-10-1', title: 'CPVC & SWR Plumbing Pipe Concealment' },
        ],
      },
    ],
  },

  // Stage 10: Plumbing
  {
    id: 'stage-10',
    number: '10',
    title: 'Plumbing',
    iconName: 'Droplet',
    status: 'Pending',
    progress: 0,
    estimatedCost: 790000,
    estimatedDuration: '15 Days',
    activities: [
      {
        id: 'act-10-1',
        stageId: 'stage-10',
        title: 'Concealed CPVC Water Lines & Wall Concealed Diverters',
        purpose: 'Install Astral CPVC Pro hot/cold water supply pipes and grohe/kohler concealed thermostatic shower diverters in bathrooms.',
        estimatedCost: 380000,
        estimatedQuantity: '650 Metres CPVC Pipe / 5 Diverters',
        estimatedDuration: '6 Days',
        materialTags: ['Astral CPVC Pro', 'Kohler Concealed Diverters', 'Solvent Cement'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Pipe Rating', value: 'SDR 11 CPVC rated up to 82°C at 28 bar pressure' },
          { label: 'Diverter Body', value: 'Solid brass forged 4-way concealed body' },
          { label: 'Pressure Test', value: '10 bar hydro-test for 24 hours' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Perform 10 bar hydrostatic pressure pump test for 24 hours before plaster closing',
          'Wrap hot water CPVC lines with nitriflex thermal insulation sleeve',
          'Verify diverter body is set dead level and at correct depth from finished tile line',
        ],
        commonMistakes: [
          'Closing wall chases before conducting 24-hour high pressure water leak test.',
        ],
        expertTips: [
          'Mount concealed diverters using the plastic protective cap flush with future tile level indicator.',
        ],
        technicalNotes: 'IS 15778 CPVC pipe specifications for hot and cold water supplies.',
        relatedActivities: [
          { id: 'act-10-2', title: 'SWR Soil & Waste Drainage Piping System' },
        ],
      },
      {
        id: 'act-10-2',
        stageId: 'stage-10',
        title: 'SWR Soil, Waste & Rainwater Drainage Piping System',
        purpose: 'Install Supreme SWR rubber ring-fit pipes for sewage, greywater, and roof rainwater harvesting downpipes.',
        estimatedCost: 260000,
        estimatedQuantity: '480 Metres SWR Pipe',
        estimatedDuration: '5 Days',
        materialTags: ['Supreme SWR Pipes', 'Rubber Ring Joints', 'Floor Traps'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Soil Pipe Dia', value: '110mm Type B SWR pipe' },
          { label: 'Waste Pipe Dia', value: '75mm Type A pipe with deep seal P-traps' },
          { label: 'Pipe Slope', value: '1:40 (2.5% continuous downward slope)' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Ensure 50mm deep water seal in all bathroom floor drain P-traps to prevent sewer gas backflow',
          'Anchor vertical riser pipes with heavy duty rubber lined pipe clamps at 1.2m intervals',
        ],
        commonMistakes: [
          'Laying horizontal drain pipes flat without gradient slope, causing frequent pipe clogs.',
        ],
        expertTips: [
          'Install cleanout access plug caps at every 90-degree bend for easy snake clearance of drain blockages.',
        ],
        technicalNotes: 'IS 5382 rubber sealing rings for water supply and drainage pipelines.',
        relatedActivities: [
          { id: 'act-10-3', title: 'Overhead Water Tank & Pressure Pump Setup' },
        ],
      },
      {
        id: 'act-10-3',
        stageId: 'stage-10',
        title: 'Overhead 3-Layer Thermal Water Tank & Booster Pump Installation',
        purpose: 'Install 2,000L Sintex/Plasto 4-layer anti-bacterial overhead water tank and Grundfos automatic pressure booster pump.',
        estimatedCost: 150000,
        estimatedQuantity: '1 Tank (2,000L) + 1 Booster Pump',
        estimatedDuration: '4 Days',
        materialTags: ['Sintex 4-Layer Tank', 'Grundfos Booster Pump', 'Brass Gate Valves'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Tank Capacity', value: '2,000 Litres 4-layer UV sunshield tank' },
          { label: 'Booster Pump', value: 'Grundfos CMBE 0.75 HP VFD constant pressure pump' },
          { label: 'Operating Pressure', value: '3.0 Bar constant pressure to all shower heads' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Mount overhead tank on elevated RCC slab platform 1.0m above terrace level',
          'Provide full-way brass ball valves on all branch line take-offs',
        ],
        commonMistakes: [
          'Placing overhead tank directly on flat terrace slab without elevated concrete pedestal piers.',
        ],
        expertTips: [
          'A variable speed booster pump ensures hotel-like constant rain shower pressure across all floors simultaneously.',
        ],
        technicalNotes: 'IS 12701 rotational moulded polyethylene water storage tanks.',
        relatedActivities: [
          { id: 'act-11-1', title: 'Internal Wall Putty & Primer Application' },
        ],
      },
    ],
  },

  // Stage 11: Painting
  {
    id: 'stage-11',
    number: '11',
    title: 'Painting',
    iconName: 'Palette',
    status: 'Pending',
    progress: 0,
    estimatedCost: 680000,
    estimatedDuration: '18 Days',
    activities: [
      {
        id: 'act-11-1',
        stageId: 'stage-11',
        title: 'Internal Wall Acrylic Putty & Primer Application',
        purpose: 'Sandal surface, apply 2 coats of Asian Paints acrylic wall putty and 1 coat of deep-penetrating water-based wall primer.',
        estimatedCost: 280000,
        estimatedQuantity: '12,500 Sq Ft Wall Surface',
        estimatedDuration: '8 Days',
        materialTags: ['Asian Paints Acrylic Putty', 'Decoprime Wall Primer', 'Emery Sandpaper'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Putty Coats', value: '2 coats white acrylic putty (1.5mm combined thickness)' },
          { label: 'Sanding', value: 'Machine sanding with 180 & 220 grit paper' },
          { label: 'Primer Coat', value: '1 coat alkali-resistant interior primer' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Allow 6 hours dry time between 1st and 2nd putty coat application',
          'Inspect wall flatness with halogen floodlight held parallel to wall face to spot micro-undulations',
        ],
        commonMistakes: [
          'Applying putty over damp un-cured wall plaster with > 12% moisture content.',
        ],
        expertTips: [
          'Use a 500W halogen inspection light beam across wall surfaces to discover surface dents before priming.',
        ],
        technicalNotes: 'IS 5410 cement paint and wall preparation standards.',
        relatedActivities: [
          { id: 'act-11-2', title: 'Internal Royale Luxury Emulsion Painting' },
        ],
      },
      {
        id: 'act-11-2',
        stageId: 'stage-11',
        title: 'Internal Wall Royale Luxury Emulsion Finish Painting',
        purpose: 'Apply 2 coats of Asian Paints Royale Luxury Teflon-enriched washable emulsion paint using felt rollers.',
        estimatedCost: 260000,
        estimatedQuantity: '12,500 Sq Ft Surface',
        estimatedDuration: '6 Days',
        materialTags: ['Asian Paints Royale', 'Microfiber Rollers', 'Masking Tape'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Paint Sheen', value: 'Smooth soft-sheen luxury interior emulsion' },
          { label: 'Washability', value: 'Teflon surface protector (high scrub resistance)' },
          { label: 'Coats', value: '2 coats finish over dried primer' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Mask all door frames, floor skirting, and switch plates with painter masking tape',
          'Strain paint through fine cloth filter mesh before pouring into roller tray',
        ],
        commonMistakes: [
          'Diluting premium paint with excess water beyond manufacturer recommended 40% ratio.',
        ],
        expertTips: [
          'Use microfiber lint-free rollers for an orange-peel free, mirror-smooth paint finish.',
        ],
        technicalNotes: 'IS 15489 interior emulsion paint specifications.',
        relatedActivities: [
          { id: 'act-11-3', title: 'Exterior Apex Ultima Weatherproof Painting' },
        ],
      },
      {
        id: 'act-11-3',
        stageId: 'stage-11',
        title: 'Exterior Wall Apex Ultima Weatherproof Silicon Painting',
        purpose: 'Apply 1 coat exterior primer + 2 coats Asian Paints Apex Ultima dustproof silicone-enriched exterior emulsion.',
        estimatedCost: 140000,
        estimatedQuantity: '4,500 Sq Ft Exterior Face',
        estimatedDuration: '4 Days',
        materialTags: ['Apex Ultima Exterior', 'Damp Block Primer', 'Hanging Cradle'],
        qualityIndicator: 'Premium',
        specifications: [
          { label: 'Technology', value: 'Dirt Pick-Up Resistance (DPUR) silicone emulsion' },
          { label: 'Warranty', value: '7-year performance warranty against algae/peeling' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Wash exterior walls with high pressure water jet to remove loose dust before priming',
          'Ensure 4 hours dry time between exterior paint coats',
        ],
        commonMistakes: [
          'Painting external walls when rain is expected within 8 hours.',
        ],
        expertTips: [
          'Use Apex Ultima Stretch paint on structural beam-wall joint lines for 200% crack-bridging elasticity.',
        ],
        technicalNotes: 'IS 347 code of practice for painting exterior concrete surfaces.',
        relatedActivities: [
          { id: 'act-12-1', title: 'Sanitaryware & Kohler CP Fitting Installation' },
        ],
      },
    ],
  },

  // Stage 12: Fixtures
  {
    id: 'stage-12',
    number: '12',
    title: 'Fixtures',
    iconName: 'Sliders',
    status: 'Pending',
    progress: 0,
    estimatedCost: 1150000,
    estimatedDuration: '14 Days',
    activities: [
      {
        id: 'act-12-1',
        stageId: 'stage-12',
        title: 'Sanitaryware & Kohler Wall-Hung Closet Installation',
        purpose: 'Mount Kohler rimless wall-hung WC closets onto concealed in-wall carrier frames with soft-close seat covers.',
        estimatedCost: 420000,
        estimatedQuantity: '5 Bathroom Sets',
        estimatedDuration: '5 Days',
        materialTags: ['Kohler Wall-Hung WC', 'Geberit In-Wall Frame', 'Health Faucets'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Closet Type', value: 'Vitreous china rimless wall-hung closet' },
          { label: 'Carrier Frame', value: 'Geberit Sigma steel in-wall tank frame (400kg load rated)' },
          { label: 'Flush Plate', value: 'Dual-flush pneumatic glass actuator plate' },
        ],
        diagramType: 'waterproofing',
        checklist: [
          'Check in-wall steel carrier frame is anchored securely with expansion bolts into RCC floor slab',
          'Test 400kg static load test on mounted closet before signing off installation',
        ],
        commonMistakes: [
          'Anchoring wall-hung closet frame into weak hollow block partition instead of structural RCC floor slab.',
        ],
        expertTips: [
          'Rimless design closets eliminate hidden rim crevices for 100% hygienic water flush clearing.',
        ],
        technicalNotes: 'IS 2556 vitreous china sanitary appliances standards.',
        relatedActivities: [
          { id: 'act-12-2', title: 'Modular Switches, LED Spotlights & Fans' },
        ],
      },
      {
        id: 'act-12-2',
        stageId: 'stage-12',
        title: 'Legrand Modular Switches, LED Spotlights & Fan Installation',
        purpose: 'Install Legrand Arteor glass modular plates, CRI>90 Philips LED architectural spotlights, and BLDC energy saving ceiling fans.',
        estimatedCost: 380000,
        estimatedQuantity: '240 Modules / 110 LED Lights / 8 Fans',
        estimatedDuration: '5 Days',
        materialTags: ['Legrand Arteor Switches', 'Philips LED Spotlights', 'Atomberg BLDC Fans'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Switch Finish', value: 'White glass touch-plate modular switches' },
          { label: 'LED Spotlights', value: '12W COB warm white dimmable ceiling spots' },
          { label: 'Ceiling Fans', value: '28W BLDC motor fans with remote control' },
        ],
        diagramType: 'electrical_conduit',
        checklist: [
          'Check phase neutral polarity on every socket using plug-in socket tester',
          'Verify BLDC fans operate silently without wobble at top speed setting',
        ],
        commonMistakes: [
          'Reverse polarity wiring (connecting phase to neutral pin), creating shock risk when switch is turned off.',
        ],
        expertTips: [
          'BLDC motor ceiling fans consume only 28 Watts compared to 75 Watts for traditional induction fans, saving ₹6,000/year.',
        ],
        technicalNotes: 'IS 3854 switches for domestic and similar fixed electrical installations.',
        relatedActivities: [
          { id: 'act-12-3', title: 'Main Teak Door & UPVC Window Fixing' },
        ],
      },
      {
        id: 'act-12-3',
        stageId: 'stage-12',
        title: 'Burma Teak Main Door & Fenesta UPVC Window Installation',
        purpose: 'Fix solid Burma teak carved main door frame with Yale digital smart lock and Fenesta double-glazed UPVC windows.',
        estimatedCost: 350000,
        estimatedQuantity: '1 Main Door + 12 UPVC Windows',
        estimatedDuration: '4 Days',
        materialTags: ['Burma Teak Door', 'Yale Digital Lock', 'Fenesta UPVC Windows'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Main Door', value: '45mm thick carved Burma teak with Yale biometric finger lock' },
          { label: 'UPVC Windows', value: 'Fenesta 60mm multi-chamber profile with 5mm+12A+5mm double glazing' },
        ],
        diagramType: 'masonry_wall',
        checklist: [
          'Inject PU expanding foam in 15mm perimeter gap around UPVC window frames for acoustic sealing',
          'Test Yale biometric lock fingerprint registration and mechanical key backup',
        ],
        commonMistakes: [
          'Sealing UPVC window perimeter with hard cement mortar instead of flexible PU foam sealant, causing frame warping.',
        ],
        expertTips: [
          'Double glazed UPVC windows cut outside traffic noise by 35 decibels and lower air conditioning power bills by 25%.',
        ],
        technicalNotes: 'IS 4021 timber door frames and IS 14856 UPVC window profiles.',
        relatedActivities: [
          { id: 'act-13-1', title: 'Deep Cleaning, Snag List Audit & Handover' },
        ],
      },
    ],
  },

  // Stage 13: Handover
  {
    id: 'stage-13',
    number: '13',
    title: 'Handover',
    iconName: 'CheckCircle2',
    status: 'Pending',
    progress: 0,
    estimatedCost: 150000,
    estimatedDuration: '7 Days',
    activities: [
      {
        id: 'act-13-1',
        stageId: 'stage-13',
        title: 'Deep Chemical Cleaning, Snag List Rectification & Final Handover',
        purpose: 'Perform industrial floor scrubbing, tile grout acid wash, window glass polishing, 200-point snag list clearance, and hand over keys with warranty binder.',
        estimatedCost: 150000,
        estimatedQuantity: 'Full Home (3,850 Sq Ft)',
        estimatedDuration: '7 Days',
        materialTags: ['Scrubber Machine', 'Acid Free Floor Cleaner', 'As-Built Drawings Binder'],
        qualityIndicator: 'Luxury',
        specifications: [
          { label: 'Cleaning Scope', value: 'Deep scrubbing, glass polishing, tile grout sealing' },
          { label: 'Snag List Clearance', value: '200-point engineering quality audit checklist' },
          { label: 'Deliverables', value: 'As-built electrical/plumbing drawings + warranty card file' },
        ],
        diagramType: 'soil_excavation',
        checklist: [
          'Conduct final joint walkthrough inspection with client using 200-point quality audit checklist',
          'Deliver bound As-Built electrical and plumbing conduit layout blueprints',
          'Hand over master key ring, digital lock pin codes, and equipment warranty cards',
        ],
        commonMistakes: [
          'Handing over home without providing written As-Built plumbing/electrical conduit drawings for future wall drilling.',
        ],
        expertTips: [
          'Provide a digital 3D video walk-through scan of the home before plastering showing all hidden conduit lines inside walls.',
        ],
        technicalNotes: 'National Building Code (NBC) 2016 building completion certificate protocols.',
        relatedActivities: [],
      },
    ],
  },
];
