import "./styles.scss";

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <div className="auth__header">
    <div className="auth__title">{title}</div>
    <div className="auth__subtitle">{subtitle}</div>
  </div>
);
