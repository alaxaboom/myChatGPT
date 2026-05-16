export default function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#13223A] rounded-3xl px-6 py-4 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-gray-400 text-sm">Thinking...</span>
      </div>
    </div>
  )
}