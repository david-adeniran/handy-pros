import { useState } from "react";
import "./App.css";

// SVG Icons
const Icons = {
  Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Gem: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/></svg>,
  Mic: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Music: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Video: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Radio: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Wrench: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  MousePointer: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

// ─── NAVBAR ───────────────────────────────────────────────
function Navbar({ activePage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["home", "about", "services", "portfolio", "contact"];

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <img src="/images/Logo.png" alt="Handy Pros Studio" />
        </div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <a
                className={activePage === l ? "active" : ""}
                onClick={() => setPage(l)}
              >
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <button className="btn-nav" onClick={() => setPage("book")}>
              Book a Session
            </button>
          </li>
        </ul>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l} onClick={() => { setPage(l); setMenuOpen(false); }}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
        <a className="btn-nav" onClick={() => { setPage("book"); setMenuOpen(false); }}>
          Book a Session
        </a>
      </div>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-logo">
          <img src="/images/Logo.png" alt="Handy Pros Studio" />
          <p>Empowering creators by providing accessible, professional-grade studio spaces where ideas can thrive.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/handypros.studio/" target="_blank" rel="noreferrer"><img src="/images/instagram.png" alt="Instagram" /></a>
            <a href="https://www.facebook.com/handypros.studio/" target="_blank" rel="noreferrer"><img src="/images/facebook.png" alt="Facebook" /></a>
            <a href="https://twitter.com/handyprosstudio"target="_blank" rel="noreferrer"><img src="/images/x.png" alt="X" /></a>
            <a href="https://youtube.com/@handyprosstudios?si=sQSDBN54BoYuticL" target="_blank" rel="noreferrer"><img src="/images/youtube.png" alt="YouTube" /></a>
            <a href="https://www.tiktok.com/@handypros.studio" target="_blank" rel="noreferrer"><img src="/images/tiktok.png" alt="TikTok" /></a>
            <a href="https://www.linkedin.com/company/handypros-studio" target="_blank" rel="noreferrer"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
            <a href="https://snapchat.com/t/n45ntPj4" target="_blank" rel="noreferrer"><img src="/images/snapchat.png" alt="Snapchat" /></a>
          </div> 
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            {["home","about","services","portfolio","contact"].map(l => (
              <li key={l}><a onClick={() => setPage(l)}>{l.charAt(0).toUpperCase()+l.slice(1)}</a></li>
            ))}
            <li><a onClick={() => setPage("book")}>Book a Session</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><Icons.Phone /> 07073405110</li>
            <li><Icons.Mail /> info@handypros.com</li>
          <li><Icons.MapPin /> Floor 8B, Sapetro Tower, <br /> 1 Adeola Odeku Street, Victoria Island, Lagos</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Subscribe to our Newsletter</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email Address" />
            <button>→</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© All Copyright 2026 by <a href="#">HandyPros Studio</a></p>
        <div className="footer-bottom-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────
function HomePage({ setPage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [partnerIndex, setPartnerIndex] = useState(0);

  const services = [
    { img: "recording.jpeg", icon: "ti-microphone", title: "Recording", desc: "Capture pristine sound and flawless instrumentals for music, voice-over, and podcasts." },
    { img: "rehearsalroom.png", icon: "ti-music", title: "Rehearsal Room", desc: "Get in sync with your band or practice your set in acoustically optimised spaces." },
    { img: "videoediting.png", icon: "ti-video", title: "Video Editing Bay", desc: "Edit, color, and start sharing visuals with access to top tools for YouTube, and content creators." },
  ];

  const partners = [
    "logo-pulse.png", "logo-spotify.png", "logo-iroko.png",
    "logo-mavin.png", "logo-trace.png", "logo-chocolatecity.png",
    "logo-netflix.png", "logo-applemusic.png", "logo-youtube.png",
  ];

  const isMobile = window.innerWidth <= 900;
  const itemsToShow = isMobile ? partners.length : 3;

  const testimonials = [
    { stars: "★★★★★", text: "I recorded my debut EP here and the experience was seamless. The sound engineers really knew their stuff and made me feel at home. The energy was just right.", name: "–Dami K.", role: "Afrobeat Artist" },
    { stars: "★★★★★", text: "Booked a session to shoot a promotional video. The gear, lighting setup, and editing team were top-notch. They brought my vision to life effortlessly.", name: "–Aisha Bello", role: "Brand Influencer" },
    { stars: "★★★★★", text: "The podcast suite was incredible. Clean sound, great equipment and the team was super helpful throughout the entire session.", name: "–Femi O.", role: "Podcast Host" },
  ];

  const promises = [
    "We deliver professional-grade equipment and production facilities to bring your creative visions to life.",
    "From booking to delivery, we value your time and ensure a smooth, punctual experience across all our services.",
    "Our experienced engineers, producers, and technicians are here to guide, support, and elevate your project at every stage.",
    "Your ideas and work stay protected. We prioritise your privacy and provide a secure, distraction-free environment.",
    "Whether it's a quick vocal take or a full video shoot, we adapt our space and support to accommodate your needs.",
  ];

  const tracks = [
    { num: 1, title: "Joeboy Vs. ODUMODUBLVCK (Body & Soul Podcast)", artist: "Joeboy - Body & Soul (Podcast)", duration: "47:23" },
    { num: 2, title: "S2: EP3 - A Doze of Foza", artist: "Osikoya Speaks", duration: "1:10:53" },
    { num: 3, title: "Episode 24: Detty December is coming!", artist: "I Moved Back Podcast", duration: "1:04:46" },
    { num: 4, title: "Episode 22: Lagos has been hell for us lately!", artist: "I Moved Back Podcast", duration: "50:52" },
  ];

  const faqs = [
    { q: "How do I book a session?", a: "You can easily book a session through our website by selecting your preferred service, date, and time. You'll receive a confirmation email once your booking is complete." },
    { q: "What are your payment options?", a: "We accept bank transfers, card payments, and popular mobile payment options. A deposit is required to confirm your booking." },
    { q: "Can I reschedule my appointment?", a: "Yes! You can reschedule up to 24 hours before your session at no extra charge. Contact us via email or phone to make changes." },
    { q: "What is your cancellation policy?", a: "Cancellations made 48+ hours in advance receive a full refund. Cancellations within 24 hours may forfeit the deposit." },
    { q: "What's included in the studio rental?", a: "All studio rentals include access to our equipment, an on-site engineer, and complimentary Wi-Fi. Additional add-ons can be arranged during booking." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" style={{ 
    background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/mic-bg.jpg') center/cover no-repeat`,
    padding: "60px 48px",
    borderRadius: "16px"
  }} />
        <div className="hero-content">
          <h1>Handy Pros Studio</h1>
          <p>Podcasting, Music, Video, and Rehearsals</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setPage("services")}>Our Rate</button>
            <button className="btn-outline" onClick={() => setPage("contact")}>Contact Us</button>
          </div>
        </div>
      </div>

     {/* VIDEO SECTION */}
<div className="section">
  <h2 className="section-title">The Studio Experience</h2>
  <div className="video-container" style={{display: "flex", justifyContent: "center"}}>
    <iframe 
      src="https://www.youtube.com/embed/xxBOP78F28o"
      width="60%"
      height="350px"
      allowFullScreen
      style={{ borderRadius: "12px", border: "none" }}
    />
  </div>
</div>
      

      {/* AUDIO LINKS */}
      <div className="section" style={{ paddingTop: "0", marginTop: "-60px" }}>
        <h2 className="section-title">Audio Links</h2>
        <div className="audio-player">
        <div className="audio-player-header">
  <div className="audio-left">
    <img src="/images/spotify-image.png" alt="Spotify cover" className="audio-cover" />
    <p className="audio-save">⊕ Save on Spotify</p>
  </div>
  <div className="audio-info">
    <h3>Recently Recorded at Handy Pros</h3>
    <div className="audio-bottom-row">
      <span className="audio-preview-tag">Preview</span>
      <div className="audio-controls">
        <span>⏮</span><span>⏭</span><span>•••</span>
        <button className="play-btn">▶</button>
      </div>
    </div>
  </div>
</div>
          <div className="track-list">
            {tracks.map((t) => (
              <div className="track-item" key={t.num}>
                <span className="track-num">{t.num}</span>
                <div className="track-info">
                  <strong>{t.title}</strong>
                  <span>{t.artist}</span>
                </div>
                <span className="track-duration">{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OUR SERVICES */}
      <div className="section" style={{ paddingTop: "0", marginTop: "-40px" }}>
        <h2 className="section-title" style={{ marginBottom: "20px"}}>Our Services</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <img src={`/images/${s.img}`} alt={s.title} />
              <div className="service-card-body">
                <h3><i className={`ti ${s.icon}`} style={{ marginRight: "8px" }}></i>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="btn-primary" onClick={() => setPage("book")}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATIVE JOURNEY CTA */}
      <div className="cta-banner" style={{ marginTop: "-80px", height: "300px" }}>
        <div className="cta-banner-bg" style={{ 
  background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/creative-journey.jpg') center no-repeat`,
  backgroundSize: "100% auto"
}}/>
        <div className="cta-banner-content">
          <h2>Your Creative Journey Starts Here</h2>
          <p>World-class spaces for music, podcasts, videos, and rehearsals — built to elevate your creativity.</p>
          <button className="btn-primary" onClick={() => setPage("book")}>Book a Session</button>
        </div>
      </div>

      {/* CLIENTS/PARTNERS */}
      <h2 className="section-title" style={{ marginTop: "40px", marginBottom: "20px" }}>Few of Our Clients/Partners</h2>
      <img src="/images/flick.png" alt="" style={{ width: "330px", maxWidth: "50%", display: "block", margin: "-28px auto 16px 47%" }} />
      <div className="partners-carousel" style={{ paddingTop: "20px" }}>
  <button className="carousel-btn" onClick={() => setPartnerIndex(Math.max(0, partnerIndex - itemsToShow))}>‹</button>
  <div className="partners-grid">
    {partners.slice(partnerIndex, partnerIndex + itemsToShow).map((p) => (
      <div className="partner-card" key={p}>
        <img src={`/images/${p}`} alt={p} />
      </div>
    ))}
  </div>
  <button className="carousel-btn" onClick={() => setPartnerIndex(Math.min(partners.length - itemsToShow, partnerIndex + itemsToShow))}>›</button>
</div>

      {/* TESTIMONIALS */}
      <div className="section" style={{ paddingTop: "100px" }}>
        <h2 className="section-title">What Our Clients Say</h2>
        <img src="/images/flick.png" alt="" style={{ width: "330px", maxWidth: "50%", display: "block", margin: "-50px auto 16px 42%" }} />
        <div className="testimonial-carousel">
          <button className="carousel-btn left" onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}>‹</button>
          <div className="testimonial-card" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="stars">{testimonials[activeTestimonial].stars}</div>
            <p>"{testimonials[activeTestimonial].text}"</p>
            <div className="testimonial-author">
              <strong>{testimonials[activeTestimonial].name}</strong>
              <span>{testimonials[activeTestimonial].role}</span>
            </div>
          </div>
          <button className="carousel-btn right" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}>›</button>
        </div>
      </div>

      {/* OUR PROMISES */}
      <div className="section" style={{ paddingTop: "0" }}>
  <div className="promises-section" style={{ 
    background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/promise-bg.jpg') center/cover no-repeat`,
    padding: "60px 48px",
    borderRadius: "16px"
  }}>
    <div className="promises-grid">
      <div className="promises-content">
        <h2 className="section-title" style={{ textAlign: "left" }}>Our Promises</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px", fontSize: "14px" }}>What We Stand For — Excellence. Every Step of the Way.</p>
        <ul className="promises-list">
          {promises.map((p, i) => (
            <li key={i}><i className="ti ti-circle-check" style={{ color: "var(--red)", marginRight: "10px" }}></i>{p}</li>
          ))}
        </ul>
      </div>
      <div className="promises-img">
        <img src="/images/promise-2.jpg" alt="Studio promises" className="promises-img-main" />
        <img src="/images/promise-1.jpg" alt="Studio session" className="promises-img-overlay" />
      </div>
    </div>
  </div>
</div>

      {/* STEP INTO SPOTLIGHT */}
      <div className="section" style={{ paddingTop: "0" }}>
        <div className="spotlight-grid">
          <img src="/images/spotlight-step.jpeg" alt="Studio spotlight" className="spotlight-img" />
          <div className="spotlight-content">
            <h2>Step Into Your Spotlight – Where Every Session Sparks Creativity.</h2>
            <p style={{ color: "var(--text-muted)", margin: "16px 0 24px", fontSize: "15px" }}>Whether you're recording a podcast, mixing your next hit, or producing a video — our studios are built to capture your voice, and your story.</p>
            <div className="spotlight-features">
              <div className="spotlight-feature">
                <i className="ti ti-microphone" style={{ color: "var(--red)", fontSize: "24px", marginBottom: "8px", display: "block" }}></i>
                <strong>Studio-Grade Audio Clarity</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>Top-notch microphones, soundproofing, and flexible bookings.</p>
              </div>
              <div className="spotlight-feature">
                <i className="ti ti-video" style={{ color: "var(--red)", fontSize: "24px", marginBottom: "8px", display: "block" }}></i>
                <strong>Cinematic Video Spaces</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>Professional backdrops, lighting, and editing suites.</p>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: "24px" }} onClick={() => setPage("book")}>Book a Session</button>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title">About Handy Pros Studio</h2>
        <img src="/images/flick.png" alt="" style={{ width: "330px", maxWidth: "60%", display: "block", margin: "-50px auto 16px 35%" }} />
        <div className="testimonial-carousel"></div>
        <div className="home-about-grid">
          <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.8" }}>
            Handy Pros is redefining access to professional creative spaces for a new generation of storytellers, artists, and creators. Our platform connects you with studio spaces that are built for those who imagine big. From the recording booth to the editing suite, every corner of Handy Pros is engineered to help you create — on your terms, at your pace. We're more than a studio. We're a creative community. We're the launchpad for your next big thing.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title">FAQ</h2>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className={`faq-icon ${openFaq === i ? "open" : ""}`}>⌄</span>
              </button>
              <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: "73px", marginTop: "-73px"}}>
      <div className="page-banner">
        <div className="page-banner-bg" style={{ 
    background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/about-bg.jpg') center/cover no-repeat`,
    padding: "60px 48px",
    borderRadius: "16px" }} />
        <h1>Built for Creators. Powered by Passion.</h1>
      </div>
      <div className="section">
        <div className="about-story">
          <div>
            <h2>Our Story – "Where It All Began"</h2>
            <p>What started as a small idea between a group of creatives has now evolved into a vibrant hub for audio and visual storytellers. Handy Pros was founded with one goal in mind — to provide accessible, high-quality studio spaces for creators of all kinds.</p>
            <p>We saw the challenges artists faced: overpriced rentals, unreliable gear, and hard-to-book spaces. So we built something better — a one-stop studio platform designed around your creative needs.</p>
          </div>
          <img src="/images/studio-overlay.png" alt="Our story" />
        </div>

        <div className="about-pillars">
          <div className="pillar">
            <div className="pillar-icon"><Icons.Target /></div>
            <h3>Our Mission</h3>
            <p>To empower creators by providing accessible, professional-grade studio spaces where ideas can thrive. We aim to remove creative barriers by offering high-quality tools, seamless booking, and supportive environments tailored for all levels of experience.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon"><Icons.Eye /></div>
            <h3>Our Vision</h3>
            <p>To establish Africa's most innovative and accessible creative hub, empowering storytellers, musicians, and creators with world-class tools, and enabling them to bring bold, impactful visions to life.</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon"><Icons.Gem /></div>
            <h3>Our Core Values</h3>
            <ul>
              <li><strong>Integrity</strong> – We do what's right, always.</li>
              <li><strong>Excellence</strong> – We never compromise on quality.</li>
              <li><strong>Creativity</strong> – We believe in bold ideas and expression.</li>
              <li><strong>Reliability</strong> – You can count on us—every time.</li>
              <li><strong>Community</strong> – We grow by lifting others.</li>
            </ul>
          </div>
        </div>

        <h2 className="section-title">What We Offer</h2>
        <div className="offer-grid">
          {[
            { img: "recordingee.jpeg", icon: <Icons.Mic />, title: "Recording", desc: "Soundproofed and mic-ready. Just press record." },
            { img: "spotlight-step.jpeg", icon: <Icons.Music />, title: "Rehearsal Room", desc: "Spacious, clean, and acoustically treated." },
            { img: "videoediting.png", icon: <Icons.Video />, title: "Video Recording & Editing Suites", desc: "From shoot to screen, all in one place." },
            { img: "podcast-seg.jpeg", icon: <Icons.Radio />, title: "Podcasting Suite", desc: "Soundproofed and mic-ready. Just press record." },
            { img: "booking.png", icon: <Icons.Calendar />, title: "Flexible Booking", desc: "Book by the hour, day, or week without stress." },
            { img: "seminar.jpeg", icon: <Icons.Wrench />, title: "On-site Support", desc: "Friendly engineers and team members ready to assist." },
          ].map((item) => (
            <div className="offer-card" key={item.title}>
              <img src={`/images/${item.img}`} alt={item.title} />
              <div className="offer-card-body">
                <h4 style={{display:"flex",alignItems:"center",gap:"8px"}}>{item.icon} {item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-banner">
        <div className="cta-banner-bg" style={{ 
    background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/podcast-suite.png') center/cover no-repeat`,
    padding: "30px 48px",
    borderRadius: "16px"}}/>
        <div className="cta-banner-content">
          <h2>Ready to take your project to the next level?</h2>
          <p>Book a studio session today and create without limits.</p>
          <button className="btn-primary" onClick={() => setPage("book")}>Book a Session</button>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Reviews from Our Clients</h2>
        <div className="testimonials-grid">
          {[
            { stars: "★★★★★", text: "I recorded my debut EP here and the experience was seamless. The sound engineers really knew their stuff and made me feel at home. The energy was just right.", name: "–Dami K.", role: "Afrobeat Artist" },
            { stars: "★★★★★", text: "Booked a session to shoot a promotional video. The gear, lighting setup, and editing team were top-notch. They brought my vision to life effortlessly.", name: "–Aisha Bello", role: "Brand Influencer" },
          ].map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="stars">{t.stars}</div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────
function ServicesPage({ setPage }) {
  const services = [
    { img: "recording.jpeg", icon: <Icons.Mic />, title: "Audio Recording", desc: "Capture pristine sound with professional-grade equipment in a fully-equipped audio booth." },
    { img: "music-producer.png", icon: <Icons.Music />, title: "Mixing & Mastering", desc: "Perfect your sound with expert-level tools for mixing and mastering in a seamless studio environment." },
    { img: "podcast-seg.jpeg", icon: <Icons.Radio />, title: "Podcast Studio Rental", desc: "Book a fully equipped podcast studio tailored for high-quality recording and streaming." },
    { img: "music-band.png", icon: <Icons.Music />, title: "Rehearsal Studio", desc: "Practice in acoustically optimized spaces outfitted with premium instruments and gear." },
    { img: "learning.png", icon: <Icons.Video />, title: "Video Production & Editing", desc: "From shooting to post-production, create stunning visuals with top-tier equipment and editing suites." },
    { img: "laptop-table.png", icon: <Icons.Wrench />, title: "Creative Workspace", desc: "A versatile and inspiring space designed to support creators, artists, and innovators at any level." },
  ];

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <div style={{ paddingTop: "73px", marginTop: "-73px"}}>
      <div className="page-banner">
        <div className="page-banner-bg"  style={{ 
    background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/bg-set.png') center/cover no-repeat`,
    padding: "60px 48px",
    borderRadius: "16px" }}/>
        <h1>What We Offer</h1>
      </div>

      <div className="section">
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <img src={`/images/${s.img}`} alt={s.title} />
              <div className="service-card-body">
                <h3 style={{display:"flex",alignItems:"center",gap:"8px"}}>{s.icon} {s.title}</h3>
                <p>{s.desc}</p>
                <button className="btn-primary" onClick={() => setPage("book")}>Book Now</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">
            {[
              { icon: <Icons.MousePointer />, title: "Select Service", desc: "Choose your desired service, date, and time effortlessly through our streamlined booking platform." },
              { icon: <Icons.Users />, title: "Make Appointment", desc: "Pick your preferred date, time, and any add-ons—quick and easy." },
              { icon: <Icons.Play />, title: "Create & Capture", desc: "Arrive, create, and collaborate in a professional, supportive environment." },
            ].map((s) => (
              <div className="step" key={s.title}>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="service-hours">
          <img src="/images/mixing-set.png" alt="Studio hours" />
          <div className="hours-content">
            <h2>Services Hours</h2>
            <p>Flexible hours for every creative flow.</p>
            <div className="hours-grid">
              {days.map((d) => (
                <div className="hours-item" key={d}>
                  <div className="day-icon"><Icons.Calendar /></div>
                  <strong>{d}</strong>
                  <span>9AM - 8PM</span>
                </div>
              ))}
            </div>
            <p className="hours-note">Our studio operates on a flexible schedule with sessions available by appointment. Be sure to book ahead to secure your preferred time slot.</p>
            <button className="btn-primary" onClick={() => setPage("book")}>Book an appointment</button>
          </div>
        </div>
      </div>

      <div className="cta-banner">
        <div className="cta-banner-bg" style={{ 
        background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/photo-setup.png') center no-repeat`,
        backgroundSize: "100% auto"
        }}/>
        <div className="cta-banner-content">
          <h2>Are you prepared to elevate your project to new heights?</h2>
          <p>Book a studio session today and create without limits.</p>
          <button className="btn-primary" onClick={() => setPage("book")}>Book a Session</button>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── PORTFOLIO PAGE ───────────────────────────────────────
function PortfolioPage({ setPage }) {
  const recentProjects = [
    { img: "mixing-2.png", title: "Urban Rhythm Sessions", subtitle: "Live Audio Mix" },
    { img: "lagos-lens.png", title: "The Lagos Lens", subtitle: "Mini Documentary Series" },
    { img: "midnight-verse.png", title: "Midnight Verse", subtitle: "Poetry Podcast Recording" },
    { img: "scene48.png", title: "Scene 48", subtitle: "Short Film Production" },
    { img: "rehearsal-2.png", title: "Rehearsal Room Chronicles", subtitle: "Band Crew Prep" },
    { img: "real-faces.png", title: "Real Faces", subtitle: "Visual Documentary for Change" },
  ];

  const featuredWorks = [
    { img: "vibetalks.png", title: "VibeTalks", subtitle: "Africa's Fastest Growing Podcast" },
    { img: "24hr-album.png", title: "The 24-Hour Album", subtitle: "Live Audio Challenge" },
    { img: "echo-chamber.png", title: "Echo Chamber", subtitle: "Experimental Audio Lab" },
    { img: "soundscape.png", title: "SoundScape", subtitle: "Immersive Audio" },
  ];

  const tracks = [
    { num: 1, title: "Joeboy Vs. ODUMODUBLVCK (Body & Soul Podcast)", artist: "Joeboy - Body & Soul (Podcast)", duration: "47:23" },
    { num: 2, title: "S2: EP3 - A Doze of Foza", artist: "Osikoya Speaks", duration: "1:10:53" },
    { num: 3, title: "Episode 24: Detty December is coming!", artist: "I Moved Back Podcast", duration: "1:04:46" },
    { num: 4, title: "Episode 22: Lagos has been hell for us lately!", artist: "I Moved Back Podcast", duration: "50:52" },
  ];

  const galleryImages = [
    "recording.jpeg", "spotlight-step.jpeg", "recordingee.jpeg",
    "seminar.jpeg", "podcast-seg.jpeg", "headphone.png",
  ];

  return (
    <div style={{ paddingTop: "73px", marginTop: "-73px"}}>
      <div className="page-banner">
        <div className="page-banner-bg"  style={{ 
    background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/portfolio-bg.png') center 20%/cover no-repeat`,
    padding: "60px 48px",
    borderRadius: "16px" }} />
        <h1>Portfolio</h1>
      </div>

      {/* Recent Projects */}
      <div className="section">
        <h2 className="section-title">Recent Projects</h2>
        <div className="portfolio-grid">
          {recentProjects.map((p) => (
            <div className="portfolio-card" key={p.title}>
              <img src={`/images/${p.img}`} alt={p.title} />
              <div className="portfolio-card-body">
                <h4>{p.title}</h4>
                <p>{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Works */}
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title">Featured Works</h2>
        <div className="featured-scroll">
          {featuredWorks.map((f) => (
            <div className="featured-card" key={f.title}>
              <img src={`/images/${f.img}`} alt={f.title} />
              <div className="featured-card-body">
                <h4>{f.title}</h4>
                <p>{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Links */}
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title">Audio Links</h2>
        <div className="audio-player">
          <div className="audio-player-header">
            <img src="/images/spotify-image.png" alt="Podcast cover" className="audio-cover" />
            <div className="audio-info">
              <h3>Recently Recorded at Handy Pros</h3>
              <span className="audio-preview-tag">Preview</span>
              <p>⊕ Save on Spotify</p>
            </div>
            <div className="audio-controls">
              <span>⏮</span>
              <span>⏭</span>
              <span>•••</span>
              <button className="play-btn">▶</button>
            </div>
          </div>
          <div className="track-list">
            {tracks.map((t) => (
              <div className="track-item" key={t.num}>
                <span className="track-num">{t.num}</span>
                <div className="track-info">
                  <strong>{t.title}</strong>
                  <span>{t.artist}</span>
                </div>
                <span className="track-duration">{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Gallery */}
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title">Instagram Gallery</h2>
        <div className="insta-grid">
          {galleryImages.map((img, i) => (
            <div className="insta-item" key={i}>
              <img src={`/images/${img}`} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────
function ContactPage({ setPage }) {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "How do I book a session?", a: "You can easily book a session through our website by selecting your preferred service, date, and time. You'll receive a confirmation email once your booking is complete." },
    { q: "What are your payment options?", a: "We accept bank transfers, card payments, and popular mobile payment options. A deposit is required to confirm your booking." },
    { q: "Can I reschedule my appointment?", a: "Yes! You can reschedule up to 24 hours before your session at no extra charge. Contact us via email or phone to make changes." },
    { q: "What is your cancellation policy?", a: "Cancellations made 48+ hours in advance receive a full refund. Cancellations within 24 hours may forfeit the deposit." },
    { q: "What's included in the studio rental?", a: "All studio rentals include access to our equipment, an on-site engineer, and complimentary Wi-Fi. Additional add-ons can be arranged during booking." },
  ];

  return (
    <div style={{ paddingTop: "73px" }}>
      <div className="section">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Feel free to reach out to book a session, ask a question, or collaborate with us.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-card">
            <h2>Get in touch</h2>
            <div className="form-group"><label>Name</label><input type="text" placeholder="John Doe" /></div>
            <div className="form-group"><label>Email</label><input type="email" placeholder="example@mail.com" /></div>
            <div className="form-group"><label>Phone number</label><input type="tel" placeholder="+2349087563427" /></div>
            <div className="form-group"><label>Subject</label><input type="text" placeholder="Booking, Inquiry, Collaboration, etc." /></div>
            <div className="form-group"><label>Message</label><textarea placeholder="Type your message..." /></div>
            <label className="form-checkbox"><input type="checkbox" /> Subscribe to Newsletter</label>
            <button className="btn-submit">Submit</button>
          </div>

          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-icon"><Icons.MapPin /></span>
              <div><strong>Studio Location:</strong><span>Floor 8B, Sapetro Towers <br/> 1 Adeola Odeku Street, Victoria Island, Lagos</span></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><Icons.Phone /></span>
              <div><strong>Phone:</strong><span>+234 707 340 5110</span></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><Icons.Mail /></span>
              <div><strong>Email:</strong><span>info@handypros.com</span></div>
            </div>
            <div className="working-hours">
              <h3>Working hours:</h3>
              <p>Monday – Saturday: 9AM – 8PM</p>
              <p>Sunday: Closed (or by special request)</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63428.35743996456!2d3.3792057!3d6.4698976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92d%3A0x5bce4718a6f6b3b5!2sLekki%20Phase%201%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Studio Location"
          />
        </div>

        <div className="faq">
          <h2>FAQ</h2>
          {faqs.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className={`faq-icon ${openFaq === i ? "open" : ""}`}>⌄</span>
              </button>
              <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── BOOK PAGE ────────────────────────────────────────────
function BookPage({ setPage }) {
  return (
    <div style={{ paddingTop: "73px" }}>
      <div className="section">
        <div className="book-header">
          <h1>Book A Session</h1>
          <p>Ready to create something amazing? Select your service, pick a time, and let's make it happen.</p>
        </div>

        <div className="booking-card">
          <h2>Get in touch</h2>

          <div className="booking-step">
            <h3>Step 1: Choose a Service</h3>
            <select className="booking-input">
              <option value="" disabled defaultValue="">Select a service</option>
              <option>Audio Recording</option>
              <option>Mixing & Mastering</option>
              <option>Podcast Studio Rental</option>
              <option>Rehearsal Studio</option>
              <option>Video Production & Editing</option>
              <option>Creative Workspace</option>
            </select>
          </div>

          <div className="booking-step">
            <h3>Step 2: Select Date & Time</h3>
            <div className="booking-row">
              <input type="date" className="booking-input" />
              <input type="time" className="booking-input" />
            </div>
          </div>

          <div className="booking-step">
            <h3>Step 3: Personal Details</h3>
            <input type="text" className="booking-input" placeholder="Full Name" style={{ marginBottom: "12px" }} />
            <div className="booking-row">
              <input type="email" className="booking-input" placeholder="Email" />
              <input type="tel" className="booking-input" placeholder="Phone Number" />
            </div>
          </div>

          <div className="booking-step">
            <h3>Step 4: Session Details</h3>
            <input type="text" className="booking-input" placeholder="Project Name" style={{ marginBottom: "12px" }} />
            <input type="text" className="booking-input" placeholder="Short Description/Goal of Session" style={{ marginBottom: "16px" }} />
            <div className="booking-radios">
              <div>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "10px" }}>Do you need technical assistance?</p>
                <div className="radio-group">
                  <label><input type="radio" name="tech" value="yes" /> Yes</label>
                  <label><input type="radio" name="tech" value="no" /> No</label>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "10px" }}>Will you bring your own equipment?</p>
                <div className="radio-group">
                  <label><input type="radio" name="equip" value="yes" /> Yes</label>
                  <label><input type="radio" name="equip" value="no" /> No</label>
                </div>
              </div>
            </div>
          </div>

          <div className="booking-step">
            <h3>Step 5: Payment</h3>
            <div className="summary-row"><span>Summary</span><span>$0.00</span></div>
            <div className="coupon-row">
              <input type="text" placeholder="Coupon code" />
              <button className="coupon-btn">Apply</button>
            </div>
            <label className="form-checkbox"><input type="checkbox" /> Subscribe to Newsletter</label>
            <button className="btn-submit" style={{ marginTop: "8px" }}>Confirm & Book</button>
            <p className="book-note">Need help with booking? Chat with our team or call us at +2340123456789</p>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage setPage={setPageAndScroll} />;
      case "about":     return <AboutPage setPage={setPageAndScroll} />;
      case "services":  return <ServicesPage setPage={setPageAndScroll} />;
      case "portfolio": return <PortfolioPage setPage={setPageAndScroll} />;
      case "contact":   return <ContactPage setPage={setPageAndScroll} />;
      case "book":      return <BookPage setPage={setPageAndScroll} />;
      default:          return <HomePage setPage={setPageAndScroll} />;
    }
  };

  return (
    <>
      <Navbar activePage={page} setPage={setPageAndScroll} />
      {renderPage()}
    </>
  );
}
