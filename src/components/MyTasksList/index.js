import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasksList extends Component {
  state = {
    activeOptionId: tagsList[0].optionId,
    inputTask: '',
    taskList: [],
  }

  onChangeTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onClickTag = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onChangeTagButton = optionId => {
    const {taskList} = this.state
    const filteredList = taskList.filter(
      eachTask => eachTask.optionId === optionId,
    )
    this.setState({taskList: filteredList})
  }

  onSubmitFrom = event => {
    event.preventDefault()
    const {inputTask, activeOptionId, taskList} = this.state

    const newTask = {
      id: v4(),
      task: inputTask,
      optionId: activeOptionId,
    }

    this.setState({
      taskList: [...taskList, newTask],
      inputTask: '',
      activeOptionId: tagsList[0].optionId,
    })
  }

  render() {
    const {activeOptionId, inputTask, taskList} = this.state
    console.log(taskList)
    return (
      <div className="my-tasks-container">
        <div className="left-side-container">
          <div className="card">
            <h1 className="main-heading">Create a task!</h1>
            <form className="form-card" onSubmit={this.onSubmitFrom}>
              <label htmlFor="task" className="label-element">
                Task
              </label>
              <input
                type="text"
                value={inputTask}
                onChange={this.onChangeTask}
                id="task"
                placeholder="Enter the task here"
                className="input-element"
              />
              <br />
              <label htmlFor="tag" className="label-element">
                Tags
              </label>
              <select
                id="tag"
                onChange={this.onClickTag}
                value={activeOptionId}
                className="select-element"
              >
                {tagsList.map(eachTag => {
                  const {optionId, displayText} = eachTag
                  return (
                    <option key={optionId} value={optionId}>
                      {displayText}
                    </option>
                  )
                })}
              </select>
              <br />
              <button type="submit" className="add-task-button">
                Add Task
              </button>
            </form>
          </div>
        </div>
        <div className="right-side-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => {
              const {optionId, displayText} = eachTag
              const onClickTagButton = () => {
                this.onChangeTagButton(optionId)
              }

              return (
                <li key={optionId}>
                  <button
                    type="button"
                    onClick={onClickTagButton}
                    className="tag-button"
                  >
                    {displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="tasks-container">
            <h1 className="tags-heading">Tasks</h1>
            {taskList.length === 0 ? (
              <p className="no-tasks">No Tasks Added Yet</p>
            ) : (
              <ul className="right-side-task-list">
                {taskList.map(eachTask => (
                  <li key={eachTask.id} className="task-item">
                    <p className="task">{eachTask.task}</p>
                    <button type="button" className="task-button">
                      {eachTask.optionId}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default MyTasksList
