import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon="info-circle"/> {alert.msg}
      </div>
    )
  )
}

export default Alert
