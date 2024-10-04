import "./TicTac.css";

interface BlockProps {
    value?: React.ReactNode;
    onClick ?: () => void;
}

const Block: React.FC<BlockProps> = (props) => {
    return <div onClick={props.onClick} className="blocks">{props.value}</div>;
};

export default Block;