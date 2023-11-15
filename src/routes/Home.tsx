import { Link } from "react-router-dom";
import Music from "../components/Musique";
import { useEffect, useState } from "react";

interface IMusicData {
    id: number;
    attributes: {
        titre: string;
        couleur: string;
        favori: boolean;
        lien_youtube: string;
        date_sortie: string;
        chanteur: {
            data: {
                id: number;
                attributes: {
                    nom: string;
                    prenom: string;
                    date_naissance: string;
                    createdAt: string;
                    updatedAt: string;
                    publishedAt: string;
                }
            }
        }
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}

export default function Home() {
    const [favoritesMusics, setFavoritesMusics] = useState<IMusicData[]>([])
    const [lastMusics, setLastMusics] = useState<IMusicData[]>([])

    useEffect(() => {
        const getFavoritesMusics = async () => {
            const response = await fetch('http://localhost:1337/api/musiques?filters[favori][$eq]=true&populate=chanteur')
            const data = await response.json()
            setFavoritesMusics(data.data)
        }
        getFavoritesMusics()
    }, [])

    useEffect(() => {
        const getLastMusics = async () => {
            const response = await fetch('http://localhost:1337/api/musiques?sort=createdAt:desc&populate=chanteur')
            const data = await response.json()
            setLastMusics(data.data)
        }
        getLastMusics()
    }
    , [])


    return <div className="home page">
        <div className="header">
            <h1>Home</h1>
            <Link className="btn-add" to="/add-music">+</Link>
        </div>

        <div className="music-favorites">
            <h2>Mes musiques préférées :</h2>
            <div className="music-list">
                {favoritesMusics.map((music) => (
                    <Music 
                        key={music.id}
                        title={music.attributes.titre}
                        color={music.attributes.couleur}
                        author={`${music.attributes.chanteur.data.attributes.prenom} ${music.attributes.chanteur.data.attributes.nom}`}
                        favorite={music.attributes.favori}
                        url={music.attributes.lien_youtube}
                        id={music.id}
                    />
                ))}
            </div>
        </div>

        <div className="last-musics">
            <h2>Les dernières musiques ajoutées :</h2>
            <div className="music-list">
                {lastMusics.map((music) => (
                    <Music 
                        key={music.id}
                        title={music.attributes.titre}
                        color={music.attributes.couleur}
                        author={`${music.attributes.chanteur.data.attributes.prenom} ${music.attributes.chanteur.data.attributes.nom}`}
                        favorite={music.attributes.favori}
                        url={music.attributes.lien_youtube}
                        id={music.id}
                    />
                ))}
            </div>
        </div>
    </div>
}