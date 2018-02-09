import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import {palette, Space} from '../utils/'

export default function Err404() {
    return (
        <div className='load-indic'>
            <i className='mdi' style={{color: '#f44336', fontSize: 80}}>cloud_off</i>
            <div style={{fontSize: '1.8em', margin: '.67rem 0', textAlign: 'center', fontWeight: 300}}>
                <b>متأسفانه صفحه درخواست شده وجود ندارد.</b>
            </div>
            <Space height={15} />
            <Link to='/'>
                <RaisedButton backgroundColor={palette.accent2Color} labelColor='#fff' label='خروج به صفحه اصلی' />
            </Link>
        </div>
    )
}
