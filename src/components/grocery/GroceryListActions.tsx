import React, { useState } from "react";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { DeliveryOptionsDialog } from "./DeliveryOptionsDialog";

interface GroceryListActionsProps {
  onShare: (method: "sms" | "email" | "copy" | "calendar") => void;
  groceryItems: { [key: string]: any };
}

export const GroceryListActions = ({ onShare, groceryItems }: GroceryListActionsProps) => {
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button
        variant="outline"
        className="w-full bg-[#CD212A] hover:bg-[#B91C1C] text-gray-200 border border-gray-300"
        onClick={() => setIsDeliveryDialogOpen(true)}
      >
        Luigi's Delivery
      </Button>
      <DeliveryOptionsDialog
        groceryItems={groceryItems}
        open={isDeliveryDialogOpen}
        onOpenChange={setIsDeliveryDialogOpen}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-[#008C45] hover:bg-[#007038] text-gray-200 border border-gray-300"
          onClick={() => onShare("sms")}
        >
          Text
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-700"
          onClick={() => onShare("email")}
        >
          Email
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-[#CD212A] hover:bg-[#B91C1C] text-gray-200 border border-gray-300"
          onClick={() => onShare("copy")}
        >
          Copy
        </Button>
      </div>
      <Button
        variant="outline"
        className="w-full border border-gray-300 dark:border-gray-600"
        onClick={() => onShare("calendar")}
      >
        <CalendarIcon className="w-4 h-4 mr-2" />
        Add to Calendar
      </Button>
    </div>
  );
};
