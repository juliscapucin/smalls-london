"use client";

import { Business } from "../_types/business";
import { useEffect, useState } from "react";

type BusinessModalProps = {
  business: Business | null;
  onClose: () => void;
  onSave: (id: string, newBusiness: Partial<Business>) => void;
};

export default function BusinessModal({
  business,
  onClose,
  onSave,
}: BusinessModalProps) {
  const [newBusiness, setNewBusiness] = useState<Partial<Business>>({
    name: business?.name,
    description: business?.description,
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!business) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-background/90">
      <div className="p-8 w-1/2 max-w-modal mx-auto h-[80vh] mt-[10vh] bg-background">
        <h2 className="heading-headline">Edit Business</h2>
        <form
          onSubmit={() => {
            if (business.id) onSave(business.id, newBusiness!);
          }}
        >
          <label className="block mb-2">
            Business Name
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              value={newBusiness.name}
              onChange={(e) =>
                setNewBusiness({ ...newBusiness, name: e.target.value })
              }
            />
          </label>
          <label className="block mb-4">
            Description
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              value={newBusiness.description || ""}
              onChange={(e) =>
                setNewBusiness({ ...newBusiness, description: e.target.value })
              }
            />
          </label>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
