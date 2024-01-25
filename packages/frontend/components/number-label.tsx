export function NumberLabel({ i }: { i: number }) {
  return (
    <p className="flex items-center justify-center mb-16 rounded-full border-3 text-4xl w-[72px] h-[72px] shadow-2xl shadow-blue-800 border-blue-500 text-blue-500 select-none">
      {i}
    </p>
  );
}
