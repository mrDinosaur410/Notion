import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiFetch from "../util/ApiFetch";
import Input from "../util/Input";
/*import TextArea from "../util/TextArea";*/
import Button from "../util/Button";
/*import styles from "../css/Styles.module.css";*/

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
    <div>
      <div className="block my-8 md:flex md:justify-center md:gap-12 md:items-center"/*className={`${styles.titlePage}`}*/>
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
      {/* <TextArea $onDataChange={setNoteText} $placeholder="Enter some text" /> */}
      <textarea
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={"Enter some text"}
        rows={5}
      />
      <Button $text="Create" $handleOnClick={handleCreateNote} />
    </div>
  );
}

export default NewNote;