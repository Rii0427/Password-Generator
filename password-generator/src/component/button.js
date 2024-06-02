const Button = ({onClick,text,CustomClass}) => {
    return (
        <button className={CustomClass} onClick={onClick} >{text}</button>
    )
};

export default Button;