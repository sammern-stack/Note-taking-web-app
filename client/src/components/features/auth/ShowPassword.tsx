import { useState } from "react";

import EyeIcon from "../../../assets/images/icon-show-password.svg?react";
import ClosedEyeIcon from "../../../assets/images/icon-hide-password.svg?react";

export const ShowPassword = () => {
  const [showPswd, setShowPswd] = useState<"show" | "hide">("hide");

  const togglePswd = () =>
    setShowPswd((prev) => (prev === "hide" ? "show" : "hide"));

  const ShowIcon = {
    show: EyeIcon,
    hide: ClosedEyeIcon,
  }[showPswd];

  return <ShowIcon className="form__show-password" onClick={togglePswd} />;
};
