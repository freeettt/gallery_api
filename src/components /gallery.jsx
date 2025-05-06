import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../api/photosApi';
import 'bulma/css/bulma.css'
import { Helmet } from "react-helmet";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos(page, 4);
      setPhotos(data);
      setLoading(false);
    };
    getPhotos();
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
    <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" 
          rel="stylesheet"
        />
    </Helmet>
    <div className="section">
      <h1 className="title has-text-centered" style={{fontSize: '60px', fontFamily: 'Press Start 2P'}}>Галерея</h1>

      {loading ? (
        <p className="has-text-centered">Завантаження...</p>
      ) : (
        <div className="columns is-multiline">
          {photos.map((photo) => (
            <div className="column is-one-quarter" key={photo.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={photo.download_url} alt={photo.author} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="subtitle is-20 is-size-1">Автор: {photo.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="buttons is-centered mt-5 ">
        <button className="button is-warning is-large" style={{width: '400px', height: '100px', fontSize: '50px'}} onClick={handlePrev} disabled={page === 1}>
          Попередні
        </button>
        <button className="button is-link is-large" style={{width: '400px', height: '100px', fontSize: '50px'}} onClick={handleNext}>
          Наступні
        </button>
      </div>
    </div>
    </>
  );
};

export default Gallery;
