import React, { useState } from 'react'

interface Props { onSendCommand: (c: string) => void; isProcessing?: boolean }

export const CommandInput: React.FC<Props> = ({ onSendCommand, isProcessing = false }) => {
  const [command, setCommand] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim() || isProcessing) return
    onSendCommand(command.trim())
    setCommand('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={command} onChange={(e) => setCommand(e.target.value)} className="flex-1 px-4 py-2 rounded bg-gray-800 text-white" placeholder="Enter command..." />
      <button className="px-4 py-2 bg-blue-600 rounded" disabled={isProcessing || !command.trim()}>{isProcessing ? '...' : 'Send'}</button>
    </form>
  )
}

export default CommandInput
