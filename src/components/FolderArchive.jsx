export default function FolderArchive({
  years,
  selectedYear,
  setSelectedYear,
  children,
}) {
  return (
    <section className="relative w-full max-w-[1900px] mx-auto mt-20">
      <div
        className="
          absolute
          left-1/2
          top-56
          -translate-x-1/2
          w-[900px]
          h-[500px]
          bg-violet-600/20
          blur-[180px]
          rounded-full
          -z-10
        "
      />

      <h2
        className="
          text-center
          text-4xl
          font-bold
          mb-8
          tracking-[0.15em]
          uppercase
          bg-gradient-to-r
          from-violet-300
          via-white
          to-violet-400
          bg-clip-text
          text-transparent
        "
      >
        Team Archive
      </h2>

      <div className="flex justify-center mb-6">
        <div
          className="
            h-1
            w-72
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-violet-500
            to-transparent
            shadow-[0_0_15px_rgba(168,85,247,0.5)]
          "
        />
      </div>

      {/* Folder Tabs */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div
        className="hide-scrollbar flex gap-3 px-5 overflow-x-auto relative z-20"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`
              min-w-[180px]
              h-16
              rounded-t-[26px]
              text-xl
              font-bold
              transition-all
              duration-300
              shrink-0
              ${
                selectedYear === year
                  ? `
                    bg-gradient-to-r
                    from-violet-600
                    via-purple-500
                    to-fuchsia-500
                    text-white
                    scale-[1.08]
                    translate-y-[2px]
                    shadow-[0_10px_35px_rgba(124,58,237,0.45)]
                    border
                    border-violet-300/30
                    -mb-[2px]
                    z-20
                  `
                  : `
                    bg-[#241738]
                    text-gray-300
                    opacity-80
                    border
                    border-violet-500/20
                    hover:bg-[#39265A]
                    hover:text-white
                    hover:-translate-y-[2px]
                    hover:opacity-100
                  `
              }
            `}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Folder */}
      <div
        className="
          -mt-1
          rounded-[34px]
          rounded-tl-none
          bg-gradient-to-br
          from-[#1B1132]
          via-[#23153E]
          to-[#140B28]
          backdrop-blur-xl
          border
          border-violet-500/25
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
          min-h-[750px]
          w-full
          p-12 md:p-16
        "
      >
        {children}
      </div>
    </section>
  );
}
