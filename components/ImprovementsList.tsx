export default function ImprovementsList({ list }: { list: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1">
      {list.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );
}
