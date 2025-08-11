import { formatCurrency } from "../../helpers";

export default function SummaryCard({ title, value, tone, format }: { title: string; value: number; tone: string; format: boolean }) {
  const tones: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${tones[tone]}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1">
        {
          format ? formatCurrency(value) : value
        }
      </p>
    </div>
  );
}