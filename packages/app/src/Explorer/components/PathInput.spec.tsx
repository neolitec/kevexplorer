import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { PathInput, PathInputProps } from './PathInput';

const createComponent = (props: PathInputProps) => {
  const utils = render(<PathInput {...props} />);
  const button = utils.getByRole('button') as HTMLButtonElement;
  const input = utils.getByPlaceholderText('Path to the folder') as HTMLInputElement;
  return {
    button,
    input,
  };
};

describe(PathInput, () => {
  const path = '/test/path';
  let onChange: jest.Mock;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should display an input', () => {
    createComponent({ onChange });
    expect(screen.getByPlaceholderText('Path to the folder')).toBeDefined();
  });

  it('should fill the input when path is given', () => {
    const { input } = createComponent({ onChange, path });
    expect(input.value).toEqual(path);
  });

  it('should disable the button and the input when disabled is true', () => {
    const { button, input } = createComponent({ onChange, disabled: true });
    expect(button.disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('should call onChange when submitted', () => {
    const { button, input } = createComponent({ onChange });
    fireEvent.change(input, { target: { value: path } });
    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(path);
  });
});
