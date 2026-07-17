// Single source of truth for horizontal page gutter + max width.
// Wrap section content with this instead of repeating `px-* max-w-* mx-auto`.
const SIZES = {
  sm: "max-w-2xl", // narrow forms / text
  md: "max-w-3xl", // FAQ, medium content
  lg: "max-w-6xl", // default page width
  full: "max-w-full",
};

export default function Container({ children, size = "lg", className = "" }) {
  const maxWidth = SIZES[size] ?? SIZES.lg;
  return (
    <div className={`w-full ${maxWidth} mx-auto px-1 ${className}`}>
      {children}
    </div>
  );
}
