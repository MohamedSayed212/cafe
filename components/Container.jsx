const SIZES = {
  sm: "max-w-2xl", // narrow forms / text
  md: "max-w-3xl", // FAQ, medium content
  lg: "max-w-7xl", // default page width
  full: "max-w-full",
};

export default function Container({ children, size = "lg", className = "" }) {
  const maxWidth = SIZES[size] ?? SIZES.lg;
  return (
    <div
      className={`w-full ${maxWidth} mx-auto px-4 sm:px-6 md:px-7 ${className}`}
    >
      {children}
    </div>
  );
}
