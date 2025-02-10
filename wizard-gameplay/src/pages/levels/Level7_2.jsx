import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameComponent from "../../game/GameApp";

const Level7_2 = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.search.includes("reloaded=true")) {
      window.location.replace(`${location.pathname}?reloaded=true`);
    }
  }, [location]);

  return (
    <div style={{ height: "100vh" }}>
      <GameComponent />
    </div>
  );
};

export default Level7_2;
