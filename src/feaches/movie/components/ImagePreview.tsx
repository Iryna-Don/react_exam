import { useAppDispatch, useAppSelector } from "../../../hooks/appHooks.ts";
import { useEffect } from "react";
import { getImages } from "../movie.api.service.ts";
import styles from "./videoPreview/videoPreview.module.css";
import ImageCarousel from "../../../components/imageCarousel/ImageCarousel.tsx";

const ImagePreview = () => {
    const dispatch = useAppDispatch();
    const fullInfoSelectedMovie = useAppSelector(
        (store) => store.movie.fullInfoSelectedMovie
    );
    const backdrops = useAppSelector((store) => store.movie.backdrops);

    useEffect(() => {
        if (fullInfoSelectedMovie?.id) {
            dispatch(getImages(fullInfoSelectedMovie.id));
        }
    }, [dispatch, fullInfoSelectedMovie?.id]);

    if (!fullInfoSelectedMovie) {
        return <div className={"loading"}>Loading movie info...</div>;
    }

    const backdropImages = backdrops.map((backdrop) => ({
        file_path: backdrop.file_path,
        altText: ``,
    }));

    return (
        <div className={styles.wrapper}>
            <ImageCarousel
                images={backdropImages}
                imageBaseUrl="https://image.tmdb.org/t/p/w500"
                altText="Movie Backdrop"
                imageWidth="250px"
                imageHeight="auto"
            />
        </div>
    );
};

export default ImagePreview;
