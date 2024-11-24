import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

export default function SubscriptionCancel() {
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription process was cancelled. You can try again anytime!",
      variant: "destructive",
    })
    
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate, toast])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-gray-600 mb-4">Subscription Cancelled</h1>
      <p className="text-lg text-center mb-4">
        The subscription process was cancelled. You can try again anytime!
      </p>
      <p className="text-sm text-gray-500">
        Redirecting you to the homepage...
      </p>
    </div>
  )
}