// src/components/AlertError.tsx
interface AlertErrorProps {
  message?: string;
}

export const AlertError = ({ message }: AlertErrorProps) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  );
};
