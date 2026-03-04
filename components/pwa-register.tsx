"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

export function PWARegister() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failed silently
      })
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    const promptEvent = installPrompt as Event & {
      prompt: () => Promise<void>
      userChoice: Promise<{ outcome: string }>
    }
    await promptEvent.prompt()
    await promptEvent.userChoice
    setInstallPrompt(null)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-sm animate-in slide-in-from-bottom-4 md:bottom-6">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-bold text-card-foreground">Install App</p>
          <p className="text-xs text-muted-foreground">
            Add to home screen for quick access
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleInstall}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Install
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
