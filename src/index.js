import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
Array.prototype.swap = function(x, y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
};

class AddComp extends React.Component {
  constructor() {
    super();
    this.state = {
      task: ""
    };
    this.bindInput = this.bindInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  bindInput(event) {
    this.setState({
      task: event.target.value
    });
  }
  handleAdd() {
    this.props.handleAdd(this.state.task);
    this.setState({
      task: ""
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Task To Do</h1>
        <input
          type="text"
          value={this.state.task}
          onChange={this.bindInput}
          placeholder="Add To Do"
        />
        <button onClick={this.handleAdd}>Add Task</button>
      </div>
    );
  }
}

//list of tasks
const ToDoList = props => {
  const todos = props.taskList.map((todo, id) => (
    <Task
      text={todo}
      key={id}
      deleteTask={props.deleteTask}
      priorityUp={props.priorityUp}
      priorityDown={props.priorityDown}
    />
  ));
  return <ul>{todos}</ul>;
};
const marginStyle = {
  marginLeft: 15,
  marginBottom: 10
};
//each task
const Task = props => {
  return (
    <li>
      {props.text}
      <button
        style={marginStyle}
        onClick={() => {
          props.deleteTask(props.text);
        }}
      >
        del
      </button>
      <button
        style={marginStyle}
        onClick={() => {
          props.priorityUp(props.text);
        }}
      >
        up
      </button>
      <button
        style={marginStyle}
        onClick={() => {
          props.priorityDown(props.text);
        }}
      >
        down
      </button>
    </li>
  );
};

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: ["grocery", "haircut"]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.priorityDown = this.priorityDown.bind(this);
    this.priorityUp = this.priorityUp.bind(this);
  }
  handleAdd(todo) {
    if (todo) {
      this.setState({
        taskList: [...this.state.taskList, todo]
      });
    }
  }
  handleDelete(todo) {
    this.setState({
      taskList: this.state.taskList.filter(task => task !== todo)
    });
  }
  priorityDown(todo) {
    if (
      this.state.taskList.indexOf(todo) > -1 &&
      this.state.taskList.indexOf(todo) !== this.state.taskList.length - 1
    ) {
      let index = this.state.taskList.indexOf(todo);

      this.setState({
        taskList: this.state.taskList.slice().swap(index, index + 1)
      });
    }
  }
  priorityUp(todo) {
    if (this.state.taskList.indexOf(todo)) {
      let index = this.state.taskList.indexOf(todo);

      this.setState({
        taskList: this.state.taskList.slice().swap(index, index - 1)
      });
    }
  }
  render() {
    return (
      <div>
        <AddComp handleAdd={this.handleAdd} />
        <ToDoList
          taskList={this.state.taskList}
          deleteTask={this.handleDelete}
          priorityDown={this.priorityDown}
          priorityUp={this.priorityUp}
        />
      </div>
    );
  }
}
ReactDOM.render(<ToDoApp />, document.getElementById("root"));
