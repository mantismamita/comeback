import Link from 'next/dist/client/link';
import Arrow from './Arrow';

export default function Logo({ title = 'Comeback' }) {
  return (
    <Link href="/">
      <span className="flex items-center gap-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent bg-comeback-gradient">
          {title}
        </h1>

        <span className="relative w-16 h-16">
          <Arrow className="transform scale-100" />
        </span>
      </span>
    </Link>
  );
}
