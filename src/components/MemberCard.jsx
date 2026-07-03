import React from "react";

const MemberCard = ({ name, position, image, linkedin, executive = false }) => {
  return (
    <div
      className={`
        w-80
        p-8
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border
        flex
        flex-col
        items-center
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[var(--violet-light)]
        hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
        ${
          executive
            ? "border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.15)]"
            : "border-white/10"
        }
      `}
    >
      {executive && (
        <span
          className="
            mb-4
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            tracking-[2px]
            uppercase
            bg-amber-400/10
            text-amber-300
            border
            border-amber-400/30
          "
        >
          Executive
        </span>
      )}

      {image ? (
        <img
          src={image}
          alt={name}
          className="w-36 h-36 rounded-full object-cover border-4 border-violet-500"
        />
      ) : (
        <div
          className="
            w-36
            h-36
            rounded-full
            bg-gradient-to-br
            from-violet-600
            to-purple-500
            flex
            items-center
            justify-center
            text-5xl
            font-bold
            text-white
          "
        >
          {name ? name.charAt(0) : "?"}
        </div>
      )}

      <h2 className="mt-6 text-2xl font-bold text-center">{name}</h2>
      <p className="text-purple-300 mt-1 text-lg text-center">{position}</p>

      {linkedin && (
        <div className="flex gap-4 mt-6">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-11 h-11
              flex items-center justify-center
              rounded-full
              bg-[#2A1B47]
              border border-purple-600/50
              text-gray-300
              transition-all
              duration-300
              hover:bg-purple-600
              hover:text-white
              hover:scale-110
              hover:shadow-[0_0_16px_rgba(168,85,247,0.6)]
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v6.44z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
