import { useRef, useState } from "react";
import MemberCard from "./MemberCard";

export default function DepartmentGrid({
  departments,
  placeholderImage,
  namesOnly = false,
}) {
  const deptKeys = Object.keys(departments || {});
  const [activeDept, setActiveDept] = useState(deptKeys[0] || "");
  const sectionRefs = useRef({});

  if (deptKeys.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">No members added yet.</p>
    );
  }

  const scrollToDept = (dept) => {
    setActiveDept(dept);
    sectionRefs.current[dept]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Department buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {deptKeys.map((dept) => {
          const isActive = activeDept === dept;
          return (
            <button
              key={dept}
              onClick={() => scrollToDept(dept)}
              aria-pressed={isActive}
              className={`
                px-6
                py-2.5
                rounded-full
                text-sm
                font-semibold
                tracking-wide
                uppercase
                transition-all
                duration-300
                border
                ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white border-transparent shadow-[0_0_20px_rgba(124,58,237,.45)]"
                    : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* Scrollable department sections */}
      <style>
        {`
          .member-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .member-scroll::-webkit-scrollbar-thumb {
            background: rgba(168, 85, 247, 0.4);
            border-radius: 999px;
          }
          .member-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
      <div
        className="
          member-scroll
          mt-10
          max-h-[65vh]
          overflow-y-auto
          pr-2
        "
        style={{ scrollbarWidth: "thin" }}
      >
        {deptKeys.map((dept) => {
          const members = departments[dept] || [];
          return (
            <section
              key={dept}
              ref={(el) => (sectionRefs.current[dept] = el)}
              className="mb-14 scroll-mt-6 last:mb-0"
            >
              <h3
                className="
                  text-2xl
                  font-bold
                  text-center
                  mb-6
                  uppercase
                  tracking-widest
                  text-violet-300
                "
              >
                {dept}
              </h3>

              {namesOnly ? (
                <ul
                  className="
                    grid
                    grid-cols-2
                    gap-x-10
                    gap-y-4
                    max-w-2xl
                    mx-auto
                  "
                >
                  {members.length === 0 ? (
                    <li className="col-span-2 text-center text-gray-400">
                      No members added yet.
                    </li>
                  ) : (
                    members.map((member, i) => (
                      <li
                        key={member.id ?? `${dept}-${member.name}-${i}`}
                        className="
                          flex
                          items-center
                          gap-2
                          text-gray-200
                          text-lg
                        "
                      >
                        <span className="text-violet-400">•</span>
                        {member.name}
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <div
                  className={
                    members.length === 1
                      ? "flex justify-center"
                      : "grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center"
                  }
                >
                  {members.length === 0 ? (
                    <p className="text-center text-gray-400">
                      No members added yet.
                    </p>
                  ) : (
                    members.map((member, i) => (
                      <MemberCard
                        key={member.id ?? `${dept}-${member.name}-${i}`}
                        name={member.name}
                        position={member.position}
                        image={member.image || placeholderImage}
                        linkedin={member.linkedin}
                        executive={member.executive}
                      />
                    ))
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
