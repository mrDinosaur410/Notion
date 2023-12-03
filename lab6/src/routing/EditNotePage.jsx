import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import ApiFetch from "../util/ApiFetch";
import Input from "../util/Input";
import Button from "../util/Button";

export const loader = ({ params: { id } }) => {
  const notePromise = ApiFetch.getNote(id);
  return { notePromise };
};

export default function EditNote() {
  const { notePromise } = useLoaderData();
  const { id } = useParams();
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (notePromise) {
          const data = await notePromise;
          setTitle(data.title);
          setText(data.text);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [notePromise]);

  const handleEdit = () => {
    if (!title.trim()) {
      setTitleError("Title can't be empty");
      return;
    }
    ApiFetch.editNote(id, title, text).then(() => {
      title ? navigation("/notes") : navigation("");
    });
  };

  return (
    <div>
      <div className="block my-8 md:flex md:justify-center md:gap-12 md:items-center">
        <Button $to="/notes" $text="Back" />
        <p className="text-3xl font-bold mt-4">Edit note</p>
      </div>
      <Input
        $value={title}
        $type={"text"}
        $placeholder={"title"}
        $onDataChange={setTitle}
      />
      {titleError && <div className="text-red-500">{titleError}</div>}
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder={"Enter some text"}
        rows={5}
      />
      <Button $text="Save" $handleOnClick={handleEdit} />
    </div>
  );
}
