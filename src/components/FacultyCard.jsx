import React from "react";
const FacultyCard = ({ name, position, image }) => {
  return (
    <div
      className="
        w-full
        max-w-[200px]
        sm:max-w-[220px]
        md:max-w-[240px]
        lg:max-w-[270px]
        p-7
        sm:p-8
        md:p-9
        lg:p-10
        bg-white/5
        backdrop-blur-lg
        border
        border-purple-500/30
        rounded-2xl
        sm:rounded-3xl
        flex
        flex-col
        items-center
        text-center
        transition
        duration-300
        hover:-translate-y-2
        hover:scale-105
        hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
      "
    >
      <img
        src={image}
        alt={name}
        className="
           w-20 h-20
    sm:w-22 sm:h-22
    md:w-24 md:h-24
    lg:w-28 lg:h-28
    xl:w-30 xl:h-30

    rounded-full
    object-cover
    border-2
    md:border-4
    border-violet-500
          shadow-lg
        "
      />

      <h2
        className="
          mt-4
          sm:mt-5
          md:mt-6
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
          leading-tight
        "
      >
        {name}
      </h2>

      <p
        className="
          mt-2
          text-sm
          sm:text-base
          text-violet-300
          font-semibold
        "
      >
        {position}
      </p>
    </div>
  );
};
export default FacultyCard;
