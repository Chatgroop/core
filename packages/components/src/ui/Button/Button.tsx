{/* @ts-ignore */}
export default function DarkButton({ children, className, onClick }) {
    return (
        <button
        className={`p-2 rounded-md hover:ring-2 hover:ring-gray-300 ${className}`}
        onClick={onClick}
      >{children}</button>
    )
}
  