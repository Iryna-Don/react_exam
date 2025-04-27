import { useAppDispatch, useAppSelector } from "../../../../hooks/appHooks.ts";
import { useEffect, useRef, useState } from "react";
import styles from "./videoPreview.module.css";
import {getVideos} from "../../movie.api.service.ts";

const VideoPreview = () => {
    const dispatch = useAppDispatch();
    const fullInfoSelectedMovie = useAppSelector(store => store.movie.fullInfoSelectedMovie);
    const videos = useAppSelector(store => store.movie.videos);

    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (fullInfoSelectedMovie?.id) {
            dispatch(getVideos(fullInfoSelectedMovie.id));
        }
    }, [dispatch, fullInfoSelectedMovie?.id]);

    if (!fullInfoSelectedMovie) {
        return <div className={'loading'}>Loading movie info...</div>;
    }

    const youtubeVideos = videos.filter(video => video.site === 'YouTube');

    const handlePlayVideo = (videoKey: string) => {
        setPlayingVideoId(videoKey);
    };

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({
            left: -340,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({
            left: 340,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.wrapper}>
            <button
                onClick={scrollLeft}
                className={`${styles.arrowButton} ${styles.leftArrow}`}
            >
                ‹
            </button>

            <div
                ref={carouselRef}
                className={styles.carousel}
            >
                {youtubeVideos.length > 0 ? (
                    youtubeVideos.map(video => (
                        <div
                            key={video.id}
                            className={styles.videoCard}
                        >
                            {playingVideoId === video.key ? (
                                <iframe
                                    width="320"
                                    height="180"
                                    src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                    title={video.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '8px' }}
                                />
                            ) : (
                                <div
                                    className={styles.previewContainer}
                                    onClick={() => handlePlayVideo(video.key)}
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                        alt={video.name}
                                        className={styles.previewImage}
                                    />
                                    <div className={styles.playButtonOverlay}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No YouTube videos available</p>
                )}
            </div>

            <button
                onClick={scrollRight}
                className={`${styles.arrowButton} ${styles.rightArrow}`}
            >
                ›
            </button>
        </div>
    );
};

export default VideoPreview;
