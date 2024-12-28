import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DeliveryOptionsDialogProps {
  groceryItems: { [key: string]: any };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeliveryOptionsDialog = ({
  groceryItems,
  open,
  onOpenChange,
}: DeliveryOptionsDialogProps) => {
  const { toast } = useToast();

  const handleInstacartOrder = async () => {
    toast({
      title: "Coming Soon",
      description: "Instacart integration will be available soon!",
    });
    // TODO: Implement Instacart API integration
  };

  const handleAmazonFresh = () => {
    window.open('https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo', '_blank');
  };

  const handleWalmart = () => {
    window.open('https://www.walmart.com/grocery', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Delivery Service</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            className="w-full bg-[#0AAD0A] hover:bg-[#098F09] text-white"
            onClick={handleInstacartOrder}
          >
            Order with Instacart
          </Button>
          <Button
            className="w-full bg-[#FF9900] hover:bg-[#FF8C00] text-white"
            onClick={handleAmazonFresh}
          >
            Order with Amazon Fresh
          </Button>
          <Button
            className="w-full bg-[#0071DC] hover:bg-[#005CB8] text-white"
            onClick={handleWalmart}
          >
            Order with Walmart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};