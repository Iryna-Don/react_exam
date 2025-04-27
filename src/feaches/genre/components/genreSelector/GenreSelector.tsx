import {ChangeEvent, useEffect} from "react";
import {genreSliceActions} from "../../genreSlice.ts";
import {getMovies} from "../../../movie/movie.api.service.ts";
import {movieSliceActions} from "../../../movie/movieSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/appHooks.ts";
import styles from './genreSelector.module.css';


const GenreSelector = () => {
    const dispatch = useAppDispatch();
    const {genres, selectedGenreId, loading, error} = useAppSelector((state) => state.genre);
    const searchQuery = useAppSelector((state) => state.search.searchQuery);
    const isSearchActive = searchQuery.trim().length > 0;

    useEffect(() => {
        dispatch(genreSliceActions.getGenres());
    }, [dispatch]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value === "all" ? null : Number(event.target.value);
        dispatch(genreSliceActions.setSelectedGenreId(selectedId))
        dispatch(movieSliceActions.setPage(1));
        dispatch(getMovies({ page: 1, selectedGenreId: selectedId }));
    };

    if (loading) return <p className={'loading'}>Loading genres...</p>;
    if (error) return <p className={'error'}>{error}</p>;
    const selectClassName = selectedGenreId !== null
        ? `${styles.selectStyled} ${styles.selectStyledBold}`
        : styles.selectStyled;

    return (
        <select
            className={selectClassName}
            value={selectedGenreId ?? "all"}
            onChange={handleChange}
            disabled={isSearchActive}
        >
            <option value="all" className={styles.optionBold}>
                All Genres
            </option>
            {genres.map((genre) => (
                <option
                    key={genre.id}
                    value={genre.id}
                >
                    {genre.name}
                </option>
            ))}
        </select>

    );
};

export default GenreSelector;
