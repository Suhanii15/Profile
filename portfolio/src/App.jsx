import { useEffect, useRef, useState } from 'react'
import Photo from "./assets/Photo.jpeg"

/* ── data ─────────────────────────────────────────────── */
const NAV = ['About', 'Skills', 'Projects', 'Achievements', 'Contact']

const SKILLS = [
  { icon: '⚡', cat: 'Frontend',    items: ['React.js', 'Tailwind CSS', 'HTML5 / CSS3', 'Leaflet.js'] },
  { icon: '🛠', cat: 'Backend',     items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO'] },
  { icon: '🗄', cat: 'Databases',   items: ['MongoDB', 'Mongoose', 'MySQL'] },
  { icon: '🤖', cat: 'AI & Auth',   items: ['Google Gemini API', 'OAuth 2.0', 'JWT', 'AssemblyAI'] },
  { icon: '🔧', cat: 'Tools',       items: ['Git & GitHub', 'Postman', 'Figma', 'VS Code'] },
  { icon: '🧠', cat: 'Core CS',     items: ['DSA', 'OOPs', 'DBMS', 'OS', 'Statistics'] },
]

const PROJECTS = [
  {
    name: 'SmartTravel',
    sub: 'AI-Powered Trip Planning Platform',
    badge: 'FEATURED',
    badgeColor: 'var(--accent)',
    desc: 'A full-stack MERN travel planning application where Gemini AI generates complete day-wise itineraries and budget breakdowns. Features real-time collaboration, interactive maps, and persistent budget tracking.',
    points: [
      'Integrated Google Gemini 2.0 Flash API with structured JSON schema to auto-generate itineraries and budgets across 15+ REST endpoints',
      'Engineered role-based collaboration with JWT + Google OAuth 2.0, in-app notifications via node-cron, and admin/user access control',
      'Built Leaflet.js + OpenStreetMap geocoding for interactive activity maps; persistent per-category budget tracker with MongoDB',
      'Designed trip lifecycle (Draft → Finalized → Completed) with exponential backoff retry and structured error handling',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Gemini API', 'OAuth 2.0', 'Leaflet.js', 'JWT', 'Tailwind'],
    link: 'https://github.com/Suhanii15/Smart-Travel.git',
  },
  {
    name: 'CoCode',
    sub: 'Real-Time Collaborative Code Editor',
    badge: '🏆 1ST — HackIIITV',
    badgeColor: 'var(--accent2)',
    desc: 'Collaborative coding platform for 4 simultaneous users with sub-second WebSocket sync. Won first place at HackIIITV Web Development Track.',
    points: [
      'Real-time sync via Socket.IO with Monaco Editor — syntax highlighting, multi-language support, auto-formatting',
      'AI debugging via Gemini API; room-based session architecture with persistent code state across reconnects',
    ],
    tech: ['React.js', 'Socket.IO', 'Monaco Editor', 'Node.js', 'Gemini API', 'MongoDB'],
    link: 'https://github.com/erandesamadhan2003/HackIIITV.git',
  },
  {
    name: 'Lecturely',
    sub: 'AI Lecture Summarization Platform',
    badge: null,
    desc: 'Converts academic lecture recordings into structured chapter-wise notes using AI speech-to-text — reducing manual note-taking by ~60%.',
    points: [
      'AssemblyAI transcription and summarization pipelines extracting key concepts from lecture audio automatically',
      'Editable chapter-based notes interface with personalized content organization for faster revision',
    ],
    tech: ['React.js', 'Node.js', 'AssemblyAI', 'MongoDB', 'Express.js'],
    link: 'https://github.com/Suhanii15/Lecturely.git',
  },
]

const ACHIEVEMENTS = [
  { num: '1st', label: 'HackIIITV Winner', desc: 'Won first place in Web Development Track building CoCode — competing against 30+ teams.' },
  { num: '200+', label: 'DSA Problems', desc: 'Solved on LeetCode across arrays, graphs, DP, and trees.' },
  { num: '3+', label: 'Projects Shipped', desc: 'Production-grade full-stack apps with AI integration as a 2nd-year student.' },
  { num: '2', label: 'Club Roles', desc: 'Core member of Dance & Drama clubs managing teams of 15+ for 500+ attendees.' },
]

/* ── Hooks ────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = NAV.map(n => document.getElementById(n.toLowerCase()))
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 160) setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { scrolled, active }
}

/* ── Components ───────────────────────────────────────── */

function Nav({ scrolled, active }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        padding: '0 48px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        background: scrolled
          ? 'rgba(255,255,255,0.85)'
          : 'transparent',

        backdropFilter: scrolled ? 'blur(20px)' : 'none',

        borderBottom: scrolled
          ? '1px solid var(--border)'
          : '1px solid transparent',

        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    fontWeight: 900,
    background:
      'linear-gradient(135deg, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  Suhani Kabra
</div>

      <div style={{ display: 'flex', gap: 8 }}>
        {NAV.map((n) => (
          <a
            key={n}
            href={`#${n.toLowerCase()}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.08em',

              color:
                active === n.toLowerCase()
                  ? 'var(--accent)'
                  : 'var(--muted)',

              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 100,

              background:
                active === n.toLowerCase()
                  ? 'rgba(37,99,235,0.08)'
                  : 'transparent',

              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (active !== n.toLowerCase())
                e.target.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              if (active !== n.toLowerCase())
                e.target.style.color = 'var(--muted)'
            }}
          >
            {n}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const [typed, setTyped] = useState('')
  const roles = ['Full Stack Developer', 'AI Integrations Builder', 'MERN Stack Engineer', 'Hackathon Winner']
  const [ri, setRi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = roles[ri]
    let timeout
    if (!deleting && typed.length < target.length) {
      timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 70)
    } else if (!deleting && typed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 35)
    } else if (deleting && typed.length === 0) {
      setDeleting(false)
      setRi((ri + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [typed, deleting, ri])

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0 48px' }}>

      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 68%)',
        animation: 'orb-move 18s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '15%',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,184,109,0.09) 0%, transparent 68%)',
        animation: 'orb-move2 14s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '55%',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 68%)',
        animation: 'orb-move 22s ease-in-out infinite reverse', pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: 'var(--accent)', letterSpacing: '0.18em', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 14,
          animation: 'fadeUp 0.7s 0.1s both',
        }}>
          <div style={{ width: 36, height: 1, background: 'var(--accent)' }} />
          CS @ IIIT VADODARA · 2024–2028
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(60px, 9vw, 108px)',
          fontWeight: 900, lineHeight: 0.92,
          letterSpacing: '-3px', marginBottom: 28,
          animation: 'fadeUp 0.7s 0.25s both',
        }}>
          Suhani<br />
          <span style={{
            background: 'linear-gradient(135deg, #e8b86d 0%, #c084fc 50%, #60a5fa 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift 6s ease infinite',
          }}>Kabra</span>
        </h1>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18, color: 'var(--muted)',
          marginBottom: 20, height: 32, display: 'flex', alignItems: 'center', gap: 6,
          animation: 'fadeUp 0.7s 0.4s both',
        }}>
          <span style={{ color: 'var(--accent2)' }}>&gt;</span>
          <span style={{ color: 'var(--text)' }}>{typed}</span>
          <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
        </div>

        <p style={{
          fontSize: 17, color: 'var(--muted)', maxWidth: 520, lineHeight: 1.75,
          marginBottom: 48, animation: 'fadeUp 0.7s 0.55s both',
        }}>
          Building AI-powered web applications that solve real problems. MERN stack developer with a knack for turning ideas into shipped products.
        </p>

        <div style={{ display: 'flex', gap: 14, animation: 'fadeUp 0.7s 0.7s both' }}>
          <a href="#projects" style={{
            padding: '13px 32px', borderRadius: 6,
            background: 'linear-gradient(135deg, #e8b86d, #c084fc)',
            color: '#0d1117', fontWeight: 700, fontSize: 14,
            fontFamily: "'Outfit', sans-serif", textDecoration: 'none',
            letterSpacing: '0.02em', display: 'inline-block',
            boxShadow: '0 4px 24px rgba(232,184,109,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 32px rgba(232,184,109,0.35)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 24px rgba(232,184,109,0.25)' }}
          >View Projects</a>
          <a href="mailto:suhanikabra931@gmail.com" style={{
            padding: '13px 32px', borderRadius: 6,
            background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text)', fontWeight: 500, fontSize: 14,
            fontFamily: "'Outfit', sans-serif", textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'var(--text)'; e.target.style.transform = 'translateY(0)' }}
          >Get in Touch</a>
        </div>
      </div>
<div style={{
  position: 'absolute',
  top: '42%',                         
  right: '15%',                      
  transform: 'translateY(-50%)', 
  width: 'clamp(220px, 22vw, 320px)',  
  height: 'clamp(220px, 22vw, 320px)', 
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid rgba(255,255,255,0.05)',
  boxShadow: '0 0 40px rgba(192,132,252,0.15)',
  zIndex: 3,                     
  pointerEvents: 'none'          
}}>
  <img 
    src={Photo} 
    alt="Suhani Kabra" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  />
</div>

      {/* Floating stats */}
      <div style={{
        position: 'absolute', right: 48, bottom: 100,
        display: 'flex', flexDirection: 'column', gap: 28,
        animation: 'fadeUp 0.7s 0.9s both',
      }}>
        {[['1st', 'HACKATHON'], ['200+', 'DSA Questions SOLVED'], ].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900,
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{n}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 40, left: 48,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: 'var(--muted)', letterSpacing: '0.12em',
        display: 'flex', alignItems: 'center', gap: 12,
        animation: 'fadeIn 1s 1.4s both',
      }}>
        <div style={{
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
        
      </div>
    </section>
  )
}

function SectionHeader({ num, title }) {
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 64 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>{num}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,50px)', fontWeight: 900, letterSpacing: '-1.5px' }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(255,255,255,0.08), transparent)' }} />
    </div>
  )
}

function About() {
  return (
    <section id="about" style={{ padding: '120px 48px', background: 'var(--bg)' }}>
      <SectionHeader num="01" title="About Me" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
        <div className="reveal-left">
          {[
            <>I'm a <strong style={{ color: 'var(--text)' }}>second-year Computer Science student</strong> at IIIT Vadodara with a deep interest in building full-stack applications that actually solve problems.</>,
            <>I specialize in the <strong style={{ color: 'var(--text)' }}>MERN stack</strong> and love integrating AI APIs to create smarter, more personalized experiences — from real-time collaboration tools to AI-powered trip planners.</>,
            <>Outside of code, I'm a core member of the <strong style={{ color: 'var(--text)' }}>Dance and Drama clubs</strong> at IIIT Vadodara, and I actively compete in hackathons and competitive programming.</>,
          ].map((txt, i) => (
            <p key={i} style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18 }}>{txt}</p>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Gemini API', 'Socket.IO', 'JWT Auth', 'Tailwind CSS', 'REST APIs', 'Git'].map(t => (
              <span key={t} style={{
                padding: '5px 14px', borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)',
                transition: 'all 0.2s', cursor: 'default',
              }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; e.target.style.background = 'rgba(232,184,109,0.07)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent' }}
              >{t}</span>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Education card */}
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '28px 32px',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: 20 }}>// EDUCATION</div>
            {[
              { school: 'IIIT Vadodara', degree: 'B.Tech — CSE · CPI: 7.37', year: '2024 – 2028' },
              { school: 'Tak Shiksha Niketan, Ajmer', degree: 'Senior Secondary (XII)', year: '2023' },
              { school: 'MSS Public School, Kishangarh', degree: 'Secondary (X)', year: '2021' },
            ].map((e, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{e.school}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>{e.degree}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent2)' }}>{e.year}</div>
              </div>
            ))}
          </div>

          {/* Currently card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(232,184,109,0.06), rgba(192,132,252,0.06))',
            border: '1px solid rgba(232,184,109,0.15)',
            borderRadius: 16, padding: '20px 28px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 3px rgba(232,184,109,0.2)', animation: 'pulse-ring 2s ease-out infinite', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>CURRENTLY</div>
              <div style={{ fontSize: 14, color: 'var(--text)' }}>Open to internships & collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 48px', background: 'var(--bg2)' }}>
      <SectionHeader num="02" title="Skills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {SKILLS.map((s, i) => (
          <div key={s.cat} className="reveal-scale" data-delay={i * 80}
            style={{
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '28px 28px',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              cursor: 'default', position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.borderColor = 'rgba(232,184,109,0.25)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(232,184,109,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 14 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>{s.cat}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', lineHeight: 2 }}>
              {s.items.join('\n').split('\n').map((item, j) => (
                <div key={j}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" style={{ padding: '120px 48px', background: 'var(--bg)' }}>
      <SectionHeader num="03" title="Projects" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.name} className="reveal" data-delay={i * 100}
            style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '40px 44px',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              position: 'relative', overflow: 'hidden', cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(232,184,109,0.2)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
              background: `linear-gradient(to bottom, ${p.badgeColor || 'var(--accent)'}, transparent)`,
              borderRadius: '16px 0 0 16px',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 26, letterSpacing: '-0.5px', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}>{p.sub}</div>
              </div>
              {p.badge && (
                <span style={{
                  padding: '4px 12px', borderRadius: 100,
                  border: `1px solid ${p.badgeColor}40`,
                  background: `${p.badgeColor}12`,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: p.badgeColor,
                  letterSpacing: '0.08em', whiteSpace: 'nowrap',
                }}>{p.badge}</span>
              )}
            </div>

            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 18, maxWidth: 720 }}>{p.desc}</p>

            <ul style={{ listStyle: 'none', marginBottom: 22 }}>
              {p.points.map((pt, j) => (
                <li key={j} style={{
                  fontSize: 13, color: 'var(--muted)', padding: '5px 0 5px 20px',
                  position: 'relative', lineHeight: 1.65,
                }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontSize: 12 }}>→</span>
                  {pt}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {p.tech.map(t => (
                <span key={t} style={{
                  padding: '3px 10px',
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: 'var(--muted)',
                }}>{t}</span>
              ))}
            </div>

            <a href={p.link} target="_blank" rel="noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: 'var(--accent)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'gap 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >View on GitHub →</a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements" style={{ padding: '120px 48px', background: 'var(--bg2)' }}>
      <SectionHeader num="04" title="Achievements" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={a.label} className="reveal-scale" data-delay={i * 80}
            style={{
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '36px 36px',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(192,132,252,0.25)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(192,132,252,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 54, fontWeight: 900,
              lineHeight: 1, marginBottom: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{a.num}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{a.label}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{a.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" style={{ padding: '140px 48px', background: 'var(--bg)', textAlign: 'center' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div className="reveal" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: 20 }}>05 / CONTACT</div>
        <h2 className="reveal" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 900, letterSpacing: '-2px',
          lineHeight: 1, marginBottom: 24,
        }}>
          Let's Build<br />
          <span style={{
            background: 'linear-gradient(135deg, #e8b86d, #c084fc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Something</span>
        </h2>
        <p className="reveal" style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 52 }}>
          Open to internships, freelance work, and exciting collaborations. If you want to build something together or just say hi — I'd love to hear from you.
        </p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: '✉ Email', href: 'mailto:suhanikabra931@gmail.com' },
            { label: 'in LinkedIn', href: 'https://www.linkedin.com/in/suhani-kabra-aab411315/' },
            { label: '⌥ GitHub', href: 'https://github.com/Suhanii15' },
            { label: '⌗ LeetCode', href: 'https://leetcode.com/u/Suhanii_15/' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
              padding: '11px 22px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; e.target.style.background = 'rgba(232,184,109,0.06)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; e.target.style.transform = 'translateY(0)' }}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '20px 48px', borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}></p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}></p>
    </footer>
  )
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  const { scrolled, active } = useNav()
  useReveal()

  return (
    <>
      <Nav scrolled={scrolled} active={active} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  )
}