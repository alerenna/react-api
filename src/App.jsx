/* 

- [X] Creiamo una nuova applicazione con react e prepariamoci a fare il fetch dei posts.
- [] Al caricamento dell'applicazione, sfruttando l'hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo in una tabella.
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

  return (
    <>
      <h1>Blog</h1>

      <div className="container">
        <div className="row">

          {posts.map(post => (
            <div className="col">
              <div className="card">
                <div key={`post-${post.slug}`}>{post.title}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default App
