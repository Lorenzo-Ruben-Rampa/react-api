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
        tags: '',
        available: false
    });

    // gestion API
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
            }
            )
        //setMenu(res.data)
        // console.log(res)
        // console.log(res.data)
    }

    // useEffect
    useEffect(fetchPosts, []);
    // useEffect(() => {
    //     console.log("Eseguita");
    // }, []);

    // Modifica al gestore per l'aggiunta di un nuovo articolo in caso i campi non sono compilati
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPost.title) {
            const PostWithId = {
                ...newPost,
                id: menu.length ? menu[menu.length - 1].id + 1 : 1
            };
            setPosts((prevPosts) => [...prevPosts, PostWithId]);
            setNewPost({ title: '', content: '', image: '', tags: '', available: false });
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
        setNewPost((newPost) => ({
            ...newPost,
            [event.target.name]: value,
        }));
    }

    // //Rimuovere un post
    const removePost = (id) => {
        const updatedPosts = menu.filter((post) => menu.id !== id);
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
                            <p className="corsive">Tag: {post.tags.map((tag) => (tag))}</p>
                            <p>{post.contenuto}</p>
                            <div className="img-container"><img src={`http://localhost:3000${post.image}`} /></div>
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
                            onChange={handleInputChange}
                            placeholder="Inserisci il titolo" />
                    </label>
                    <label>
                        <p className="label-sm">Tag:</p>
                        <input
                            type="text"
                            name="tags"
                            value={newPost.tags}
                            onChange={handleInputChange}
                            placeholder="Inserisci i tag"
                        />
                    </label>
                    <label>
                        <p className="label-sm">Contenuto:</p>
                        <input
                            type="text"
                            name="content"
                            value={newPost.content}
                            onChange={handleInputChange}
                            placeholder="Inserisci il contenuto"
                        />
                    </label>
                    <label>
                        <p className="label-sm">Link immagine:</p>
                        <input
                            type="text"
                            name="image"
                            value={newPost.image}
                            onChange={handleInputChange}
                            placeholder="Inserisci link immagine"
                        />
                    </label>
                    <div className="checkbox-pb">
                        <label htmlFor="available">Pubblicato
                            <input
                                name="available"
                                checked={newPost.available}
                                onChange={handleInputChange}
                                id="available"
                                type="checkbox"
                            />
                        </label>
                    </div>
                    <span><input className="submit-bt" type="submit" value="Aggiungi Post" /></span>
                </form>
            </div>
        </>
    )
}

export default PostsForm