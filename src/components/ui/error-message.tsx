import { FC, ReactNode } from "react";

interface ErrorMessageProps {
   children: ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
   return <p className="mt-1 text-xs text-red-800">{children}</p>;
};

export default ErrorMessage;
