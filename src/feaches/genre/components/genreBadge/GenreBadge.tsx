import {FC} from "react";
import {IGenre} from "../models/IGenre.ts";
import Button from "../../../../components/button/Button.tsx";

type GenreBadgeProps = {
    genres?: IGenre[];
    genreIds?: number[],
    allGenres: IGenre[],
};

const GenreBadge: FC<GenreBadgeProps> = ({genreIds, allGenres, genres}) => {
    const matchedGenres = genres
        ? genres
        : genreIds
            ? allGenres.filter(genre => genreIds.includes(genre.id))
            : [];

    return (
        <div>
            {matchedGenres.map(genre => <Button key={genre.id} title={genre.name} disabled={true}/>)}
        </div>
    );
};

export default GenreBadge;
