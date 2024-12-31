import { PropsWithChildren, useState } from "react";
// import style from "./style.module.css";

interface ToggleContainerProps {
  label: string;
  startVisible?: boolean;
}

const ToggleContainer = ({ label, startVisible, children }: PropsWithChildren<ToggleContainerProps>) => {
  const [visible, setVisible] = useState<boolean>(startVisible || false);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <label className="fw-semibold">{label}</label>
        <span className="badge text-bg-dark" role="button" onClick={() => setVisible(!visible)}>
          {visible ? "-" : "+"}
        </span>
      </div>

      {visible ? <div>{children}</div> : ""}
    </div>
  );
};

export default ToggleContainer;
