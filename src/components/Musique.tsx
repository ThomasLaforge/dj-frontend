interface IMusicProps {
    title: string;
    color: string;
    author: string;
    url: string;
    favorite: boolean;
    id: number;
}

export default function Music(props: IMusicProps) {
    return <div className="music" style={{backgroundColor: props.color}}>
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