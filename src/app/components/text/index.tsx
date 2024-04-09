import { FC } from "react";

import styles from "./text.module.scss";

export interface TextProps {
    content: string;
    type?: "title";
}

const Text: FC<TextProps> = ({ content, type = "", ...props }) => {
    return (
        <div className={`${styles["text"]} ${styles[type]}`} {...props}>
            {content}
        </div>
    );
};

export default Text;
