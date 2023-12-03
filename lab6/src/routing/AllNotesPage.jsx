import React, { Suspense } from "react";
/*import { AiFillEdit, AiFillRest } from "react-icons/ai";*/
import { Await, NavLink, useLoaderData } from "react-router-dom";
import ApiFetch from "../util/ApiFetch";
import Button from "../util/Button";
import Edit from "../../public/images/edit.png";
import Delete from "../../public/images/delete.png";
/*import styles from "../css/Styles.module.css";*/

export const loader = ({}) => {
  const id = localStorage.getItem("userId");
  const notesPromise = ApiFetch.getNotes(id);
  return { notesPromise };
};

export default function Notes() {
  const { notesPromise } = useLoaderData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={notesPromise}
        errorElement={
          <div>
            Oops, Notes not found... <NavLink to="..">Home</NavLink>
          </div>
        }
      >
        {(notes) => (
          <div>
            <p className="text-4xl font-bold mb-5">Notes</p>
            <Button $to="/notes/create" $text="Add a new note" />
            {notes
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((note) => (
                <NavLink key={note.id} to={`/notes/${note.id}/view`}>
                  <div
                    key={note.id}
                    className="flex bg-slate-300 items-start p-5 mt-5 mb-5 mt"
                  >
                    <div className="flex items-center break-all">
                      <p className="h-auto max-w-3xl">
                        <b>{note.title}</b>
                      </p>
                    </div>
                    <div className="absolute right-0 ml-8 mt-2 flex gap-4 md:static md:mt-auto ">
                      <p className="h-auto font-thin">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex">
                        <object>
                          <NavLink to={`/notes/${note.id}/edit`}>
                            <div className=" w-7 h-7">
                              <img src={Edit}></img>
                            </div>
                          </NavLink>
                        </object>
                        <object>
                          <NavLink
                            onClick={() => {
                              ApiFetch.deleteNote(note.id);
                            }}
                          >
                            <div className=" w-7 h-7">
                              <img src={Delete}></img>
                            </div>
                          </NavLink>
                        </object>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        )}
      </Await>
    </Suspense>
  );
}
