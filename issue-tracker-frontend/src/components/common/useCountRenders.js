import { useRef } from "react"

const useCountRenders = (componentName = "Component") => {
  const renders = useRef(1)
  console.info(`${componentName} renders: ${renders.current++}`)
}

export default process.env.NODE_ENV === "development"
  ? useCountRenders
  : () => {}
