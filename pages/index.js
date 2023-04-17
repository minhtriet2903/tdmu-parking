import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Admin from "./Admin/index";
import LandingPage from "../pages/LandingPage";
import { useState, useEffect } from "react";

export default function Home() {
  return <LandingPage />;
  // const [todo, setTodo] = useState("");

  // const [isEdit, setIsEdit] = useState(false);
  // const handleTodoChange = (e) => {
  //   setTodo(e.target.value);
  // };
  // //write
  // const writeToDatabase = () => {
  //   set(ref(db, `/id`), {
  //     todo,
  //   });
  //   setTodo("");
  // };
  // return (
  //   <div className="App">
  //     <input type="text" value={todo} onChange={handleTodoChange} />
  //     {isEdit ? (
  //       <>
  //         <button onClick={handleSubmitChange}>Submit Change</button>
  //         <button
  //           onClick={() => {
  //             setIsEdit(false);
  //             setTodo("");
  //           }}
  //         >
  //           X
  //         </button>
  //       </>
  //     ) : (
  //       <button onClick={writeToDatabase}>submit</button>
  //     )}
  //     {todos.map((todo) => (
  //       <>
  //         <h1>{todo.todo}</h1>
  //         <button onClick={() => handleUpdate(todo)}>update</button>
  //         <button onClick={() => handleDelete(todo)}>delete</button>
  //       </>
  //     ))}
  //   </div>
  // );
}
