import React from 'react'

const Alert = () => {
    return (
        <>
            <div className="alert alert-light bg-dark text-white alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" className="btn-primary btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                
            </div>
        </>
    )
}

export default Alert