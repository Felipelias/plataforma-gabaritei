"use client"

import { ReactNode, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FullscreenOverlayProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  maxWidthClassName?: string
  containerClassName?: string
  contentClassName?: string
}

export function FullscreenOverlay({
  isOpen,
  onClose,
  children,
  maxWidthClassName = "max-w-6xl",
  containerClassName,
  contentClassName,
}: FullscreenOverlayProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = () => {
    onClose?.()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
        containerClassName,
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl",
          maxWidthClassName,
          contentClassName,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default FullscreenOverlay
