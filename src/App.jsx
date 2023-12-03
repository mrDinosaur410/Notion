import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";
import ErrorPage from "./routing/ErrorPage";
import Layout from "./routing/Layout";
import HomePage from "./routing/HomePage";
import RequireAuth from "./components/RequireAuth";
import SignUpPage from "./routing/SignUpPage";
import LoginPage from "./routing/LoginPage";
import AllNotesPage from "./routing/AllNotesPage";
import NewNotePage from "./routing/NewNotePage";
import EditNotePage from "./routing/EditNotePage";
import NotePage from "./routing/NotePage";
import { loader as noteLoader } from "../src/routing/NotePage";
import { loader as notesLoader } from "../src/routing/AllNotesPage";
import { loader as noteEditLoader } from "../src/routing/EditNotePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/notes",
        loader: notesLoader,
        element: <AllNotesPage />,
      },
      {
        path: "/notes/create",
        element: <NewNotePage />,
      },
      {
        path: "/notes/:id/edit",
        loader: noteEditLoader,
        element: <EditNotePage />,
      },
      {
        path: "/notes/:id/view",
        loader: noteLoader,
        element: <NotePage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
