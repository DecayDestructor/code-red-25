import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ level, element }) => {
  const unlockedLevels = useSelector((state) => state.game.unlockedLevels);
  const latestUnlockedLevel = useSelector((state) => state.game.latestUnlockedLevel);

  if (unlockedLevels[level]) {
    return element;
  }

  return <Navigate to={`/${latestUnlockedLevel}`} />;
};

export default ProtectedRoute;
