import React, { FC } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  handleChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, ...props }) => {
  return (
    <label className='flex items-center space-x-2'>
      <input type='checkbox' className='form-checkbox' onChange={props.handleChange} {...props} />
      {label && (
        <span className='label' style={{ textDecoration: checked ? "line-through" : "none" }}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
