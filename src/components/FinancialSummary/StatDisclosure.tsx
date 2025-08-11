// components/StatDisclosure.tsx
import { useState, ReactNode } from "react"; 
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../../helpers";

type Tone = "green" | "red" | "blue" | "purple";
const toneMap: Record<Tone, string> = {
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
};

type StatDisclosureProps = {
  title: string;
  value: number;
  tone?: Tone;
  children: ReactNode;   // contenido del “detalle”
  format?: boolean;
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function StatDisclosure({
  title,
  value,
  tone = "blue",
  children,
  format = true,
  open, 
  setOpen
}: StatDisclosureProps) {
  const toggle = () => setOpen((s) => !s);

  return (
    <div className={`rounded-xl shadow border border-black/5 ${toneMap[tone]}`}>
      {/* Header */}
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3"
        aria-expanded={open}
        aria-controls={`panel-${title}`}
      >
        <div className="text-left">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold leading-none mt-1">
            {format ? formatCurrency(value) : value}
          </p>
        </div>
        <ChevronDownIcon
          className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Panel (animado con max-height) */}
      <div
        id={`panel-${title}`}
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[540px]" : "max-h-0"}`}
      >
        <div className="px-4 pb-4 pt-0">
          <div className="rounded-lg bg-white/70 backdrop-blur p-3 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
