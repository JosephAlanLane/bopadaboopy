import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ServingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  localServings: number;
  onServingsChange: (value: string) => void;
  onUpdateServings: () => void;
  onResetServings: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ServingsDialog = ({
  isOpen,
  onOpenChange,
  localServings,
  onServingsChange,
  onUpdateServings,
  onResetServings,
  onKeyPress,
}: ServingsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[250px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Input
              id="servings"
              type="number"
              min="1"
              max="99"
              value={localServings}
              onChange={(e) => onServingsChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="text-center"
            />
            <div className="flex gap-2">
              <Button 
                onClick={onUpdateServings}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Update
              </Button>
              <Button 
                onClick={onResetServings}
                variant="outline"
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};