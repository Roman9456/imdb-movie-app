import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Other() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/movies");
  }, [navigate]);

  return <div></div>;
}
