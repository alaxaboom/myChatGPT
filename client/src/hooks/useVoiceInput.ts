import { useState, useRef } from 'react'

interface SpeechRecognitionEvent {
  resultIndex: number
  results: Array<{ isFinal: boolean; 0: { transcript: string } }>
}

interface SpeechRecognitionErrorEvent {
  error: string
}

interface SpeechRecognitionInstance {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance
    webkitSpeechRecognition: new () => SpeechRecognitionInstance
  }
}

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const finalTranscriptRef = useRef('')

  const startListening = (onResult: (text: string) => void) => {
    try {
      finalTranscriptRef.current = ''

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognitionAPI) {
        alert('Browser does not support voice input')
        return
      }

      const recognition = new SpeechRecognitionAPI()

      recognition.lang = 'ru-RU'
      recognition.interimResults = true
      recognition.maxAlternatives = 1
      recognition.continuous = true

      recognition.onstart = () => {
        console.log('🎤 Recording started — SPEAK!')
        setIsListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log('📝 onresult triggered! Number of results:', event.results.length, 'resultIndex:', event.resultIndex)

        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          const transcript = result[0].transcript
          console.log(`📝 Result ${i}: isFinal=${result.isFinal}, transcript="${transcript}"`)

          if (result.isFinal) {
            finalTranscriptRef.current += transcript
            console.log('📝 Added to final text:', transcript)
          } else {
            interimTranscript += transcript
          }
        }

        if (interimTranscript.trim().length > 0) {
          console.log('📝 Interim text:', interimTranscript.trim())
          onResult(finalTranscriptRef.current + interimTranscript)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('❌ Recognition error:', event.error)
      }

      recognition.onend = () => {
        console.log('🏁 Recording completed')
        setIsListening(false)
        recognitionRef.current = null

        if (finalTranscriptRef.current.trim().length > 0) {
          console.log('✅ Sending final text:', finalTranscriptRef.current.trim())
          onResult(finalTranscriptRef.current.trim())
        }
      }

      recognitionRef.current = recognition
      console.log('🚀 Starting recognition.start()...')
      recognition.start()

    } catch (err: unknown) {
      console.error('Critical error:', err)
    }
  }

  const stopListening = () => {
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }, 600)

    setIsListening(false)
  }

  return { isListening, startListening, stopListening }
}