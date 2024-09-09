import { SetStateAction, useState } from "react"
import { CheckMark, PlusIcon } from '../icons/icons'

export default function Habits() {
    let [isActive, setIsActive] = useState(false)
    let [inputValue, setInputValue] = useState("")
    let [habitsArr, setHabitsArr] = useState<string[]>([])

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(event.target.value)
    }
    
    let navBar = isActive ? (
        <button 
            className="nav-bar"
            type="submit"
        >
            <CheckMark/>Save
        </button>
      ) : (
        <button 
            className="nav-bar"
            onClick={toggle}
            type="button"
        >
            <PlusIcon/>
        </button>
    )

    let inputField = isActive ? (
        <input
            type="text"
            placeholder="What habit do you want to track?"
            className="habit-input"
            name="habit input"
            value={inputValue}
            onChange={handleChange}
            id="habit-input"
        />
      ) : null
    
    function toggle() {
        setIsActive(!isActive) 
    }

    function saveHabit() {
        if (inputValue) {
            setHabitsArr(prev => [...prev, inputValue])
            setInputValue("")
            setIsActive(false)
        }
    }

    return (
        <div id="sidebar">
            <ul className="habits-arr">
                {habitsArr.map((habit, index) => (
                    <li className="habit-item" key={index}>{habit}</li>
                ))}
            </ul>
            <form 
                className="input-field"
                onSubmit={(e) => {
                    e.preventDefault()
                    saveHabit() 
                }}
            >
                <label
                    htmlFor="habit-input"
                    >
                    {inputField}
                    {navBar}
                </label>
            </form>
        </div>
    )
}