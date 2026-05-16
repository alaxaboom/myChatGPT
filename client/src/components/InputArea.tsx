import { Mic } from 'lucide-react'

type Props = {
  input: string
  setInput: (text: string) => void
  onSend: () => void
  isLoading: boolean
  isListening: boolean
  onVoiceStart: () => void
  onVoiceEnd: () => void
  hasMessages: boolean
}

export default function InputArea({
  input,
  setInput,
  onSend,
  isLoading,
  isListening,
  onVoiceStart,
  onVoiceEnd,
  hasMessages,
}: Props) {
  return (
    <div className={`p-6 transition-all duration-300 ${hasMessages ? 'fixed bottom-0 left-0 right-0 bg-blue-950 flex justify-center' : ''}`}>
      <div className={`w-full ${hasMessages ? 'max-w-3xl' : ''}`}>
        <div className="flex items-center gap-2 bg-blue-950 rounded-3xl pl-6 pr-0 py-0 border-2 border-blue-800">
          
          <button
            onMouseDown={onVoiceStart}
            onMouseUp={onVoiceEnd}
            onTouchStart={(e) => { e.preventDefault(); onVoiceStart() }}
            onTouchEnd={(e) => { e.preventDefault(); onVoiceEnd() }}
            className={`p-3 rounded-2xl transition-all ${
              isListening 
                ? 'bg-gray-500 text-white' 
                : 'bg-blue-950 text-gray-400'
            }`}
          >
            <Mic size={24} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
            placeholder="Ask whatever you want..."
            className="flex-1 bg-transparent outline-none text-lg text-gray-500 placeholder-gray-500"
            disabled={isLoading}
          />

          <button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            className="h-full py-5 px-6 bg-blue-700 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-700 transition-all"
          >
            <span className="text-2xl font-bold text-white">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  )
}