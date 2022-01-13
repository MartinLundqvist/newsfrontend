// import { useState } from 'react';
import { IToast, useToasts } from '../contexts/ToastProvider';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const ToastsWrapper = styled.div`
  position: sticky;
  inset: auto 0 0 0;
  z-index: 99999;
`;

// type ToastWrapperProps = {className: string};

export const Toasts = (): JSX.Element => {
  const { toasts, removeToast } = useToasts();
  //   const [test, setTest] = useState(false);

  return (
    <ToastsWrapper>
      {toasts.map((toast) => (
        <Toast
          key={toast._id}
          toast={toast}
          remove={() => removeToast(toast._id)}
        />
      ))}
    </ToastsWrapper>
  );
};

interface IToastWrapperProps {
  error: boolean;
}

const ToastWrapper = styled.div<IToastWrapperProps>`
  display: grid;
  place-content: center;
  width: 100%;
  height: 40px;
  background-color: ${(props) =>
    props.error ? 'var(--color-red)' : 'var(--color-green)'};
  font-family: 'Bebas Neue', cursive;
  font-size: 1rem;
  font-weight: 100;

  opacity: 0;
  transform: translateY(100%);
  transition: all 500ms ease-in-out;

  &.appear {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface IToastProps {
  toast: IToast;
  remove: () => void;
}

const Toast = ({ toast, remove }: IToastProps): JSX.Element => {
  const [classname, setClassname] = useState('');

  useEffect(() => {
    setClassname('appear');

    const timerOne = setTimeout(() => setClassname(''), toast.timeOut!);
    const timerTwo = setTimeout(() => remove(), toast.timeOut! + 500);

    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }, []);

  useEffect(() => {
    // console.log('Setting the timer to ' + toast.timeOut);
    // const timer = setTimeout(() => {
    //   remove();
    // }, toast.timeOut);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <ToastWrapper error={toast.type === 'error'} className={classname}>
      {toast.message}
    </ToastWrapper>
  );
};
