"use client"

import { useState, useEffect } from "react"

/**
 * Hook customizado para verificar se a tela corresponde a uma query de mídia (padrão para mobile).
 * @param query - A string da media query a ser verificada. O padrão é '(max-width: 768px)'.
 * @returns `true` se a media query for correspondida, `false` caso contrário.
 */
export function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Garante que o código só rode no cliente
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)
    const handleResize = () => setIsMobile(mediaQuery.matches)

    // Define o estado inicial
    handleResize()

    // Adiciona o listener para mudanças de tamanho da tela
    mediaQuery.addEventListener("change", handleResize)

    // Limpa o listener ao desmontar o componente
    return () => {
      mediaQuery.removeEventListener("change", handleResize)
    }
  }, [query])

  return isMobile
}
