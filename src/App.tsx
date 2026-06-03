import { useState, FormEvent } from 'react';
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
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
      { name: "Abstract Number States", id: "abstract-number-states", content: "Analysis of N-particle Fock states and their representation in multi-mode Hilbert spaces. Our database catalogs eigenvalue distributions for diverse bosonic field configurations and occupation probabilities." },
      { name: "Operator Algebra", id: "operator-algebra", content: "Deep dive into Weyl algebra, commutation relations [a, a†] = 1, and the construction of ladder operators for field quantization and canonical ensemble analysis." },
      { name: "Hilbert Mapping", id: "hilbert-mapping", content: "Topological mapping of infinite-dimensional spaces onto discrete computational nodes for quantum state simulation and high-fidelity vector alignment." },
      { name: "Photon Statistics", id: "photon-statistics", content: "Statistical analysis of second-order coherence g(2)(τ) and photon counting distributions in non-classical light fields and squeezed states." }
    ] 
  },
  { 
    group: "Technical Data", 
    links: [
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

export default function App() {
  const [view, setView] = useState<'home' | 'archive' | 'page'>('home');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifyValue, setVerifyValue] = useState('');
  const [error, setError] = useState('');
  const [code] = useState(Math.floor(1000 + Math.random() * 9000).toString());

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

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#141414] bg-[#E4E3E0] selection:bg-[#141414] selection:text-[#E4E3E0] relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-cyan-500 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-yellow-400 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Universal Header */}
      <header className="border-b-4 border-[#141414] p-8 flex justify-between items-center bg-[#E4E3E0]/80 backdrop-blur-md z-50 sticky top-0">
        <div 
          className="flex items-center gap-6 cursor-pointer group"
          onClick={() => { setView('home'); setActiveDoc(null); setSelectedPageId(null); }}
        >
          <div className="relative flex items-center justify-center font-mono font-bold text-3xl transition-all group-hover:scale-110">
             <span className="text-[#141414] opacity-30">|</span>
             <span className="px-1 text-[#ff00ff] group-hover:text-cyan-500 transition-colors">n</span>
             <span className="text-[#141414] opacity-30">⟩</span>
             {/* Small Particle Grid decor */}
             <div className="absolute -top-1 -right-4 flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff00ff] animate-pulse" style={{ animationDelay: '0.5s' }} />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold leading-none">
            FockState.com
          </h1>
        </div>
        <button 
          onClick={() => { setView('home'); setActiveDoc(null); setSelectedPageId(null); window.scrollTo(0,0); }}
          className="text-xl font-mono font-bold text-emerald-800 hover:text-[#ff00ff] transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          [ For Sale ]
        </button>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          /* HOME PAGE - EXTREMELY DIRECT */
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col items-center justify-center text-center px-6 py-24 md:py-40 max-w-6xl mx-auto space-y-24 relative z-10"
          >
            <div className="space-y-10 relative">
              <h2 className="text-7xl md:text-9xl font-mono font-bold leading-tight relative">
                This Domain<br />
                <span className="text-[#ff00ff]">is for sale</span>
              </h2>
              <p className="text-2xl md:text-4xl font-normal max-w-4xl mx-auto opacity-70 leading-relaxed">
                fockstate.com — The definitive high-authority namespace for photon counting, bosonic research, and quantum field analysis.
              </p>
            </div>

            <div className="w-full">
              <a 
                href="https://www.godaddy.com/domainsearch/find?domainToCheck=fockstate.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full p-12 md:p-16 border-8 border-[#141414] bg-[#141414] text-[#E4E3E0] hover:border-[#ff00ff] transition-all text-center group relative overflow-hidden active:scale-[0.98]"
              >
                <div className="absolute inset-0 quantum-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <h3 className="text-4xl md:text-6xl font-mono font-bold transition-all">Acquire on GoDaddy</h3>
                  <div className="text-xl md:text-2xl font-medium opacity-70 flex items-center gap-3 group-hover:text-white transition-colors">
                    Secure Instant Transfer <ExternalLink className="w-6 h-6 border-2 border-current p-1" />
                  </div>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
              <div className="w-full p-12 border-4 border-[#141414] bg-white shadow-[12px_12px_0px_#ff00ff]">
                <h3 className="text-3xl font-mono font-bold mb-10 text-left border-b-4 border-[#141414] pb-4 flex items-center justify-between">
                  Reveal contact email
                  <ShieldCheck className="w-8 h-8 text-[#ff00ff]" />
                </h3>
                
                {!isVerified ? (
                  <div className="space-y-8">
                      {!showVerification ? (
                        <button 
                          onClick={() => setShowVerification(true)}
                          className="w-full py-6 bg-[#141414] text-[#E4E3E0] text-3xl font-mono font-bold border-4 border-[#141414] hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all shadow-[6px_6px_0px_#141414] active:shadow-none translate-y-[-2px]"
                        >
                          Click to reveal
                        </button>
                      ) : (
                        <form onSubmit={handleVerify} className="space-y-8 text-left">
                          <div className="text-3xl font-mono font-bold bg-[#141414] text-[#E4E3E0] p-6 flex justify-between">
                            CODE: <span className="text-yellow-400">{code}</span>
                          </div>
                          <input 
                            type="text" 
                            autoFocus
                            placeholder="Enter code here"
                            value={verifyValue}
                            onChange={(e) => { setVerifyValue(e.target.value); setError(''); }}
                            className="w-full bg-white border-4 border-[#141414] px-6 py-4 text-3xl font-bold outline-none placeholder:opacity-20 focus:border-cyan-500"
                          />
                          {error && <p className="text-2xl text-red-600 font-bold">{error}</p>}
                          <button type="submit" className="w-full py-6 bg-[#141414] text-[#E4E3E0] text-3xl font-bold hover:bg-emerald-600 transition-colors">
                            Submit
                          </button>
                        </form>
                      )}
                  </div>
                ) : (
                  <div className="p-10 bg-cyan-50 border-4 border-cyan-500 text-left">
                    <p className="text-xl font-bold opacity-40 mb-4 text-cyan-800">Contact:</p>
                    <a href="mailto:info@fockstate.com" className="text-3xl md:text-5xl font-mono font-bold break-all hover:text-cyan-600 transition-colors underline">
                      info@fockstate.com
                    </a>
                  </div>
                )}
              </div>

              <div className="p-12 border-4 border-[#141414] bg-[#DCDAD5] text-left space-y-8 shadow-[12px_12px_0px_#00ffff]">
                 <h3 className="text-3xl font-mono font-bold border-b-4 border-[#141414] pb-4 flex items-center justify-between">
                    Registry Metrics
                    <Activity className="w-8 h-8 text-[#141414] animate-pulse" />
                 </h3>
                 <div className="space-y-4">
                    <div className="flex justify-between font-bold text-lg">
                       <span>Semantic Density</span>
                       <span className="text-[#ff00ff]">Optimal Cluster</span>
                    </div>
                    <div className="h-6 w-full bg-[#141414]/10 border-2 border-[#141414] overflow-hidden">
                       <div className="h-full quantum-gradient w-[94%]" />
                    </div>
                 </div>
                 <div className="space-y-4 text-xs font-bold">
                    <div className="flex justify-between border-b border-[#141414]/10 pb-1 text-cyan-800 uppercase">
                       <span>Authority Range</span>
                       <span>Verified</span>
                    </div>
                    {FOCK_STATE_KEYWORDS.slice(20, 24).map((k, i) => (
                      <div key={k} className="flex gap-2 border-b border-[#141414]/10 pb-1 items-center uppercase">
                        <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-[#ff00ff]' : 'bg-cyan-500'}`} />
                        {k}
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="pt-20">
              <button 
                onClick={() => setView('archive')}
                className="text-3xl font-mono font-bold opacity-40 hover:opacity-100 hover:text-[#ff00ff] transition-all border-b-4 border-current"
              >
                Explore technical nodes
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
            <aside className="md:col-span-4 border-b md:border-b-0 md:border-r-4 border-[#141414] p-10 bg-[#DCDAD5]">
              <div className="sticky top-40 space-y-12">
                <div>
                  <h3 className="text-xl font-mono font-bold border-b-4 border-[#141414] pb-3 mb-10 flex items-center gap-3">
                    DOCUMENTS
                  </h3>
                  <div className="space-y-6">
                    {ARCHIVE_DOCS.map((doc, i) => (
                      <button
                        key={doc.id}
                        onClick={() => setActiveDoc(doc.id)}
                        className={`w-full p-6 border-4 border-[#141414] text-left transition-all flex items-center justify-between group
                          ${activeDoc === doc.id ? 'bg-[#141414] text-[#E4E3E0] shadow-none translate-x-[4px] translate-y-[4px]' : 'bg-white hover:bg-neutral-50 shadow-[6px_6px_0px_#141414] active:shadow-none'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-[#ff00ff]' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-yellow-400'} shadow-[2px_2px_0px_#141414]`} />
                          <h4 className="text-2xl font-mono font-bold leading-tight">{doc.title}</h4>
                        </div>
                        <ChevronRight className={`w-8 h-8 transition-transform ${activeDoc === doc.id ? 'rotate-90' : 'opacity-20 group-hover:opacity-100'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section className="md:col-span-8 p-12 md:p-32 bg-white/30 space-y-24">
              <AnimatePresence mode="wait">
                {activeDoc ? (
                  <motion.div 
                    key={activeDoc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-16 max-w-4xl"
                  >
                    <h2 className="text-5xl md:text-7xl font-mono font-bold leading-tight">
                      {ARCHIVE_DOCS.find(d => d.id === activeDoc)?.title}
                    </h2>
                    
                    {/* Document Parameters */}
                    <div className="grid grid-cols-3 gap-6 border-4 border-[#141414] p-6 bg-white/50 font-mono font-semibold text-sm">
                      {Object.entries(ARCHIVE_DOCS.find(d => d.id === activeDoc)?.params || {}).map(([key, val]) => (
                        <div key={key}>
                          <span className="opacity-40 block mb-1">{key}:</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-2xl md:text-3xl font-normal leading-relaxed text-justify border-l-[12px] border-[#ff00ff] pl-12 py-10 bg-white/40 shadow-[12px_12px_0px_rgba(255,0,255,0.05)]">
                      {ARCHIVE_DOCS.find(d => d.id === activeDoc)?.content}
                    </div>

                    <div className="pt-10 border-t-4 border-[#141414] opacity-80">
                       <p className="text-sm font-bold tracking-normal flex items-center gap-2 text-cyan-700">
                         <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                         Metadata Hash: 0x<span className="text-[#ff00ff] font-mono">{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                       </p>
                       <p className="text-xs underline opacity-40">Cite as: FOCKSTATE (2026). Technical Node {activeDoc}. DOI: 10.1038/domain-parking-fock</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="no-doc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20"
                  >
                    <p className="text-3xl font-bold">Select a document to begin</p>
                  </motion.div>
                ) }
              </AnimatePresence>

              {/* Natural Content Modules for SEO */}
              <div className="pt-60 space-y-32 pb-40">
                {/* Module 1: Research Registry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8 p-10 border-4 border-[#141414] bg-white">
                    <h4 className="text-2xl font-mono font-bold border-b-4 border-[#141414] pb-4">Global Node Index</h4>
                    <p className="text-lg font-normal opacity-60 leading-relaxed">
                      Cross-referenced metadata for hilbert space analytical clusters. Each node represents a distinct state vector configuration within the fockstate.com namespace.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                      {FOCK_STATE_KEYWORDS.slice(0, 12).map(k => (
                        <div key={k} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-600" />
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8 p-10 border-4 border-[#141414] bg-[#DCDAD5]">
                    <h4 className="text-2xl font-mono font-bold border-b-4 border-[#141414] pb-4">Sync Logs</h4>
                    <div className="space-y-3 text-xs font-mono">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="flex justify-between border-b border-[#141414]/10 pb-2">
                            <span>{FOCK_STATE_KEYWORDS[Math.floor(Math.random() * FOCK_STATE_KEYWORDS.length)]}</span>
                            <span className="text-emerald-700 font-bold">STATUS_OK</span>
                         </div>
                       ))}
                    </div>
                    <p className="text-xs font-normal opacity-40">Real-time telemetry from fockstate propagation nodes.</p>
                  </div>
                </div>

                {/* Module 2: Field Theory References */}
                <div className="space-y-12">
                   <h3 className="text-2xl font-bold border-l-[12px] border-[#141414] pl-8">State Reference Matrix</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {DATA_CATEGORIES.map(cat => (
                        <div key={cat.title} className="space-y-4">
                           <h5 className="text-[10px] font-bold opacity-30">{cat.title}</h5>
                           <ul className="text-[11px] font-normal space-y-2 leading-tight">
                              {cat.keywords.slice(0, 5).map(k => (
                                <li key={k} className="hover:text-emerald-700 cursor-default">{k}</li>
                              ))}
                           </ul>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Module 3: System Status Stream */}
                <div className="p-12 border-8 border-[#141414] border-double bg-[#141414] text-[#E4E3E0]">
                   <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                      <div className="flex-grow space-y-6">
                         <h4 className="text-3xl font-bold text-emerald-400">Data Flow Active</h4>
                         <p className="text-base font-normal opacity-70 leading-relaxed">
                            Fockstate.com acts as a primary relay for bosonic field quantization studies. All spectral densities and occupation numbers are verified against the canonical number state protocols.
                         </p>
                      </div>
                      <div className="w-full md:w-64 space-y-4 text-xs font-semibold">
                         <div className="flex justify-between border-b border-[#E4E3E0]/20 pb-2"><span>Latency:</span><span>1.4ms</span></div>
                         <div className="flex justify-between border-b border-[#E4E3E0]/20 pb-2"><span>Integrity:</span><span>99.9%</span></div>
                         <div className="flex justify-between border-b border-[#E4E3E0]/20 pb-2"><span>SEO Weight:</span><span>MAX</span></div>
                      </div>
                   </div>
                </div>
              </div>
            </section>
          </motion.main>
        ) : (
          /* DYNAMIC SITEMAP PAGE */
          <motion.main 
            key="page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-grow p-12 md:p-32 max-w-7xl mx-auto space-y-24"
          >
            <div className="space-y-12">
              <div className="flex items-center gap-6 text-2xl font-mono font-bold opacity-40">
                <span>{activePage?.group}</span>
                <ChevronRight className="w-6 h-6" />
                <span className="text-[#141414] opacity-100">Internal Node {activePage?.id.toUpperCase()}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-mono font-bold leading-tight">
                {activePage?.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-8 space-y-24">
                <div className="space-y-12">
                  <div className="text-3xl md:text-5xl font-bold leading-relaxed border-l-[16px] border-[#141414] pl-16 py-10 bg-white/40">
                    {activePage?.content}
                  </div>
                  <p className="text-2xl opacity-60 font-normal leading-relaxed">
                    This semantic node is optimized for high-authority indexing within the Fock State research cluster, bridging the gap between bosonic field quantization and terminal Hilbert space mapping.
                  </p>
                </div>

                <div className="p-12 border-4 border-[#141414] bg-white space-y-10">
                   <h3 className="text-3xl font-mono font-bold border-b-4 border-[#141414] pb-4">System Specifications</h3>
                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                      <div className="space-y-3">
                         <h5 className="text-sm font-bold opacity-30">Protocol</h5>
                         <p className="text-lg font-normal">{activePage?.id.replace('-', '_')}_BETA</p>
                      </div>
                      <div className="space-y-3">
                         <h5 className="text-sm font-bold opacity-30">Complexity</h5>
                         <p className="text-lg font-bold">O(N log N) Fock</p>
                      </div>
                      <div className="space-y-3">
                         <h5 className="text-sm font-bold opacity-30">Sync Status</h5>
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-lg font-bold text-emerald-800">ACTIVE</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Module: Semantic Data Cross-Reference */}
                <div className="space-y-10">
                    <h3 className="text-xl font-bold border-b-2 border-[#141414]/10 pb-4 flex items-center justify-between">
                      Related Research Parameters
                      <Layers className="w-6 h-6 text-cyan-600" />
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                       {FOCK_STATE_KEYWORDS.sort(() => 0.5 - Math.random()).slice(0, 18).map((k, i) => (
                        <div key={k} className={`p-4 border border-[#141414]/20 hover:border-[#141414] hover:bg-white transition-all cursor-default group relative overflow-hidden`}>
                           <div className={`absolute left-0 top-0 bottom-0 w-1 ${i % 3 === 0 ? 'bg-[#ff00ff]' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-yellow-400'} opacity-0 group-hover:opacity-100`} />
                           <span className="text-xs font-bold block opacity-30 mb-1 group-hover:text-cyan-800">State:</span>
                           <span className="text-sm font-normal group-hover:font-bold">{k}</span>
                        </div>
                      ))}
                    </div>
                </div>

                <div className="p-16 bg-[#141414] text-[#E4E3E0] space-y-10 font-sans">
                   <h4 className="text-3xl font-bold text-emerald-400">Mission Statement</h4>
                   <p className="text-lg font-normal opacity-80 leading-relaxed">
                      Fockstate.com is committed to providing a secure, canonical registry for the next generation of quantum researchers. By securing this namespace, you are participating in the evolution of bosonic research infrastructure.
                   </p>
                   <button 
                    onClick={() => { setView('home'); window.scrollTo(0,0); }}
                    className="px-8 py-4 bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors"
                   >
                     Acquire this namespace
                   </button>
                </div>
              </div>

              <aside className="md:col-span-4 space-y-12">
                 <div className="p-10 border-4 border-[#141414] bg-[#DCDAD5] shadow-[12px_12px_0px_#141414]">
                    <h4 className="text-lg font-bold mb-8 border-b-2 border-[#141414] pb-4">NODE METRICS</h4>
                    <div className="space-y-6">
                       {['Authority', 'Trust Flow', 'Semantic Rank', 'Bot Priority'].map(metric => (
                          <div key={metric} className="space-y-2">
                             <div className="flex justify-between text-sm font-bold">
                                <span>{metric}</span>
                                <span>{Math.floor(Math.random() * 20) + 80}%</span>
                             </div>
                             <div className="h-2 w-full bg-[#141414]/10">
                                <div className="h-full bg-[#141414]" style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-10 border-4 border-[#141414] bg-white space-y-8">
                    <h4 className="text-lg font-bold underline decoration-4 underline-offset-4">Internal Relay</h4>
                    <ul className="space-y-6">
                       {SITEMAP.flatMap(g => g.links).sort(() => 0.5 - Math.random()).slice(0, 5).map(l => (
                         <li 
                           key={l.id} 
                           className="text-sm font-normal uppercase cursor-pointer hover:text-emerald-700 flex items-center gap-2 group"
                           onClick={() => { setSelectedPageId(l.id); window.scrollTo(0, 0); }}
                         >
                           <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <span className="font-sans">{l.name}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </aside>
            </div>

            <div className="pt-40 opacity-5 text-sm font-black uppercase whitespace-pre-wrap leading-tight">
               {FOCK_STATE_KEYWORDS.join(' / ')}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Universal Footer */}
      <footer className="border-t-8 border-[#141414] bg-[#DCDAD5] p-12 md:p-24 space-y-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b-4 border-[#141414] pb-20">
          {SITEMAP.map(item => (
            <div key={item.group} className="space-y-6">
              <h4 className="text-xl font-bold underline decoration-4 underline-offset-8 mb-8">{item.group}</h4>
              <ul className="space-y-4">
                {item.links.map(link => (
                  <li 
                    key={link.id} 
                    className="text-lg font-normal opacity-60 hover:opacity-100 cursor-pointer hover:translate-x-2 transition-all"
                    onClick={() => {
                        setSelectedPageId(link.id);
                        setView('page');
                        window.scrollTo(0, 0);
                    }}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Peer Domain Network Backlinks column */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold underline decoration-4 underline-offset-8 mb-8 text-[#ff00ff]">Peer Network</h4>
            <ul className="space-y-4">
              {[
                "boobclub.com",
                "kataf.com",
                "jalh.com",
                "subhauler.com",
                "neaner.com",
                "linkwhore.com",
                "beamspread.com",
                "medizer.com",
                "omachines.com"
              ].map(domain => (
                <li key={domain}>
                  <a 
                    href={`https://${domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-lg font-normal opacity-60 hover:opacity-100 cursor-pointer hover:translate-x-2 hover:text-[#ff00ff] transition-all"
                  >
                    {domain} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-16 text-lg font-bold tracking-normal pt-8">
          <div className="space-y-2">
            <span className="hover:text-[#ff00ff] transition-colors cursor-default">© 2026 FockState.com</span>
            <p className="text-xs opacity-30">Global Domain Index: 0x9928AF-FOCK-STATE-QUANTUM-NAMESPACE</p>
          </div>
          <div className="flex items-center gap-12 text-[#141414] opacity-20">
            <Atom className="w-10 h-10 hover:text-[#ff00ff] hover:opacity-100 transition-all cursor-pointer" />
            <Database className="w-10 h-10 hover:text-cyan-500 hover:opacity-100 transition-all cursor-pointer" />
            <Search className="w-10 h-10 hover:text-yellow-500 hover:opacity-100 transition-all cursor-pointer" />
            <Binary className="w-10 h-10 hover:text-emerald-500 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Hidden SEO Cloud for Spiders */}
        <div className="hidden sr-only" aria-hidden="true">
          <h3>Keywords for FOCKSTATE.COM</h3>
          {FOCK_STATE_KEYWORDS.map(k => <span key={`hidden-${k}`}>{k}, </span>)}
          <p>This domain fockstate.com is a premium asset for quantum mechanics, photon statistics, and hilbert space analysis. Buy fockstate.com today.</p>
        </div>
      </footer>
    </div>
  );
}
