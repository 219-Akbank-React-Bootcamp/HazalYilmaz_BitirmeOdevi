import { useCallback, useEffect, useState } from 'react';

function useCookie(key: string, initialValue: string = ''): [string, any, any] {
	const readCookie = useCallback((): string => {
		let name = key + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return initialValue;
	}, [key, initialValue]);

	const [cookieState, setCookieState] = useState<string>(readCookie);

	const setCookie = useCallback(
		(value: string, maxAgeInDays: number): void => {
			document.cookie = `${key}=${value}; max-age=${
				60 * 60 * 24 * maxAgeInDays
			}`;

			setCookieState(value);
		},
		[key]
	);

	const deleteCookie = (): void => {
		document.cookie = `${key}=; max-age=-99999999;`;

		setCookieState('');
	};

	useEffect(() => {
		setCookieState(readCookie());
	}, []);

	return [cookieState, setCookie, deleteCookie];
}

export default useCookie;
