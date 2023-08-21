import React from 'react'
import './headline.css'

interface Props {
    className:string,
    headLine:string;
}

function headline({className,headLine}:Props) {
  return (
    <h1 className='headline'>{className:headLine}</h1>
  )
}
export default headline;