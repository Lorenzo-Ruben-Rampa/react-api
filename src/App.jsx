import { useState } from 'react'

function App() {

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

  // useState
  const [articles, setArticles] = useState(initialArticlesArray);
  // const [newArticle, setNewArticle] = useState("");
  // Modifico in modo che l'array tratti oggetti, non più stringhe
  const [newArticle, setNewArticle] = useState({
    id: Number,
    titolo: '',
    autore: '',
    contenuto: '',
    categoria: '',
    available: false
  });

  // Gestore per l'aggiunta di un nuovo articolo  
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   setArticles([...articles, newArticle]);
  //   // azzero il valore di newArticle
  //   setNewArticle('');
  // }

  // Modifica al gestore per l'aggiunta di un nuovo articolo in caso i campi non sono compilati
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newArticle.titolo) {
      const articleWithId = {
        ...newArticle,
        id: articles.length ? articles[articles.length - 1].id + 1 : 1
      };
      setArticles((prevArticles) => [...prevArticles, articleWithId]);
      setNewArticle({ titolo: '', autore: '', contenuto: '', categoria: '', available: false });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  };

  //Definisco la funzione per l'onChange
  function handleInputChange(event) {
    //Aggiungo la checkbox nella logica InputChange
    const value =
      event.target.type === "checkbox" ?
        event.target.checked : event.target.value;
    setNewArticle((newArticle) => ({
      ...newArticle,
      [event.target.name]: value,
    }));
  }

  // //Rimuovere un articolo
  const removeArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  return (
    <>
      <div className="container">
        <ul>
          {articles.map((article) => (
            <li
              key={article.id}>
              <h2>{article.titolo}</h2>
              <p className="corsive">Scritto da: {article.autore}</p>
              <p>{article.contenuto}</p>
              <p className="category">{article.categoria.toUpperCase()}</p>
              {article.available && <p className="status">Pubblicato</p>}
              <button onClick={() => removeArticle(article.id)}>Cancella</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} action="/action_page.php" method="get">
          <label>
            <p className="label-sm">Titolo:</p>
            <input
              type="text"
              name="titolo"
              value={newArticle.titolo}
              onChange={handleInputChange}
              placeholder="Inserisci il titolo" />
          </label>
          <label>
            <p className="label-sm">Autore:</p>
            <input
              type="text"
              name="autore"
              value={newArticle.autore}
              onChange={handleInputChange}
              placeholder="Inserisci l'contenuto"
            />
          </label>
          <label>
            <p className="label-sm">Contenuto:</p>
            <input
              type="text"
              name="contenuto"
              value={newArticle.contenuto}
              onChange={handleInputChange}
              placeholder="Inserisci l'contenuto"
            />
          </label>
          <label>
            <p className="label-sm">Categoria:</p>
            <input
              type="text"
              name="categoria"
              value={newArticle.categoria}
              onChange={handleInputChange}
              placeholder="Inserisci la categoria"
            />
          </label>
          <div className="checkbox-pb">
            <label htmlFor="available">Pubblicato
              <input
                name="available"
                checked={newArticle.available}
                onChange={handleInputChange}
                id="available"
                type="checkbox"
              />
            </label>
          </div>
          <span><input className="submit-bt" type="submit" value="Aggiungi Articolo" /></span>
        </form>
      </div>
    </>
  )
}

export default App