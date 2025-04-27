import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getMovieById} from '../../movie.api.service.ts';
import Header from "../../../../components/header/Header.tsx";
import PosterPreview from "../PosterPreview.tsx";
import GenreBadge from "../../../genre/components/genreBadge/GenreBadge.tsx";
import {getGenres} from "../../../genre/genre.api.service.ts";
import RatingStars from "../../../../components/rating/RatingStars.tsx";
import Button from "../../../../components/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks/appHooks.ts";
import styles from "./movieInfo.module.css";
import Menu from "../../../../components/menu/Menu.tsx";

const MovieInfo = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {selectedMovie, loading} = useAppSelector(store => store.movie);
    const genres = useAppSelector(store => store.genre.genres);

    const movie = selectedMovie;

    useEffect(() => {
        if (!id) return;

        if (!selectedMovie || selectedMovie.id !== Number(id)) {
            dispatch(getMovieById(id));
        }
        dispatch(getGenres());
    }, [id, selectedMovie, dispatch]);

    if (loading || !movie) {
        return (
            <div>
                <Header/>
                <p className={'loading'}>Loading movie...</p>
            </div>
        );
    }

    return (
        <div>
            <Menu/>
            <div className={`${styles.movieInfoWrapper} rowContainer`}>
                <div>
                    <PosterPreview posterPath={movie.poster_path} title={movie.title}
                                   widthOfPoster={300}/>
                </div>
                <div className={'columnContainer'}>
                    <GenreBadge genreIds={movie.genre_ids} allGenres={genres}/>
                    <div className={styles.infoBlock}>
                        <h1>{movie.title}</h1>
                        <RatingStars/>
                        <p><strong>Release date:</strong> {movie.release_date}</p>
                        <p className={styles.overview}><strong>Overview:</strong> <span className={styles.fontSizeInfo}>{movie.overview}</span></p>
                    </div>
                    <Button
                        title="Details"
                        func={() => navigate(`/movies/${movie.id}/details`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;