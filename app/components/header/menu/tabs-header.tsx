interface TabsHeaderProps {
  banks: number;
  title: string;
  description: string;
}

const TabsHeader = ({ banks, title, description }: TabsHeaderProps) => {
  return (
    <div>
      <p className="text-2xl font-semibold">{title}</p>
      {banks > 0 && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default TabsHeader;
