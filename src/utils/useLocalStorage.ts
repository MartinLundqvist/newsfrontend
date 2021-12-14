import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T): T => {
  try {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : defaultValue;
  } catch (error) {
    console.log('Error!' + error);
    return defaultValue;
  }
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>((): T => {
    return getStorageValue<T>(key, defaultValue) as T;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error!' + error);
    }
  }, [key, value]);

  return [value, setValue];
};
