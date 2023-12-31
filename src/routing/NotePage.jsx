import React, { Suspense } from "react";
import { NavLink, useLoaderData, Await } from "react-router-dom";
import ApiFetch from "../util/ApiFetch";
import Button from "../util/Button";
import Edit from "../../public/images/edit.png";
import Delete from "../../public/images/delete.png";

export const loader = ({ params: { id } }) => {
  const notePromise = ApiFetch.getNote(id);
  return { notePromise };
};

export default function ViewNote() {
  const { notePromise } = useLoaderData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={notePromise}
        errorElement={
          <div>
            404: There is no such note. <NavLink to="../">Home</NavLink>
          </div>
        }
      >
        {(note) => {
          return (
            <div>
              <div
                className="md:block md:my-8 flex justify-center gap-12 items-center mb-5"
              >
                <Button $to="/notes" $text="Back"></Button>
                <p className="text-3xl font-bold break-all mt-4">
                  {note.title}
                </p>
                <div className="flex mt-3">
                  <NavLink to={`/notes/${note.id}/edit`}>
                    <div className=" w-7 h-7">
                      <img src={Edit}></img>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/notes"
                    onClick={() => {
                      ApiFetch.deleteNote(note.id);
                    }}
                  >
                    <div className=" w-7 h-7">
                      <img src={Delete}></img>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="p-10 min-h-max max-h-max text-left bg-slate-300">
                <p className="h-auto break-words">{note.text}</p>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
