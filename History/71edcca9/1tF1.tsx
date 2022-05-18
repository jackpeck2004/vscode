
export const PlainButton: FC<PlainButtonProps> = ({ children, onClick }) => {
return (
    <button
      onClick={(e) => handleRefresh(e)}
      className="bg-transparent transform hover:rotate-180 transition"
    >
      {children}
    </button>
)
}
