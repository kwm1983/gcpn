'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile: any
  }
}

export default function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    const render = () => {
      if (ref.current && window.turnstile && !widgetId.current) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: '0x4AAAAAACsKP_xDwopFAzU0',
          callback: (token: string) => onVerify(token),
          'expired-callback': () => onVerify(''),
          theme: 'dark',
        })
      }
    }

    if (window.turnstile) {
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = render
      document.head.appendChild(script)
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [])

  return <div ref={ref} className="mt-2" />
}
