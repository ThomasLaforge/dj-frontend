import { useNavigate } from "react-router-dom";

interface IMusicProps {
    title: string;
    color: string;
    author: string;
    url: string;
    favorite: boolean;
    id: number;
}

export default function Music(props: IMusicProps) {
    const navigate = useNavigate()

    const handleGoModifyMusic = () => {
        navigate(`/modify-music/${props.id}`)
    }

    return <div className="music" style={{backgroundColor: props.color}} onClick={handleGoModifyMusic}>
            <div className="title">{props.title}</div>
            <div className="author">{props.author}</div>
            <div className="bottom-music">
                <div className="youtube-link">
                    <a href={props.url} target="blank">lien youtube</a>
                </div>
                <div className="favorite">{props.favorite}</div>
            </div>
        </div>
}