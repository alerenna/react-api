/* 

- [X] Creiamo una nuova applicazione con react e prepariamoci a fare il fetch dei posts.
- [X] Al caricamento dell'applicazione, sfruttando l'hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo in una tabella.
- [X]Attenzione! ricordati di impostare la CORS policy (leggi le slide)!

BONUS:
Implementare la funzionalità di cancellazione:
Aggiungi un pulsante nella tabella per ciascun post, al click del quale dovrai inviare una chiamata all'endpoint predisposto lato server per la rimozione di una risorsa.ß

*/

import { useState, useEffect } from 'react'


function App() {

  const [posts, setPosts] = useState([])

  function fetchPosts() {
    fetch('http://localhost:3003/api/v1/posts')
      .then((res) => res.json())
      .then(setPosts)
  }

  useEffect(fetchPosts, [])

  const handleDelete = (slug) => {
    fetch(`http://localhost:3003/api/v1/posts/${slug}`, { method: 'DELETE' })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter(post => post.slug !== slug));
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <>
      <header>
        <nav className="navbar bg-dark text-white">
          <div className="container bg-dark text-white">
            <div className='logo'>Giallo booleano</div>
          </div>
        </nav>
      </header>

      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Benvenuti nel nostro Blog di Cucina</h1>
          <p className="col-md-8 fs-4">
            Scopri ricette deliziose, consigli culinari e segreti per rendere ogni piatto un capolavoro.
            Unisciti a noi in questo viaggio tra sapori e tradizioni!
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Esplora le Ricette
          </button>
        </div>
      </div>

      <main>
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
            {posts.map(post => (
              <div key={`post-${post.slug}`} className="col d-flex">
                <div className="card h-100">
                  <img src={post.image} alt={post.name} className="card-img-top" />
                  <div className="card-body">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <div className="container">
                      <div className="tags">
                        {post.tags.map((tag, index) => (
                          <button key={`tag-${index}`} className='btn btn-primary m-1'>{tag}</button>
                        ))}
                      </div>
                      <button
                        className="btn btn-danger mt-5" onClick={() => handleDelete(post.slug)}>
                        Elimina Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
