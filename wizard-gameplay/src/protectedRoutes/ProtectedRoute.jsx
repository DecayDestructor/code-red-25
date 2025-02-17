import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ level, element }) => {
  const unlockedLevels = useSelector((state) => state.game.unlockedLevels);
  const latestUnlockedLevel = useSelector((state) => state.game.latestUnlockedLevel);

  // console.log("Protected Route Check:", { level, unlockedLevels, latestUnlockedLevel }); // Debugging log

  if (unlockedLevels[level] === true) {
    return element;
  }

  return <Navigate to={latestUnlockedLevel} />;
};

export default ProtectedRoute;
