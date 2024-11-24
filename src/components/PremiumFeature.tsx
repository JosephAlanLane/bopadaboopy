import { useSubscription } from "@/hooks/useSubscription"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { SubscriptionButton } from "./SubscriptionButton"

interface PremiumFeatureProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PremiumFeature({ children, fallback }: PremiumFeatureProps) {
  const { isSubscribed, isLoading } = useSubscription()

  if (isLoading) {
    return null
  }

  if (!isSubscribed) {
    return fallback || (
      <Alert>
        <AlertTitle>Premium Feature</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>This feature is only available to premium subscribers.</p>
          <SubscriptionButton />
        </AlertDescription>
      </Alert>
    )
  }

  return children
}