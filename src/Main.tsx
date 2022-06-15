import { useState } from "react"
import { Goal } from "./Goal"
import GoalItem from "./GoalItem"
import "./Main.css"
/**
 * 
 * Main component to render the pie and hold the state. 
 * The state and handlers would be easy to lift off if/when needed.
 * 
 * Note: There's a bug so the items can overlap, this would be fixed later.
 */
function Main() {
    let [state, setState] = useState({
      goals: [
        { month: 'Jan', value: '' },
        { month: 'Feb', value: '' },
        { month: 'Mar', value: '' },
        { month: 'Apr', value: '' },
        { month: 'May', value: '' },
        { month: 'Jun', value: '' },
        { month: 'Jul', value: '' },
        { month: 'Aug', value: '' },
        { month: 'Sep', value: '' },
        { month: 'Oct', value: '' },
        { month: 'Nov', value: '' },
        { month: 'Dec', value: '' },
      ] as Goal[],
      editing: null as number | null, // this could be somewhere else
    })

    function renderItems(): JSX.Element[] {
      let items = []
      for (let i = 0; i < state.goals.length; i++) {
        items.push(
          <GoalItem
            index={i}
            key={i}
            totalItems={state.goals.length}
            goal={state.goals[i]}
            isEditing={state.editing === i}
            setEditMode={(index) => {
              handleEditMode(index)
            }}
            onValueChange={(e) => {
              handleItemValueChange(i, e.target.value)
            }}
            onDragStart={(e) => {
              handleDragStart(i, e)
            }}
            onDrop={(e) => {
              handleItemDrop(i, parseInt(e.dataTransfer.getData('text/plain')))
            }}
          />
        )
      }
      return items
    }

    function handleEditMode(index: number) {
      setState({ ...state, editing: index })
    }

    function handleItemValueChange(index: number, value: string) {
      let goals = [...state.goals]
      goals[index].value = value
      setState({ ...state, goals })
    }

    function handleDragStart(index: number, e: React.DragEvent) {
      setState({ ...state, editing: null })
    }

    function handleItemDrop(fromIndex: number, toIndex: number) {
      let goals = [...state.goals]
      let currentGoal = { ...goals[fromIndex] }
      let incomingGoal = { ...goals[toIndex] }
      currentGoal.value = incomingGoal.value
      incomingGoal.value = goals[fromIndex].value
      goals[fromIndex] = currentGoal
      goals[toIndex] = incomingGoal
      setState({ ...state, goals })
    }

    return <ul className="item-list">{renderItems()}</ul>
}

export default Main
