const Card = ({
  children,
  padding = "md",
  hover = false,
  className = "",
  ...props
}) => {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverStyles = hover
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    : "";

  const cardClasses = [
    "rounded-xl border border-slate-200 bg-white shadow-sm",
    paddingStyles[padding],
    hoverStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;