import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { useVoiceInput } from '../hooks/useVoiceInput'
import MessageBubble from './MessageBubble'
import InputArea from './InputArea'
import LoadingIndicator from './LoadingIndicator'

export default function ChatContainer() {
  const [input, setInput] = useState('')
  const { messages, isLoading, sendMessage } = useChat()
  const { isListening, startListening, stopListening } = useVoiceInput()

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleVoiceResult = (text: string) => {
    setInput(text)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col">
      <div className={`px-6 py-4 flex items-center transition-all duration-300 ${hasMessages ? 'border-b border-white/10 justify-start' : 'justify-center'}`}>
        {hasMessages && (
          <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center">
            <MessageSquare size={18} className="text-white fill-white" />
          </div>
        )}
      </div>

      {hasMessages ? (
        <div className="flex-1 flex flex-col p-6 items-start">
          <div className="w-full max-w-3xl mx-auto space-y-6 pb-32">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="w-full max-w-4xl mx-auto mb-9 text-left pl-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center">
                <MessageSquare size={18} className="text-white fill-white" />
              </div>
            </div>
            <h2 className="text-5xl font-semibold text-white">Hi there!</h2>
            <h2 className="text-5xl font-semibold text-white mt-7">What would you like to know?</h2>
            <p className="text-3xl text-gray-400 mt-7">Use one of the most common prompts below</p>
            <p className="text-3xl text-gray-400 mt-2">or ask your own question</p>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <InputArea
              input={input}
              setInput={setInput}
              onSend={handleSend}
              isLoading={isLoading}
              isListening={isListening}
              onVoiceStart={() => startListening(handleVoiceResult)}
              onVoiceEnd={stopListening}
              hasMessages={hasMessages}
            />
          </div>
        </div>
      )}

      {hasMessages && (
        <div className="w-full max-w-3xl mx-auto">
          <InputArea
            input={input}
            setInput={setInput}
            onSend={handleSend}
            isLoading={isLoading}
            isListening={isListening}
            onVoiceStart={() => startListening(handleVoiceResult)}
            onVoiceEnd={stopListening}
            hasMessages={hasMessages}
          />
        </div>
      )}
    </div>
  )
}