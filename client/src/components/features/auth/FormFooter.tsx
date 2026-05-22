import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface FormFooterProps {
  label: string;
  link: string;
  nav: string;
}

export const FormFooter = ({ label, link, nav }: FormFooterProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(link);

  return (
    <div className="auth__footer">
      <p>
        {label} <span onClick={handleOnClick}>{nav}</span>
      </p>
    </div>
  );
};
