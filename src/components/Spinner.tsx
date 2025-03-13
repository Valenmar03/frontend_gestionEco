
export default function Spinner() {
   return (
      <div className="inline-block transform [perspective:1000px]">
         <div className="w-12 h-12 m-2 rounded-full bg-gray-300 animate-[coin-flip_2.4s_cubic-bezier(0,0.2,0.8,1)_infinite]"></div>
      </div>
   );
}
