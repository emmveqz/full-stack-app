import {
  useEffect,
  useState,
} from "react"

type IScriptStatus =
  | "error"
  | "idle"
  | "loading"
  | "ready"

export const useExternalScript = (url: string): IScriptStatus => {
  const [status, setStatus] = useState<IScriptStatus>("loading")

  useEffect(() => {
    if (!url) {
      setStatus("idle")
      return
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`)

    const handleScript = (e: Event) => {
      setStatus(e.type === "load" ? "ready" : "error")
    }

    if (!script) {
      script = document.createElement("script")
      script.type = "application/javascript"
      script.src = url
      script.async = true
      document.body.appendChild(script)
      script.addEventListener("load", handleScript)
      script.addEventListener("error", handleScript)
    }

    script.addEventListener("load", handleScript)
    script.addEventListener("error", handleScript)

    return () => {
      script?.removeEventListener("load", handleScript)
      script?.removeEventListener("error", handleScript)
    }
  }, [url])

  return status
}
