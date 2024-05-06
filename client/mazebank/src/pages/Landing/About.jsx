import React from "react";

function About() {
  return (
    <div className="mx-32 flex flex-col items-center my-20 gap-y-10">
      <span className="text-5xl text-red font-medium">Organization</span>
      <p className="mx-64 text-2xl">
        Maze Bank, Internets largest bank, was established in 2020. Over the
        years, Maze Bank has rapidly grown its branch network and maintained its
        position as the largest private sector bank, serving customers
        worldwide.
      </p>
      <img src="/assets/images/about.png" alt="" />
      <p className="mx-64 text-4xl max-w-96">
        MAZE BANK IS SHAPING THE FUTURE THROUGH A PARADIGM SHIFT AS A
        'TECHNOLOGY COMPANY WITH A BANKING LICENSE'
      </p>
      <p className="mx-64 text-2xl mt-10">
        The Bank's multiple digital channels are helping it get closer to its
        customers through innovative and frictionless ways
      </p>
    </div>
  );
}

export default About;
