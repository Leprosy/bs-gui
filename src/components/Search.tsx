import { useEffect, useState } from "react";

interface SearchProps {
  label: string;
  data: string[];
}

const Search = ({ label, data }: SearchProps) => {
  const [classList, setClassList] = useState<string[]>([]);
  const [value, setValue] = useState("");

  /* useEffect(() => {
    if (value.length > 2) {
      console.log(
        data.filter((item: string) => {
          return item.indexOf(value) >= 0;
        })
      );
    }
  }, [value]); */

  return (
    <div>
      <label>{label}</label>
      <br />
      <input
        placeholder="Search..."
        value={value}
        onFocus={(ev) => {
          console.log(ev.target);
          ev.target?.nextElementSibling?.nextElementSibling?.firstChild?.classList?.add(
            "d-block"
          );
        }}
        onBlur={(ev) => {
          setTimeout(() => {
            ev.target?.nextElementSibling?.nextElementSibling?.firstChild?.classList?.remove(
              "d-block"
            );
          }, 300);
        }}
        onChange={(ev) => {
          console.log(ev.target);
          const newValue = ev.target.value;
          setValue(newValue);

          if (newValue.length > 2) {
            setClassList(
              data.filter((item: string) => {
                return item.indexOf(newValue) >= 0;
              })
            );
          }
        }}
      />
      <br />
      <div className="dropdown">
        <div className="dropdown-menu">
          {classList.map((item: string, i: number) => (
            <a
              className="dropdown-item"
              onClick={(ev) => {
                console.log(ev);
                setValue(ev.target.innerText);
              }}
              key={i}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
