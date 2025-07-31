import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
export let historyChats = []
const Chat = () => {
    const [file, setFile] = useState(null)
    const [transcript, setTranscript] = useState('')
    const [summary, setSummary] = useState('')
    const [audioUrl, setAudioUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [summLoading, setSummLoading] = useState(false)
    const [ttsLoading, setTtsLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const isNewChat = id === '0'
    const token = localStorage.getItem('token')
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (isNewChat || !token) {
            setTranscript('')
            setSummary('')
            setAudioUrl('')
            return
        }

        const fetchOldChat = async () => {
            try {
                const res = await fetch(`${API_URL}/history`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    const chat = data.find(c => String(c.id) === id)

                    if (chat) {
                        setTranscript(chat.transcript || '')
                        setSummary(chat.summary || '')
                        setAudioUrl(chat.tts_url || '')
                    }
                }
            } catch (err) {
                console.error('Chat yüklenemedi:', err)
            }
        }

        fetchOldChat()
    }, [id, isNewChat, API_URL, token])

    const handleChange = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)

        if (newFile) {
            setTranscript('')
            setSummary('')
            setAudioUrl('')
            setError('')
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setLoading(true)
        setError('')
        setTranscript('')
        setSummary('')
        setAudioUrl('')

        try {
            const formData = new FormData()
            formData.append('audio', file)

            const uploadRes = await fetch(`${API_URL}/speech/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            })

            if (uploadRes.ok) {
                const data = await uploadRes.json()
                setTranscript(data.transcript)

                try {
                    const historyRes = await fetch(`${API_URL}/history`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })

                    if (historyRes.ok) {
                        const historyData = await historyRes.json()
                        historyChats = historyData
                        if (historyData[0]) {
                            navigate(`/chat/${historyData[0].id}`)
                        }
                    }
                } catch (historyErr) {
                    console.log('History güncellenemedi ama transcript geldi')
                }
            } else {
                const errorData = await uploadRes.json()
                setError(errorData.error || 'Upload failed')
            }
        } catch (err) {
            setError('Yükleme hatası')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSummary = async () => {
        if (!transcript) return

        setSummLoading(true)
        setError('')

        try {
            const res = await fetch(`${API_URL}/speech/summary?transcript_id=${id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.ok) {
                const data = await res.json()
                setSummary(data.summary)
            } else {
                const errorData = await res.json()
                setError(errorData.error || 'Özet hatası')
            }
        } catch (err) {
            setError('Özet hatası')
        } finally {
            setSummLoading(false)
        }
    }

    const handleConvert = async () => {
        if (!summary) return

        setTtsLoading(true)
        setError('')

        try {
            const res = await fetch(`${API_URL}/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ summary })
            })

            if (res.ok) {
                const data = await res.json()
                setAudioUrl(data.audioUrl)
            } else {
                setError('TTS hatası')
            }
        } catch (err) {
            setError('TTS hatası')
        } finally {
            setTtsLoading(false)
        }
    }

    return (
        <div className="chatWrapper">
            {!transcript && (
                <div className="chat-container">
                    <label className="upload-label">
                        Upload Audio File
                        <input type="file" accept="audio/*" onChange={handleChange} />
                    </label>
                    <button onClick={handleUpload} disabled={loading || !file}>
                        {loading ? 'Generating…' : 'Generate Text'}
                    </button>
                </div>
            )}

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
                    <div className="tts-section">
                        <button onClick={handleConvert} disabled={ttsLoading}>
                            {ttsLoading ? 'Converting…' : 'Convert to Audio File'}
                        </button>
                    </div>
                </div>
            )}

            {audioUrl && (
                <div className="audio-player">
                    <audio controls src={audioUrl} />
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Chat