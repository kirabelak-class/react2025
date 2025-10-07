export function Card({ className = "", ...props }) {
    return (
      <div className={"bg-white border border-zinc-200 rounded-2xl shadow-sm " + className} {...props} />
    );
  }
  export const CardHeader = ({ className = "", ...props }) =>
    <div className={"p-4 border-b border-zinc-200 " + className} {...props} />;
  export const CardContent = ({ className = "", ...props }) =>
    <div className={"p-4 " + className} {...props} />;
  export const CardFooter = ({ className = "", ...props }) =>
    <div className={"p-4 border-t border-zinc-200 " + className} {...props} />;
  