import Link from 'next/link';

export function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="z-20 w-full bg-primary/20 shadow backdrop-blur supports-[backdrop-filter]:bg-primary/20">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">

          © {date}{' '}
          Hoffmann Lane
          . All rights reserved.
        </p>
      </div>
    </div>
  );
}
