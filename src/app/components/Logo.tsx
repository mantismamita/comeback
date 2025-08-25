import Image from 'next/image';
import Arrow from './Arrow';

export default function Logo({ title = 'Comeback' }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {title}
      </h1>

      <div className="relative w-16 h-16">
        <Arrow className="transform scale-100" />
      </div>
    </div>
  );
}
