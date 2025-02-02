import { Loader2 } from "lucide-react";

interface LoadingComponentsProps {
  height?: number;
}

const LoadingComponents: React.FC<LoadingComponentsProps> = ({ height }) => {
  return (
    <div
      className={`flex items-center justify-center h-${height} w-full`}
    >
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
};

export default LoadingComponents;