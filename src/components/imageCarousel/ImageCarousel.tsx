import { useRef } from "react";
import styles from "./imageCarousel.module.css";

interface ImageCarouselProps {
    images: Array<{ file_path: string; altText: string; character?: string }>;
    imageBaseUrl: string;
    altText: string;
    imageWidth?: string;
    imageHeight?: string;
}

const ImageCarousel = ({
                           images,
                           imageBaseUrl,
                           altText,
                           imageWidth = "200px",
                           imageHeight = "300px",
                       }: ImageCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({
            left: -340,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({
            left: 340,
            behavior: "smooth",
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

            <div ref={carouselRef} className={styles.carousel}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div
                            key={index}
                            className={styles.imageCard}
                            style={{ width: imageWidth }}
                        >
                            <img
                                src={`${imageBaseUrl}${image.file_path}`}
                                alt={altText}
                                className={styles.carouselImage}
                                style={{ width: "100%", height: imageHeight }}
                            />
                            <div className={styles.imageDescription}>
                                <p>{image.altText}</p>
                                {image.character && <p><b>as</b> {image.character}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
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

export default ImageCarousel;
