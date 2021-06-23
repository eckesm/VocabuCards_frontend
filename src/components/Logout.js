import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../actions/auth';

export default function Logout(){

    const dispatch = useDispatch();
	const history = useHistory();
    dispatch(logoutUser())
    history.push('/');

}