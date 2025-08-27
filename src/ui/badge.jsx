const badge = ({ children, className }) => (
  <span className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ${className || ""}`}>
    {children}
  </span>
);
export default badge;
