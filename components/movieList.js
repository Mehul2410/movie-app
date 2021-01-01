import React from "react";
import Link from "next/link";

class MovieList extends React.Component {
  shorten = (text) => {
    return text.substr(0, 100) + "...";
  };
  render() {
    const { movies } = this.props;

    return (
      <React.Fragment>
        {movies.map((movie) => {
          return (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <Link href="#">
                  <a>
                    <img className="card-img-top" src={movie.image} alt="" />
                  </a>
                </Link>

                <div className="card-body">
                  <h4 className="card-title">
                    <Link href="#">
                      <a>{movie.name}</a>
                    </Link>
                  </h4>

                  <p className="card-text">{this.shorten(movie.description)}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{movie.rating}</small>
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default MovieList;
