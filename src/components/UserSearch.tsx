"use client";

import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/spinner/GridSpinner";
import UserCard from "./ui/user/UserCard";
import useDebounce from "@/hooks/debounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debounceKeyword = useDebounce(keyword);

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debounceKeyword}`);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="flex flex-col items-center w-full max-w-2xl my-4">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full p-3 text-xl border border-gray-400 outline-none"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </form>
      {error && <p>오류 🙇‍♂️</p>}
      {isLoading && <GridSpinner />}
      {users && users.length === 0 && <p>사용자 없음 🥲</p>}
      {users && users.length > 0 && (
        <ul className="w-full p-4">
          {users.map((user, index) => (
            <li key={index}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
