function Bouton({
    type = "submit",
    children,
    className,
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
export default Bouton;
