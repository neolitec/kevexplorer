import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CornerDownLeftIcon } from '../../icons/CornerDownLeftIcon';

export interface PathInputProps {
  disabled?: boolean;
  path?: string;
  onChange: (path: string) => void;
}

const Input = styled.input`
  flex: 1;
  border: 1px orange solid;
  border-radius: 4px;
  font-size: 1.4em;
  padding: 0.5em 0.8em;
  color: #555;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 166, 0, 0.5);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

const SubmitIcon = styled(CornerDownLeftIcon).attrs({ color: 'orange' })``;

const FormContainer = styled.form`
  display: flex;
  padding: 20px;
`;

export const PathInput: React.FC<PathInputProps> = ({ disabled, onChange, path }) => {
  const [value, setValue] = useState(path ?? '');

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onChange(value);
  };

  useEffect(() => {
    setValue(path ?? '');
  }, [path]);

  return (
    <FormContainer onSubmit={onSubmitHandler} role="search">
      <Input value={value} onChange={onChangeHandler} disabled={disabled} placeholder="Path to the folder" />
      <SubmitButton disabled={disabled} type="submit">
        <SubmitIcon />
      </SubmitButton>
    </FormContainer>
  );
};
