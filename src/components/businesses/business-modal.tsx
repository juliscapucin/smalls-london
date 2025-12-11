"use client";

import { Tables } from "@/services/supabase/types/database";
import { useEffect, useState } from "react";

type BusinessModalProps = {
  business: Tables<"businesses"> | null;
  onClose: () => void;
  onSave: (id: string, newBusiness: Partial<Tables<"businesses">>) => void;
};

export default function BusinessModal({
  business,
  onClose,
  onSave,
}: BusinessModalProps) {
  const [newBusiness, setNewBusiness] = useState<Partial<Tables<"businesses">>>(
    {
      name: business?.name,
      description: business?.description,
    }
  );

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
      <div className="p-8 w-1/2 mx-auto h-[80vh] mt-[10vh] bg-background">
        <h2 className="heading-headline">Edit Business</h2>
        <form onSubmit={() => onSave(business.id, newBusiness!)}>
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
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
