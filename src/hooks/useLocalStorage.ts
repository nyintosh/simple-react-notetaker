import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key);

		if (storedValue) {
			return JSON.parse(storedValue);
		}

		if (typeof initialValue === 'function') {
			return (initialValue as () => T)();
		}

		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [T, typeof setValue];
}
