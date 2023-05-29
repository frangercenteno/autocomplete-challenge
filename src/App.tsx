import { useState } from "react";
import "./App.css";
import usePodcast from "./hooks/usePodcast";
import { TUserNormalized } from "./types";
import useOutsideClick from "./hooks/useClickOutSide";

function App() {
  const [char, setChar] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const { users } = usePodcast(char);
  const refOutSide = useOutsideClick(() => setIsActive(false));

  const handleSelectUser = (user: TUserNormalized) => {
    setChar(user.name);
    setIsActive(false);
  };

  const ContentItems = () => {
    if (!users.length) {
      return <div className="card-item">No data</div>;
    }

    return (
      <>
        {users.map((user) => (
          <button
            onClick={() => handleSelectUser(user)}
            className="card-item"
            key={user.id}
          >
            <div className="card-item__name">
              {user.name} | {user.email}
            </div>
          </button>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="card" ref={refOutSide}>
        <input
          className="card-search"
          type="text"
          placeholder="Find by user or email"
          value={char}
          onChange={(e) => setChar(e.target.value)}
          onClick={() => setIsActive(true)}
        />
        <div className="card-content">{isActive && <ContentItems />}</div>
      </div>
      <p className="read-the-docs">This project is built with Vite and React</p>
    </>
  );
}

export default App;
