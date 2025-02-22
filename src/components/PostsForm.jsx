import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'

const PostsForm = () => {

    // Stato degli articoli
    const [menu, setPosts] = useState([]);

    // Modifico in modo che l'array tratti oggetti, non più stringhe
    const [newPost, setNewPost] = useState({
        id: Number,
        title: '',
        content: '',
        image: '',
        tags: [],
        available: false
    });

    // gestion API
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => {
                // console.log(res.data);
                setPosts(res.data)
            }
            )
        //setMenu(res.data)
        // console.log(res)
        // console.log(res.data)
    }

    // useEffect
    useEffect(fetchPosts, []);

    // gestione info campi, tags
    function handleNewPost(event) {
        // gestione del value a seconda del tipo di input
        const value = event.target.name === "tags" ? event.target.value.split(",") : event.target.value;
        // setta tramite setState l'oggetto con le info prese dai campi del form
        setNewPost((currentNewPost) => ({
            ...currentNewPost,
            [event.target.name]: value,
        }));
    }

    // Modifica al gestore per l'aggiunta di un nuovo articolo in caso i campi non sono compilati
    const handleSubmit = (event) => {
        event.preventDefault();
        //chiamata verso le API in post con invio dati da backend
        axios.post("http://localhost:3000/posts", newPost)
            .then(res => {
                console.log(res.data);
            }
            )
            .catch(err => console.log(err))

        // if (newPost.title) {
        //     const PostWithId = {
        //         ...newPost,
        //         id: menu.length ? menu[menu.length - 1].id + 1 : 1
        //     };
        //     setPosts((prevPosts) => [...prevPosts, PostWithId]);
        //     setNewPost({ title: '', content: '', image: '', tags: [], available: false });
        // } else {
        //     alert('Per favore, compila tutti i campi.');
        // }
    };

    //Definisco la funzione per l'onChange
    // function handleInputChange(event) {
    //     //Aggiungo la checkbox nella logica InputChange
    //     const value =
    //         event.target.type === "checkbox" ?
    //             event.target.checked : event.target.value;
    //     setNewPost((newPost) => ({
    //         ...newPost,
    //         [event.target.name]: value,
    //     }));
    // }

    // //Rimuovere un post
    const removePost = (id) => {
        const updatedPosts = menu.filter((post) => post.id !== id);
        setPosts(updatedPosts);
    };

    return (
        <>
            <h1>Il mio blog</h1>
            <div className="container">
                {/* Ciclo post */}
                <ul>
                    {menu.map((post) => (
                        <li
                            key={post.id}>
                            <h2>{post.title}</h2>
                            <p className="corsive">Tag: {post.tags}</p>
                            <div className="img-container"><img src={`http://localhost:3000${post.image}`} /></div>
                            <p className="content">{post.content}</p>
                            {post.available && <p className="status">Pubblicato</p>}
                            <button onClick={() => removePost(post.id)}>Cancella</button>
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
                            name="title"
                            value={newPost.title}
                            onChange={handleNewPost}
                            placeholder="Inserisci il titolo" />
                    </label>
                    <label>
                        <p className="label-sm">Tag:</p>
                        <input
                            type="text"
                            name="tags"
                            value={newPost.tags.join(", ")}
                            onChange={handleNewPost}
                            placeholder="Inserisci i tag"
                        />
                    </label>
                    <label>
                        <p className="label-sm">Contenuto:</p>
                        <input
                            type="text"
                            name="content"
                            value={newPost.content}
                            onChange={handleNewPost}
                            placeholder="Inserisci il contenuto"
                        />
                    </label>
                    <label>
                        <p className="label-sm">Link immagine:</p>
                        <input
                            type="text"
                            name="image"
                            value={newPost.image}
                            onChange={handleNewPost}
                            placeholder="Inserisci link immagine"
                        />
                    </label>
                    <span><input className="submit-bt" type="submit" value="Aggiungi Post" /></span>
                </form>
            </div>
        </>
    )
}

export default PostsForm