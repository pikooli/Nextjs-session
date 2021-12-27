import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <title>YoungDoc</title>
    </header>
  );
}
