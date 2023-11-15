import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface IAuthorData {
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

export default function AddMusic() {
    const [title, setTitle] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [authors, setAuthors] = useState<IAuthorData[]>([])
    const [author, setAuthor] = useState<number>(0)
    const [url, setUrl] = useState<string>('')
    const [dateSortie, setDateSortie] = useState<string>('')
    const [favorite, setFavorite] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getAuthors = async () => {
            const response = await fetch('http://localhost:1337/api/chanteurs')
            const data = await response.json()
            setAuthors(data.data)
        }
        getAuthors()
    }, [])

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value)
    }

    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }

    const handleChangeFavorite = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFavorite(event.target.checked)
    }

    const hangleChangeAuthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(parseInt(event.target.value))
    }

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateSortie(event.target.value)
    }

    const handleAddMusic = useCallback(async () => {
        const response = await fetch('http://localhost:1337/api/musiques', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    titre: title,
                    couleur: color,
                    lien_youtube: url,
                    favori: favorite,
                    chanteur: author,
                    date_sortie: dateSortie
                }
            })
        })
        const data = await response.json()
        if(data.data.id) {
            navigate('/home')
        }
        else {
            setTitle('')
            setColor('')
            setUrl('')
            setFavorite(false)
            setAuthor(0)
            setDateSortie('')
        }
    }, [title, color, url, favorite, author, dateSortie, navigate])

    return <div className="add-music page">
        <div className="header">
            <h1>Ajouter une musique</h1>
        </div>

        <div className="form">
            <label htmlFor="titre">Titre</label>
            <input type="text" required name="titre" value={title} onChange={handleChangeTitle} />
            <label htmlFor="couleur">Couleur</label>
            <input type="color" required name="couleur" value={color} onChange={handleChangeColor} />
            <label htmlFor="url">Lien Youtube</label>
            <input type="text" required name="url" value={url} onChange={handleChangeUrl} />
            <label htmlFor="favorite">Favori</label>
            <input type="checkbox" required name="favorite" checked={favorite} onChange={handleChangeFavorite} />
            <label htmlFor="author">Auteur</label>
            <select name="author" required value={author} onChange={hangleChangeAuthor}>
                {authors.map((author: IAuthorData) => (
                    <option key={author.id} value={author.id.toString()}>{author.attributes.prenom} {author.attributes.nom}</option>
                ))}
            </select>
            <label htmlFor="date_sortie">Date de sortie</label>
            <input type="date" required name="date_sortie" value={dateSortie} onChange={handleChangeDate}/>

            <button onClick={handleAddMusic}>Ajouter une musique</button>
        </div>

    </div>
}