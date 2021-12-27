export default function Error({ text }: { text?: string }) {
  return <div className="text-danger mb-1">{text}</div>;
}
