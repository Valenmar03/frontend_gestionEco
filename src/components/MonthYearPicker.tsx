// components/MonthYearPicker.tsx
import { useMemo } from "react";

const MONTHS = [
  "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"
];

type Props = {
  value: string;                 // "YYYY-MM"
  onChange: (v: string) => void; // devuelve "YYYY-MM"
  minYear?: number;
  maxYear?: number;
};

export default function MonthYearPicker({
  value,
  onChange,
  minYear,
  maxYear,
}: Props) {
  const [y, m] = value.split("-").map(Number);

  const now = new Date();
  const years = useMemo(() => {
    const start = minYear ?? now.getFullYear() - 3;
    const end   = maxYear ?? now.getFullYear() + 1;
    const arr: number[] = [];
    for (let yy = end; yy >= start; yy--) arr.push(yy);
    return arr;
  }, [minYear, maxYear]);

  return (
    <div className="flex items-center">
      <select
        className="p-2 rounded-l border-2 border-gray-300 border-r-0 bg-gray-100"
        value={m}
        onChange={(e) =>
          onChange(`${y}-${String(Number(e.target.value)).padStart(2, "0")}`)
        }
        aria-label="Mes"
      >
        {MONTHS.map((label, idx) => (
          <option key={idx} value={idx + 1}>{label}</option>
        ))}
      </select>

      <select
        className="p-2 rounded-r-md border-2 border-gray-300 border-l-0 bg-gray-100"
        value={y}
        onChange={(e) =>
          onChange(`${e.target.value}-${String(m).padStart(2, "0")}`)
        }
        aria-label="Año"
      >
        {years.map((yy) => (
          <option key={yy} value={yy}>{yy}</option>
        ))}
      </select>
    </div>
  );
}
