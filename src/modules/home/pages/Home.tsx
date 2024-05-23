import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } else {
      navigate("/dashboard");
    }
  }, []);
  return <div>Home</div>;
};

export default Home;
