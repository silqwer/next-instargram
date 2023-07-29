"use client";

import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "../icons/FilesIcon";
import Button from "../buttons/Button";
import { ChangeEvent, useState, DragEvent, FormEvent, useRef } from "react";
import Image from "next/image";
import GridSpinner from "../spinner/GridSpinner";
import { useRouter } from "next/navigation";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    setDragging(true);
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((response) => {
        if (!response.ok) {
          setError(`${response.status} ${response.statusText}`);
          return;
        }

        router.push("/");
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex flex-col items-center w-full max-w-xl mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[50%] bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100">
          {error}
        </p>
      )}
      <PostUserAvatar name={username} image={image ?? ""} />
      <form className="flex flex-col w-full mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 pointer-events-none bg-sky-500/20" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          ref={textRef}
          className="text-lg border outline-none border-neutral-300"
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
