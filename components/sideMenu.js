import Link from "next/link";
import { useState } from "react";
import Modal from "./modal";
import { createMovie } from "../actions";
import MovieCreateForm from "./movieCreateForm";

const SideMenu = (props) => {
  const { categories } = props;

  const handleCreateMovie = (movie) => {
    createMovie(movie).then((movies) => {
      console.log(JSON.stringify(movies));
    });
  };

  return (
    <div>
      <Modal hasSubmit={false}>
        <MovieCreateForm handleFormSubmit={handleCreateMovie} />
      </Modal>
      <h1 className="my-4">{props.appName}</h1>
      <div className="list-group">
        {categories.map((c) => {
          return (
            <Link key={c.id} href="/#">
              <a className="list-group-item">{c.name}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
