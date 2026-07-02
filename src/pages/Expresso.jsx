import React, { useState, useEffect } from 'react';

// Full 12-month data mapping matching the public folder layout requirements
const magazineArchive = [
  {
    id: 'may-2026',
    title: 'eXpresso May 2026',
    month: 'May 2026',
    folderName: 'may', // path utility identifier: /may/1.png
    volume: 'VOLUME XII',
    edition: 'Current Affairs & Stories',
    description: 'Fresh insights, current affairs highlights, campus events, and stories from our May 2026 collection.',
    tag: 'Latest Edition',
    embedHtml: `
      <a href="https://online.flippingbook.com/view/203496897/" class="fbo-embed" data-fbo-id="562abb984b" data-fbo-ratio="3:2" data-fbo-lightbox="no" data-fbo-skin="none" data-fbo-menu="no" data-fbo-width="100%" data-fbo-height="650px" data-fbo-version="1" style="max-width: 100%; display: block; background: transparent;">Copy of eXpressoMay</a>
    `,
    scriptUrl: 'https://online.flippingbook.com/EmbedScriptUrl.aspx?m=redir&hid=203496897'
  },
  {
    id: 'jan-2024',
    title: 'eXpresso Jan 2024',
    month: 'Jan 2024',
    folderName: 'jan',
    volume: 'VOLUME I',
    edition: 'Fresh Beginnings',
    description: 'Fresh insights and stories from our Jan 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'feb-2024',
    title: 'eXpresso Feb 2024',
    month: 'Feb 2024',
    folderName: 'feb',
    volume: 'VOLUME II',
    edition: 'The Dialogue Arena',
    description: 'Fresh insights and stories from our Feb 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'mar-2024',
    title: 'eXpresso Mar 2024',
    month: 'Mar 2024',
    folderName: 'mar',
    volume: 'VOLUME III',
    edition: 'Voices Unbound',
    description: 'Fresh insights and stories from our Mar 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'apr-2024',
    title: 'eXpresso Apr 2024',
    month: 'Apr 2024',
    folderName: 'apr',
    volume: 'VOLUME IV',
    edition: 'Perspectives & Prose',
    description: 'Fresh insights and stories from our Apr 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'may-2024',
    title: 'eXpresso May 2024',
    month: 'May 2024',
    folderName: 'may24', // altered to differentiate from may 2026 configuration
    volume: 'VOLUME V',
    edition: 'The Orator Blueprint',
    description: 'Fresh insights and stories from our May 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'jun-2024',
    title: 'eXpresso Jun 2024',
    month: 'Jun 2024',
    folderName: 'june',
    volume: 'VOLUME VI',
    edition: 'Summer Interpretations',
    description: 'Fresh insights and stories from our Jun 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'jul-2024',
    title: 'eXpresso Jul 2024',
    month: 'Jul 2024',
    folderName: 'july',
    volume: 'VOLUME VII',
    edition: 'Critical Frameworks',
    description: 'Fresh insights and stories from our Jul 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'aug-2024',
    title: 'eXpresso Aug 2024',
    month: 'Aug 2024',
    folderName: 'aug',
    volume: 'VOLUME VIII',
    edition: 'The Dialectic Lens',
    description: 'Fresh insights and stories from our Aug 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'sep-2024',
    title: 'eXpresso Sep 2024',
    month: 'Sep 2024',
    folderName: 'sep',
    volume: 'VOLUME IX',
    edition: 'Autumn Columns',
    description: 'Fresh insights and stories from our Sep 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'oct-2024',
    title: 'eXpresso Oct 2024',
    month: 'Oct 2024',
    folderName: 'oct',
    volume: 'VOLUME X',
    edition: 'Rhetoric Horizons',
    description: 'Fresh insights and stories from our Oct 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'nov-2024',
    title: 'eXpresso Nov 2024',
    month: 'Nov 2024',
    folderName: 'nov',
    volume: 'VOLUME XI',
    edition: 'The Debater Agenda',
    description: 'Fresh insights and stories from our Nov 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  },
  {
    id: 'dec-2024',
    title: 'eXpresso Dec 2024',
    month: 'Dec 2024',
    folderName: 'dec',
    volume: 'VOLUME XII',
    edition: 'Annual Retrospective Collection',
    description: 'Fresh insights and stories from our Dec 2024 collection.',
    tag: 'Archived',
    embedHtml: null,
    scriptUrl: null
  }
];

export default function Expresso() {
  const [selectedMag, setSelectedMag] = useState(null);

  // Intersection Observer for card scroll-fade reveal execution
  useEffect(() => {
    if (selectedMag) return; 
    
    const cards = document.querySelectorAll('.reveal-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggles visibility styling natively when card markers cross viewport threshold
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [selectedMag]);

  // FlippingBook dynamic integration script mount manager
  useEffect(() => {
    if (!selectedMag || !selectedMag.scriptUrl) return;

    const oldScript = document.getElementById('fb-embed-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'fb-embed-script';
    script.src = selectedMag.scriptUrl;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const cleanupScript = document.getElementById('fb-embed-script');
      if (cleanupScript) cleanupScript.remove();
    };
  }, [selectedMag]);

  // --- FULL SCREEN MODAL / READER INTERACTION OVERLAY ---
  if (selectedMag) {
    return (
      <div className="min-h-screen bg-black text-slate-100 px-4 py-24 flex flex-col items-center justify-start z-40 relative">
        <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b border-purple-500/10 pb-5">
          <div>
            <span className="text-[rgb(171_101_250)] font-semibold text-xs tracking-[3px] uppercase block mb-1">
              {selectedMag.volume} • {selectedMag.edition}
            </span>
            <h1 className="text-2xl font-bold tracking-wide text-white">{selectedMag.title}</h1>
          </div>
          <button 
            onClick={() => setSelectedMag(null)}
            className="px-5 py-2.5 border border-purple-500/20 rounded-full bg-[#120a24] hover:bg-purple-950/40 text-xs font-semibold tracking-wider text-[rgb(171_101_250)] transition-all duration-300 shadow-sm"
          >
            ← BACK TO ARCHIVE
          </button>
        </div>

        <div className="w-full max-w-5xl bg-[#0b0518] rounded-2xl overflow-hidden min-h-[600px] border border-white/5 flex items-center justify-center p-2 shadow-2xl">
          {selectedMag.embedHtml ? (
            <div 
              key={selectedMag.id}
              dangerouslySetInnerHTML={{ __html: selectedMag.embedHtml }}
              className="w-full"
            />
          ) : (
            <div className="text-slate-500 italic text-base tracking-wide">
              This volume is locked or undergoing maintenance.
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- MAIN ARCHIVE VIEW LAYOUT ---
  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-8 pt-24 text-[rgb(209_213_219)] sm:px-6 lg:px-8"
      style={{ backgroundColor: 'rgb(20, 8, 22)' }}
    >
      {/* Visual background lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute left-[-8%] top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="animate-float-slow absolute bottom-10 right-[-6%] h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />
      </div>

      {/* JOURNAL PRESENTATION HERO SECTOR */}
      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center py-4 sm:py-6 lg:py-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[rgb(171_101_250)] sm:text-5xl lg:text-6xl">
                Where expression becomes presence.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[rgb(209_213_219)] sm:text-xl">
                Our literary magazine featuring articles, stories, poems, and insights about public speaking, debating, and communication skills.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#journals"
                className="rounded-full bg-[rgb(171_101_250)] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-violet-600"
              >
                Explore journals
              </a>
            </div>
          </div>

          {/* EDITORS SPIRIT BANNER OVERLAY CARD */}
          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(171_101_250)]">Committee spirit</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">The art of expression</h2>
                </div>
                <div className="rounded-full border border-[rgb(171_101_250)] bg-[rgb(220_194_255)] px-3 py-1 text-sm font-medium text-black">
                  #eXpressToInspire💜
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['20+', 'Editions'],
                  ['10+', 'Contributors'],
                  ['∞', 'Ideas shared'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-center">
                    <p className="text-xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-violet-400/20 bg-slate-950/80 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-200">From the Editors</p>
                <p className="mt-3 text-xl font-semibold leading-8 text-[rgb(209_213_219)]">
                  Every edition of Expresso brings together current affairs, festival specials, campus events, thought-provoking articles, fun sections, and a unique annual theme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHRONOLOGICAL EDITION LISTS */}
      <section id="journals" className="mx-auto max-w-7xl px-2 pb-16 sm:px-0 scroll-mt-24">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(171_101_250)]">Featured journals</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Collections from the committee archive</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {magazineArchive.map((journal, index) => (
            <div
              key={journal.id}
              className={`reveal-card rounded-[1.35rem] border p-5 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition duration-300 backdrop-blur-sm ${
                journal.embedHtml 
                  ? 'border-white/15 bg-slate-950/70 hover:-translate-y-1 hover:border-violet-400/40' 
                  : 'border-white/5 bg-slate-950/30 opacity-40 hover:border-white/10'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Image Pipeline Setup: Maps directly to /public/{folderName}/1.png */}
              <div className="mb-4 h-40 rounded-[1rem] border border-white/15 bg-[rgb(20_8_22)] overflow-hidden relative group">
                <img 
                  src={`/${journal.folderName}/1.png`}
                  alt={`${journal.title} preview cover`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback block string layout if the image asset file does not exist yet
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/40 text-[9px] font-mono tracking-wider text-slate-400 border border-white/5 uppercase">
                  {journal.volume}
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-xl font-bold text-[rgb(171_101_250)] mt-0.5">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{journal.title}</h3>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">{journal.description}</p>
                    <p className="text-[11px] text-violet-400 italic font-serif mt-1">"{journal.edition}"</p>
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-violet-200">
                  {journal.month}
                </div>
              </div>

              {/* Action Operations Bar */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 gap-2">
                <button
                  type="button"
                  onClick={() => journal.embedHtml && setSelectedMag(journal)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 ${
                    journal.embedHtml 
                      ? 'border-violet-400/20 bg-violet-400/10 text-[rgb(171_101_250)] hover:bg-violet-400/20 cursor-pointer' 
                      : 'border-transparent bg-zinc-900 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {journal.embedHtml ? 'Preview' : 'Locked'}
                </button>
                
                {journal.embedHtml && (
                  <button
                    type="button"
                    onClick={() => window.open('https://online.flippingbook.com/view/203496897/', '_blank')}
                    className="rounded-full bg-[rgb(171_101_250)] hover:bg-violet-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}