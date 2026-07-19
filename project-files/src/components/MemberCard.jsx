import React from "react";
import { FaLinkedinIn } from "react-icons/fa";

const MemberCard = ({ name, position, image, linkedin }) => {
  return (
    <div
    
        className="
    w-full
    max-w-[160px]
    sm:max-w-[180px]
    md:max-w-[210px]
    lg:max-w-[230px]
    xl:max-w-[250px]

    p-3
    sm:p-4
    md:p-5
    lg:p-6

    rounded-xl
    sm:rounded-2xl
    lg:rounded-3xl

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
  "
      
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="
            w-12 h-12
    sm:w-16 sm:h-16
    md:w-20 md:h-20
    lg:w-24 lg:h-24
    xl:w-26 xl:h-26

    rounded-full
    object-cover
    border-2
    md:border-4
    border-violet-500
          "
        />
      ) : (
        <div
          className="
          mt-2
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-28 lg:h-28
            rounded-full
            bg-gradient-to-br
            from-violet-600
            to-purple-500
            flex
            items-center
            justify-center
            text-sm
    sm:text-base
    md:text-lg
    lg:text-xl
            font-bold
            text-white
          "
        >
          {name ? name.charAt(0) : "?"}
        </div>
      )}

      <h2
        className="
          mt-2
          sm:mt-3
          text-base
          sm:text-lg
          md:text-xl
          font-bold
          text-center
          leading-tight
        "
      >
        {name}
      </h2>
      <p
        className="
          text-purple-300
          mt-1
           text-xs
    sm:text-sm
    md:text-base

          text-center
        "
      >
        {position}
      </p>

      {linkedin && (
        <div className="flex gap-4 mt-3 sm:mt-4">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-6 h-6
              sm:w-7 sm:h-7
              md:w-8 md:h-8
              flex items-center justify-center
              rounded-full
              bg-[#2A1B47]
              border border-purple-600/50
              text-gray-300
              text-xs
    sm:text-sm
    md:text-base
              transition-all
              duration-300
              hover:bg-purple-600
              hover:text-white
              hover:scale-110
              hover:shadow-[0_0_16px_rgba(168,85,247,0.6)]
            "
          >
            <FaLinkedinIn />
          </a>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
