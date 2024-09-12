import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { CheckMark, HomeIcon } from '../icons/icons'
import AddHabitBtn from "./components/AddHabitBtn"

export default function Habits() {
    let [isActive, setIsActive] = useState(false)
    let [inputValue, setInputValue] = useState("")
    let [habitsArr, setHabitsArr] = useState<string[]>([])

    // Save habits to localStorage when habitsArr changes
    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habitsArr))
    }, [habitsArr])

    // Load habits from localStorage on component mount
    useEffect(() => {
        const savedHabits = localStorage.getItem('habits')
        if (savedHabits) {
            try {
                setHabitsArr(JSON.parse(savedHabits) || [])
            } catch (error) {
                console.error("Error parsing habits from localStorage", error)
                setHabitsArr([])
            }
        }
    }, [])

    // Handle input changes
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    
    // Navbar toggle based on isActive state
    let navBar = isActive ? (
        <button 
            className="nav-bar"
            type="submit"
        >
            <CheckMark /> Save
        </button>
    ) : (
        <div 
            className="nav-bar"
        >
            <HomeIcon />
            <AddHabitBtn onClick={toggle} />
        </div>
    )

    // Conditional input field display
    let inputField = isActive ? (
        <input
            type="text"
            placeholder="What habit do you want to track?"
            className="habit-input"
            name="habit-input"
            value={inputValue}
            onChange={handleChange}
            id="habit-input"
        />
    ) : null
    
    // Toggle navbar state
    function toggle() {
        setIsActive(!isActive) 
    }

    // Save habit and reset input field
    function saveHabit() {
        if (inputValue) {
            setHabitsArr(prev => [...prev, inputValue])
            setInputValue("")
            setIsActive(false)
        }
    }

    function deleteItem(index: number) {
        setHabitsArr(prevHabits => prevHabits.filter((_, i) => i !== index))
    }

    // Form submission handling
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent page refresh
        saveHabit()
    }

    return (
        <div id="sidebar">
            <ul className="habits-arr">
                {habitsArr.map((habit, index) => (
                    <li onDoubleClick={() => deleteItem(index)} className="habit-item" key={index}>{habit}</li>
                ))}
            </ul>
            <form 
                className="input-field"
                onSubmit={handleSubmit}
            >
                <label htmlFor="habit-input">
                    {inputField}
                    {navBar}
                </label>
            </form>
        </div>
    )
}
