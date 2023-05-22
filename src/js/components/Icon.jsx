import React from 'react'

function icon({children , text , action}) {
  return (
    <div onClick={action} className='flex flex-col items-center'>
        {children }
        <i className='text-sm text-green-600 dark:text-green-500'>{text}</i>
    </div>
  )
}

export default icon