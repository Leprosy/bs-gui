import { useState } from "react";
import style from "./style.module.css";

interface SearchProps {
  label: string;
  data: string[];
}

const SearchInput = ({ label, data }: SearchProps) => {
  const [classList, setClassList] = useState<string[]>([]);
  const [value, setValue] = useState("");

  // Listeners
  const onFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    const parent = ev.currentTarget.parentElement;
    parent?.querySelector(".dropdown-menu")?.classList.add("d-block");
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const parent = ev.target.parentElement;
      parent?.querySelector(".dropdown-menu")?.classList.remove("d-block");
    }, 150); // TODO: fix this fucking hack
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;
    setValue(newValue);

    if (newValue.length > 2) {
      setClassList(
        data.filter((item: string) => {
          return item.indexOf(newValue) >= 0;
        })
      );
    } else {
      setClassList([]);
    }
  };

  return (
    <div className="d-flex flex-column">
      <label>{label}</label>
      <input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      {classList.length > 0 ? (
        <div className="dropdown">
          <div className={`dropdown-menu d-block w-100 ${style.menu}`}>
            {classList.map((item: string, i: number) => (
              <a
                className="dropdown-item"
                onClick={(ev) => {
                  setValue(ev.currentTarget.innerText);
                }}
                key={i}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
