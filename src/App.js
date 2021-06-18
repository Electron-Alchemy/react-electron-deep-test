import React from 'react';

export default function App() {

    return (
        <>
            <h1>I am the App Component </h1>
            <button onClick={() => {
                electron.notificationApi.sendNotification("My Custom Notification!");
            }}>Notify</button>
        </>
    )
}