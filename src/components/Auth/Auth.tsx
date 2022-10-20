import React, { FC, useEffect } from 'react'
import { AuthProps } from './Auth.types'
import api from '../../api'
import useCookie from '../../hooks/useCookie'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { verify } from '../../features/user/userSlice'
import { Navigate } from 'react-router-dom'
import {CircularProgress} from '@mui/material'

const Auth : FC<AuthProps> = ({children}) => {
    const [cookie, setCookie] = useCookie('token');
    const {isLoggedIn, apiStatus} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
		if (apiStatus === 'idle' && cookie) {
			api.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
			dispatch(verify(cookie));
		}
	}, []);

    if (apiStatus === 'loading') {
		<CircularProgress />;
	} else if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

  return children;
}

export default Auth