import { useState, useEffect } from "react";
import axios from "axios";
import { IBroker } from "../../types";

const Home = () => {
  const [brokers, setBrokers] = useState<IBroker[]>([]);

  const getBrokers = async () => {
    try {
      const response = await axios.get("firms?firmType=broker");
      setBrokers(response.data.data); // Update to setBrokers(response.data)
    } catch (error) {
      console.error("Error fetching brokers:", error);
    }
  };

  useEffect(() => {
    getBrokers();
  }, []);
  return (
    <div>
      {brokers.map((broker) => (
        <div key={broker._id as React.Key}>
          <h1>{broker.name}</h1>
          <p>{broker.firmType}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
