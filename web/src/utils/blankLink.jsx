import React from 'react'
import PropTypes from 'prop-types'

// Using target="_blank" without rel="noopener noreferrer" is a security risk.

const BlankLink = (props) => {
    return (
        <a {...props} target='_blank' rel="noopener noreferrer">{props.children}</a>
    )
}

export default BlankLink;
