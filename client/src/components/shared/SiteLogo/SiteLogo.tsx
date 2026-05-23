import logo from "../../../assets/images/logo.svg";

interface SiteLogoProps {
  wrapper: string;
}

export const SiteLogo = ({ wrapper }: SiteLogoProps) => {
  return (
    <div className={wrapper}>
      <img src={logo} alt="The site logo" />
    </div>
  );
};
