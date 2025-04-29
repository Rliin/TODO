import React from 'react';
import "../styles/modal.css";

export default function Modal(props) {

  function handleSubmit(formData) {
    console.log(props.taskEntry);
    const data = Object.fromEntries(formData);
    props.onSubmit(data);
  }
  
  return (
    <div className="modalOverlay">
      <form action={handleSubmit} className="modalContent" name='addTaskForm' id='addTaskForm'
      >
        <div className="modalHeader">
          <h3>{props.initialData ? 'Edit task' : 'Enter a task'}</h3>
          <button
            type="button"
            className="modalClose"
            onClick={props.onClose}
            /* onClick={props.onHandleChange} */
          >
            ✕
          </button>
        </div>

        <div className="modalBody">
          <div className="mBLeft">
            <div>
              <label htmlFor="taskTitle">What to do?</label>
              <input
                id="taskTitle"
                name="taskTitle"
                placeholder="Task Title"
                defaultValue={props.initialData?.taskTitle || "This is task title"}
                required
              />
            </div>

            <div>
              <label htmlFor="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                placeholder="Task description"
                defaultValue={props.initialData?.taskDescription || "This is Description"}
              ></textarea>
            </div>
          </div>

          <div className="mBRight">
            <div>
              <label htmlFor="taskDateTime">Deadline</label>
              <input
                id="taskDateTime"
                name="taskDateTime"
                type="datetime-local" 
                defaultValue={props.initialData?.taskDateTime || ""}
                />
            </div>

            <div>
              <label htmlFor="taskTeamSelection">Team</label>
              <select
                id="taskTeamSelection"
                name="taskTeamSelection"
                defaultValue={props.initialData?.taskTeamSelection || "🎨 Design"}
              >
                <option>🎨 Design</option>
                <option>💻 Software</option>
                <option>🛠️ Test</option>
                <option>📊 Research</option>
              </select>
            </div>

            <div>
              <label htmlFor="taskColorSelection">Color</label>
              <select
                id="taskColorSelection"
                name="taskColorSelection"
                defaultValue={props.initialData?.taskColorSelection || ""}
              >
                <option value="">⚪ Colorless</option>
                <option value="black">⚫ Black</option>
                <option value="red">🔴 Red</option>
                <option value="blue">🔵 Blue</option>
                <option value="green">🟢 Green</option>
                <option value="yellow">🟡 Yellow</option>
              </select>
            </div>

          </div>
        </div>

        <div className="modalFooter">
          <button type="submit">
          {props.initialData ? 'Save Changes' : 'Add Task'}
          </button>
        </div>

      </form>
    </div>
  );
}

              /* value={formData.taskTeamSelection} */
              /* onChange={handleInputChange} */


/*  const [formData, setFormData] = React.useState({
       taskV: "Task",
       descriptionV: "Description",
       dateTimeV: "Date Time",
       teamV: "Team"
     }); */

  /*   function handleInputChange(e) {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e);
      console.log(e.target.value);
      
      if (formData.taskTitle.trim()) {
        taskEntry(formData);
        onHandleChange();
      }
    };
  
    function addTask(e) {
      console.log(e); */

  // const formData = {
  //   taskTitle: e.target.taskTitle.value,
  //   taskDescription: e.target.taskDescription.value,
  //   taskDateTime: e.target.taskDateTime.value,
  //   taskTeamSelection: e.target.taskTeamSelection.value
  // };

  // console.log(formData)
  // props.taskEntry(formData);
  /*     if (formData.taskTitle.trim()) {  // Basic validation
        props.taskEntry(formData);
        props.onHandleChange(); // Close modal
      } */
  /* } */