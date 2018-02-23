import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import {palette, Space} from '../../utils/' ;

export default function Err(props) {
    return (
        <div
            className='load-indic'
            style={{backgroundColor: '#c6c6c6'}}>
            <i
                className='mdi'
                style={{color: '#f44336', fontSize: 80}}>error_outline</i>
            <div style={{fontSize: '1.8em', margin: '.67rem 0', textAlign: 'center', fontWeight: 300}}>
                خطایی رخ داد.<br />
                {props.err &&
                    <b style={{
                            fontWeight: 500,
                            fontSize: '.85em'
                        }}>
                        {props.err}
                    </b>
                }
            </div>
            <Space height={15} />
            <Link to='/'>
                <RaisedButton
                    backgroundColor={palette.accent2Color}
                    labelColor='#fff'
                    label='خروج به صفحه اصلی' />
            </Link>
        </div>
    )
}
