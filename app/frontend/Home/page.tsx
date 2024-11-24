'use client'

import {  SendHorizontal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'

export default function Home() {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=> {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        setMessages(prev => [...prev, { role: 'user', content: input }])
        setInput('')
        setIsLoading(true)

        try {    
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    content: input
                })
            })
            setIsLoading(false)
            const data = await response.json()
            setMessages(prev => [
                ...prev,
                {role: 'bot', content: data.message}
            ])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="h-screen bg-white">
            <main className="flex flex-col h-screen p-4 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-black">My OpenAI</h1>
            <div className="flex-grow bg-white overflow-auto p-4 mb-4 space-y-4" aria-live="polite">
                {messages.map((message, index) => (
                <ChatMessage key={index} role={message.role} content={message.content} />
                ))}
                {isLoading && <ChatMessage role="bot" content="Thinking..." />}
                <div ref={bottomRef}/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 h-16">
                <label htmlFor="user-input" className="sr-only">Message Open-ai...</label>
                <textarea
                id="user-input"
                className="flex-grow  outline-none text-black bg-white p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Message Open-ai..."
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                    }
                }}
                />
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                <SendHorizontal />
                </button>
            </form>
            </main>
        </div>
    )
}


