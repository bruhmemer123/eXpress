import React from "react";
const FacultyCard = ({ name, position, image }) => {
    return (
    <div
      className="
        w-80
        bg-white/5
        backdrop-blur-lg
        border
        border-purple-500/30
        rounded-3xl
        p-8
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
          w-40
          h-40
          rounded-full
          object-cover
          mx-auto
          border-4
          border-purple-500
          shadow-lg
        "
      />

      <h2 className="mt-6 text-2xl font-bold">
        {name}
      </h2>

      <p className="mt-2 text-violet-300 font-semibold">
        {position}
      </p>
    </div>
  );
}
export default  FacultyCard;