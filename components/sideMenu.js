import Link from "next/link";
import { useState } from "react";
import Modal from "./modal";

import MovieCreateForm from "./movieCreateForm";

const SideMenu = (props) => {
  const { categories } = props;
  return (
    <div>
      <Modal hasSubmit={false}>
        <MovieCreateForm />
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
