import {movieSliceActions} from "../../movieSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getMovies} from "../../movie.api.service.ts";
import {searchMoviesByTitle} from "../../../search/search.api.service.ts";
import Header from "../../../../components/header/Header.tsx";
import Pagination from "../../../../components/pagination/Pagination.tsx";
import PosterPreview from "../PosterPreview.tsx";
import {searchSliceActions} from "../../../search/searchSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/appHooks.ts";
import styles from "./moviesList.module.css";

const MoviesList = () => {
    const dispatch = useAppDispatch();
    const {movies, loading, error, page, totalPages} = useAppSelector((store) => store.movie);
    const selectedMovies = useAppSelector((store) => store.search.selectedMovies);
    const selectedGenreId = useAppSelector((store) => store.genre.selectedGenreId);
    const navigate = useNavigate();
    const {searchPage, totalSearchPages} = useAppSelector((store) => store.search);
    const searchQuery = useAppSelector((store) => store.search.searchQuery);
    const isSearchActive = selectedMovies.length > 0;
    const paginationPage = isSearchActive ? searchPage : page;
    const paginationTotalPages = isSearchActive ? totalSearchPages : totalPages;

    const handlePageChange = (newPage: number) => {
        if (isSearchActive) {
            dispatch(searchSliceActions.setSearchPage(newPage));
        } else {
            dispatch(movieSliceActions.setPage(newPage));
        }
    };

    useEffect(() => {
        dispatch(getMovies({page, selectedGenreId}));
        dispatch(searchMoviesByTitle({query: searchQuery, page: searchPage}));
    }, [page, searchPage, searchQuery, selectedGenreId, dispatch]);

    const moviesToRender = selectedMovies.length > 0 ? selectedMovies : movies;

    return (
        <div>
            <Header/>
            <Pagination
                page={paginationPage}
                totalPages={paginationTotalPages}
                onPageChange={handlePageChange}
            />
            {loading && <p className={'loading'}>Loading movies...</p>}
            {error && <p className={'error'}>{error}</p>}
            <div className={styles.gridContainer}>
                {moviesToRender.map((movie) => (
                    <div className={'onClick'}
                        key={movie.id}
                        onClick={() => {
                            dispatch(movieSliceActions.setSelectedMovie(movie));
                            navigate(`/movies/${movie.id}`);
                        }}
                    >
                        <p className={styles.movieTitle}>{movie.title} <span
                            className={styles.star}>★</span>{movie.vote_average}
                        </p>

                        <PosterPreview
                            posterPath={movie.poster_path}
                            title={movie.title}
                            widthOfPoster={200}
                        />
                    </div>
                ))}</div>
            <Pagination
                page={paginationPage}
                totalPages={paginationTotalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MoviesList;
