import { FC } from 'react';
import Button from "../button/Button.tsx";
import styles from "./pagination.module.css";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
                                                      page,
                                                      totalPages,
                                                      onPageChange
                                                  }) => {

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className={styles.pagination}>
            <Button
                title="← Prev"
                func={handlePrev}
                disabled={page === 1}
            />

            <span>{page} / {totalPages}</span>

            <Button
                title="Next →"
                func={handleNext}
                disabled={page === totalPages}
            />

        </div>
    );
};

export default PaginationComponent;
