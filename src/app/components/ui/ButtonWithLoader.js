"use client";

export default function ButtonWithLoader({
  loading,
  label,
  loadingLabel,
  ...props
}) {
  return (
    <button
      disabled={loading}
      {...props}
      className="w-full bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] font-semibold py-2 px-4 rounded hover:bg-[color:var(--color-laurel-green)] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
