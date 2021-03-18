import axios from 'axios';
import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option -> null(아무나), true(로그인 한 사람만), false(로그인 한 사람은 안 됨)

    function AuthenthicationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(auth()).then(response => {
            console.log(response)

            //로그인 하지 않은 상태
            if(!response.payload.isAuth) {
                if(option) {
                    props.history.push('/login')
                }
            } else {
                //로그인 한 상태
                if(adminRoute && !response.payload.isAdmin) {
                    props.history.push('/')
                } else {
                    if(option === false)
                    props.history.push('/')
                }
            }
        })
        

    }, [])
    return (
        <SpecificComponent />
    )
}


    return AuthenthicationCheck
}