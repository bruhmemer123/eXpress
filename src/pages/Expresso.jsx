import { useEffect } from 'react';

const journals = [
  {
    title: 'Title',
    month: 'Jan 2024',
    description: 'Fresh insights and stories from our Jan 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Feb 2024',
    description: 'Fresh insights and stories from our Feb 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Mar 2024',
    description: 'Fresh insights and stories from our Mar 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Apr 2024',
    description: 'Fresh insights and stories from our Apr 2024 collection.',
  },
  {
    title: 'Title',
    month: 'May 2024',
    description: 'Fresh insights and stories from our May 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Jun 2024',
    description: 'Fresh insights and stories from our Jun 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Jul 2024',
    description: 'Fresh insights and stories from our Jul 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Aug 2024',
    description: 'Fresh insights and stories from our Aug 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Sep 2024',
    description: 'Fresh insights and stories from our Sep 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Oct 2024',
    description: 'Fresh insights and stories from our Oct 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Nov 2024',
    description: 'Fresh insights and stories from our Nov 2024 collection.',
  },
  {
    title: 'Title',
    month: 'Dec 2024',
    description: 'Fresh insights and stories from our Dec 2024 collection.',
  },
];

const Expresso = () => {

  useEffect(() => {
    const cards = document.querySelectorAll('.reveal-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-8 pt-0 text-[rgb(209_213_219)] sm:px-6 lg:px-8"
      style={{ backgroundColor: 'rgb(20, 8, 22)' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute left-[-8%] top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="animate-float-slow absolute bottom-10 right-[-6%] h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center py-4 sm:py-6 lg:py-8">
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
                className="rounded-full bg-[rgb(171_101_250)] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-violet-600"
              >
                Explore journals
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
            </div>
          </div>

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
                  Every edition of Expresso brings together current affairs, festival specials, campus events, thought-provoking articles, fun sections, and a unique annual theme-creating a journal that's both insightful and engaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journals" className="mx-auto max-w-7xl px-2 pb-16 sm:px-0">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(171_101_250)]">Featured journals</p>
            <h2 className="mt-1 text-3xl font-semibold text-white">Collections from the committee archive</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {journals.map((journal, index) => (
            <div
              key={journal.title}
              className="reveal-card rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-violet-400/30"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 h-28 rounded-[1rem] border border-white/10 bg-[rgb(20_8_22)]">
              preview image
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-semibold text-[rgb(171_101_250)]">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{journal.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{journal.description}</p>
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
                  {journal.month}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-sm font-semibold text-[rgb(171_101_250)] shadow-sm"
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[rgb(171_101_250)] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Expresso