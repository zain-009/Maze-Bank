import React from "react";
import Card from "../../components/Card/Card";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="shadow-sm pb-8 font-poppins">
        <div className="mx-32 my-10 flex flex-row justify-between items-center">
          <div className="flex flex-col gap-y-5">
            <span className="text-7xl mr-32 font-medium text-outer">
              Digital Banking Made For A Better Future
            </span>
          </div>
          <img className="h-96" src="/assets/images/cards.png" alt="" />
        </div>
      </div>
      <div className="mx-32 my-16">
        <div className="flex justify-start">
          <Card
            number={"01"}
            title={"Secure Banking"}
            description={"Keep your money safe and secure"}
            icon={"/assets/icons/wallet.png"}
          />
        </div>
        <div className="flex justify-center">
          <Card
            number={"02"}
            title={"Safe Transfer"}
            description={"Safe and encrypted money transfers"}
            icon={"/assets/icons/credit-card.png"}
          />
        </div>
        <div className="flex justify-end">
          <Card
            number={"03"}
            title={"Real Partnership"}
            description={"Get expert advice from experienced financial experts"}
            icon={"/assets/icons/team.png"}
          />
        </div>
      </div>
      <div className="mx-32 my-16 flex justify-between items-center">
        <img
          src="/assets/images/specialcard.png"
          alt="founders-club-card"
          className="h-96"
        />
        <span className="text-5xl max-w-96 font-bold text-outer">
          Hurry up and join the founders club and get the premium card
        </span>
      </div>
    </div>
  );
}

export default Home;
