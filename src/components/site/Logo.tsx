import logoUrl from "@/assets/logo-clean.png";

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Universo Educa+"
      width={512}
      height={423}
      className={`h-11 w-auto object-contain sm:h-12 ${light ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
