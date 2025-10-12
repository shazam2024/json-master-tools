import React, { useRef, useEffect } from 'react'
import { Editor as MonacoEditor } from '@monaco-editor/react'
import { FiCopy, FiDownload, FiUpload, FiRotateCcw } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface EditorProps {
  value: string
  onChange: (value: string | undefined) => void
  language?: string
  readOnly?: boolean
  placeholder?: string
  onCopy?: () => void
  onDownload?: () => void
  onUpload?: (content: string) => void
  onReset?: () => void
  title?: string
  className?: string
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  placeholder = 'Enter your content here...',
  onCopy,
  onDownload,
  onUpload,
  onReset,
  title = 'Editor',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Copied to clipboard!')
      onCopy?.()
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `content.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onDownload?.()
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onUpload?.(content)
        toast.success('File uploaded successfully!')
      }
      reader.readAsText(file)
    }
  }

  const handleReset = () => {
    onChange('')
    onReset?.()
    toast.success('Content reset!')
  }

  return (
    <div className={`editor-container ${className}`}>
      <div className="editor-header">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          {onReset && (
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              title="Reset"
            >
              <FiRotateCcw size={16} />
            </button>
          )}
          {onUpload && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleUpload}
                accept={language === 'json' ? '.json' : '.*'}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                title="Upload file"
              >
                <FiUpload size={16} />
              </button>
            </>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Copy to clipboard"
          >
            <FiCopy size={16} />
          </button>
          {onDownload && (
            <button
              onClick={handleDownload}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              title="Download file"
            >
              <FiDownload size={16} />
            </button>
          )}
        </div>
      </div>

      <MonacoEditor
        height="400px"
        language={language}
        value={value}
        onChange={onChange}
        theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </div>
  )
}

export default Editor
