
import { Navigate } from 'react-router-dom';

// Redirect to the new home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
