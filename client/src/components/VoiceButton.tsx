import { Mic, MicOff } from 'lucide-react'

type Props = {
  isListening: boolean
  onVoiceClick: () => void
}

export default function VoiceButton({ isListening, onVoiceClick }: Props) {
  return (
    <button
      onClick={onVoiceClick}
      className={`p-3 rounded-full transition-all ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      title={isListening ? "Stop recording" : "Voice input"}
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  )
}