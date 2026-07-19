import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const magazineArchive = [
  {
    id: 'may-2026',
    title: 'eXpresso May 2026',
    month: 'May 2026',
    folderName: 'may', 
    volume: 'VOLUME IV',
    description: "Fresh insights, current affairs highlights, campus events, and stories from our May 2026 collection.",
    tag: 'Latest Edition',
    available: true,
    pagesCount: 8
  },
  {
    id: 'june-2026',
    title: 'eXpresso June 2026',
    month: 'June 2026',
    folderName: 'june',
    volume: 'VOLUME V',
    description: 'Fresh insights, current affairs highlights, campus events, and stories from our June 2026 collection.',
    tag: 'Latest Edition',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso June_page'
  },
  {
    id: 'feb-2026',
    title: 'eXpresso Feb 2026',
    month: 'Feb 2026',
    folderName: 'feb',
    volume: 'VOLUME I',
    description: 'Fresh insights and stories from our Feb 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 4,
    pagePrefix: 'eXpresso February 2026_page'
  },
  {
    id: 'mar-2026',
    title: 'eXpresso Mar 2026',
    month: 'Mar 2026',
    folderName: 'mar',
    volume: 'VOLUME II',
    description: 'Fresh insights and stories from our Mar 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso March_page'
  },
  {
    id: 'apr-2026',
    title: 'eXpresso Apr 2026',
    month: 'Apr 2026',
    folderName: 'apr',
    volume: 'VOLUME III',
    description: 'Fresh insights and stories from our Apr 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso April_page'
  },
  {
    id: 'jul-2026',
    title: 'eXpresso Jul 2026',
    month: 'Jul 2026',
    folderName: 'july',
    volume: 'VOLUME VI',
    description: 'Fresh insights and stories from our Jul 2026 collection.',
    tag: 'Archived',
    available: false
  },
  
];

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthNameMap = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December'
};

const getPagePrefix = (journal) => {
  if (journal.pagePrefix) return journal.pagePrefix;
  const monthShort = journal.month.split(' ')[0];
  const fullMonth = monthNameMap[monthShort] ?? monthShort;
  return `eXpresso ${fullMonth}_page`;
};

function RealReactFlipBook({ folderName, totalPages, pagePrefix }) {
  const bookRef = useRef(null);
  const [bookDimensions, setBookDimensions] = useState({ width: 450, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBookDimensions({ width: 320, height: 480 }); 
      } else if (width < 1024) {
        setBookDimensions({ width: 380, height: 560 });
      } else {
        setBookDimensions({ width: 450, height: 640 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = Array.from({ length: totalPages }, (_, i) => {
    const pageNumStr = String(i + 1).padStart(4, '0');
    const imagePrefix = pagePrefix || 'eXpresso May_page';
    return {
      pageNum: i + 1,
      imgUrl: `/expressoPages/${folderName}/${imagePrefix}-${pageNumStr}.jpg`
    };
  });

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden py-4">
      <HTMLFlipBook
        ref={bookRef}
        width={bookDimensions.width}
        height={bookDimensions.height}
        size="fixed"
        minWidth={300}
        maxWidth={550}
        minHeight={400}
        maxHeight={700}
        drawShadow={true}
        showCover={true}
        maxShadowOpacity={0.5}
        className="shadow-2xl mx-auto components-flipbook"
        style={{ background: 'transparent' }}
      >
        {pages.map((page, index) => {
          const isCover = index === 0 || index === pages.length - 1;
          return (
            <div 
              key={page.pageNum} 
              className="relative w-full h-full bg-[#160b24] select-none overflow-hidden"
              data-density={isCover ? "hard" : "soft"}
            >
              <img 
                src={page.imgUrl} 
                alt={`Page ${page.pageNum}`}
                className="w-full h-full object-contain pointer-events-none"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = e.target.nextSibling;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div 
                className="absolute inset-0 hidden flex-col items-center justify-center text-center p-6 bg-[#1f1235] border-2 border-purple-500/20"
                style={{ display: 'none' }}
              >
                <span className="text-xs uppercase font-mono tracking-widest text-purple-400 mb-2">
                  {isCover ? 'Cover Page' : `Layout Page`}
                </span>
                <h3 className="text-xl font-bold text-white mb-4">Page {page.pageNum}</h3>
                <div className="w-12 h-1 bg-purple-500 rounded-full opacity-40"></div>
              </div>
            </div>
          );
        })}
      </HTMLFlipBook>

      <div className="mt-8 flex items-center justify-center gap-4 w-full max-w-xs">
        <button
          onClick={() => bookRef.current?.pageFlip()?.turnToPrevPage()}
          className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-950/40 text-[11px] font-bold tracking-wider text-[rgb(171_101_250)] shadow-md hover:bg-purple-900/60 transition-all"
        >
          PREV
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip()?.turnToNextPage()}
          className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-950/40 text-[11px] font-bold tracking-wider text-[rgb(171_101_250)] shadow-md hover:bg-purple-900/60 transition-all"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default function Expresso() {
  const [selectedMag, setSelectedMag] = useState(null);
  const [sortedArchive, setSortedArchive] = useState([]);

  useEffect(() => {
    const currentMonthName = new Date().toLocaleString('en-US', { month: 'short' });
    const currentMonthMag = magazineArchive.find(mag => 
      mag.month.toLowerCase().startsWith(currentMonthName.toLowerCase())
    );
    const otherMags = magazineArchive.filter(mag => mag.id !== currentMonthMag?.id);

    otherMags.sort((a, b) => {
      const aMonthStr = a.month.split(' ')[0].substring(0, 3);
      const bMonthStr = b.month.split(' ')[0].substring(0, 3);
      return monthOrder.indexOf(aMonthStr) - monthOrder.indexOf(bMonthStr);
    });

    if (currentMonthMag) {
      setSortedArchive([currentMonthMag, ...otherMags]);
    } else {
      setSortedArchive(otherMags);
    }
  }, []);

  useEffect(() => {
    if (selectedMag) return; 
    
    const cards = document.querySelectorAll('.reveal-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.05 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [selectedMag, sortedArchive]);

  if (selectedMag) {
    return (
      <div className="min-h-screen bg-[#060211] text-slate-100 px-4 sm:px-6 py-12 flex flex-col items-center justify-start z-50 relative">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 border-b border-purple-500/10 pb-6">
          <div>
            <span className="text-[rgb(171_101_250)] font-semibold text-xs tracking-[3px] uppercase block mb-1">
              {selectedMag.volume} • {selectedMag.edition}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white">{selectedMag.title}</h1>
          </div>
          <button 
            onClick={() => setSelectedMag(null)}
            className="w-full sm:w-auto px-6 py-3 border border-purple-500/30 rounded-full bg-[#120a24] hover:bg-purple-950/60 text-xs font-bold tracking-wider text-[rgb(171_101_250)] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            ← BACK TO ARCHIVE
          </button>
        </div>

        <div className="w-full max-w-5xl bg-[#0d071f] rounded-2xl overflow-hidden border border-purple-500/10 shadow-2xl p-4 sm:p-8 flex items-center justify-center min-h-[500px]">
          {selectedMag.available ? (
            <RealReactFlipBook 
              folderName={selectedMag.folderName} 
              totalPages={selectedMag.pagesCount || 8}
              pagePrefix={selectedMag.pagePrefix}
            />
          ) : (
            <div className="text-slate-400 italic text-base tracking-wide flex flex-col items-center gap-2 py-20 text-center">
              🔒 This volume is locked or undergoing scheduled maintenance.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#070314] overflow-hidden px-4 pb-16 pt-8 text-[rgb(209_213_219)] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <section className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center py-6 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold uppercase tracking-widest text-[rgb(171_101_250)]">
                The Literary Club Publication
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Where expression becomes presence.
              </h1>
              <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-light">
                Our literary magazine featuring articles, stories, poems, and insights about public speaking, debating, and communication skills.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#journals"
                className="w-full sm:w-auto text-center rounded-full bg-[rgb(171_101_250)] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-600 shadow-lg"
              >
                Explore journals
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-xl mx-auto">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[rgb(171_101_250)]">Committee spirit</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">The art of expression</h2>
                </div>
                <div className="shrink-0 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-[rgb(216_180_254)]">
                  #eXpressToInspire💜
                </div>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-3">
                {[
                  ['20+', 'Editions'],
                  ['10+', 'Contributors'],
                  ['∞', 'Ideas Shared'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</p>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 font-medium">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-purple-500/10 bg-slate-950/80 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">From the Editors</p>
                <p className="mt-2.5 text-sm sm:text-base font-normal leading-relaxed text-slate-300">
                  Every edition of Expresso brings together current affairs, festival specials, campus events, thought-provoking articles, fun sections, and a unique annual theme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journals" className="mx-auto max-w-7xl px-0 pb-16 pt-12 scroll-mt-12">
        <div className="mb-10 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[rgb(171_101_250)]">Featured journals</p>
          <h2 className="mt-1 text-3xl font-bold text-white tracking-tight sm:text-4xl">Collections from the committee archive</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedArchive.map((journal, index) => {
            const cleanCardMonth = journal.month.split(' ')[0];
            return (
              <div
                key={journal.id}
                className="reveal-card rounded-2xl border p-5 shadow-lg flex flex-col justify-between transition-all duration-500 ease-out"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transitionDelay: `${index * 40}ms`,
                  backgroundColor: journal.available ? 'rgba(9, 4, 22, 0.6)' : 'rgba(9, 4, 22, 0.2)',
                  borderColor: journal.available ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)'
                }}
              >
                <div>
                  <div 
                    onClick={() => journal.available && setSelectedMag(journal)}
                    className={`mb-4 aspect-[4/3] rounded-xl border border-white/10 bg-[#160b24] overflow-hidden relative group transition-all duration-300 ${
                      journal.available ? 'cursor-pointer hover:border-purple-500/40' : 'cursor-not-allowed'
                    }`}
                  >
                    <img 
                      src={`/expressoPages/${journal.folderName}/${getPagePrefix(journal)}-0001.jpg`}
                      alt={`${journal.title} preview cover`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-[10px] font-mono tracking-wider text-purple-300 border border-purple-500/20 uppercase backdrop-blur-sm">
                      {index === 0 ? "★ Current Issue" : journal.volume}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <div className="text-lg font-black text-purple-500/60 mt-0.5">{String(index + 1).padStart(2, '0')}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{journal.title}</h3>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light line-clamp-2">{journal.description}</p>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full border border-purple-400/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-purple-200">
                      {cleanCardMonth}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5 gap-3">
                  <button
                    type="button"
                    onClick={() => journal.available && setSelectedMag(journal)}
                    className={`w-full rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 ${
                      journal.available 
                        ? 'border-purple-500/30 bg-purple-500/10 text-[rgb(171_101_250)] hover:bg-purple-500/20 cursor-pointer' 
                        : 'border-transparent bg-zinc-900/50 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    {journal.available ? 'Read 3D Issue' : 'Locked'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}