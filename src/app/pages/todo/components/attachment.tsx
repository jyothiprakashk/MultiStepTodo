import React, { FC, Fragment } from "react";
import styles from "../styles/todo.page.module.scss";

interface AttachmentRenderProps {
  attachments: { name: string }[];
}

export const AttachmentRender: FC<AttachmentRenderProps> = ({ attachments }) => {
  return (
    <div className={attachments.length ? styles.attachmentWrapper : ""}>
      {attachments.map((file, index) => {
        return (
          <div key={index} className={styles.attachmentName}>
            {file.name}
          </div>
        );
      })}
    </div>
  );
};
