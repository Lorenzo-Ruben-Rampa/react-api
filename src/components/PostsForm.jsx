import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'

const PostsForm = ({ articles, setArticles }) => {

    // Modifico in modo che l'array tratti oggetti, non più stringhe
    const [newArticle, setNewArticle] = useState({
        id: Number,
        titolo: '',
        autore: '',
        contenuto: '',
        categoria: '',
        available: false
    });

    // gestion API
    function fetchPosts() {
        axios.get("https://localhost:3000/posts/")
            .then((res) => setArticles(res.data))
        //setMenu(res.data)
        // console.log(res)
        // console.log(res.data)
    }

    // useEffect
    useEffect(fetchPosts, []);

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
            <h1>Il mio blog</h1>
            <div className="container">
                <div className="container">
                    {/* button richiesta API posts */}
                    <button onClick={fetchPosts}>Carica Post</button>
                    <ul>
                        {articles.map((post) => (
                            <li key={post.id}>{post.title}</li>
                        ))}
                    </ul>
                </div>
                {/* Ciclo articoli */}
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
                            placeholder="Inserisci l'autore"
                        />
                    </label>
                    <label>
                        <p className="label-sm">Contenuto:</p>
                        <input
                            type="text"
                            name="contenuto"
                            value={newArticle.contenuto}
                            onChange={handleInputChange}
                            placeholder="Inserisci il contenuto"
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

export default PostsForm