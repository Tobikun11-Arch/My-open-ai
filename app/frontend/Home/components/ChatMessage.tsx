import { FC } from 'react'

interface ChatMessageProps {
  role: 'user' | 'bot'
  content: string
}

const ChatMessage: FC<ChatMessageProps> = ({ role, content }) => {
    return (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
            className={`max-w-[80%] p-3 rounded-lg ${
            role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
            <p className="break-words"><span className='text-blue-700 font-semibold'>{role === 'user' ? '' : 'Open-ai: '}</span> {content}</p>
        </div>
        </div>
    )
}

export default ChatMessage

