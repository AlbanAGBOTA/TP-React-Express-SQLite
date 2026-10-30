function Champs({
    label,
    name,
    value,
    type = "text",
    id,
    onChange,
    children,
    ...autre
}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                {...autre}
            />
            {children}
        </div>
    );
}
export default Champs;
