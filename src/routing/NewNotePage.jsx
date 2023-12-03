import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiFetch from "../util/ApiFetch";
import Input from "../util/Input";
import Button from "../util/Button";

function NewNote() {
  const [title, setTitle] = useState("");
  const navigation = useNavigate();
  const [noteText, setNoteText] = useState("");
  const id = parseInt(localStorage.getItem("userId"));
  const [titleError, setTitleError] = useState("");

  const handleCreateNote = () => {
    if (!title.trim()) {
      setTitleError("Title can't be empty");
      return;
    }
    ApiFetch.createNote(id, title, noteText).then(() => {
      title ? navigation("/notes") : navigation("");
    });
  };

  return (
    <div className="sm:px-2 sm:gap-4 flex flex-col gap-8">
      <div className="sm:my-4 flex justify-center gap-12 items-center md:flex-col-reverse md:gap-2">
        <Button $to="/notes" $text="Back" />
        <p className="text-3xl font-bold mt-4">Create new note</p>
      </div>
      <Input
        $type="text"
        $placeholder="Title"
        $onDataChange={(value) => {
          setTitle(value);
          setTitleError("");
        }}
        $required={true}
      />
      {titleError && <div className="text-red-500">{titleError}</div>}
      <textarea
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={"Enter some text"}
        className="border-2 border-black p-1"
        rows={5}
      />
      <Button $text="Create" $handleOnClick={handleCreateNote} />
    </div>
  );
}

export default NewNote;
