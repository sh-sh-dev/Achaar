import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {palette} from '../../utils/' ;

export default function Loading(props) {
    return (
        <div className='load-indic'>
            <CircularProgress size={120} thickness={6} color={palette.accent3Color} />
            <br />
            {props.text && <b>{props.text}</b>}
        </div>
    )
}
