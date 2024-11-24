import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

export default function SubscriptionSuccess() {
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing. You now have access to premium features!",
    })
    
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate, toast])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Success!</h1>
      <p className="text-lg text-center mb-4">
        Thank you for subscribing. You now have access to all premium features!
      </p>
      <p className="text-sm text-gray-500">
        Redirecting you to the homepage...
      </p>
    </div>
  )
}