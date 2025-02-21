import PostsForm from "./components/PostsForm.jsx";
import React, { useState } from 'react';

const App = () => {

  // Array di articoli aggiornato
  const initialArticlesArray = [
    {
      id: 1,
      titolo: "Le meraviglie del cosmo: esplorando l'universo",
      autore: "Alberto Angela",
      contenuto: "Un viaggio attraverso le galassie e i misteri dello spazio profondo.",
      categoria: "Scienza"
    },
    {
      id: 2,
      titolo: "Cucina italiana: ricette tradizionali rivisitate",
      autore: "Benedetta Parodi",
      contenuto: "Scopri come innovare i piatti classici della tradizione culinaria italiana.",
      categoria: "Cucina"
    },
    {
      id: 3,
      titolo: "Tecnologia verde: il futuro sostenibile",
      autore: "Marco Montemagno",
      contenuto: "Come le innovazioni tecnologiche stanno contribuendo a un pianeta più pulito.",
      categoria: "Ambiente"
    },
    {
      id: 4,
      titolo: "Arte contemporanea: tendenze e protagonisti",
      autore: "Vittorio Sgarbi",
      contenuto: "Un'analisi delle correnti artistiche moderne e dei loro principali esponenti.",
      categoria: "Arte"
    },
    {
      id: 5,
      titolo: "Viaggi low-cost: destinazioni imperdibili",
      autore: "Nicolò Balini",
      contenuto: "Consigli e trucchi per viaggiare il mondo senza spendere una fortuna.",
      categoria: "Viaggi"
    },
    {
      id: 6,
      titolo: "Innovazione digitale: esempi e trend del futuro",
      autore: "Gad Lerner",
      contenuto: "Esploriamo come la trasformazione digitale sta cambiando le nostre vite e quali sono le prospettive future.",
      categoria: "Tecnologia"
    }
  ];

  //  Nuovo articolo da aggiungere
  // {
  // id: 7,  
  // titolo: "Innovazione digitale: esempi e trend del futuro",
  // }

  // Gestore per l'aggiunta di un nuovo articolo  
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   setArticles([...articles, newArticle]);
  //   // azzero il valore di newArticle
  //   setNewArticle('');
  // }

  return (
    <div>< PostsForm articles={articles} /></div>
  )
}

export default App