import React from 'react'
import "../App.css"

const Chat = () => {

    return (
        <div className="chatWrapper">
            <div className="chat-container">
                <label className="upload-label">
                    Upload your Audio File
                    <input type="file" className="upload-input" />
                </label>
            </div>
            <p className='result-prg'>Audio to text result:</p>
            <div className="audio-to-text">
                {/* audio to text block */}
            </div>
        </div>
    )
}

export default Chat
