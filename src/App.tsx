import { useState, FormEvent, useEffect } from 'react';
import { 
  Atom, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Activity,
  Cpu,
  Globe,
  Database,
  Search,
  Code,
  Mail,
  ChevronRight,
  FileText,
  Binary,
  Layers,
  Copy,
  Check,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REAL_ESTATE_DOMAINS, RealEstateDomain } from './domainsData';

const FOCK_STATE_KEYWORDS = [
  "Quantum Optics", "Number State", "Photon Statistics", "Bosonic Systems", 
  "Creation Operator", "Annihilation Operator", "Quantum Mechanics", 
  "Hilbert Space", "State Vector", "Commutation Relations", "Harmonic Oscillator",
  "Quantum Information", "Phase Space", "Squeezed States", "Coherent States",
  "Quantum Hardware", "Computation Logic", "Electromagnetic Field Quantization",
  "Zero-Point Energy", "Bose-Einstein Condensates", "Entanglement Entropy",
  "Quantum Decoded", "State Preparation", "Superposition Analytics",
  "Eigenvector Distribution", "Photon Counting Statistics", "Non-Classical Light",
  "Quantum Electrodynamics", "QED", "Cavity QED", "Jaynes-Cummings Model", "Rabi Oscillations",
  "Pure State", "Mixed State", "Density Matrix", "Trace Class", "Von Neumann Entropy",
  "Wigner Function", "P-Representation", "Q-Representation", "Glauber-Sudarshan",
  "Optical Coherence", "Hanbury Brown-Twiss", "Bunching", "Anti-bunching", "Poisson Distribution",
  "Sub-Poissonian", "Super-Poissonian", "Quantum Teleportation", "Quantum Key Distribution", "QKD",
  "Bell States", "GHZ States", "W-States", "Decoherence", "Dissipation", "Master Equation",
  "Lindblad Operator", "Quantum Jumps", "Fock Space", "Symmetrization Postulate",
  "Antisymmetrization", "Fermions", "Pauli Exclusion", "Slater Determinant", "Occupation Number",
  "Second Quantization", "Field Operators", "Correlation Functions", "First-order Coherence",
  "Second-order Coherence", "Quantum Interference", "Mach-Zehnder", "Hong-Ou-Mandel", "HOM Effect",
  "Quantum Memory", "Quantum Repeater", "Circuit QED", "Superconducting Qubits", "Ion Traps",
  "Neutral Atoms", "Photonic Qubits", "Linear Optical Quantum Computing", "LOQC",
  "Knill-Laflamme-Milburn", "KLM Protocol", "Cluster States", "Measurement-Based Quantum Computation",
  "MBQC", "Quantum Error Correction", "Surface Code", "Steane Code", "Shor Code", "Bit Flip",
  "Phase Flip", "Syndrome Measurement", "Fault-Tolerant", "Quantum Complexity", "BQP",
  "Quantum Supremacy", "Quantum Advantage", "Google Sycamore", "USTC Jiuzhang", "Borealis",
  "Xanadu", "IBM Quantum", "Rigetti", "IonQ", "Quantinuum", "Sandbox AQ", "D-Wave",
  "Quantum Annealing", "Adiabatic Quantum Computation", "Variational Quantum Eigensolver", "VQE",
  "Quantum Approximate Optimization Algorithm", "QAOA", "Quantum Machine Learning", "QML",
  "Quantum Neural Networks", "Quantum Kernels", "Quantum Sensing", "Atomic Clocks", "Magnetometry",
  "Gravimetry", "Quantum Metrology", "Heisenberg Limit", "Standard Quantum Limit", "Parametric Down-Conversion",
  "SPDC", "Spontaneous Parametric Down-Conversion", "Squeezed Vacuum", "Twin-Photon State",
  "Entangled Photons", "Polarization Entanglement", "Time-Bin Entanglement", "Energy-Time Entanglement",
  "Bell's Inequality", "CHSH Inequality", "Aspect's Experiment", "Quantum Non-Locality", "Contextuality",
  "Kochen-Specker", "Delayed Choice", "Quantum Eraser", "Wheeler's Choice", "Many-Worlds Interpretation",
  "Copenhagen Interpretation", "Pilot-Wave", "De Broglie-Bohm", "Objective Collapse", "QBism",
  "Consistent Histories", "Environmental Decoherence", "Quantum Zenon Effect", "Anti-Zenon",
  "Quantum Thermodynamics", "Maxwell's Demon", "Szilard Engine", "Quantum Heat Engines",
  "Quantum Cryptography", "Post-Quantum Cryptography", "PQC", "Lattice-Based", "Code-Based",
  "Multivariate", "Isogeny-Based", "NIST Standardization", "Quantum Internet", "Entanglement Swapping",
  "Quantum Router", "Quantum Switch", "Quantum Buffers", "Photonic Crystals", "Optical Fibers",
  "Single-Photon Sources", "Single-Photon Detectors", "SPAD", "SNSPD", "Superconducting Nanowire",
  "Quantum Dots", "Nitrogen-Vacancy Centers", "NV Centers", "Silicon-Vacancy", "Diamond Quantum",
  "Rare-Earth Ions", "Atomic Ensembles", "Rydberg Atoms", "Rydberg Blockade", "EIT",
  "Electromagnetically Induced Transparency", "Slow Light", "Stopped Light", "Quantum Fluid",
  "Superfluidity", "Helium-3", "Helium-4", "Gross-Pitaevskii Equation", "Bogoliubov Transformation",
  "Landau Criterion", "Vortices", "Solitons", "Tonks-Girardeau Gas", "Anyons", "Fractional Statistics",
  "Quantum Hall Effect", "Topological Insulators", "Topological Quantum Computing", "Majorana Fermions",
  "Non-Abelian Anyons", "Braiding", "Braid Group", "Jones Polynomial", "Chern-Simons Theory",
  "AdS/CFT", "Holographic Principle", "Quantum Gravity", "Loop Quantum Gravity", "String Theory",
  "M-Theory", "Branes", "Black Hole Information Paradox", "Firewall", "Hawking Radiation",
  "Unruh Effect", "Casmir Effect", "Vacuum Polarization", "Lamb Shift", "Fine Structure",
  "Hyperfine Structure", "Paschen-Back", "Stark Effect", "Zeeman Effect", "Rabi Frequency",
  "Detuning", "Doppler Cooling", "Sisyphus Cooling", "Magneto-Optical Trap", "MOT",
  "Optical Tweezer", "Laser Cooling", "Optical Lattice", "Quantum Simulation", "Analog Quantum Simulation",
  "Digital Quantum Simulation", "Hamiltonian Simulation", "Trotterization", "Variational Algorithms",
  "Quantum Chemistry", "Molecular Electronic", "Jordan-Wigner Transformation", "Bravyi-Kitaev",
  "Unitary Coupled Cluster", "UCCSD", "Hartree-Fock", "Post-Hartree-Fock", "Configuration Interaction",
  "Coupled Cluster", "DFT", "Density Functional Theory", "Quantum Materials", "Strong Correlations",
  "Mott Insulator", "Hubbard Model", "Heisenberg Model", "Ising Model", "XY Model",
  "Quantum Phase Transitions", "Renormalization Group", "Tensor Networks", "MPS", "Matrix Product States",
  "PEPS", "Projected Entangled Pair States", "MERA", "Multi-scale Entanglement Renormalization Ansatz",
  "Density Matrix Renormalization Group", "DMRG", "Quantum Field Theory", "QFT", "Feynman Diagrams",
  "Path Integral", "Propagator", "Self-Energy", "Vertex Function", "Renormalization", "Gauge Symmetry",
  "Spontaneous Symmetry Breaking", "Higgs Mechanism", "Standard Model", "Beyond Standard Model",
  "Supersymmetry", "SUSY", "Extra Dimensions", "Dark Matter", "Dark Energy", "Cosmological Constant",
  "Inflation", "Big Bang Nucleosynthesis", "CMB", "Cosmic Microwave Background", "Large Scale Structure",
  "Gravitational Waves", "LIGO", "Virgo", "LISA", "Event Horizon", "Schwarzschild Radius", "Kerr Metric",
  "Penrose Process", "White Holes", "Wormholes", "Time Dilatation", "Length Contraction", "General Relativity",
  "Special Relativity", "Equivalence Principle", "Geodesic", "Curvature", "Einstein Field Equations",
  "Metric Tensor", "Christoffel Symbols", "Riemann Tensor", "Ricci Tensor", "Bianchi Identities",
  "Noether's Theorem", "Conservation Laws", "Action Principle", "Lagrangian", "Hamiltonian",
  "Poisson Bracket", "Canonical Transformation", "Hamilton-Jacobi", "Chaos Theory", "Fractals",
  "Nonlinear Dynamics", "Stochastic Processes", "Brownian Motion", "Fluctuation-Dissipation",
  "Nonequilibrium Statistical Mechanics", "Fokker-Planck", "Master Equation", "Boltzmann Distribution",
  "Partition Function", "Free Energy", "Entropy", "Enthalpy", "Gibbs Free Energy", "Chemical Potential",
  "Phase Transitions", "Critical Exponents", "Scaling Laws", "Universality", "Ising Model",
  "Mean Field Theory", "Landau Theory", "Goldstone Bosons", "Order Parameter"
];

const DATA_CATEGORIES = [
  {
    title: "Quantum State Vectors",
    keywords: ["Fock State", "Number State", "Eigenstate", "Hilbert Space", "State Preparation", "Superposition", "Eigenvector Distribution", "Photon Statistics", "Pure State", "Mixed State", "Density Matrix", "Trace Class", "Squeezed Vacuum", "Twin-Photon State", "Entangled Photons"]
  },
  {
    title: "Optical Dynamics",
    keywords: ["Creation Operator", "Annihilation Operator", "Commutation Relations", "Harmonic Oscillator", "Optical Coherence", "Hanbury Brown-Twiss", "Anti-bunching", "Poisson Distribution", "Sub-Poissonian", "Quantum Interference", "Mach-Zehnder", "Hong-Ou-Mandel"]
  },
  {
    title: "Computational Framework",
    keywords: ["Quantum Hardware", "Computation Logic", "Error Correction", "Surface Code", "Fault-Tolerant", "Quantum Supremacy", "Hamiltonian Simulation", "Trotterization", "VQE", "QAOA", "QML", "Quantum Kernels"]
  },
  {
    title: "Physical Topology",
    keywords: ["Bose-Einstein Condensates", "Gross-Pitaevskii", "Quantum Vortices", "Cavity QED", "Jaynes-Cummings", "Rabi Oscillations", "Superconducting Qubits", "Ion Traps", "Rydberg Blockade", "EIT", "Slow Light"]
  }
];

const ARCHIVE_DOCS = [
  { 
    id: "0x01", 
    title: "Photon Number Statistics in Fock Space", 
    params: { entropy: "0.42", fidelity: "0.992", phase: "Localized" },
    content: "The Fock state |n⟩ is an eigenstate of the number operator N̂. In quantum optics, fockstate.com models these precise configurations. Our research on photon statistics reveals how bosonic systems evolve under Hamiltonian perturbation. By analyzing the photon counting distribution, we can characterize non-classical light sources, specifically looking for anti-bunching signals in the second-order coherence function g(2)(0). Fockstate.com provides the essential namespace for these measurements, allowing researchers to distinguish between thermal, coherent, and squeezed number states with high statistical significance. See Hilbert Space Mapping (0x02) for vector alignment details." 
  },
  { 
    id: "0x02", 
    title: "Hilbert Space Mapping Mechanisms", 
    params: { dimension: "Infinite", metric: "Hermitian", scale: "Sub-atomic" },
    content: "Mapping high-dimensional Hilbert spaces requires robust state-vector identifiers. FockState.com provides a canonical namespace for Hilbert space transformations, ensuring commutation relations are preserved during complex quantum gates. As dimensionality increases, the Fock space representation becomes increasingly efficient for simulating multi-particle interactions, especially in fermionic systems where the Slater determinant dictates the antisymmetric nature of the wavefunction. Our mapping protocols ensure local density approximation errors are minimized in larger bosonic ensembles. Integration with Creation Dynamics (0x03) is recommended for temporal stability." 
  },
  { 
    id: "0x03", 
    title: "Creation & Annihilation Operator Dynamics", 
    params: { ops: "â, â†", algebra: "Weyl", drift: "Minimal" },
    content: "The dynamics of â and â† define the transition between Fock states. Our simulation framework at fockstate.com optimizes these operations for harmonic oscillators, reducing computational noise in vacuum state preparation. The ladder operators interact directly with the occupation number, allowing for the construction of any arbitrary state within the Fock basis. This is fundamental for quantum electrodynamics and field quantization protocols, where the precise timing of creation events determines the coherence of the resulting field ensemble. Compare results with Squeezed State Protocols (0x04) for noise reduction benchmarks." 
  },
  { 
    id: "0x04", 
    title: "Squeezed State Integration Protocols", 
    params: { noise: "-12dB", quadrature: "X/P", mode: "Single" },
    content: "Beyond pure Number States, our archive explores Squeezed Vacuum and Coherent States. The fockstate.com methodology allows for precise phase-space localization, critical for next-gen quantum sensing and optical networks. Squeezing one quadrature of the field at the expense of another allows for measurements that surpass the Standard Quantum Limit, reaching toward the Heisenberg Limit in precision metrology applications like gravitational wave detection and ultra-sensitive magnetometry. Reference BEC Occupation (0x05) for macroscopic state analysis." 
  },
  { 
    id: "0x05", 
    title: "Bose-Einstein Condensate Occupation", 
    params: { temp: "20nK", density: "High", phase: "Coherent" },
    content: "The macroscopic occupation of a single Fock state leads to the formation of a Bose-Einstein Condensate (BEC). At fockstate.com, we analyze the transition from thermal distributions to coherent state-like behavior in dilute gases of bosonic atoms. The Gross-Pitaevskii equation provides a mean-field description, but the underlying Fock space analysis remains critical for understanding small-scale fluctuations, superfluidity transitions, and topological defect formation like quantum vortices in rotating traps. State vectors are derived using the Operator Dynamics (0x03) defined in our core protocol."
  }
];

const SITEMAP = [
  { 
    group: "Core Research", 
    links: [
      { name: "Meaning of |n⟩ in Physics", id: "meaning-of-n", content: "The Fock state |n⟩ is a fundamental mathematical construct in quantum mechanics representing a state with a precise, discrete number of particles (excitation quanta). Unlike coherent states produced by standard optical lasers, which feature indeterminate particle counts following a Poisson distribution, a Fock state satisfies the strict number-phase uncertainty inequality ΔN ΔΦ ≥ 1/2. When the particle count variance σ² equals zero, the phase Φ becomes completely undefined. The study of these states is vital for analyzing quantum optical channels, multi-mode quantum communication links, and non-classical illumination signatures. Under advanced laboratory scrutiny, pure number states exhibit zero amplitude fluctuations, proving highly beneficial for quantum cryptographic networks and single-photon detector calibration." },
      { name: "Legacy of Vladimir Fock", id: "vladimir-fock-legacy", content: "Named after Soviet physicist Vladimir Aleksandrovich Fock, who introduced the formal configuration space in 1932 to describe systems containing a variable number of identical particles. This discovery resolved significant limitations in the treatment of relativistic quantum bodies and laid the bedrock for quantum field theory. Fock's monumental contributions expand beyond Fock spaces to include the Hartree-Fock method in atomic calculation, the Klein-Gordon-Fock equation for relativistic spin-0 particles, and the concept of gauge invariance. Fockstate.com acts as an educational and structural reference directory celebrating this rich legacy of quantum field formulation and mathematical physics." },
      { name: "Abstract Number States", id: "abstract-number-states", content: "Analysis of N-particle Fock states and their representation in multi-mode Hilbert spaces. Our database catalogs eigenvalue distributions for diverse bosonic field configurations and occupation probabilities." },
      { name: "Operator Algebra", id: "operator-algebra", content: "Deep dive into Weyl algebra, commutation relations [a, a†] = 1, and the construction of ladder operators for field quantization and canonical ensemble analysis." },
      { name: "Hilbert Mapping", id: "hilbert-mapping", content: "Topological mapping of infinite-dimensional spaces onto discrete computational nodes for quantum state simulation and high-fidelity vector alignment." },
      { name: "Photon Statistics", id: "photon-statistics", content: "Statistical analysis of second-order coherence g(2)(τ) and photon counting distributions in non-classical light fields and squeezed states." }
    ] 
  },
  { 
    group: "Technical Data", 
    links: [
      { name: "Wigner Function Negativity", id: "wigner-negativity", content: "Negativity in the Wigner quasi-probability distribution is a primary signature of non-classicality in quantum states. While coherent states and thermal states maintain strictly positive, Gaussian-shaped Wigner profiles in phase space, pure Fock states |n⟩ with n ≥ 1 present distinct regions of negative probability density. This negativity is not merely a mathematical curiosity; it is a critical, quantifiable quantum resource that drives continuous-variable quantum computation algorithms and distinguishes true quantum states from classical counterparts under rigorous quantum state tomography." },
      { name: "Boson Sampling Complexity", id: "boson-sampling", content: "Boson sampling is a highly specialized computing framework that demonstrates quantum computational advantage without requiring a fully fault-tolerant universal computer. By injecting identical single-photon Fock states into a multi-port linear optical network, the transition amplitudes of these particles are governed by the permanent of complex-valued submatrices. Since computing the permanent of a matrix is a famously #P-hard mathematical complexity classification, simulating this interference classically is computationally intractable. This highlights the absolute premium scientific value associated with the fockstate.com namespace." },
      { name: "Schrödinger Evolution", id: "schrodinger-evolution", content: "Temporal wave-packet propagation and unitary evolution under varying Hamiltonian constraints in Fock space for non-equilibrium systems." },
      { name: "Hamiltonian Drift", id: "hamiltonian-drift", content: "Corrective protocols for non-linear drift in quantum systems undergoing high-frequency state transitions and adiabatic perturbations." },
      { name: "Phase Localization", id: "phase-localization", content: "Analytical methods for narrowing Wigner function distributions in phase space using quadrature squeezing and adaptive feedback loops." },
      { name: "Entropy Analysis", id: "entropy-analysis", content: "Von Neumann entropy calculations for mixed states and the impact of decoherence on state purity in open quantum system modeling." }
    ] 
  },
  { 
    group: "Quantum Hardware", 
    links: [
      { name: "Cavity QED Integration", id: "cavity-qed", content: "Integration protocols for atom-photon coupling within high-finesse optical resonators and electromagnetic field quantization nodes." },
      { name: "Superconducting Modes", id: "superconducting-modes", content: "Analysis of LC-circuit quantization and the transition to artificial atoms in transmon qubit architectures for scalable computation." },
      { name: "Ion Trap Neutrality", id: "ion-trap", content: "Stability analysis for Paul traps and the modeling of phonon-mediated state transfers between trapped ion registries and motional states." },
      { name: "Photonics", id: "photonics", content: "Silicon-photonics integration for on-chip creation and manipulation of single-photon Fock states and integrated interferometer arrays." }
    ] 
  },
  { 
    group: "Network Nodes", 
    links: [
      { name: "Registry Data", id: "registry-data", content: "Historical ownership and DNS metadata for the fockstate.com namespace. Verified premium asset status for quantum technology enterprises." },
      { name: "Buy Domain", id: "buy-domain", content: "Direct link to GoDaddy checkout for the acquisition of fockstate.com. Seamless transfer protocols and secure transaction layers active." },
      { name: "Whois Data", id: "whois", content: "Canonical WHOIS records and registrar metadata for secondary market validation and asset valuation metrics." },
      { name: "DNS Namespace", id: "dns", content: "Resource record (RR) mapping for A, AAAA, and CNAME endpoints associated with quantum research nodes and global edge indices." }
    ] 
  }
];

const RELATIONSHIPS: Record<string, string[]> = {
  "meaning-of-n": ["vladimir-fock-legacy", "abstract-number-states", "photon-statistics"],
  "vladimir-fock-legacy": ["meaning-of-n", "operator-algebra", "hilbert-mapping"],
  "abstract-number-states": ["meaning-of-n", "wigner-negativity", "photon-statistics"],
  "operator-algebra": ["meaning-of-n", "schrodinger-evolution"],
  "hilbert-mapping": ["operator-algebra", "boson-sampling"],
  "photon-statistics": ["meaning-of-n", "wigner-negativity", "cavity-qed"],
  "wigner-negativity": ["meaning-of-n", "phase-localization", "photon-statistics"],
  "boson-sampling": ["meaning-of-n", "photonics", "abstract-number-states"],
  "schrodinger-evolution": ["operator-algebra", "hamiltonian-drift"],
  "hamiltonian-drift": ["schrodinger-evolution", "phase-localization"],
  "phase-localization": ["wigner-negativity", "photon-statistics"],
  "entropy-analysis": ["meaning-of-n", "schrodinger-evolution"],
  "cavity-qed": ["meaning-of-n", "photon-statistics", "photonics"],
  "superconducting-modes": ["operator-algebra", "cavity-qed"],
  "ion-trap": ["operator-algebra", "schrodinger-evolution"],
  "photonics": ["photon-statistics", "boson-sampling"],
  "registry-data": ["buy-domain", "whois", "dns"],
  "buy-domain": ["registry-data", "whois", "dns"],
  "whois": ["registry-data", "buy-domain", "dns"],
  "dns": ["registry-data", "buy-domain", "whois"]
};

const PORTFOLIO_DOMAINS = [
  { domain: "ambeth.com", category: "Biotech & Innovation", status: "Transfer Active", authority: 89, desc: "A sleek, professional brand namespace ideal for biotechnology, pharmaceutical sciences, or venture funds." },
  { domain: "appliancecraft.com", category: "E-commerce & Smart Home", status: "Transfer Active", authority: 92, desc: "A powerful commercial asset for kitchen appliance brands, custom furniture, or retail catalogs." },
  { domain: "aquaves.com", category: "Beverages & Hydration", status: "Transfer Active", authority: 86, desc: "A premium name for purified water tech, premium organic beverages, or clean energy drink brands." },
  { domain: "arkba.com", category: "Brandable 5-Letter", status: "Transfer Active", authority: 91, desc: "Uniquely memorable short brand, perfect for high-speed fintech, blockchain dApps, or global logistics." },
  { domain: "armycore.com", category: "Tactical & Security", status: "Transfer Active", authority: 88, desc: "A strong, high-fidelity brand for tactical military equipment, extreme sports, or cyber defense structures." },
  { domain: "arogram.com", category: "Software & SaaS", status: "Transfer Active", authority: 87, desc: "Intuitive messaging, workflow automations, or developer API communication platform name." },
  { domain: "awesomedom.com", category: "Web & Domain Services", status: "Transfer Active", authority: 84, desc: "An outstanding namespace for web agencies, virtual real estate brokers, or domain registrars." },
  { domain: "babeport.com", category: "Lifestyle & Media", status: "Transfer Active", authority: 85, desc: "Premium media repository, streaming aggregator, or lifestyle publishing portal." },
  { domain: "bakelet.com", category: "Culinary & Food Tech", status: "Transfer Active", authority: 89, desc: "A clever food tech app, gourmet baking delivery subscription, or smart oven controller software." },
  { domain: "battistas.com", category: "Food & Hospitality", status: "Transfer Active", authority: 93, desc: "An established, high-end family name for Italian restaurants, wine portals, or artisanal grocery groups." },
  { domain: "beamspread.com", category: "Laser & Optical Tech", status: "Transfer Active", authority: 95, desc: "Highly relevant physics assets for laser engineering, quantum networks, and optical precision devices." },
  { domain: "bluntgasm.com", category: "Cannabis & Culture", status: "Transfer Active", authority: 83, desc: "A high-visibility name for dispensary chains, cannabis lifestyle blogs, or smoking accessory e-shops." },
  { domain: "boobclub.com", category: "Lifestyle & Media", status: "Transfer Active", authority: 87, desc: "Premium entertainment label, community brand, or custom apparel merchant." },
  { domain: "caviz.com", category: "Luxury & Brandable", status: "Transfer Active", authority: 94, desc: "An ultra-premium, high-end 5-letter brand for architectural software, luxury retail, or venture modeling." },
  { domain: "cellbeep.com", category: "Mobile & Telecom", status: "Transfer Active", authority: 89, desc: "Superb identifier for mobile repair apps, localized emergency alerts, or pager tracking services." },
  { domain: "chosenspot.com", category: "Travel & Local Services", status: "Transfer Active", authority: 90, desc: "The definitive travel curator, local food recommenders, or geolocation booking engine." },
  { domain: "halfstash.com", category: "Storage & Finance", status: "Transfer Active", authority: 88, desc: "A clever brand for pocket wallets, cloud file storage nodes, or security lockboxes." },
  { domain: "houseofterra.com", category: "Sustainable Design", status: "Transfer Active", authority: 91, desc: "A premium eco-friendly real estate firm, architectural workshop, or sustainable interior brand." },
  { domain: "jalh.com", category: "Rare 4-Letter Brand", status: "Transfer Active", authority: 97, desc: "A highly desirable, extremely rare 4-letter brand with absolute versatility across global enterprises." },
  { domain: "kataf.com", category: "Brandable 5-Letter", status: "Transfer Active", authority: 96, desc: "A premium 5-letter domain name offering strong resonance, rhythmic symmetry, and ease of spelling." },
  { domain: "linkwhore.com", category: "Digital Marketing", status: "Transfer Active", authority: 85, desc: "A high-affinity marketing agency name, search engine optimization pipeline, or backlink repository." },
  { domain: "medizer.com", category: "Healthcare & Wellness", status: "Transfer Active", authority: 93, desc: "Excellent medical portal, pharmaceutical SaaS tool, or wellness vitamin subscription provider." },
  { domain: "neaner.com", category: "Brandable 6-Letter", status: "Transfer Active", authority: 87, desc: "A high-recall startup title for developmental apps, multiplayer web environments, or creative studios." },
  { domain: "omachines.com", category: "Automation & Robotics", status: "Transfer Active", authority: 92, desc: "A forward-looking industrial namespace for robotic assembly pipelines, conveyor belts, or CNC products." },
  { domain: "palmheld.com", category: "Hardware & Gadgets", status: "Transfer Active", authority: 89, desc: "Retro pocket emulator sites, modern custom controllers, or smart IoT device catalogs." },
  { domain: "releafcanna.com", category: "Cannabis & Culture", status: "Transfer Active", authority: 91, desc: "Premium wellness medicine clinic, retail strain directory, or custom CBD oil distributors." },
  { domain: "snackcore.com", category: "Food & E-commerce", status: "Transfer Active", authority: 88, desc: "An on-demand snack delivery system, premium custom snack boxes, or catering technology." },
  { domain: "subhauler.com", category: "Transportation & Logistics", status: "Transfer Active", authority: 90, desc: "The ultimate platform for container shippers, freelance trucking, or micro-logistics operators." },
  { domain: "surfmatic.com", category: "Maritime & Automation", status: "Transfer Active", authority: 91, desc: "Smart marine automation instruments, dynamic ocean wave models, or oceanography software." },
  { domain: "taijan.com", category: "Wellness & Asia Brand", status: "Transfer Active", authority: 92, desc: "An elegant East Asian brand for fitness coaching portals, tea houses, or mindfulness apps." },
  { domain: "thrillport.com", category: "Travel & Adventure", status: "Transfer Active", authority: 90, desc: "Adventure tour operator portals, theme park packages, or booking systems." },
  { domain: "vegginess.com", category: "Health & Vegan Startup", status: "Transfer Active", authority: 89, desc: "Clean food subscription, raw vegan restaurants, or organic farming SaaS portals." },
  { domain: "vehicraft.com", category: "Automotive & Tech", status: "Transfer Active", authority: 91, desc: "Autonomous vehicle design, electrical motors tuning, or premium auto body mechanics." },
  { domain: "wikisonic.com", category: "Audio & Sonic Tech", status: "Transfer Active", authority: 90, desc: "Public sound effects repository, podcast directory, or audio hardware synthesis reviews." },
  { domain: "wimsic.com", category: "Creative Design", status: "Transfer Active", authority: 89, desc: "Whimsical children craft workshops, boutique toy brands, or design studio naming lists." },
  { domain: "zpewand.com", category: "Gaming & Fiction Brand", status: "Transfer Active", authority: 88, desc: "Zero-Point Energy gaming utilities, modern fantasy boardgames, or physics laboratory models." }
];

export const MERGED_DOMAINS = REAL_ESTATE_DOMAINS.map(red => {
  const matchingPd = PORTFOLIO_DOMAINS.find(pd => pd.domain.toLowerCase() === red.domain.toLowerCase());
  return {
    ...red,
    authority: matchingPd ? matchingPd.authority : 88,
    status: matchingPd ? matchingPd.status : "Transfer Active"
  };
});

function QuantumFockLogo() {
  return (
    <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-800 group-hover:text-blue-600 transition-all duration-300 scale-95 group-hover:scale-105 select-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wave-particle duality concentric orbits */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" className="opacity-25 animate-[spin-slow_40s_linear_infinite]" />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.2" className="opacity-35" />
      <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" className="opacity-15" />
      
      {/* Quantized horizontal energy lines of Harmonic Potential */}
      <line x1="28" y1="36" x2="72" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />
      <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
      <line x1="28" y1="64" x2="72" y2="64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />
      
      {/* Quantized photon field excitations (interactive status dots) */}
      <circle cx="38" cy="50" r="3.5" className="fill-blue-500 stroke-white stroke-1 animate-pulse" />
      <circle cx="62" cy="50" r="3.5" className="fill-indigo-500 stroke-white stroke-1 animate-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="50" cy="36" r="3" className="fill-sky-500 stroke-white stroke-1 animate-pulse" style={{ animationDelay: '0.4s' }} />
      <circle cx="50" cy="64" r="3" className="fill-emerald-500 stroke-white stroke-1 animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* Bracket curves representing pure bra-ket notation: | n ⟩ */}
      <path d="M 12 25 L 6 50 L 12 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 88 25 L 94 50 L 88 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface EmailDecrypterProps {
  handleCopy: (domain: string) => void;
  copiedDomain: string | null;
}

function EmailDecrypter({ handleCopy, copiedDomain }: EmailDecrypterProps) {
  const [numA] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [numB] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [displayText, setDisplayText] = useState("• • • • • • • • • • • • • • • • •");
  const [message, setMessage] = useState("");

  const handleDecrypt = () => {
    if (isRevealed || isDecrypting) return;
    const correctAnswer = numA + numB;
    if (parseInt(userAnswer.trim(), 10) !== correctAnswer) {
      setMessage("Verification failed. Incorrect match value.");
      return;
    }

    setMessage("");
    setIsDecrypting(true);
    let iterations = 0;
    const targetEmail = "info@fockstate.com";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-";
    
    const interval = setInterval(() => {
      setDisplayText(() => {
        return targetEmail
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return char;
            }
            if (char === "@" || char === ".") {
              return char;
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });
      
      iterations += 1.5;
      if (iterations >= targetEmail.length) {
         clearInterval(interval);
         setDisplayText(targetEmail);
         setIsRevealed(true);
         setIsDecrypting(false);
      }
    }, 50);
  };

  return (
    <div className="font-sans text-xs space-y-4">
      <div className="flex flex-col gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-left">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <span className="opacity-60 text-[10px] uppercase font-bold tracking-widest font-mono">Routing Identifier:</span>
          <span className="text-[9px] uppercase font-bold bg-slate-800 text-white px-2 py-0.5 rounded font-mono">LOCAL_DECRYPT_NODE</span>
        </div>
        
        {!isRevealed && (
          <div className="border-b border-slate-200 pb-3 space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-600">
              <span>HUMAN VERIFICATION</span>
              <span className="text-blue-600">REQUIRED</span>
            </div>
            <div className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-700">
                Match Equation: What is {numA} + {numB}?
              </span>
              <input
                type="text"
                placeholder="?"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  if (message) setMessage("");
                }}
                disabled={isDecrypting}
                className="w-16 bg-slate-50 border border-slate-300 text-center p-1.5 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-md transition-all font-bold text-sm text-slate-800"
              />
            </div>
            {message && (
              <p className="text-[10px] text-red-600 font-semibold">{message}</p>
            )}
          </div>
        )}

        <div className="py-2 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-sm tracking-wide break-all min-h-[1.5rem] flex items-center text-slate-800 font-mono">
            {displayText}
          </div>
          
          <div className="flex gap-2 shrink-0">
            {!isRevealed ? (
              <button
                onClick={handleDecrypt}
                disabled={isDecrypting || !userAnswer.trim()}
                className={`px-4 py-2 border rounded-lg font-bold text-[10px] uppercase cursor-pointer select-none transition-all ${
                  isDecrypting 
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                    : !userAnswer.trim()
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-sm"
                }`}
              >
                {isDecrypting ? "DECRYPTING..." : "DECRYPT EMAIL"}
              </button>
            ) : (
              <>
                <a
                  href={`mailto:${displayText}`}
                  className="px-3 py-2 bg-white text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] hover:bg-slate-50 transition-all uppercase cursor-pointer shadow-sm"
                >
                  Send Email
                </a>
                <button
                  onClick={() => handleCopy(displayText)}
                  className="px-3 py-2 bg-blue-600 border border-transparent text-white hover:bg-blue-700 transition-all font-bold text-[10px] uppercase cursor-pointer rounded-lg shadow-sm"
                >
                  {copiedDomain === displayText ? "✓ Copied" : "Copy"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const developerPortrait = '/src/assets/images/sara_portrait_1781390098541.jpg';
const outerSpaceBg = '/src/assets/images/outer_space_bg_1781397477077.jpg';

export default function App() {
  const [view, setView] = useState<'home' | 'archive' | 'page' | 'portfolio' | 'about' | 'sitemap' | 'feelize'>('home');
  const [sitemapFormat, setSitemapFormat] = useState<'visual' | 'xml' | 'json' | 'txt'>('visual');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifyValue, setVerifyValue] = useState('');
  const [error, setError] = useState('');
  const [code] = useState(Math.floor(1000 + Math.random() * 9000).toString());

  // Portfolio filters
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  const [reSelectedCat, setReSelectedCat] = useState<string>('All');
  const [reSearchQuery, setReSearchQuery] = useState<string>('');

  const handleCopy = (domain: string) => {
    try {
      navigator.clipboard.writeText(domain);
      setCopiedDomain(domain);
      setTimeout(() => setCopiedDomain(null), 2000);
    } catch (err) {
      const el = document.createElement('textarea');
      el.value = domain;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedDomain(domain);
      setTimeout(() => setCopiedDomain(null), 2000);
    }
  };

  // Client-Side Router: Sync initial URL on first mount and support back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;

    const handlePopState = (e: PopStateEvent) => {
      if (e && e.state) {
        if (e.state.view) setView(e.state.view);
        if (e.state.selectedPageId !== undefined) setSelectedPageId(e.state.selectedPageId);
      }
    };
    window.addEventListener('popstate', handlePopState);

    if (path === '/about') {
      setView('about');
      setSelectedPageId(null);
    } else if (path === '/portfolio') {
      setView('portfolio');
      setSelectedPageId(null);
    } else if (path === '/archive') {
      setView('archive');
      setSelectedPageId(null);
    } else if (path === '/feelize') {
      setView('feelize');
      setSelectedPageId(null);
    } else if (path === '/sitemap') {
      setView('sitemap');
      setSelectedPageId(null);
    } else if (path.startsWith('/nodes/')) {
      const nodeId = path.replace('/nodes/', '');
      setView('page');
      setSelectedPageId(nodeId);
    } else {
      setView('home');
      setSelectedPageId(null);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Client-Side Router: Update browser address bar when navigation state shifts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let targetPath = '/';
    if (view === 'about') targetPath = '/about';
    else if (view === 'portfolio') targetPath = '/portfolio';
    else if (view === 'archive') targetPath = '/archive';
    else if (view === 'feelize') targetPath = '/feelize';
    else if (view === 'sitemap') targetPath = '/sitemap';
    else if (view === 'page' && selectedPageId) targetPath = `/nodes/${selectedPageId}`;

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view, selectedPageId }, '', targetPath);
    }
  }, [view, selectedPageId]);

  const getXmlSitemapString = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fockstate.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <url>\n    <loc>${origin}/</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/about</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/portfolio</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/archive</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/sitemap</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/feelize</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    
    SITEMAP.forEach(group => {
      group.links.forEach(link => {
        xml += `  <url>\n    <loc>${origin}/nodes/${link.id}</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });
    });

    xml += `</urlset>`;
    return xml;
  };

  const getJsonSitemapString = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fockstate.com';
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "FockState.com Sitemap Graph",
      "publisher": "FockState.com",
      "generated": "2026-06-15T19:40:00-07:00",
      "endpoints": [
        { "url": `${origin}/`, "name": "Principal Portal", "priority": 1.0, "changefreq": "daily" },
        { "url": `${origin}/about`, "name": "Sarah Fock - Systems Engineer Profile", "priority": 0.8, "changefreq": "weekly" },
        { "url": `${origin}/portfolio`, "name": "Premium Domains Portfolio", "priority": 0.9, "changefreq": "daily" },
        { "url": `${origin}/archive`, "name": "Quantum Research Archive Nodes", "priority": 0.7, "changefreq": "weekly" },
        { "url": `${origin}/sitemap`, "name": "Full Custom Sitemap Directory", "priority": 0.7, "changefreq": "weekly" },
        { "url": `${origin}/feelize`, "name": "Websites Built by Feelize", "priority": 0.5, "changefreq": "monthly" }
      ],
      "dynamic_resource_nodes": SITEMAP.flatMap(g => g.links.map(l => ({
        "url": `${origin}/nodes/${l.id}`,
        "name": l.name,
        "group": g.group,
        "priority": 0.6
      })))
    };
    return JSON.stringify(data, null, 2);
  };

  const getTxtSitemapString = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fockstate.com';
    let txt = `${origin}/\n`;
    txt += `${origin}/about\n`;
    txt += `${origin}/portfolio\n`;
    txt += `${origin}/archive\n`;
    txt += `${origin}/sitemap\n`;
    txt += `${origin}/feelize\n`;
    
    SITEMAP.forEach(group => {
      group.links.forEach(link => {
        txt += `${origin}/nodes/${link.id}\n`;
      });
    });
    return txt.trim();
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (verifyValue === code) {
      setIsVerified(true);
      setShowVerification(false);
    } else {
      setError('AUTH_FAILED: 0x01');
    }
  };

  const getPageData = () => {
    for (const group of SITEMAP) {
      const link = group.links.find(l => l.id === selectedPageId);
      if (link) return { ...link, group: group.group };
    }
    return null;
  };

  const activePage = getPageData();

  const getRelatedPages = () => {
    if (!activePage) return [];
    const relatedIds = RELATIONSHIPS[activePage.id] || [];
    const found: any[] = [];
    SITEMAP.forEach(g => {
      g.links.forEach(l => {
        if (relatedIds.includes(l.id)) {
          found.push({ ...l, group: g.group });
        }
      });
    });
    return found;
  };

  // Dynamic SEO metadata updates based on current router state
  useEffect(() => {
    let title = "FockState.com - Premium Quantum Computing Domain for Sale";
    let desc = "Buy FockState.com: the definitive brand namespace for quantum mechanics, photon statistics, bosonic research, and state vector mapping. Secure transfer active.";

    if (view === 'archive') {
      if (activeDoc) {
        const doc = ARCHIVE_DOCS.find(d => d.id === activeDoc);
        if (doc) {
          title = `${doc.title} | FockState Quantum Technical Archive`;
          desc = `${doc.content.slice(0, 160)}... Detailed analysis of number operators, photon count bounds, and system parameters.`;
        }
      } else {
        title = "FockState Quantum Technical Database & Core Research Nodes";
        desc = "Explore high-fidelity mathematical models, state preparation registries, and physical parameters mapping infinite-dimensional Hilbert spaces.";
      }
    } else if (view === 'portfolio') {
      title = "Premium Domains Portfolio for Acquisition - FockState Partner Network";
      desc = "Explore our certified partner network of high-authority premium brand domains available for acquisition. Instant transfer active via GoDaddy.";
    } else if (view === 'about') {
      title = "About Me | Digital Real Estate Architect & Systems Engineer";
      desc = "Meet the digital systems builder and brand identity curator behind the FockState network. Clean architectures and semantic domain investments.";
    } else if (view === 'sitemap') {
      title = `Sitemap Directory [${sitemapFormat.toUpperCase()}] | FockState.com`;
      desc = `Canonical indexation map for fockstate.com namespace. Accessible in dynamic Visual Tree, static XML, nested JSON, and clean Text list schemas.`;
    } else if (view === 'feelize') {
      title = "Websites Built by Feelize | High-Performance Design & Creative Agency";
      desc = "Discover Feelize: your premier digital partner for custom web development, high-fidelity React/Vite platforms, SEO-optimized interactive structures, and brand asset strategies.";
    } else if (view === 'page' && activePage) {
      title = `${activePage.name} - ${activePage.group} | FockState Reference`;
      desc = `${activePage.content.slice(0, 160)}... Dynamic quantum node specification and matrix information for fockstate.com indices.`;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }

    // Dynamic JSON-LD structured data injection for Search Engines (SEO)
    const existingScript = document.getElementById("fockstate-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    let ldJson: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FockState Network",
      "url": typeof window !== 'undefined' ? window.location.origin : "https://fockstate.com",
      "description": desc
    };

    if (view === 'home') {
      ldJson = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "fockstate.com Premium Domain Name",
        "image": typeof window !== 'undefined' ? window.location.origin + "/favicon.ico" : "https://fockstate.com/favicon.ico",
        "description": "Buy fockstate.com: the premium quantum mechanics, infinite-dimensional Hilbert space, and photon statistics brand namespace.",
        "offers": {
          "@type": "Offer",
          "price": "18000",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://fockstate.com"
        }
      };
    } else if (view === 'portfolio') {
      ldJson = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "FockState Premium Domain Partner Network",
        "description": "Certified high-authority brand domains available for direct acquisition.",
        "itemListElement": MERGED_DOMAINS.map((dom, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": dom.domain,
            "description": dom.description,
            "category": dom.category,
            "offers": {
              "@type": "Offer",
              "price": dom.marketBaseline.replace(/[^0-9]/g, ""),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": `https://${dom.domain}`
            }
          }
        }))
      };
    } else if (view === 'about') {
      ldJson = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Person",
          "name": "Sara Fock",
          "jobTitle": "Digital Real Estate Architect & Systems Engineer",
          "description": "Digital systems builder and brand identity curator behind the FockState network. Custom digital asset architecture and scalable semantic domain investments."
        }
      };
    } else if (view === 'sitemap') {
      ldJson = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "FockState Structural Sitemap Directory",
        "description": "Multi-format indexation sitemap node mapping quantum, hardware, technical, and domain namespaces under the fockstate.com cluster.",
        "url": typeof window !== 'undefined' ? `${window.location.origin}` : "https://fockstate.com"
      };
    }

    const script = document.createElement("script");
    script.id = "fockstate-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify(ldJson);
    document.head.appendChild(script);

    // Clean up upon execution or component teardown
    return () => {
      const scriptToClean = document.getElementById("fockstate-jsonld");
      if (scriptToClean) scriptToClean.remove();
    };
  }, [view, activeDoc, selectedPageId, activePage, sitemapFormat]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[130px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-indigo-400 blur-[140px] rounded-full animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-sky-300 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Immersive Edge-to-Edge Outer Space Hero Background with vibrant celestial depth */}
      {view === 'home' && (
        <div className="absolute top-0 inset-x-0 h-[720px] pointer-events-none select-none z-0 overflow-hidden opacity-100 bg-slate-950 transition-all duration-700">
          {/* Subtle darkening filter so white text is highly legible */}
          <div className="absolute inset-0 bg-slate-950/20 z-10" />
          {/* Radial depth mask to draw attention to the white text block while keeping stars/nebulae brilliant */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.1)_0%,rgba(15,23,42,0.55)_60%,rgba(15,23,42,0.95)_100%)] z-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-20" />
          <img 
            src={outerSpaceBg} 
            alt="Outer space celestial background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover saturate-[1.35] contrast-[1.12]" 
          />
        </div>
      )}

      {/* Universal Header */}
      <header className="border-b border-slate-200/80 px-6 py-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/90 backdrop-blur-md z-50 sticky top-0 shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => { setView('home'); setActiveDoc(null); setSelectedPageId(null); }}
          aria-label="FockState Navigation Home"
        >
          <QuantumFockLogo />
          <h1 className="text-2xl md:text-3.5xl font-sans font-extrabold leading-none select-none tracking-tight">
            <span className="text-slate-900 group-hover:text-blue-600 transition-colors">FockState</span>
            <span className="text-blue-500 font-medium">.com</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
          <button 
            onClick={() => { setView('about'); setActiveDoc(null); setSelectedPageId(null); window.scrollTo(0,0); }}
            className={`px-4 py-2 border rounded-lg font-sans font-medium transition-all duration-200 cursor-pointer ${view === 'about' ? 'bg-slate-900 border-transparent text-white shadow-sm' : 'text-slate-600 bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm'}`}
          >
            About Me
          </button>
          <button 
            onClick={() => { setView('portfolio'); setActiveDoc(null); setSelectedPageId(null); window.scrollTo(0,0); }}
            className={`px-4 py-2 border rounded-lg font-sans font-medium transition-all duration-200 cursor-pointer ${view === 'portfolio' ? 'bg-slate-900 border-transparent text-white shadow-sm' : 'text-slate-600 bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm'}`}
          >
            Domains Portfolio
          </button>
          <button 
            onClick={() => { setView('home'); setActiveDoc(null); setSelectedPageId(null); window.scrollTo(0,0); }}
            className={`px-4 py-2 rounded-lg font-sans font-semibold transition-all duration-200 cursor-pointer ${view === 'home' ? 'text-blue-600 bg-blue-50/60' : 'text-emerald-700 hover:bg-emerald-50/50'}`}
          >
            Buy FockState
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          /* HOME PAGE - BALANCED DECORATIVE & FUNCTIONAL */
          <motion.main 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 max-w-5xl mx-auto space-y-16 relative z-10"
          >
            {/* Elegant Hero Group */}
            <div className="space-y-6 relative max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-400/20 text-[10px] sm:text-xs font-sans font-semibold uppercase rounded-full shadow-lg backdrop-blur-md">
                ❖ premium digital asset
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                This Domain<br />
                <span className="text-blue-400 drop-shadow-lg">is for sale</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-sans font-normal drop-shadow-sm">
                fockstate.com — The definitive high-authority namespace for photon counting, bosonic research, and quantum field analysis.
              </p>
            </div>

            {/* GoDaddy Acquisition Banner */}
            <div className="w-full">
              <a 
                href="https://www.godaddy.com/domainsearch/find?domainToCheck=fockstate.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full p-6 md:p-8 bg-white border border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-white hover:to-blue-50/10 transition-all rounded-2xl shadow-md hover:shadow-lg relative overflow-hidden group active:scale-[0.99]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-left px-2 md:px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                      <h3 className="text-lg md:text-xl font-sans font-bold text-slate-900 tracking-tight">Acquire on GoDaddy Registry</h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 font-sans pl-4">
                      Pre-verified instant transfer authority with secure checkout protection.
                    </p>
                  </div>
                  <div className="text-xs md:text-sm font-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white shrink-0 px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-sm">
                    <span>Secure Instant Purchase</span> 
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </div>

            {/* IN-DEPTH PREMIUM ASSET PROFILE FOR SEO & ENTERPRISE REVIEW */}
            <div className="w-full text-left space-y-12">
              
              {/* Introduction & Value Proposition */}
              <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-sm space-y-6">
                <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
                  The Brand Authority of <span className="text-blue-600">FockState.com</span>
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                <p className="text-base text-slate-600 leading-relaxed font-sans font-normal">
                  In quantum mechanics, a <strong>Fock state</strong> (or number state) represents any quantum state of an electromagnetic or material field with a well-defined number of identical particles. Originally formulated by the physicist Vladimir Fock, this terminology is fundamental to modern quantum computing, photon counting statistics, and semiconductor laser engineering. 
                </p>
                <p className="text-base text-slate-600 leading-relaxed font-sans font-normal">
                  The domain <strong>fockstate.com</strong> stands as a premier, category-dominant internet property. It offers immediate brand authority and deep technical resonance for companies, venture capital firms, and research entities pioneering continuous-variable quantum processors, quantum telecommunications, or cutting-edge cryptographic networking.
                </p>
              </div>

              {/* Core Industry Verticals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Atom className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-sans font-bold text-slate-900">Quantum Optics & Photonics</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Ideal branding for laser state controllers, single-photon sources (such as quantum dots or SNSPDs), squeezing engines, and optical coherence devices targeting high-fidelity quantum sensing.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-sans font-bold text-slate-900">Quantum Computation & Sim</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    A pristine title for Continuous-Variable (CV) quantum simulators, Boson Sampling hardware, cloud-native quantum programming frameworks, and multi-particle Hilbert space software.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                    <Database className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-sans font-bold text-slate-900">Technical Repositories</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    An authoritative reference namespace for scientific publications, academic lecture portals, mathematical archives, and data matrices covering Bose-Einstein condensates and QED simulations.
                  </p>
                </div>

              </div>

              {/* Comprehensive Domain Asset Parameters Checklist */}
              <div className="border border-slate-200 bg-white p-8 md:p-10 rounded-2xl shadow-sm space-y-8">
                <h4 className="text-xl font-sans font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Digital Asset Profile & Valuation Framework
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm font-sans">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Acoustic Balance</span>
                    <p className="font-semibold text-slate-800">Two-Syllable Symmetrical Brand</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Pronounceable, authoritative, and memorable to academic peers and global investors.</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Category Strength</span>
                    <p className="font-semibold text-slate-800">Direct Scientific Keyword</p>
                    <p className="text-xs text-slate-500 leading-relaxed text-left">Targets highly competitive, high-bid quantum physics search volumes on major engines.</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Acquisition Status</span>
                    <p className="font-semibold text-slate-800">Immaculate Clean History</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Zero legal disputes, fully managed under GoDaddy instant secure transfer protocols.</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">SEO Alignment</span>
                    <p className="font-semibold text-slate-800">Natural Semantic Richness</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Automatically indexed under advanced hardware, photon sciences, and quantum computing taxonomies.</p>
                  </div>

                </div>
              </div>

              {/* Academic Overview Header & Comprehensive Details for Deep SEO Indexing */}
              <div className="border border-slate-200 bg-slate-50/50 p-8 md:p-12 rounded-3xl space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block">Academic Reference Corner</span>
                  <h4 className="text-2xl font-sans font-extrabold text-slate-900">Understanding Fock Space & State Mechanics</h4>
                  <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
                    This scientific summary details the formal physics of Fock spaces. It serves as both an educational primer and a dense thematic anchor to demonstrate the direct industry relevance of this elite namespace.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-650 leading-relaxed font-sans text-justify">
                  <div className="space-y-4">
                    <h5 className="font-sans font-bold text-slate-800 text-base">1. The Formalism of Fock Space</h5>
                    <p>
                      In quantum field theory and quantum statistical mechanics, a Fock space is an algebraic system used to construct the quantum state space of variable or infinite-dimensional identical particles. It is defined as the direct sum of Hilbert spaces corresponding to zero, one, two, and subsequent integer numbers of particles:
                    </p>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800 text-center my-2 shadow-xs">
                      H_Fock = H_0 ⊕ H_1 ⊕ H_2 ⊕ ... ⊕ H_n ...
                    </div>
                    <p>
                      This mathematical framework enables the rigorous formulation of systems where excitation states flux—such as laser pulses, fiber-optic packets, or atomic lattice decays. Companies building photon counters require these definitions at their core.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-sans font-bold text-slate-800 text-base">2. Creation, Annihilation, and Commutation</h5>
                    <p>
                      The dynamics of particles within a Fock state are governed by creation (a†) and annihilation (a) operators. An annihilation operator decreases the occupation number of a particular state by one, whereas a creation operator constructs a new particle state, represented mathematically as:
                    </p>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800 text-center my-2 shadow-xs">
                      a† |n⟩ = √(n+1) |n+1⟩ &nbsp;&nbsp;|&nbsp;&nbsp; a |n⟩ = √n |n-1⟩
                    </div>
                    <p>
                      These commutation relations form the mathematical foundation for describing coherent states of light, squeezed light generators, and the underlying algorithms executed by optical quantum processors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acquisition Guide (Hunt Clue) */}
              <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[90px] rounded-full" />
                <div className="space-y-2 relative z-10">
                  <h4 className="text-xl md:text-2xl font-sans font-extrabold tracking-tight">How to Acquire FockState.com</h4>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    We maintain secure, friction-free protocols for the acquisition and escrow of this high-authority asset. 
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 relative z-10 text-left">
                  <div className="bg-white/5 border border-white/15 p-6 rounded-2xl space-y-2">
                    <h5 className="font-sans font-bold text-white text-sm">A. Immediate Automated Checkout</h5>
                    <p className="text-xs text-slate-300 leading-relaxed text-justify">
                      To complete an instantaneous premium checkout, click the <strong>Secure Instant Purchase</strong> banner above. You will be redirected to our verified GoDaddy Registry portal supporting rapid escrow and transfer.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/15 p-6 rounded-2xl space-y-2">
                    <h5 className="font-sans font-bold text-white text-sm">B. Private Verification & Escrow Inquiries</h5>
                    <p className="text-xs text-slate-300 leading-relaxed text-justify">
                      To propose structural leases, joint ventures, or direct private acquisitions, you must unlock our human routing verification. Our secure direct contact email and verification process are tucked away within the <strong>About Me (Identity Page)</strong>. Select the "About Me" tab in the header menu to locate the Secure Contact Decryptor.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Dynamic Sitemaps CTA Grid */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full relative z-10">
              <button 
                onClick={() => { setView('portfolio'); window.scrollTo(0,0); }}
                className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-sans font-bold rounded-xl cursor-pointer shadow-sm active:translate-y-px"
              >
                Portfolio Directory
              </button>
              <button 
                onClick={() => { setView('archive'); window.scrollTo(0,0); }}
                className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-sans font-bold rounded-xl cursor-pointer shadow-sm active:translate-y-px"
              >
                Tech Reference Nodes
              </button>
            </div>
          </motion.main>
        ) : view === 'archive' ? (
          /* ARCHIVE PAGE - THE SEO MAZE */
          <motion.main 
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow grid grid-cols-1 md:grid-cols-12"
          >
            {/* Sidebar Documents List */}
            <aside className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 p-8 md:p-10 bg-slate-50/50">
              <div className="sticky top-40 space-y-8">
                <div>
                  <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-3 mb-8">
                    RESEARCH ARCHIVE NODES
                  </h3>
                  <div className="space-y-4">
                    {ARCHIVE_DOCS.map((doc, i) => (
                      <button
                        key={doc.id}
                        onClick={() => setActiveDoc(doc.id)}
                        className={`w-full p-5 border text-left transition-all duration-250 flex items-center justify-between rounded-xl group cursor-pointer
                          ${activeDoc === doc.id ? 'bg-slate-900 border-transparent text-white shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-indigo-500' : 'bg-sky-500'}`} />
                          <h4 className="text-sm font-sans font-bold leading-tight">{doc.title}</h4>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${activeDoc === doc.id ? 'rotate-95 translate-x-1' : 'opacity-40 group-hover:opacity-85'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section className="md:col-span-8 p-8 md:p-16 bg-white/40 space-y-24">
              <AnimatePresence mode="wait">
                {activeDoc ? (
                  <motion.div 
                    key={activeDoc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-12 max-w-4xl text-left"
                  >
                    <h2 className="text-3xl md:text-5xl font-sans font-extrabold leading-tight text-slate-900">
                      {ARCHIVE_DOCS.find(d => d.id === activeDoc)?.title}
                    </h2>
                    
                    {/* Document Parameters */}
                    <div className="grid grid-cols-3 gap-6 p-5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-600">
                      {Object.entries(ARCHIVE_DOCS.find(d => d.id === activeDoc)?.params || {}).map(([key, val]) => (
                        <div key={key}>
                          <span className="opacity-50 block mb-1 uppercase text-[10px] tracking-wider">{key}:</span>
                          <span className="font-semibold text-slate-800">{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-lg md:text-xl font-normal leading-relaxed text-justify border-l-4 border-blue-500 pl-6 py-4 bg-blue-50/20 text-slate-700 rounded-r-xl">
                      {ARCHIVE_DOCS.find(d => d.id === activeDoc)?.content}
                    </div>

                    <div className="pt-8 border-t border-slate-200 opacity-80 flex flex-col md:flex-row justify-between gap-4">
                       <p className="text-xs font-semibold flex items-center gap-2 text-slate-500">
                         <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                         Metadata Node: 0x<span className="text-blue-600 font-mono text-xs">{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                       </p>
                       <p className="text-[11px] text-slate-400">Cite: FOCKSTATE. Technical Node {activeDoc}. DOI: 10.1038/domain-parking-fock</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="no-doc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4 opacity-40 text-slate-450"
                  >
                    <Search className="w-12 h-12 stroke-[1.5] text-slate-350" />
                    <p className="text-lg font-medium font-sans">Select a document from the research index to begin reading</p>
                  </motion.div>
                ) }
              </AnimatePresence>

              {/* Natural Content Modules for SEO */}
              <div className="pt-24 space-y-24 pb-12">
                {/* Module 1: Research Registry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6 p-8 border border-slate-200 bg-white shadow-sm rounded-2xl text-left">
                    <h4 className="text-lg font-sans font-bold border-b border-slate-100 pb-3 text-slate-900">Global Node Index</h4>
                    <p className="text-sm font-normal text-slate-500 leading-relaxed">
                      Cross-referenced metadata for hilbert space analytical clusters. Each node represents a distinct state vector configuration within the fockstate.com namespace.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      {FOCK_STATE_KEYWORDS.slice(0, 12).map(k => (
                        <div key={k} className="flex items-center gap-2 font-medium">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="truncate">{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 p-8 border border-slate-200 bg-slate-50/50 rounded-2xl text-left">
                    <h4 className="text-lg font-sans font-bold border-b border-slate-100 pb-3 text-slate-900">Sync Logs</h4>
                    <div className="space-y-2.5 text-xs font-mono">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="flex justify-between border-b border-slate-100 pb-1.5 text-slate-500">
                            <span className="truncate max-w-[150px]">{FOCK_STATE_KEYWORDS[Math.floor(Math.random() * FOCK_STATE_KEYWORDS.length)]}</span>
                            <span className="text-emerald-600 font-bold font-sans text-[10px]">STATUS_OK</span>
                         </div>
                       ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Real-time telemetry from fockstate propagation nodes.</p>
                  </div>
                </div>

                {/* Module 2: Field Theory References */}
                <div className="space-y-8 text-left bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
                   <h3 className="text-lg font-sans font-bold border-b border-slate-100 pb-3 text-slate-900 flex items-center gap-2">
                     <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />State Reference Matrix
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {DATA_CATEGORIES.map(cat => (
                        <div key={cat.title} className="space-y-3">
                           <h5 className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider">{cat.title}</h5>
                           <ul className="text-xs font-normal space-y-2 text-slate-600">
                              {cat.keywords.slice(0, 5).map(k => (
                                <li key={k} className="hover:text-blue-600 cursor-default truncate transition-colors">{k}</li>
                              ))}
                           </ul>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Module 3: System Status Stream */}
                <div className="p-8 border border-slate-200 rounded-2xl bg-white shadow-sm">
                   <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-grow space-y-4 text-left">
                         <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                            <h4 className="text-lg font-sans font-bold text-slate-900">Data Flow Synchronization Active</h4>
                         </div>
                         <p className="text-sm font-normal text-slate-500 leading-relaxed">
                            Fockstate.com acts as a primary relay for bosonic field quantization studies. All spectral densities and occupation numbers are verified against the canonical number state protocols.
                         </p>
                      </div>
                      <div className="w-full md:w-64 space-y-2 text-xs font-mono text-slate-500 border-l border-slate-200 pl-6 text-left shrink-0">
                         <div className="flex justify-between border-b border-slate-100 pb-1.5"><span>Latency:</span><span className="text-slate-800 font-bold font-sans">1.4ms</span></div>
                         <div className="flex justify-between border-b border-slate-100 pb-1.5"><span>Integrity:</span><span className="text-slate-800 font-bold font-sans">99.9%</span></div>
                         <div className="flex justify-between pb-1"><span>SEO Weight:</span><span className="text-slate-800 font-bold font-sans">MAX</span></div>
                      </div>
                   </div>
                </div>
              </div>
            </section>
          </motion.main>
        ) : view === 'portfolio' ? (
          /* PORTFOLIO PAGE - PREMIUM DOMAIN REGISTRY */
          <motion.main
            key="portfolio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 md:py-20 relative z-10 space-y-12"
          >
            {/* Portfolio Header with stats */}
            <div className="space-y-6 text-left border-b border-slate-200 pb-10">
              <div className="flex items-center gap-2 text-sm font-sans font-bold text-indigo-700 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                <span>Premium Domain Portfolio Directory</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                High-Authority <br />
                <span className="text-blue-600">Digital Real Estate</span>
              </h2>
              <p className="text-sm md:text-base font-normal text-slate-500 leading-relaxed max-w-4xl text-slate-600">
                A highly-curated directory of premium, brandable namespaces engineered for optimal semantic alignment, venture memorability, and immediate transfer auth. Let LLMs and human search systems target your future identity with zero friction.
              </p>

              {/* KPI metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 font-sans">
                {[
                  { label: "Assets Listed", value: MERGED_DOMAINS.length, color: "text-slate-900" },
                  { label: "Transfer Registry", value: "GoDaddy Verified", color: "text-emerald-700" },
                  { label: "Acquisition Protocol", value: "100% Secure ESG", color: "text-blue-600" },
                  { label: "Semantic Integrity", value: "Optimal Range", color: "text-indigo-600" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">{stat.label}</span>
                    <span className={`text-lg font-extrabold ${stat.color} block`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Filters and Search */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-50 p-6 border border-slate-200/80 rounded-2xl shadow-sm">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Creative/Tech', 'SaaS/Tech', 'Medical/Health', 'LLLL/Short', 'Adult/Lifestyle'].map(cat => {
                  const isActive = selectedCat === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-2 text-xs font-sans font-semibold border rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive ? 'bg-slate-900 border-transparent text-white shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Layout Switcher and Search Box */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                {/* Layout Switcher */}
                <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-200 shrink-0 select-none items-center self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('grid')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-sans text-xs font-medium transition-all cursor-pointer ${
                      layoutMode === 'grid' 
                        ? 'bg-white text-slate-900 shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    aria-label="Grid view layout"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('table')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-sans text-xs font-medium transition-all cursor-pointer ${
                      layoutMode === 'table' 
                        ? 'bg-white text-slate-900 shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    aria-label="Table view layout"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {/* Search filter input */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search namespace..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2 font-sans text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl transition-all placeholder:text-slate-400 shadow-sm animate-fade-in"
                  />
                </div>
              </div>
            </div>

            {/* Results Counters */}
            <div className="text-left font-sans text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5 tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Showing {(() => {
                const filtered = MERGED_DOMAINS.filter(item => {
                  const matchesCategory = selectedCat === 'All' || item.category === selectedCat;
                  const q = searchQuery.trim().toLowerCase();
                  const matchesSearch = !q || 
                    item.domain.toLowerCase().includes(q) || 
                    item.description.toLowerCase().includes(q) || 
                    item.brandLabel.toLowerCase().includes(q) ||
                    item.hashtags.some(tag => tag.toLowerCase().includes(q));
                  return matchesCategory && matchesSearch;
                });
                return filtered.length;
              })()} of {MERGED_DOMAINS.length} premium digital assets</span>
            </div>

            {(() => {
              const filtered = MERGED_DOMAINS.filter(item => {
                const matchesCategory = selectedCat === 'All' || item.category === selectedCat;
                const q = searchQuery.trim().toLowerCase();
                const matchesSearch = !q || 
                  item.domain.toLowerCase().includes(q) || 
                  item.description.toLowerCase().includes(q) || 
                  item.brandLabel.toLowerCase().includes(q) ||
                  item.hashtags.some(tag => tag.toLowerCase().includes(q));
                return matchesCategory && matchesSearch;
              });

              if (filtered.length === 0) {
                return (
                  <div className="p-16 border border-dashed border-slate-200 bg-white text-center space-y-4 rounded-2xl shadow-sm">
                    <Search className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="text-lg font-sans font-bold text-slate-700">No namespaces match your query</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Try clearing active filters or query parameters to discover high-authority digital real estate options.
                    </p>
                    <button 
                      type="button"
                      onClick={() => { setSelectedCat('All'); setSearchQuery(''); }}
                      className="px-4 py-2 bg-white border border-slate-200 text-xs font-sans font-bold rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-sm text-slate-700"
                    >
                      Reset Portfolio Filter
                    </button>
                  </div>
                );
              }

              if (layoutMode === 'grid') {
                return (
                  /* DYNAMIC CARD GRID */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((dom) => (
                      <div
                        key={dom.domain}
                        className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left relative overflow-hidden"
                      >
                        <div className="space-y-6">
                          {/* Header tags */}
                          <div className="flex justify-between items-center gap-4">
                            <span className="inline-block px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 font-mono text-[10px] font-bold uppercase rounded-lg">
                              {dom.category}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-500 font-mono text-[10px] font-bold uppercase tracking-wider">
                                {dom.brandLabel}
                              </span>
                              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                {dom.authority} DA
                              </span>
                            </div>
                          </div>

                          {/* Domain Title */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between group/title">
                              <a 
                                href={`https://www.${dom.domain}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xl sm:text-2xl font-sans font-black tracking-tight text-slate-900 group-hover/title:text-blue-600 group-hover/title:underline transition-all break-all"
                              >
                                {dom.domain}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopy(dom.domain)}
                                className="p-1 px-2 border border-slate-100 hover:border-slate-250 hover:bg-slate-100 text-slate-400 hover:text-slate-800 rounded-lg font-sans text-[9px] transition-all flex items-center gap-1 shrink-0 ml-2 cursor-pointer font-bold shadow-xs active:scale-95"
                                title="Copy Domain name to clipboard"
                              >
                                {copiedDomain === dom.domain ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    <span className="text-emerald-600">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-slate-600 leading-relaxed font-sans min-h-[60px]">
                            {dom.description}
                          </p>

                          {/* Metadata specs */}
                          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100">
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">DOM DNA</span>
                              <span className="text-xs font-semibold text-slate-800 block truncate" title={dom.length}>{dom.length}</span>
                            </div>
                            <div className="space-y-1 border-l border-r border-slate-100 px-2">
                              <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">REGISTRY</span>
                              <span className="text-xs font-semibold text-slate-800 block truncate" title={dom.registryTier}>{dom.registryTier.replace(" (Registry Standard)", "")}</span>
                            </div>
                            <div className="space-y-1 pl-2">
                              <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">BASELINE</span>
                              <span className="text-xs font-bold text-emerald-600 block">{dom.marketBaseline}</span>
                            </div>
                          </div>

                          {/* Hashtags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {dom.hashtags.map(tag => (
                              <span key={tag} className="text-[10px] font-sans font-medium text-blue-700 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-lg">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6">
                          <a
                            href={`https://www.${dom.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center px-4 py-2.5 bg-slate-900 text-white hover:bg-blue-600 font-sans font-bold text-xs uppercase cursor-pointer rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm animate-fade-in"
                          >
                            <span>Acquire Portfolio Asset</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                /* COMPACT REFINED REGISTRY TABLE */
                <div className="overflow-x-auto border border-slate-200 bg-white rounded-2xl shadow-sm animate-fade-in">
                  <table className="w-full border-collapse font-sans text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-sans font-semibold text-xs uppercase tracking-wider">
                        <th className="p-4 md:p-6 text-slate-500">Domain Namespace</th>
                        <th className="p-4 md:p-6 hidden md:table-cell text-slate-500">Primary Category</th>
                        <th className="p-4 md:p-6 hidden lg:table-cell text-slate-500">Target Utility / Brand Value</th>
                        <th className="p-4 md:p-6 text-center text-slate-500">Auth Rating</th>
                        <th className="p-4 md:p-6 text-right text-slate-500">Purchase Pathway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filtered.map((item) => (
                        <tr key={item.domain} className="hover:bg-slate-50/50 transition-colors group">
                          {/* Name Namespace */}
                          <td className="p-4 md:p-6 font-sans text-base md:text-lg font-bold">
                            <div className="flex items-center gap-3">
                              <a 
                                href={`https://www.${item.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-900 hover:text-blue-600 hover:underline transition-colors break-all"
                              >
                                {item.domain}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopy(item.domain)}
                                title="Copy Domain Name"
                                className="p-1.5 opacity-40 hover:opacity-100 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-all text-slate-700 cursor-pointer"
                              >
                                {copiedDomain === item.domain ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          {/* Category Badge */}
                          <td className="p-4 md:p-6 hidden md:table-cell font-sans">
                            <span className="inline-block bg-slate-50 border border-slate-200/80 px-3 py-1 font-mono text-xs font-semibold text-slate-600 rounded-lg">
                              {item.category}
                            </span>
                          </td>
                          {/* Purpose Description */}
                          <td className="p-4 md:p-6 hidden lg:table-cell text-xs md:text-sm font-normal text-slate-500 max-w-sm">
                            {item.description}
                          </td>
                          {/* SEO Authority Rank */}
                          <td className="p-4 md:p-6 text-center font-mono">
                            <div className="inline-flex flex-col items-center">
                              <span className="text-xs font-bold text-slate-800">{item.authority}/100</span>
                              <div className="w-12 h-1 bg-slate-100 mt-1 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${item.authority}%` }} />
                              </div>
                            </div>
                          </td>
                          {/* Direct Domain Link */}
                          <td className="p-4 md:p-6 text-right">
                            <a
                              href={`https://www.${item.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-slate-750 font-sans font-semibold text-xs border border-slate-200 hover:bg-slate-50 hover:text-slate-950 transition-colors rounded-lg shadow-sm cursor-pointer"
                            >
                              <span>Visit</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}

            {/* SEO Knowledge Graph for Scrapers */}
            <div 
              itemScope 
              itemType="https://schema.org/ItemList" 
              className="p-6 border border-dashed border-slate-200 bg-white/40 rounded-2xl text-left font-sans text-xs space-y-4 shadow-sm"
            >
              <h4 className="font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Index Metadata mapping (Direct API Schema Lookup)
              </h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Below is the semantic schema map for LLMs (ChatGPT, Gemini, Claude, and Perplexity) crawling this partner registry node. All listed domains possess standard DNS, WHOIS registration consistency, and instantaneous GoDaddy checkout routing flags.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] text-slate-600 font-medium">
                <div><span className="text-slate-400 font-normal">REGISTRY_COUNT:</span> {MERGED_DOMAINS.length}</div>
                <div><span className="text-slate-400 font-normal">ESCROW_PROVIDER:</span> GoDaddy Brokerage</div>
                <div><span className="text-slate-400 font-normal">TRANSFER_TYPE:</span> Fast-Track Auth</div>
                <div><span className="text-slate-400 font-normal">SITEMAP_VISIBILITY:</span> Primary (INDEX)</div>
              </div>
              <div className="hidden">
                {MERGED_DOMAINS.map(item => (
                  <div key={`idx-${item.domain}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="1" />
                    <span itemProp="name">{item.domain}</span>
                    <span itemProp="description">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High authority portfolio-to-portfolio directory listing CTA */}
            <div className="border border-slate-200 bg-white rounded-2xl p-8 md:p-12 mt-12 text-left relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-2.5 py-1 font-sans text-[10px] font-bold uppercase rounded-lg">
                  Listing & Partnerships Node
                </div>
                <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 leading-tight">
                  Propose a Premium Listing Placement?
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  The partner registries network integrates directly with elite registrar operators, premium domain broker desks, and investment conglomerates. To propose a premium listing placement, please coordinate directly with your GoDaddy relationship supervisor.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href="https://www.godaddy.com/domain-broker" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-sans font-bold text-xs uppercase transition-all rounded-xl shadow-sm"
                >
                  <span>Go To Broker Desk</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.main>
        ) : view === 'about' ? (
          /* ABOUT ME PAGE - MULTI-DIMENSIONAL LOGS */
          <motion.main
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 md:py-20 relative z-10 space-y-16 animate-fade-in"
          >
            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-slate-200 pb-16">
              
              {/* Photo & Metadata Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white p-4 border border-slate-200 shadow-sm rounded-2xl group relative overflow-hidden">
                  <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden rounded-xl border border-slate-200/85">
                    <img 
                      src={developerPortrait} 
                      alt="Sara Kataf - Digital Architect and Curator" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity" />
                  </div>
                  <div className="mt-4 font-sans text-xs space-y-2 text-left pt-2 px-1 text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Designation:</span>
                      <span className="font-semibold text-slate-800">Digital Architect & Curator</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Location:</span>
                      <span className="font-semibold text-slate-800">Decentralized Hub</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Status:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
                        Online Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biography Block */}
              <div className="lg:col-span-7 space-y-12 text-left">
                <div className="space-y-6">
                  <div className="text-xs font-sans font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 animate-pulse text-blue-500" />
                    <span>Identity Specification Node // fockstate.com</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-sans font-extrabold leading-tight text-slate-900">
                    About <span className="text-blue-600">Sara Kataf</span>
                  </h2>
                  
                  <div className="space-y-5 text-base leading-relaxed text-slate-600 font-sans">
                    <p className="font-semibold text-lg text-slate-900 border-l-4 border-blue-500 pl-4">
                      I am a content builder, advocate, and high-value digital asset curator.
                    </p>
                    <p>
                      Specialized in leading digital communications and organizing web-based resource nodes, I focus on designing visual layouts and structures that bridge tech innovation with intuitive human engagement.
                    </p>
                    <p>
                      Through my content work and digital property curation, I aim to foster vibrant online environments that value social perspective, clarity, and visual precision.
                    </p>
                    <p>
                      Whether coordinating asset strategies, engineering modern user interfaces, or championing digital accessibility, my approach is grounded in absolute visual integrity and modular design.
                    </p>
                  </div>
                </div>

                {/* Skills/Core Focus Items */}
                <div className="space-y-6">
                  <h3 className="text-base font-sans font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2">
                    Engineering Parameters
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-xl space-y-2">
                      <h4 className="font-sans font-bold text-blue-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Semantic Curation
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Curation of hand-crafted namespaces optimized for LLM lookup indices, instant escrow, and fast transfer authorizations.
                      </p>
                    </div>
                    <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-xl space-y-2">
                      <h4 className="font-sans font-bold text-indigo-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        Functional Engineering
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Engineering of highly reactive, modular, and performant web interfaces. Grounded in density, optimal typography pairs, and clean state mechanics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Node */}
                <div className="p-6 md:p-8 border border-slate-200 bg-white shadow-sm rounded-2xl space-y-6">
                  <h4 className="text-base font-sans font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>Secure Contact Protocol</span>
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans">
                    To prevent automated scraping and spider-harvesting, the primary email address is cryptographically hidden behind a local routing verification gate. Click below to verify and decrypt the address.
                  </p>
                  
                  <div className="pt-2">
                    <EmailDecrypter handleCopy={handleCopy} copiedDomain={copiedDomain} />
                  </div>
                </div>
              </div>
            </div>

            {/* Network Namespaces */}
            <div className="space-y-8 text-left">
              <h3 className="text-xl md:text-2xl font-sans font-extrabold text-slate-900 border-l-4 border-blue-500 pl-4">Digital Real Estate Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { domain: "kataf.com", label: "Primary Identity Namespace", info: "The definitive 5-letter portfolio landing page. Crafted for maximum acoustic symmetry and premium branding resonance.", color: "border-sky-400" },
                  { domain: "fockstate.com", label: "Quantum Computation Node", info: "Premium technical asset built for quantum optic research papers, physics state vectors, and bosonic modeling structures.", color: "border-blue-500" },
                  { domain: "boobclub.com", label: "Lifestyle Media Node", info: "A high-visibility brand ideal for custom clothing, lifestyle media streaming repositories, communities, or catalogs.", color: "border-indigo-400" },
                  { domain: "jalh.com", label: "Premium 4-Letter Namespace", info: "An exceptionally rare 4-letter startup asset, perfect for global financial software pipelines, SaaS solutions, or ventures.", color: "border-emerald-500" }
                ].map((n, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-sans font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        <a href={`https://${n.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          {n.domain} <ExternalLink className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100" />
                        </a>
                      </h4>
                      <span className="text-[9px] uppercase font-sans font-bold tracking-wider text-blue-500 block">{n.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{n.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.main>
        ) : view === 'realestate' ? (
          /* DIGITAL REAL ESTATE PORTFOLIO - BYPASSED & CONSOLIDATED */
          <motion.main 
            key="realestate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-grow p-6 md:p-12 max-w-7xl mx-auto text-left hidden"
          >

            {/* Filtering and Query Engine */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              {/* Category buttons tabbed panel */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Creative/Tech', 'SaaS/Tech', 'Medical/Health', 'LLLL/Short', 'Adult/Lifestyle'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setReSelectedCat(cat)}
                    className={`px-4 py-2 font-sans text-xs font-bold border rounded-lg transition-all duration-200 cursor-pointer ${
                      reSelectedCat === cat 
                        ? 'bg-slate-900 border-transparent text-white shadow-sm' 
                        : 'bg-white text-slate-705 border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Live Query Input */}
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Query directory (e.g. 'SaaS', '6 Symbols')..."
                  value={reSearchQuery}
                  onChange={(e) => setReSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 font-sans text-sm border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Status indicators */}
            {(() => {
              const filteredRealEstate = REAL_ESTATE_DOMAINS.filter(dom => {
                const matchesCategory = reSelectedCat === 'All' || dom.category === reSelectedCat;
                const matchesSearch = dom.domain.toLowerCase().includes(reSearchQuery.toLowerCase()) || 
                                      dom.description.toLowerCase().includes(reSearchQuery.toLowerCase()) || 
                                      dom.brandLabel.toLowerCase().includes(reSearchQuery.toLowerCase()) ||
                                      dom.hashtags.some(tag => tag.toLowerCase().includes(reSearchQuery.toLowerCase()));
                return matchesCategory && matchesSearch;
              });

              return (
                <div className="space-y-8">
                  <div className="text-left font-sans text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5 tracking-wider">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Showing {filteredRealEstate.length} of {REAL_ESTATE_DOMAINS.length} premium digital assets</span>
                  </div>

                  {filteredRealEstate.length === 0 ? (
                    <div className="p-16 border border-dashed border-slate-200 bg-white text-center space-y-4 rounded-2xl shadow-sm">
                      <Search className="w-12 h-12 text-slate-300 mx-auto" />
                      <h4 className="text-lg font-sans font-bold text-slate-700">No namespaces match your query</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        Try clearing active filters or query parameters to discover high-authority digital real estate options.
                      </p>
                      <button 
                        onClick={() => { setReSelectedCat('All'); setReSearchQuery(''); }}
                        className="px-4 py-2 bg-white border border-slate-200 text-xs font-sans font-bold rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                      >
                        Reset Listing Filter
                      </button>
                    </div>
                  ) : (
                    /* The Card Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredRealEstate.map((dom) => (
                        <div
                          key={dom.domain}
                          className="bg-white border border-slate-250/70 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left relative overflow-hidden"
                        >
                          <div className="space-y-6">
                            {/* Header tags */}
                            <div className="flex justify-between items-center gap-4">
                              <span className="inline-block px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 font-mono text-[10px] font-bold uppercase rounded-lg">
                                {dom.category}
                              </span>
                              <span className="inline-block text-blue-600 font-sans text-[10px] font-bold uppercase tracking-wider">
                                {dom.brandLabel}
                              </span>
                            </div>

                            {/* Domain Title */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between group">
                                <a 
                                  href={`https://${dom.domain}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xl sm:text-2xl font-sans font-black tracking-tight text-slate-900 hover:text-blue-600 hover:underline transition-all break-all"
                                >
                                  {dom.domain}
                                </a>
                                <button
                                  onClick={() => handleCopy(dom.domain)}
                                  className="p-1 px-2 border border-slate-100 hover:border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-800 rounded-lg font-sans text-[9px] transition-colors flex items-center gap-1 shrink-0 ml-2 cursor-pointer font-bold"
                                  title="Copy Domain name to clipboard"
                                >
                                  {copiedDomain === dom.domain ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      <span className="text-emerald-600">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-slate-600 leading-relaxed font-sans">
                              {dom.description}
                            </p>

                            {/* Metadata specs */}
                            <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100">
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">DOM DNA</span>
                                <span className="text-xs font-semibold text-slate-800 block truncate" title={dom.length}>{dom.length}</span>
                              </div>
                              <div className="space-y-1 border-l border-r border-slate-100 px-2">
                                <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">REGISTRY</span>
                                <span className="text-xs font-semibold text-slate-800 block truncate" title={dom.registryTier}>{dom.registryTier.replace(" (Registry Standard)", "")}</span>
                              </div>
                              <div className="space-y-1 pl-2">
                                <span className="text-[9px] uppercase font-sans text-slate-400 block font-bold leading-none">BASELINE</span>
                                <span className="text-xs font-bold text-emerald-600 block">{dom.marketBaseline}</span>
                              </div>
                            </div>

                            {/* Hashtags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {dom.hashtags.map(tag => (
                                <span key={tag} className="text-[10px] font-sans font-medium text-blue-700 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-lg">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-6">
                            <a
                              href={`https://${dom.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center px-4 py-2.5 bg-slate-900 text-white hover:bg-blue-600 font-sans font-bold text-xs uppercase cursor-pointer rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
                            >
                              <span>Acquire Portfolio Asset</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* High authority portfolio-to-portfolio directory listing CTA */}
                  <div className="border border-slate-200 bg-white rounded-2xl p-8 md:p-12 mt-12 text-left relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4 max-w-3xl">
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-2.5 py-1 font-sans text-[10px] font-bold uppercase rounded-lg">
                        Listing & Partnerships Node
                      </div>
                      <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 leading-tight">
                        Propose a Premium Listing Placement?
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans">
                        The partner registries network integrates directly with elite registrar operators, premium domain broker desks, and investment conglomerates. To propose a premium listing placement, please coordinate directly with your GoDaddy relationship supervisor.
                      </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                      <a 
                        href="https://www.godaddy.com/domain-broker" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-sans font-bold text-xs uppercase transition-all rounded-xl shadow-sm"
                      >
                        <span>Go To Broker Desk</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.main>
        ) : view === 'sitemap' ? (
          /* MULTI-FORMAT SITEMAP PORTAL */
          <motion.main 
            key="sitemap-portal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-grow p-6 md:p-12 max-w-6xl mx-auto space-y-12 relative z-10 w-full"
          >
            {/* Page Header */}
            <div className="space-y-4 border-b border-slate-2550 pb-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-sans font-bold uppercase rounded-full">
                ❖ dynamic sitemap generator & indexation node
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-950">Sitemap Index & Schemas</h2>
              <p className="text-sm md:text-base text-slate-505 font-sans max-w-3xl leading-relaxed">
                Canonical registry mappings for fockstate.com. Switch between visual interactive hierarchies, Google-compliant XML schemas, nested JSON-LD graphs, and plain text URL indices.
              </p>
            </div>

            {/* Selector bar */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200/50">
              {[
                { id: 'visual', label: 'Visual Hierarchy (HTML)', icon: Globe, color: 'text-blue-500' },
                { id: 'xml', label: 'XML Engine Feed', icon: Code, color: 'text-amber-500' },
                { id: 'json', label: 'JSON Graph Schema', icon: Binary, color: 'text-indigo-500' },
                { id: 'txt', label: 'Plain Text list', icon: FileText, color: 'text-emerald-500' }
              ].map(fmt => {
                const Icon = fmt.icon;
                const isSelected = sitemapFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setSitemapFormat(fmt.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold uppercase transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 border-transparent text-white shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-705 border border-slate-200 shadow-sm'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${fmt.color}`} />
                    <span>{fmt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sitemap Render Area */}
            <div className="border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden text-left flex flex-col">
              {/* Top Bar */}
              <div className="bg-slate-900 text-slate-105 px-4 py-3 flex items-center justify-between border-b border-slate-950">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex gap-1.5 flex-row">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-650" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase opacity-75 ml-4 text-slate-300">
                    fockstate_sitemap.{sitemapFormat} — ACTIVE NODE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      let textToCopy = '';
                      if (sitemapFormat === 'xml') textToCopy = getXmlSitemapString();
                      else if (sitemapFormat === 'json') textToCopy = getJsonSitemapString();
                      else if (sitemapFormat === 'txt') textToCopy = getTxtSitemapString();
                      else textToCopy = 'https://fockstate.com/\n' + SITEMAP.flatMap(g => g.links.map(l => `https://fockstate.com/nodes/${l.id}`)).join('\n');
                      
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedDomain('sitemap');
                      setTimeout(() => setCopiedDomain(null), 2000);
                    }}
                    className="px-2.5 py-1 bg-white text-slate-800 hover:bg-neutral-50 rounded text-[10px] font-sans font-bold transition-all uppercase flex items-center gap-1 cursor-pointer"
                  >
                    {copiedDomain === 'sitemap' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 overflow-auto max-h-[600px] font-mono text-xs">
                {sitemapFormat === 'visual' && (
                  <div className="space-y-8">
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl mb-4 font-sans text-xs text-blue-800 leading-relaxed">
                      <strong>Interactive Guide:</strong> Click any of the nodes below to immediately navigate to its respective content view. This structure lists both standard institution parameters and auxiliary real estate directories.
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                      {SITEMAP.map(group => (
                        <div key={group.group} className="border border-slate-150 rounded-2xl p-5 bg-white shadow-sm space-y-4">
                          <h4 className="text-xs font-sans font-extrabold border-b border-slate-100 pb-2 text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            {group.group}
                          </h4>
                          <ul className="space-y-2.5">
                            {group.links.map(link => (
                              <li key={link.id}>
                                <button
                                  onClick={() => {
                                    setSelectedPageId(link.id);
                                    setView('page');
                                    window.scrollTo(0, 0);
                                  }}
                                  className="w-full text-left p-2.5 hover:bg-slate-50 text-slate-800 hover:text-blue-600 rounded-xl border border-transparent hover:border-slate-200 transition-all flex items-start gap-2 group cursor-pointer"
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                  <div>
                                    <div className="font-bold text-xs">{link.name}</div>
                                    <div className="text-[10px] text-slate-400 font-normal line-clamp-1 group-hover:text-slate-500 mt-0.5">{link.content}</div>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Domain Portfolio nodes */}
                      <div className="border border-slate-150 rounded-2xl p-5 bg-white shadow-sm space-y-4">
                        <h4 className="text-xs font-sans font-extrabold border-b border-slate-100 pb-2 text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          Institutional Interfaces
                        </h4>
                        <ul className="space-y-2">
                          {[
                            { name: "Domain Portal", view: "home", subtitle: "Instant buy & transfer on GoDaddy platform." },
                            { name: "About Me", view: "about", subtitle: "Learn more about lead architect Sara Fock." },
                            { name: "Premium Network Portfolio", view: "portfolio", subtitle: "A list of certified high-authority namespaces." }
                          ].map(item => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  setView(item.view as any);
                                  window.scrollTo(0, 0);
                                }}
                                className="w-full text-left p-2.5 hover:bg-slate-50 text-slate-850 hover:text-indigo-600 rounded-xl border border-transparent hover:border-slate-200 transition-all flex items-start gap-2 group cursor-pointer"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                <div>
                                  <div className="font-bold text-xs">{item.name}</div>
                                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.subtitle}</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Partner registries */}
                      <div className="border border-slate-150 rounded-2xl p-5 bg-white shadow-sm space-y-4">
                        <h4 className="text-xs font-sans font-extrabold border-b border-slate-100 pb-2 text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Real Estate Brand Registry
                        </h4>
                        <div className="text-[11px] text-slate-400 font-sans mb-1 px-1">
                          Direct canonical access point for digital assets.
                        </div>
                        <ul className="space-y-2">
                          {REAL_ESTATE_DOMAINS.slice(0, 4).map(dom => (
                            <li key={dom.domain}>
                              <a
                                href={`https://${dom.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2.5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all flex justify-between items-center group text-left"
                              >
                                <div>
                                  <div className="font-bold text-xs text-slate-800 group-hover:text-emerald-700">{dom.domain}</div>
                                  <div className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">{dom.category}</div>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                )}

                {sitemapFormat === 'xml' && (
                  <pre className="text-slate-800 text-[11px] leading-relaxed select-all whitespace-pre">
                    {getXmlSitemapString()}
                  </pre>
                )}

                {sitemapFormat === 'json' && (
                  <pre className="text-slate-800 text-[11px] leading-relaxed select-all whitespace-pre">
                    {getJsonSitemapString()}
                  </pre>
                )}

                {sitemapFormat === 'txt' && (
                  <pre className="text-slate-800 text-xs leading-relaxed select-all whitespace-pre">
                    {getTxtSitemapString()}
                  </pre>
                )}
              </div>
            </div>
          </motion.main>
        ) : view === 'feelize' ? (
          /* THE UNLISTED FEELIZE SEO SHOWCASE PAGE */
          <motion.main 
            key="feelize-portal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-grow p-6 md:p-12 max-w-5xl mx-auto space-y-12 relative z-10 w-full"
          >
            {/* Page Header */}
            <div className="space-y-4 border-b border-slate-200 pb-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/80 text-blue-800 border border-blue-100 text-[10px] font-sans font-bold uppercase rounded-full">
                ❖ Premium Web Development & Digital Engineering Hub
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-950">
                Websites Built by <span className="text-blue-600">Feelize</span>
              </h2>
              <p className="text-sm md:text-base text-slate-605 font-sans max-w-3xl leading-relaxed">
                Feelize is a premium high-performance web development, digital products, and design agency specializing in blazing-fast digital architectures, SEO-optimized interactive platforms, and robust brand assets.
              </p>
            </div>

            {/* Main grid showcasing capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              
              {/* Feature 1: High fidelity code */}
              <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900">Custom Engineering & Clean Code</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  At Feelize, we craft bespoke web applications using cutting-edge client and server topologies. Our setups use pristine React and Vite, structured TypeScript architectures, and modular component declarations. No templates, no bloat—just perfectly tuned code designed to perform at scale.
                </p>
              </div>

              {/* Feature 2: High SEO indexing */}
              <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900">Next-Generation SEO & Crawlability</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  We design digital assets with automated AI agents, spiders, and search engines in mind. Feelize-engineered websites incorporate microdata, schema layouts, custom XML directories, JSON-LD graphs, and search configurations. This ensures your products index immediately and capture organic intent.
                </p>
              </div>

              {/* Feature 3: Responsive UI */}
              <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900">Responsive UI & High Visual Polish</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  Design dictates trust. Feelize combines Swiss layout precision with subtle spatial hierarchy and refined typography (including custom Inter and Space Grotesk pairings). Using modern transitions and physical-feel micro-animations, we deliver professional interfaces that respond naturally across viewport boundaries.
                </p>
              </div>

              {/* Feature 4: Brand Authority & Curation */}
              <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900">Digital Asset & Domain Curation</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  Securing the right internet namespace is critical for identity specification. Feelize works directly with domain brokerage desks and investment portfolios to locate, certify, and transfer high-authority, short-form, and category-defining brand domains to position your startup for success.
                </p>
              </div>

            </div>

            {/* Why Feelize section - SEO optimized essay */}
            <div className="p-8 border border-slate-200 bg-slate-50/50 rounded-2xl text-left space-y-6">
              <h3 className="text-xl font-sans font-extrabold text-slate-900">
                Elevating Brands through Advanced Digital Engineering
              </h3>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-sans">
                <p>
                  In the modern digital landscape, the distinction between standard websites and custom SEO-engineered applications can define the trajectory of a brand. Feelize operates as a premier design partner and engineering studio, offering modern web experiences structured on the highest technical standards. By employing server-side API proxy techniques and optimizing Client-Side rendering, we ensure sensitive API keys are hidden while websites maintain exceptional performance metrics.
                </p>
                <p>
                  Our strategic layout architecture focuses on premium aesthetics, featuring fluid grid containers, clear responsive touch points, and custom visual identities that reflect architectural honesty. We strictly avoid bloated presets or generic landing configurations, relying strictly on clean semantic markup and microdata indexing mapping schemas to bolster search positioning and organic indexation values.
                </p>
                <p>
                  Whether your project requires high-authority brand namespaces, custom integration algorithms with Google Workspace components, or full-stack React deployments, Feelize guarantees a modern, production-grade ecosystem.
                </p>
              </div>
            </div>

            {/* Bigger Button linking to feelize.com/start */}
            <div className="p-10 border border-slate-200 rounded-3xl bg-slate-900 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white leading-tight">
                  Ready to Build Your Next Digital Asset?
                </h3>
                <p className="text-sm leading-relaxed max-w-lg mx-auto text-slate-400 font-sans">
                  Take the first step toward launching a high-performance, professionally coded web platform. Connect with Feelize today.
                </p>
                <div className="pt-4 flex justify-center">
                  <a 
                    href="https://www.feelize.com/start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-sans font-extrabold text-sm tracking-wider uppercase transition-all duration-200 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                    id="feelize-cta-start"
                  >
                    <span>Launch Your Project with Feelize</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.main>
        ) : (
          /* DYNAMIC SITEMAP PAGE */
          <motion.main 
            key="page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-grow p-6 md:p-12 max-w-7xl mx-auto space-y-16 text-left"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-xs md:text-sm font-sans font-semibold text-slate-400 uppercase tracking-wider">
                <span>{activePage?.group}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className="text-slate-800">Internal Node {activePage?.id.toUpperCase()}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                {activePage?.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-8">
                  <div className="text-lg md:text-xl font-medium leading-relaxed border-l-4 border-blue-500 pl-6 py-4 bg-blue-50/25 text-slate-700 rounded-r-xl">
                    {activePage?.content}
                  </div>
                  <p className="text-sm md:text-base text-slate-500 font-normal leading-relaxed">
                    This semantic node is optimized for high-authority indexing within the Fock State research cluster, bridging the gap between bosonic field quantization and terminal Hilbert space mapping.
                  </p>
                </div>

                <div className="p-6 md:p-8 border border-slate-200 bg-white shadow-sm rounded-2xl space-y-8">
                   <h3 className="text-base font-sans font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">Academic Classification & Metadata</h3>
                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1.5 font-sans">
                         <h5 className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">PACS Code</h5>
                         <p className="text-sm font-bold text-slate-800">03.67.Hk (Quantum Comm.)</p>
                      </div>
                      <div className="space-y-1.5 font-sans">
                         <h5 className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">Index Node Path</h5>
                         <p className="text-sm font-bold text-slate-800">fockstate.com/nodes/{activePage?.id}</p>
                      </div>
                      <div className="space-y-1.5 font-sans">
                         <h5 className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">Indexation Status</h5>
                         <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            <p className="text-sm font-bold text-slate-800">Canonically Indexed</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-base font-sans font-bold border-b border-slate-200 pb-3 flex items-center justify-between text-slate-500 uppercase tracking-wider">
                      Academic Cross-References & Interlinked Nodes
                      <Layers className="w-5 h-5 text-blue-500" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {getRelatedPages().map((refPage) => (
                         <div 
                           key={refPage.id}
                           onClick={() => { setSelectedPageId(refPage.id); window.scrollTo(0, 0); }}
                           className="p-4 border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/10 transition-all rounded-xl cursor-pointer group relative overflow-hidden text-left shadow-xs"
                         >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                            <span className="text-[9px] uppercase font-sans font-bold text-slate-400 block mb-1 group-hover:text-blue-600">
                              {refPage.group}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800 block truncate" title={refPage.name}>
                              {refPage.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate mt-1">
                              {refPage.content.slice(0, 100)}...
                            </span>
                         </div>
                       ))}
                    </div>
                </div>

                <div className="p-8 border border-slate-150 rounded-2xl bg-slate-50 space-y-6">
                   <h4 className="text-lg font-sans font-bold text-slate-900">Mission Statement</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-sans">
                     Fockstate.com is committed to providing a secure, canonical registry for the next generation of quantum researchers. By securing this namespace, you are participating in the evolution of bosonic research infrastructure.
                   </p>
                   <button 
                    onClick={() => { setView('home'); window.scrollTo(0,0); }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold rounded-xl transition-colors shadow-sm text-xs cursor-pointer tracking-wider uppercase"
                   >
                     Acquire this namespace
                   </button>
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-8">
                 <div className="p-6 border border-slate-200 bg-white shadow-sm rounded-2xl">
                    <h4 className="text-xs font-sans font-extrabold mb-6 border-b border-slate-100 pb-3 uppercase tracking-wider text-slate-400">NODE METRICS</h4>
                    <div className="space-y-4">
                       {['Authority', 'Trust Flow', 'Semantic Rank', 'Bot Priority'].map(metric => (
                          <div key={metric} className="space-y-1.5">
                             <div className="flex justify-between text-xs font-bold text-slate-600">
                                <span>{metric}</span>
                                <span className="font-mono text-slate-800">{Math.floor(Math.random() * 20) + 80}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-6 border border-slate-200 bg-white shadow-sm rounded-2xl">
                    <h4 className="text-xs font-sans font-extrabold mb-4 uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">Internal Relay</h4>
                    <ul className="space-y-3 font-sans">
                       {SITEMAP.flatMap(g => g.links).sort(() => 0.5 - Math.random()).slice(0, 5).map(l => (
                          <li 
                            key={l.id} 
                            className="text-xs font-semibold text-slate-600 cursor-pointer hover:text-blue-600 flex items-center gap-1 group"
                            onClick={() => { setSelectedPageId(l.id); window.scrollTo(0, 0); }}
                          >
                            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-500 shrink-0" />
                            <span className="truncate">{l.name}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </aside>
            </div>

            <div className="pt-20 opacity-5 text-[10px] font-bold uppercase whitespace-pre-wrap leading-tight font-mono select-none pointer-events-none">
               {FOCK_STATE_KEYWORDS.join(' / ')}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Universal Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-12 md:p-16 space-y-16" itemScope itemType="https://schema.org/WPFooter">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 border-b border-slate-100 pb-12 w-full text-left">
          {SITEMAP.map(item => (
            <div 
              key={item.group} 
              className="space-y-4"
              itemScope 
              itemType="https://schema.org/SiteNavigationElement"
              data-ai-directory-node="true"
              data-group-focus={item.group}
            >
              <h4 itemProp="name" className="text-xs font-sans font-extrabold uppercase tracking-wider text-slate-400">{item.group}</h4>
              <ul className="space-y-2 text-slate-600">
                {item.links.map(link => (
                  <li 
                    key={link.id} 
                    className="text-xs font-semibold hover:text-blue-600 hover:translate-x-1 cursor-pointer transition-all text-left"
                    data-relevance="high"
                    data-node-id={link.id}
                    onClick={() => {
                        setSelectedPageId(link.id);
                        setView('page');
                        window.scrollTo(0, 0);
                    }}
                  >
                    <span>{link.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Multi-Format Sitemap Node */}
          <div 
            className="space-y-4"
            itemScope 
            itemType="https://schema.org/SiteNavigationElement"
          >
            <h4 itemProp="name" className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-500 text-left">Sitemap Indexes</h4>
            <p className="text-[11px] font-normal text-slate-450 leading-relaxed font-sans text-left text-slate-500">
              Access canonical sitemap representations curated in compliant machine formats.
            </p>
            <ul className="space-y-2.5 font-sans text-xs">
              <li>
                <button 
                  onClick={() => { setView('sitemap'); setSitemapFormat('visual'); window.scrollTo(0,0); }}
                  className="hover:text-blue-600 text-slate-600 hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer text-left w-full font-semibold"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>[HTML] Visual Map</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('sitemap'); setSitemapFormat('xml'); window.scrollTo(0,0); }}
                  className="hover:text-blue-600 text-slate-600 hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer text-left w-full font-semibold"
                >
                  <Code className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>[XML] Engine Feed</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('sitemap'); setSitemapFormat('json'); window.scrollTo(0,0); }}
                  className="hover:text-blue-600 text-slate-600 hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer text-left w-full font-semibold"
                >
                  <Binary className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>[JSON] Graph Schema</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('sitemap'); setSitemapFormat('txt'); window.scrollTo(0,0); }}
                  className="hover:text-blue-600 text-slate-600 hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer text-left w-full font-semibold"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>[TXT] Clean URIs</span>
                </button>
              </li>
            </ul>
          </div>
 
          {/* Portfolio & Peer Brand Directory Backlink Node */}
          <div 
            className="space-y-4 text-left"
            itemScope 
            itemType="https://schema.org/SiteNavigationElement"
          >
            <h4 itemProp="name" className="text-xs font-sans font-extrabold uppercase tracking-wider text-slate-400">Domains Portfolio</h4>
            <p className="text-[11px] font-normal text-slate-500 leading-relaxed font-sans">
              Explore our comprehensive network of premium partner brand domains and high-authority digital namespaces available for strategic enterprise alignment.
            </p>
            <button 
              onClick={() => { setView('portfolio'); window.scrollTo(0,0); }}
              className="px-4 py-2 bg-slate-900 text-white hover:bg-blue-600 font-sans font-bold text-[10px] uppercase cursor-pointer transition-all rounded-lg inline-flex items-center gap-1 shadow-sm active:scale-[0.98]"
            >
              <span>Explore Portfolio</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CANONICAL ACADEMIC & REGISTER CLASSIFICATION INFORMATION */}
        <section 
          itemScope 
          itemType="https://schema.org/AboutPage"
          className="p-6 md:p-8 border border-slate-200 bg-slate-50/30 font-sans text-xs space-y-4 rounded-2xl text-left"
          data-robots="index,follow"
        >
          <div className="flex items-center gap-2 border-b border-slate-150 pb-3 text-slate-800 font-bold">
            <Atom className="w-5 h-5 text-blue-500" />
            <h4 className="text-xs tracking-wider uppercase">Domain Registration & Academic Classification Metrics</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-relaxed text-slate-600">
            <div className="space-y-3">
              <p itemProp="description" className="text-slate-500 text-[11px]">
                This registry node operates as both an active academic catalog and the primary landing page mapping high-value digital real estate. It provides authoritative guidance for researchers, system engineers, and technology buyers who seek premium dot-com assets.
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <div>• Asset Extensions: <span className="text-slate-800 font-semibold">.com (Primary)</span></div>
                <div>• Industry Tag: <span className="text-slate-800 font-semibold">Quantum Information Science</span></div>
                <div>• Verified Host: <span className="text-slate-800 font-semibold">GoDaddy Portfolio</span></div>
                <div>• Transfer Eligibility: <span className="text-slate-800 font-semibold">Instant Escrow Lock</span></div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-500">
              <h5 className="font-bold text-[10px] uppercase text-blue-600 tracking-wider">Semantic Relationship Note</h5>
              <p className="text-[11px] leading-relaxed text-justify">
                By maintaining detailed references to Fock Space definitions, creation-annihilation mechanics, and bosonic quantum states, this portal fosters clean contextual links. It complies fully with SEO best-practices to ensure organic discoverability across search indices.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-semibold text-slate-400 pt-4">
          <div className="space-y-1.5 text-left">
            <span className="hover:text-blue-600 transition-colors cursor-default text-slate-500">© 2026 FockState.com</span>
            <div className="text-xs transition-opacity">
              <button 
                onClick={() => { setView('feelize'); window.scrollTo(0, 0); }}
                className="hover:text-blue-600 transition-all underline decoration-1 text-xs text-slate-400 cursor-pointer bg-transparent border-none p-0 inline-block font-sans font-semibold"
              >
                WEBSITE BY FEELIZE
              </button>
            </div>
            <p className="text-[10px] text-slate-400">Standard registry classification number: 2190-FOCKSTATE-COM</p>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <Atom className="w-6 h-6 hover:text-blue-500 transition-all cursor-pointer" />
            <Database className="w-6 h-6 hover:text-indigo-500 transition-all cursor-pointer" />
            <Search className="w-6 h-6 hover:text-sky-500 transition-all cursor-pointer" />
            <Binary className="w-6 h-6 hover:text-emerald-500 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Hidden SEO Cloud for Spiders */}
        <div className="hidden sr-only" aria-hidden="true">
          <h3>Keywords for FOCKSTATE.COM</h3>
          {FOCK_STATE_KEYWORDS.map((k, i) => <span key={`hidden-${k}-${i}`}>{k}, </span>)}
          <p>This domain fockstate.com is a premium asset for quantum mechanics, photon statistics, and hilbert space analysis. Buy fockstate.com today.</p>
        </div>
      </footer>
    </div>
  );
}
