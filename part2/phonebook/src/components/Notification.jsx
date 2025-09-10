const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${message.isError ? 'error--true' : 'error--false'}`}>
        {message.message}
        </div>
    )
}

export default Notification