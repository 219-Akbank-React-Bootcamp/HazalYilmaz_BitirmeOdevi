import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import useCookie from '../../hooks/useCookie';
import { Styled } from './Login.styled'
import { LoginProps } from './Login.types'
import { clearStatus, login } from '../../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../elements/Input';
import {Box, CircularProgress} from '@mui/material';

const Login = () => {
    const [cookie, setCookie] = useCookie('token', '');
	const [formValues, setFormValues] = useState<LoginProps>({
		username: '',
		password: '',
	});
    const { token, apiStatus, apiMessage } = useAppSelector(
		(state) => state.user
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
    useEffect(() => {
		if (apiStatus === 'succeeded') {
			dispatch(clearStatus());
			setCookie(token);
			navigate('/boards');
		}
	}, [apiStatus]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
        apiMessage && dispatch(clearStatus());
		const { name, value } = event.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
    }
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
		if (apiStatus === 'idle') {
			dispatch(login({ ...formValues }));
		}
    }
  return (
    <Styled>
        <div className='card'>
            <Box component={'form'} autoComplete={'off'} onSubmit={handleLogin}>
                <h1>Login</h1>
                <Input
                    onChange={handleChange}
                    value={formValues['username']}
                    name= "username"
                    icon='person' 
                    type='text' 
                    placeholder='Enter your username' 
                    style={{marginBottom: '10px'}}
                />
                <Input
                    onChange={handleChange}
                    value={formValues['password']}
                    name= "password"
                    icon='lock' 
                    type='password' 
                    placeholder='Enter your password' 
                    style={{marginBottom: '10px'}}
                />
                {apiStatus === 'loading' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <button className='btn btn-success submit' type="submit">
                        Log in
                    </button>
                )}
                <Link to="/register" className='link'>
                    Don't have an account? <span className='link-text'>Register</span>
                </Link>
            </Box>
        </div>
    </Styled>
  )
}

export default Login