import { useAppDispatch, useAppSelector } from "../../../../hooks/appHooks.ts";
import { useEffect } from "react";
import { getCast } from "../../movie.api.service.ts";
import styles from "./castPreview.module.css";
import ImageCarousel from "../../../../components/imageCarousel/ImageCarousel.tsx";

const CastPreview = () => {
    const dispatch = useAppDispatch();
    const { fullInfoSelectedMovie } = useAppSelector((state) => state.movie);
    const { cast, loadingCast, errorCast } = useAppSelector((state) => state.movie);

    useEffect(() => {
        if (fullInfoSelectedMovie?.id) {
            dispatch(getCast(fullInfoSelectedMovie.id));
        }
    }, [dispatch, fullInfoSelectedMovie?.id]);

    if (loadingCast) {
        return <div className={'loading'}>Loading cast...</div>;
    }
    if (errorCast) {
        return <div>{errorCast}</div>;
    }

    const castImages = cast.map((actor) => ({
        file_path: actor.profile_path,
        altText: actor.name,
        character: actor.character,
    }));

    return (
        <div className={styles.wrapper}>
            {cast.length > 0 ? (
                <ImageCarousel
                    images={castImages}
                    imageBaseUrl="https://www.themoviedb.org/t/p/w200"
                    altText="Actor"
                    imageWidth="150px"
                    imageHeight="230px"
                />
            ) : (
                <p className={'error'}>No actors available</p>
            )}
        </div>
    );
};

export default CastPreview;
