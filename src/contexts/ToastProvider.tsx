import { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export type TToastTypes = 'error' | 'success';

export interface IToast {
  _id: string;
  message: string;
  type: TToastTypes;
  time: Date;
  timeOut?: number; // in milliseconds
}

interface IToastContext {
  toasts: IToast[];
  createToast: (
    message: string,
    type?: TToastTypes,
    time?: Date,
    timeOut?: number
  ) => void;
  removeToast: (_id: IToast['_id']) => void;
}

const ToastContext = createContext({} as IToastContext);

export const useToasts = () => useContext(ToastContext);

interface IToastProviderProps {
  children: React.ReactNode;
}

const DEFAULT_TIMEOUT = 4 * 1000; // 5 seconds

export const ToastProvider = ({
  children,
}: IToastProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  // useEffect(() => {
  //   console.log('Update in ToastProvider!');
  //   console.log(toasts);
  // }, [toasts]);

  const createToast = (
    message: string,
    type: TToastTypes = 'success',
    time = new Date(),
    timeOut: number = DEFAULT_TIMEOUT
  ) => {
    setToasts((toasts) => [
      ...toasts,
      { _id: nanoid(), message, type, time, timeOut },
    ]);
  };

  const removeToast = (_id: string) => {
    setToasts((toastsState) =>
      [...toastsState].filter((toast) => toast._id !== _id)
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, createToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
