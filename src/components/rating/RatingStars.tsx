import {baseUrl} from "../../constant_variables/vars.ts";
import {useState} from "react";
import {sendRating} from "./rating.api.service.ts";
import axios from "axios";
import {movieSliceActions} from "../../feaches/movie/movieSlice.ts";
import styles from "./ratingStar.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/appHooks.ts";

const RatingStars = () => {
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movie.selectedMovie);
    const userRatingMap = useAppSelector((state) => state.movie.userRating);
    const sessionId = localStorage.getItem('session_id');
    const isGuest = localStorage.getItem('guest');
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const currentUserRating = movie ? userRatingMap[movie.id] : null;

    const handleRatingChange = async (newRating: number) => {
        if (!sessionId || isGuest) {
            alert('You must be logged in to rate.');
            return;
        }

        if (currentUserRating !== undefined) {
            alert('You have already rated this movie.');
            return;
        }

        try {
            if (movie) {
                await sendRating(movie.id, newRating, sessionId);

                const savedRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
                if (movie.id) {
                    savedRatings[movie.id] = newRating;
                    localStorage.setItem('userRatings', JSON.stringify(savedRatings));
                }

                const response = await axios.get(`${baseUrl}movie/${movie.id}`);
                dispatch(movieSliceActions.setSelectedMovie(response.data));
                dispatch(movieSliceActions.setUserRating({movieId: movie.id, rating: newRating}));
            }
        } catch (error) {
            console.error('Error sending rating:', error);
            alert('Failed to submit rating. Please try again later.');
        }
    };

    const renderStars = () => {
        const totalStars = 10;
        const filledStars = hoveredRating ?? Math.round(movie?.vote_average || 0);
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={`${styles.star} ${i <= filledStars ? styles.filled : ''}`}
                    onClick={() => handleRatingChange(i)}
                    onMouseEnter={() => setHoveredRating(i)}
                    onMouseLeave={() => setHoveredRating(null)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    if (!movie) return <p className={'loading'}>Loading...</p>;

    return (
        <div>
            <div className={`${styles.ratingStars}`}>
                {renderStars()}
                <p><b>Rating:</b> {movie.vote_average} of {movie.vote_count} votes</p>
            </div>
            {sessionId && !isGuest && currentUserRating !== null && currentUserRating !== undefined && (
                <p>You rated the movie on {currentUserRating} stars</p>
            )}
        </div>
    );
};
export default RatingStars;