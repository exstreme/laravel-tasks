import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from "./Task";
import AddTask from "./AddTask";
import ModalWindow from "./Modal";

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            tasks: [],
            currentTask : null,
            visible: 'none',
            message: ''
        };
        this.handleAddTask = this.handleAddTask.bind(this);
    }
    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        /* fetch API in action */
        fetch('/api/tasks')
            .then(response => {
                return response.json();
            })
            .then(tasks => {
                //Fetched task is stored in the state
                this.setState({ tasks });
            });
        window.Echo
            .channel('laravel_database_tasks')
            .listen('TaskCreated', ev => this.renderModal(ev));
        window.Echo
            .channel('laravel_database_tasks_due_date')
            .listen('TaskDueDate', ev => this.renderModal(ev));
    }

    renderModal(ev) {
        let message;
        if(ev.alarm){
            message = 'Наступил крайний срок по задаче: '+ev.task.description;
            fetch( 'api/stats', {
                method:'post',
                /* headers are important*/
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({task_id:ev.task.id})
            })
        }
        else {
            message = 'Добавлена новая задача. Крайний срок: '+ev.task.due_date;
            this.setState((prevState)=> ({
                tasks: prevState.tasks.concat(ev.task)
            }))
        }
        this.setState({visible: 'block'});
        this.setState({message: message});
    }

    renderTasks() {
        const listStyle = {
            listStyle: 'none',
            fontSize: '18px',
            lineHeight: '1.8em',
        };
        return this.state.tasks.map(task => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li style={listStyle}
                    onClick={
                        () =>this.handleClick(task)
                    }
                        key={task.id} >
                    { task.due_date }
                </li>
            );
        })
    }

    handleClick(task) {
        //handleClick is used to set the state
        this.setState({currentTask:task});

    }

    handleAddTask(task) {

        /*Fetch API for post request */
        fetch( 'api/tasks', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(task)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {

                this.setState((prevState)=> ({
                    tasks: prevState.tasks.concat(data),
                    currentTask : data
                }))
            })
    }

    render() {
        const mainDivStyle =  {
            display: "flex",
            flexDirection: "row"
        };

        const divStyle = {

            justifyContent: "flex-start",
            width: '35%',
            background: '#f0f0f0',
            padding: '20px 20px 20px 20px',
            margin: '30px 10px 10px 30px'

        };
        return (
            <div>
                <ModalWindow modal={{
                    modalVisible: this.state.visible,
                    message: this.state.message
                }} />
                <div style={mainDivStyle}>
                    <div style={divStyle}>
                        <ul>
                            { this.renderTasks() }
                        </ul>
                    </div>
                    <Task task={this.state.currentTask} />
                    <AddTask onAdd={this.handleAddTask} />
                </div>
            </div>
        );
    }
}
export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
