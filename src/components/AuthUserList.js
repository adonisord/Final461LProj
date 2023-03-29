import React from 'react'

function AuthUserList(props) {
    if(props.authUsers.length > 0) {
        return (
            <div className='scrollable-text'>
                {props.authUsers && props.authUsers.map(user => (
                    <h4 key={user}>{user}</h4>
                ))}
            </div>
      )
    } else {
        return (
            <h4>No authorized users</h4>
        )
    }
}

export default AuthUserList