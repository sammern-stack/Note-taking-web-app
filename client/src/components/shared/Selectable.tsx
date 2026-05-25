interface SelectableProps {
  children: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export const Selectable = ({
  children,
  isSelected,
  onSelect,
  className = "",
}: SelectableProps) => (
  <div
    className={`${className} ${isSelected ? `${className}--selected` : ""}`.trim()}
    onClick={onSelect}
  >
    {children}
  </div>
);
