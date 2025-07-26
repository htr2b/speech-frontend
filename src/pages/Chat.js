import React, { useState, useEffect } from 'react'
import api from '../api'
import { supabase } from '../supabase/client'
import '../App.css'

const Chat = () => {
    const [file, setFile] = useState(null)
    const [transcript, setTranscript] = useState('')
    const [summary, setSummary] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [summLoading, setSummLoading] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setToken(data.session?.access_token || '')
        })
    }, [])

    const handleChange = e => {
        setFile(e.target.files[0])
        setTranscript('')
        setSummary('')
        setError('')
    }

    const handleUpload = async () => {
        if (!file) return
        setLoading(true)
        setError('')
        setTranscript('')
        setSummary('')

        const formData = new FormData()
        formData.append('audio', file)

        try {
            const res = await api.post(
                '/speech/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...(token && { Authorization: `Bearer ${token}` })
                    }
                }
            )

            console.log('Upload response:', res.data)
            setTranscript(res.data.transcript || '')
        } catch (err) {
            console.error('Upload error:', err)
            setError(err.response?.data?.message || 'Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    const handleSummary = async () => {
        if (!transcript) return
        setSummLoading(true)
        setError('')
        setSummary('')

        try {
            const res = await api.get(
                '/speech/summary',
                {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    }
                }
            )

            console.log('Summary response:', res.data)
            setSummary(res.data.summary || '')
        } catch (err) {
            console.error('Summary error:', err)
            setError(err.response?.data?.message || 'Özet oluşturulurken hata oluştu')
        } finally {
            setSummLoading(false)
        }
    }

    return (
        <div className="chatWrapper">
            <div className="chat-container">
                <label className="upload-label">
                    Upload Audio File
                    <input type="file" onChange={handleChange} />
                </label>
                <button onClick={handleUpload} disabled={loading || !file}>
                    {loading ? 'Generating...' : 'Generate Text'}
                </button>
            </div>

            {transcript && (
                <div className="result-block">
                    <p className="result-prg">Transcript:</p>
                    <div className="audio-to-text">{transcript}</div>

                    <button
                        className="summary-btn"
                        onClick={handleSummary}
                        disabled={summLoading}
                    >
                        {summLoading ? 'Generating…' : 'Generate Summary'}
                    </button>
                </div>
            )}

            {summary && (
                <div className="result-block">
                    <p className="result-prg">Summary:</p>
                    <div className="audio-to-text">{summary}</div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Chat
