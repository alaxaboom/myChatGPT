import { useState, useRef, useCallback } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortController = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    abortController.current = new AbortController()

    try {
      const res = await api.post('/chat', 
        { message: content.trim() },
        { signal: abortController.current.signal }
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.data.response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      if (error.name !== 'CanceledError' && error.name !== 'AbortError') {
        toast.error(error.response?.data?.error || 'Error getting response')
      }
    } finally {
      setIsLoading(false)
      abortController.current = null
    }
  }, [isLoading])

  const clearChat = () => setMessages([])

  const stopGenerating = () => {
    abortController.current?.abort()
    setIsLoading(false)
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    stopGenerating,
  }
}