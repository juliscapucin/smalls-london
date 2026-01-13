"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      const querySlug = query.trim().toLowerCase().replace(/\s+/g, "-");
      router.push(`/search/${encodeURIComponent(querySlug)}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-2">
      <Input
        className="bg-background rounded-full transition-opacity duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:pointer-events-none"
        type="text"
        autoFocus
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button
        variant="outline"
        size="icon"
        aria-label="Search"
        onClick={handleSearch}
      >
        <IconSearch />
      </Button>
    </div>
  );
}

const IconSearch = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1C13.4183 1 17 4.58172 17 9C17 10.962 16.2923 12.7577 15.1201 14.1494L18.9854 18.0146C19.2533 18.2828 19.2534 18.7173 18.9854 18.9854C18.7173 19.2534 18.2828 19.2533 18.0146 18.9854L14.1494 15.1201C12.7577 16.2923 10.962 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1ZM9 2.68457C5.51189 2.68457 2.68457 5.51189 2.68457 9C2.68457 12.4881 5.51189 15.3154 9 15.3154C12.4881 15.3154 15.3154 12.4881 15.3154 9C15.3154 5.51189 12.4881 2.68457 9 2.68457Z"
        fill="var(--foreground)"
      />
    </svg>
  );
};
