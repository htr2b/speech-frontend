import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'

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
    const isNewChat = window.location.pathname === '/chat/0'
    const token = localStorage.getItem('token')
    const API_URL = process.env.REACT_APP_API_URL
    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()

        const fetchOldChat = async () => {
            if (isNewChat || !token) {
                setTranscript('')
                setSummary('')
                setAudioUrl('')
                return
            }
            try {
                const res = await fetch(`${API_URL}/history`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: controller.signal
                },)

                const data = await res.json()

                if (!res.ok) {
                    setError(data.error || 'Sohbet yüklenemedi.')
                    return
                }

                const chat = data.find(c => String(c.id) === id)

                if (!chat) {
                    setError('Belirtilen sohbet bulunamadı.')
                    return
                }
                if (!isNewChat) {
                    setTranscript(chat.transcript || '')
                    setSummary(chat.summary || '')
                    setAudioUrl(chat.tts_url || '')
                }

            } catch (err) {
            }

        }

        fetchOldChat()

        return () => {
            controller.abort()
        }
    }, [id, token, isNewChat, API_URL])

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setTranscript('')
        setSummary('')
        setAudioUrl('')
        setError('')
    }

    const handleUpload = async () => {
        setLoading(true)
        setTranscript('')
        setSummary('')
        setAudioUrl('')
        setError('')
        try {
            const formData = new FormData()
            formData.append('audio', file)

            const res = await fetch(`${API_URL}/speech/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            })
            const resHistory = await fetch(`${API_URL}/history`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (resHistory.ok) {
                const data = await resHistory.json()
                navigate(`/chat/${data[0].id} `)
            }
            const data = await res.json()
            if (res.ok) {
                setTranscript(data.transcript)
            }
        } catch (err) {
            setError('Yükleme sırasında hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    const handleSummary = async () => {
        if (!transcript) return
        setSummLoading(true)
        setSummary('')
        setAudioUrl('')
        setError('')

        try {
            const res = await fetch(`${API_URL}/speech/summary`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token} ` }
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Özet oluşturulurken hata oluştu.')
            } else {
                setSummary(data.summary)
            }
        } catch (err) {
            console.error('Summary error:', err)
            setError('Özet alınırken hata oluştu.')
        } finally {
            setSummLoading(false)
        }
    }

    const handleConvert = async () => {
        if (!summary) return
        setTtsLoading(true)
        setError('')
        setAudioUrl('')

        try {
            const res = await fetch(`${API_URL}/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ summary })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'TTS başarısız oldu.')
            } else {
                setAudioUrl(data.audioUrl)
            }
        } catch (err) {
            console.error('TTS error:', err)
            setError('Ses dosyası oluşturulurken hata oluştu.')
        } finally {
            setTtsLoading(false)
        }
    }

    return (
        <div className="chatWrapper">
            {(!transcript) && (
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
