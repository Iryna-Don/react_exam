import {FC} from "react";

type PosterProps = {
    widthOfPoster:number
    posterPath: string;
    title: string;
};
const PosterPreview:FC<PosterProps> = ({posterPath, title, widthOfPoster}) =>{
    const baseImgUrl = `https://image.tmdb.org/t/p/w${widthOfPoster}/`;
return (
        <div>
            <img src={baseImgUrl+posterPath} alt={title}/>
        </div>
    );
};

export default PosterPreview;