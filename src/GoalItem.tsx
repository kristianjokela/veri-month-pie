import { useRef, useEffect } from 'react'
import { Goal } from './Goal'
import './GoalItem.css'

function getPositionOnCircle(
  r: number,
  offset: number[], // obv. this should be object with x and y
  index: number,
  totalItems: number
): [number, number] {
  let theta = (Math.PI * 2) / totalItems
  let angle = theta * index - 45.25
  let x = r * Math.cos(angle)
  let y = r * Math.sin(angle)
  return [offset[0] + x, offset[1] + y] // obv. this should be object with x and y
}

interface GoalItemProps {
  index: number
  totalItems: number
  goal: Goal
  isEditing: boolean
  setEditMode: (index: number) => void
  onValueChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  onDragStart: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent<HTMLLIElement>) => void
}

/**
 *
 * Tiny stateless component to render a goal item.
 * Items are indexed from 0 to totalItems-1 and are rendered in a circle.
 */
function GoalItem(props: GoalItemProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
      inputRef.current?.focus()
  }, [props.isEditing])

  function getInput(): JSX.Element {
    if (props.isEditing) {
      return (
        <input
          type="text"
          value={props.goal.value}
          onChange={props.onValueChange}
          ref={inputRef}
        />
      )
    }
    return (
      <span className={props.goal.value.length == 0 ? 'label empty' : 'label'}>
        {props.goal.value}
      </span>
    )
  }

  let [x, y] = getPositionOnCircle(
    150,
    [-210, -20],
    props.index,
    props.totalItems
  )
  return (
    <li
      draggable={true}
      className="goal"
      key={props.index}
      style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', props.index.toString())
        props.onDragStart(e)
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={props.onDrop}
      onClick={(e) => {
        props.setEditMode(props.index)
      }}>
      <span className="month-name">{props.goal.month}</span>
      <span className="month-value">{getInput()}</span>
    </li>
  )
}

export default GoalItem
