import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getMovieById} from '../../movie.api.service.ts';
import Header from "../../../../components/header/Header.tsx";
import PosterPreview from "../PosterPreview.tsx";
import GenreBadge from "../../../genre/components/genreBadge/GenreBadge.tsx";
import {getGenres} from "../../../genre/genre.api.service.ts";
import RatingStars from "../../../../components/rating/RatingStars.tsx";
import Button from "../../../../components/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks/appHooks.ts";
import VideoPreview from "../videoPreview/VideoPreview.tsx";
import styles from "./movieListCard.module.css";
import Menu from "../../../../components/menu/Menu.tsx";
import ImagePreview from "../ImagePreview.tsx";
import CastPreview from "../cast/CastPreview.tsx";

const MovieListCard = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const {fullInfoSelectedMovie, loading} = useAppSelector(store => store.movie);
    const genres = useAppSelector(store => store.genre.genres);

    const movie = fullInfoSelectedMovie;

    useEffect(() => {
        if (!id) return;

        if (!fullInfoSelectedMovie || fullInfoSelectedMovie.id !== Number(id)) {
            dispatch(getMovieById(id));
        }

        if (genres.length === 0) {
            dispatch(getGenres());
        }
    }, [id, fullInfoSelectedMovie, dispatch, genres.length]);

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
            <div
                className={styles.backgroundWrapper}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
                }}
            >
                <div className={styles.overlay}/>

                <div className={styles.contentContainer}>
                    <div className={styles.posterWrapper}>
                        <PosterPreview posterPath={movie.poster_path} title={movie.title} widthOfPoster={400}/>
                    </div>

                    <div className={styles.textContent}>
                        <GenreBadge genres={movie.genres} allGenres={genres}/>
                        <h1>{movie.title}</h1>
                        <RatingStars/>
                        <p className={styles.fontSizeInfo}><i>{movie.tagline}</i></p>
                        <p><b>Release date:</b> {movie.release_date}</p>
                        <p><b>Budget:</b> {movie.budget}$</p>
                        <Button
                            width={'250px'}
                            title="Visit Homepage of Movie"
                            func={() => window.open(movie.homepage, "_blank")}
                        />

                        <p><b>Overview:</b> <span className={styles.fontSizeInfo}>{movie.overview}</span></p>
                        <p><b>Popularity:</b> {movie.popularity}</p>
                        <p><b>Revenue:</b> {movie.revenue}</p>
                        <p><b>Runtime:</b>{movie.runtime} min</p>
                        <p><b>Status:</b> {movie.status}</p>
                        <Button
                            width={'250px'}
                            title="View on IMDb"
                            func={() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
                        />
                        <p>
                            <b>Production companies: </b>
                            {movie.production_companies.map((pr, index) => (
                                <span key={index} style={{marginRight: '10px', display: 'inline-block'}}>
                                     {pr.name}
                                    {pr.logo_path && (
                                        <div style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            padding: '2px',
                                            display: 'inline-block',
                                            marginLeft: '5px',
                                        }}>
                                            <img
                                                width="35px"
                                                src={`https://image.tmdb.org/t/p/w400/${pr.logo_path}`}
                                                alt={`${pr.name} logo`}
                                            />
                                        </div>
                                    )}
                </span>
                            ))}
                        </p>
                        <p><b>Production countries: </b>
                            {movie.production_countries.map((pr, index) => (
                                <span key={index}>{pr.name}</span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            <CastPreview/>
            <VideoPreview/>
            <ImagePreview/>
        </div>
    );
};

export default MovieListCard;
