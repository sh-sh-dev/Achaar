import React, {Fragment} from 'react';

const NewLine = (props) => {
    return props.text.split(props.delimiter || '\n').map(e => <Fragment>{e} <br /></Fragment>)
}

export default NewLine
