import { useNavigate } from 'react-router-dom'
export type NavigatePath = '/' | '/bot-log' | '/config-edit' | '/docs' | '/config-code' | '/setting'
export default function useGoNavigate() {
  const navigate = useNavigate()
  const navigateTo = (path: NavigatePath) => {
    navigate(path)
  }
  return navigateTo
}
