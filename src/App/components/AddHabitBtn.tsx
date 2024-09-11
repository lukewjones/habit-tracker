import { PlusIcon } from "../../icons/icons";

interface AddHabitBtnProps {
    onClick: () => void;
}

const AddHabitBtn: React.FC<AddHabitBtnProps> = ({ onClick }) =>  {
    return (
        <button 
            type="button"
            onClick={onClick}
        >
            <PlusIcon/>
        </button>
    )
}

export default AddHabitBtn
