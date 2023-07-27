"use client";

import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "../icons/FilesIcon";
import Button from "../buttons/Button";
import { ChangeEvent, useState, DragEvent } from "react";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(123123);
    const files = event.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (event: DragEvent) => {
    const { type } = event;
    if (type === "dragenter") {
      setDragging(true);
    } else if (type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    console.log(23);
    setDragging(true);
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar name={username} image={image ?? ""} />
      <form>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrag={handleDrop}
        >
          <FilesIcon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption ..."}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
