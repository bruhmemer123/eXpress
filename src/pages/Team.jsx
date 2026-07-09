import React, { useState } from "react";
import { teams } from "../data/teams";
import FolderArchive from "../components/FolderArchive";
import FacultyCard from "../components/FacultyCard";
import DepartmentGrid from "../components/DepartmentGrid";

export default function Team() {
  const placeholderImage = "https://placehold.co/300x300?text=Placeholder";

  const [selectedYear, setSelectedYear] = useState("2025-2026");
  const [activeTab, setActiveTab] = useState("core");

  const currentYear = teams[selectedYear];

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <>
   
  

    <div
      className="
      
      bg-linear-to-br
        from-black
        via-[#180028]
        to-[#070707]
        text-white
        px-4
sm:px-6
lg:px-10
py-6
        flex
        flex-col
        items-center
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
          text-center
         min-h-[42vh]
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            bg-violet-600/20
            blur-[140px]
            -z-10
          "
        />
        <h1
          className="
            text-5xl
md:text-7xl
            font-extrabold
            tracking-wide
            bg-gradient-to-r
            from-white
            via-violet-200
            to-purple-400
            bg-clip-text
            text-transparent
          "
        >
          OUR TEAM
        </h1>
        <p
          className="
            mt-5
            max-w-3xl
            text-lg
            md:text-xl
            leading-7
            text-gray-300
          "
        >
          Meet our dedicated team of public speaking and debate enthusiasts
          who work tirelessly to organize events and workshops for our
          community.
        </p>
        
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            text-gray-400
            animate-bounce
          "
        >
          
        </div>
      </section>

      {/* FACULTY  & PRINCIPAL*/}
      <div className=" mb-12 w-full">
        <h2 className="text-4xl font-bold text-center"> Principal </h2>
        <div
          className="
            w-72
            h-1
            bg-gradient-to-r
            from-violet-500
            via-purple-400
            to-fuchsia-500
            mx-auto
            rounded-full
            mt-4
            mb-6
          "
        />
         <div className="flex flex-wrap justify-center gap-12">
         <FacultyCard {...currentYear.leadership.principal} />
        </div>
        
        <h2 className=" mt-10 text-4xl font-bold text-center">Faculty</h2>

        <div
          className="
            w-72
            h-1
            bg-gradient-to-r
            from-violet-500
            via-purple-400
            to-fuchsia-500
            mx-auto
            rounded-full
            mt-4
            mb-6
          "
        />

        <div className="flex flex-wrap justify-center gap-12">
         
          <FacultyCard {...currentYear.leadership.faculty} />
        </div>
      </div>

      {/* ARCHIVE */}
      <div className="mt-5 flex flex-col w-full">
        <FolderArchive 
          years={Object.keys(teams)}
          selectedYear={selectedYear}
          setSelectedYear={handleYearChange}
        >
         

          {/* TAB TOGGLE */}
          <div className="flex justify-center mt-8">
            <div
              role="tablist"
              aria-label="Team category"
              className="
                relative
                flex
                w-full
                max-w-md
                h-16
                rounded-full
                bg-[#1A1230]
                border
                border-violet-500/30
                p-1
                shadow-[0_0_30px_rgba(124,58,237,0.25)]
                overflow-hidden
              "
            >
              <div
                className={`
                  absolute
                  top-1
                  bottom-1
                  w-[calc(50%-4px)]
                  rounded-full
                  bg-gradient-to-r
                  from-violet-600
                  to-purple-500
                  shadow-[0_0_25px_rgba(124,58,237,.45)]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]
                  ${activeTab === "core" ? "left-1" : "left-[calc(50%+2px)]"}
                `}
              />

              <button
                role="tab"
                aria-selected={activeTab === "core"}
                onClick={() => setActiveTab("core")}
                className="
                  relative
                  z-10
                  flex-1
                  font-semibold
                  text-lg
                  rounded-full
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-300
                "
              >
                <span
                  className={
                    activeTab === "core" ? "text-white" : "text-gray-400"
                  }
                >
                  Core
                </span>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "associates"}
                onClick={() => setActiveTab("associates")}
                className="
                  relative
                  z-10
                  flex-1
                  font-semibold
                  text-lg
                  rounded-full
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-300
                "
              >
                <span
                  className={
                    activeTab === "associates" ? "text-white" : "text-gray-400"
                  }
                >
                  Associates
                </span>
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-10">
            {activeTab === "core" ? (
              <DepartmentGrid
                key={`core-${selectedYear}`}
                departments={currentYear.core}
                placeholderImage={placeholderImage}
              />
            ) : (
              <DepartmentGrid
                key={`associates-${selectedYear}`}
                departments={currentYear.associates}
                namesOnly={true}
              />
            )}
          </div>
           <div className="rounded-[32px] overflow-hidden shadow-xl relative">
            <div
              className="
                relative
                mt-8
                overflow-hidden
                rounded-[30px]
                border
                border-violet-500/30
                shadow-[0_15px_50px_rgba(124,58,237,.25)]
              "
            >
              <img
                src={currentYear.groupPhoto}
                alt={`${selectedYear} group photo`}
                className="
                  w-full
                  h-72
md:h-[420px]
lg:h-[480px]
                  object-cover
                  transition-all
                  duration-700
                  hover:scale-105
                "
              />
              <div className="absolute bottom-8 left-8">
                <p className="uppercase tracking-[3px] text-sm text-gray-200">
                  Year
                </p>
                <h2 className="text-5xl font-bold">{selectedYear}</h2>
              </div>
            </div>
          </div>
        </FolderArchive>
      </div>
    </div>
    </>
  );
}
