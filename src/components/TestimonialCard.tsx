export default function TestimonialCard({ initial, name, role, quote }: { initial: string, name: string, role: string, quote: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-blue-200 shadow-lg">
        {initial}
      </div>
      <p className="italic text-gray-600 mb-6 font-medium text-lg leading-relaxed">
        "{quote}"
      </p>
      <div>
        <h4 className="font-bold text-gray-900">{name}</h4>
        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{role}</span>
      </div>
    </div>
  );
}
