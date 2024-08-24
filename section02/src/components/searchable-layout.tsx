import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

type SearchableLayoutProps = {
  children: ReactNode;
};

const SearchableLayout: React.FC<SearchableLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { q } = router.query;

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput((q as string) ?? "");
  }, [q]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    if (!input || q === input) return;
    router.push(`/search?q=${input}`);
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력하세요 ..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButtonClick}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
