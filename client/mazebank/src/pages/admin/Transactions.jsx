import React from "react";
import { useEffect, useState } from "react";

function Transactions() {
  const [data, setData] = useState([{}]);

  useEffect(() => {}, []);

  return (
    <div className="mx-64 my-20 flex flex-col items-center gap-y-16">
      <span className="text-black font-poppins text-5xl font-medium">
        {typeof data.users === "undefined" ? (
          <p>Loading...</p>
        ) : (
          <p>User: {data.users[1]}</p>
        )}
      </span>
    </div>
  );
}

export default Transactions;
