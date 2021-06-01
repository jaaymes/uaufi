import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconType } from 'react-icons/lib';
import {DateFormat} from '../../utils/interfaces'


interface InputProps {
  name: string;
  icon?: IconType;
  mask: "data_nasc" | ""
  maxLength:number
}

export const Input = ({ name, icon: Icon, mask, maxLength, ...rest }: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField } = useField(name);

  const handleKeyUp = useCallback((event: React.FormEvent<HTMLInputElement>) => {

    if (mask === 'data_nasc') {
      DateFormat(event);
    }
    
  },
    [mask]
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);


  const handleInputBlur = useCallback(() => {
    setIsFocused(false);



    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onKeyUp={handleKeyUp}
        maxLength={maxLength} 
      />
    </Container>
  );
};

