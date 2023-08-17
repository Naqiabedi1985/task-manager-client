import React, { useState, useEffect, useRef } from "react"
import "./TasksComponent.css"

const TasksComponent = () => {
  const [tasks, setTasks] = useState([])
  const [editingIndex, setEditingIndex] = useState(-1)
  const [isEditing, setIsEditing] = useState(false)
  const [users, setUsers] = useState([])
  const firstFieldRef = useRef(null)
  const [selectedDependentOn, setSelectedDependentOn] = useState([])
  const [loadedTasks, setLoadedTasks] = useState([])
  const [taskNames, setTaskNames] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data)
          console.log(`\n Tasks component res.data from users: ${data.data}`)
        } else {
          console.error(data.error)
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [])

  // ...

  useEffect(() => {
    // ...

    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks")
        const data = await response.json()

        // Convert the 'Timeline' and 'Completion Date' properties to Date objects for each task
        const tasksWithDates = data.data.map((task) => ({
          ...task,
          Timeline: new Date(task.Timeline),
          "Completion Date": new Date(task["Completion Date"]),
        }))

        setTasks(tasksWithDates)
        setLoadedTasks(tasksWithDates)
      } catch (error) {
        console.log("Error fetching tasks:", error)
      }
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    const updateTaskNames = () => {
      const taskNamesById = {}
      loadedTasks.forEach((task) => {
        taskNamesById[task._id] = task.Task
      })
      setTaskNames(taskNamesById)
    }

    updateTaskNames()
  }, [loadedTasks])

  // ...

  /*
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks")
        const data = await response.json()
        const stringData = JSON.stringify(data.data)
        // setTasks(data.data)
        //setLoadedTasks(data.data)
        if (Array.isArray(data.data)) {
          console.log("\ndata.data is an array")
        } else {
          console.log("\ndata.data is an object")
        }
        console.log(
          `\nRESPONSE from 'const response = await fetch(http://localhost:5000/tasks)': ${response}  \ntypeof: ${typeof response}
        `
        )
        console.log(
          `\nDATA from 'const data = await response.json()': ${data}  \ntypeof: ${typeof data}
        `
        )
        console.log(
          `\nDATA.data: ${data.data}  \ntypeof: ${typeof data.data}
        `
        )
        console.log(
          `\nDATA.data: from 'JSON.stringify(data.data)'${JSON.stringify(
            data.data
          )}  \ntypeof: ${typeof JSON.stringify(data.data)}
        `
        )
        console.log(
          `\nstringData from 'const stringData = JSON.stringify(data.data)': ${stringData}  \ntypeof: ${typeof stringData}
        `
        )
      } catch (error) {
        console.log("Error fetching tasks:", error)
      }
    }

    fetchTasks()
  }, [])
*/

  const addTask = () => {
    const newTask = {
      Task: "",
      Owner: "",
      Status: "Working on it",
      Timeline: new Date(),
      Duration: 0,
      "Dependent On": [],
      "Planned Effort": 0,
      "Effort Spent": 0,
      "Completion Date": new Date(),
      "Completion Status": "",
      isNew: true,
    }

    setTasks([...tasks, newTask])
    setEditingIndex(tasks.length)
    setIsEditing(true)
    //handleFocusFirstField() // Call handleFocusFirstField to set focus on the first field
  }

  const handleAddTask = () => {
    addTask()
  }

  const handleDependentOnChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions)
    const selectedTaskIds = selectedOptions.map((option) => option.value) // change to option.value instead of option.Task
    setSelectedDependentOn(selectedTaskIds)
  }

  const editTask = (index) => {
    setEditingIndex(index)
  }

  const updateTask = (index, field, value) => {
    const updatedTasks = [...tasks]

    if (
      (field === "Duration" ||
        field === "Planned Effort" ||
        field === "Effort Spent") &&
      value < 0
    ) {
      console.error(`${field} should be a positive number`)
      return
    }

    if (field === "Timeline" || field === "Completion Date") {
      value = new Date(value) // Convert value to a valid Date object
    }

    if (field === "Dependent On") {
      value = value.map((taskId) => taskId.toString()) // Convert task IDs to strings
    }

    updatedTasks[index][field] = value
    setTasks(updatedTasks)
  }

  const saveTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].isNew = false
    updatedTasks[index]["Dependent On"] = selectedDependentOn // Update "Dependent On" field
    setTasks(updatedTasks)
    setEditingIndex(-1)
    setIsEditing(false)
  }

  const deleteTask = (index) => {
    const taskName = tasks[index].Task
    const confirmationMessage = `Are you sure you want to delete the task "${taskName}"?`

    if (window.confirm(confirmationMessage)) {
      const updatedTasks = [...tasks]
      updatedTasks.splice(index, 1)
      setTasks(updatedTasks)
    }
  }

  const cancelTask = (index) => {
    if (tasks[index].isNew) {
      // If the task is a new task (not yet saved), directly remove it from the array
      const updatedTasks = [...tasks]
      updatedTasks.splice(index, 1)
      setTasks(updatedTasks)
    } else {
      // If the task is an existing task being edited, reset the editing state without modifying the array
      setEditingIndex(-1)
      setIsEditing(false)
    }
  }

  const findTaskNameById = (taskId) => {
    return taskNames[taskId] || ""
  }

  const renderDateCell = (date) => {
    return (
      <span className="date-cell">
        {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    )
  }

  const formatDays = (value) => {
    return `${value} days`
  }

  const formatHours = (value) => {
    return `${value} hours`
  }

  const calculateTotal = (field) => {
    let total = 0
    tasks.forEach((task) => {
      total += task[field]
    })
    return total
  }

  const handleFocusFirstField = () => {
    if (firstFieldRef && firstFieldRef.current) {
      firstFieldRef.current.focus()
    }
  }

  return (
    <div className="tasks-page-container">
      <div className="tasks-container">
        <button onClick={handleAddTask} disabled={isEditing}>
          Add Task
        </button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Timeline</th>
                <th>Duration</th>
                <th>Dependent On</th>
                <th>Planned Effort</th>
                <th>Effort Spent</th>
                <th>Completion Date</th>
                <th>Completion Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        ref={index === editingIndex ? firstFieldRef : null}
                        type="text"
                        value={task.Task}
                        onChange={(e) =>
                          updateTask(index, "Task", e.target.value)
                        }
                      />
                    ) : (
                      task.Task
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <select
                        value={task.Owner}
                        onChange={(e) =>
                          updateTask(index, "Owner", e.target.value)
                        }
                      >
                        <option value="">Select Owner</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.name}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      task.Owner
                    )}
                  </td>

                  <td>
                    {editingIndex === index ? (
                      <select
                        value={task.Status}
                        onChange={(e) =>
                          updateTask(index, "Status", e.target.value)
                        }
                      >
                        <option value="Working on it">Working on it</option>
                        <option value="Done">Done</option>
                        <option value="Stuck">Stuck</option>
                        <option value="Future steps">Future steps</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    ) : (
                      task.Status
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="date"
                        value={task.Timeline.toISOString().slice(0, 10)}
                        onChange={(e) =>
                          updateTask(
                            index,
                            "Timeline",
                            new Date(e.target.value)
                          )
                        }
                      />
                    ) : (
                      renderDateCell(task.Timeline)
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={task.Duration}
                        onChange={(e) =>
                          updateTask(
                            index,
                            "Duration",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    ) : (
                      formatDays(task.Duration)
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <select
                        multiple
                        value={selectedDependentOn}
                        onChange={(e) => handleDependentOnChange(e)}
                      >
                        <option value="">Select tasks</option>
                        {loadedTasks.map((dependentTask) => (
                          <option
                            key={dependentTask._id}
                            value={dependentTask._id}
                          >
                            {dependentTask.Task}
                          </option>
                        ))}
                      </select>
                    ) : (
                      task["Dependent On"].map((taskId) => (
                        <span key={taskId}>{findTaskNameById(taskId)}</span>
                      ))
                    )}
                  </td>

                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={task["Planned Effort"]}
                        onChange={(e) =>
                          updateTask(
                            index,
                            "Planned Effort",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    ) : (
                      formatHours(task["Planned Effort"])
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={task["Effort Spent"]}
                        onChange={(e) =>
                          updateTask(
                            index,
                            "Effort Spent",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    ) : (
                      formatHours(task["Effort Spent"])
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="date"
                        value={task["Completion Date"]
                          .toISOString()
                          .slice(0, 10)}
                        onChange={(e) =>
                          updateTask(
                            index,
                            "Completion Date",
                            new Date(e.target.value)
                          )
                        }
                      />
                    ) : (
                      renderDateCell(task["Completion Date"])
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={task["Completion Status"]}
                        onChange={(e) =>
                          updateTask(index, "Completion Status", e.target.value)
                        }
                      />
                    ) : (
                      task["Completion Status"]
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <div>
                        <button onClick={() => saveTask(index)}>Save</button>
                        <button onClick={() => cancelTask(index)}>
                          Cancel
                        </button>
                      </div>
                    ) : task.isNew ? (
                      <div>
                        <button onClick={() => saveTask(index)}>Save</button>
                        <button onClick={() => cancelTask(index)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => deleteTask(index)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                <td colSpan="4" style={{ textAlign: "left" }}>
                  Total:
                </td>
                <td>{formatDays(calculateTotal("Duration"))}</td>
                <td></td>
                <td>{formatHours(calculateTotal("Planned Effort"))}</td>
                <td>{formatHours(calculateTotal("Effort Spent"))}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TasksComponent
