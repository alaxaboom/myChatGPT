import type { Message } from '../hooks/useChat'

type Props = {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-700/20 text-gray-300'
            : 'bg-gray-100/10 text-gray-300'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <p className="text-xs mt-1 text-gray-500">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}