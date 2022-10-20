import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import useCookie from '../../hooks/useCookie';
import { Styled } from './Register.styled'
import { RegisterProps } from './Register.types'
import { clearStatus, register } from '../../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../elements/Input';
import {Box, CircularProgress} from '@mui/material';

const Register = () => {
    const [cookie, setCookie] = useCookie('token', '');
	const [formValues, setFormValues] = useState<RegisterProps>({
		username: '',
		password: '',
        passwordConfirm: '',
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
	}, [navigate, apiStatus]);

    function handleInput(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		apiMessage && dispatch(clearStatus());
		const { name, value } = event.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function handleRegister(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		if (apiStatus === 'idle') {
			dispatch(register({ ...formValues }));
		}
	}
  return (
    <Styled>
        <div className='card'>
            <Box component={'form'} autoComplete={'off'} onSubmit={handleRegister}>
                <h1>Register</h1>
                <Input
                    onChange={handleInput}
                    value={formValues['username']}
                    name= "username"
                    icon='person' 
                    type='text' 
                    placeholder='Enter your username' 
                    style={{marginBottom: '10px'}}
                />
                <Input
                    onChange={handleInput}
                    value={formValues['password']}
                    name= "password"
                    icon='lock' 
                    type='password' 
                    placeholder='Enter your password' 
                    style={{marginBottom: '10px'}}
                />
                <Input
                    onChange={handleInput}
                    value={formValues['passwordConfirm']}
                    name= "passwordConfirm"
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
                        Register Now
                    </button>
                )}
                <Link to="/login" className='link'>
                    Don't have an account? <span className='link-text'>Login</span>
                </Link>
            </Box>
        </div>
    </Styled>
  )
}

export default Register