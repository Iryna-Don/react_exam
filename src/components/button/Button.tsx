import { CSSProperties, FC } from 'react';
import styles from "./button.module.css";

type ButtonProps = {
    title: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    style?: CSSProperties;
    width?: string;
    func?: () => void;
    func1?: () => void;
    func2?: () => void;
};

const Button: FC<ButtonProps> = ({ title, type = 'button', disabled, width = 'auto', func, func1, func2 }) => {
    const handleClick = () => {
        if (disabled) return;
        func?.();
        func1?.();
        func2?.();
    };

    return (
        <button
            className={styles.btn}
            type={type}
            style={{ ...styles, width }}
            onClick={handleClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

export default Button;
