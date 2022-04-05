import { FC } from "react";
import { Link } from "react-router-dom";

const AboutPage: FC = () => {
  return (
    <div>
      <h1>AboutPage</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default AboutPage;
