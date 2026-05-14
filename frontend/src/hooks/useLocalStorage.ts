import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			// Jika ada di storage, parse JSON; jika tidak, gunakan initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error saat menload localStorage key “${key}”:`, error);
			return initialValue;
		}
	});

	// Fungsi setter yang membungkus versi aslinya
	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				setStoredValue(prev => {
					const valueToStore = value instanceof Function ? value(prev) : value;

					window.localStorage.setItem(key, JSON.stringify(valueToStore));

					return valueToStore;
				});
			} catch (error) {
				console.error(`Error set localStorage key “${key}”:`, error);
			}
		},
		[key],
	);

	return [storedValue, setValue] as const;
}
