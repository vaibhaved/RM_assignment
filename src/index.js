import React from 'react'
import ReactDom from 'react-dom'

class Initial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'fname': null,
            'lname': null,
            'email': null,
            'age': 0,
            'gender': 'unknown',
            'maritalStatus': 'unknown',
            'qualifications': {
                '10th': false,
                '12th': false,
                'B. Tech.': false,
            },
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.renderMartialStatus=this.renderMartialStatus.bind(this);
        this.renderQualifications=this.renderQualifications.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
    }

    renderMartialStatus() {
        const marital = ['Married', 'Unmarried'];
        return marital.map((mar, i)=> {
            return (
                <label key={i}>
                    {mar}
                    <input 
                        type="radio" 
                        name="maritalStatus"
                        value={mar}
                        onChange={this.handleInputChange}
                        required
                    >
                    </input>
                </label>
            )
        })
    }

    renderButtons() {
        const button = ['fname','lname','email','age','gender','maritalStatus','qualifications']
        const buttonNames = ['First Name','Last Name','Email','Age','Gender','Marital Status','Qualifications']
        return buttonNames.map((buttonName,i) => {
            return (
                <div key={i}>
                    <button
                        key={i}
                        name={button[i]}
                        onClick={this.handleClick}
                    >
                        {buttonName}
                    </button>
                    <br />
                </div>
            )
        })
    }

    renderQualifications() {
        const qualification = ['10th', '12th', 'B. Tech.'];
        return qualification.map((qual, i) => {
            return (
                <label key={i}>
                    {qual}
                    <input 
                        type="checkbox" 
                        name={qual}
                        checked={this.state.qualifications[qual]}
                        onChange={this.handleInputChange}
                    >
                    </input>
                </label>
            )
        })
    }
    
    handleInputChange(event) {

        var callback = () => {
            console.log(this.state)
        }

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let updatedQualifications = Object.assign({}, this.state.qualifications, {[name]: value})

        if(target.type === 'text') {
            if(target.name === 'fname')
            this.setState({
                [name] : value,
            },callback);
            if(target.name === 'lname')
            this.setState({
                [name] : value,
            },callback);
        }
        if(target.type === 'email') {
            this.setState({
                [name] : value,
            },callback);
        }
        if(target.type === 'number') {
            this.setState({
                [name] : value,
            },callback);
        }
        if(target.type === 'checkbox') {
            this.setState({
                qualifications : updatedQualifications,
            },callback);
        }
        if(target.type === 'select-one') {
            this.setState({
                [name] : value,
            },callback);
        }
        if(target.type === 'radio') {
            this.setState({
                [name] : value,
            },callback);
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        ReactDom.render(
            <Popover 
                sendState = {this.state}
                sendRenderButtons = {this.renderButtons}
            />,
            document.getElementById('root')
        )
    }

    handleClick(event) {
        const name = event.target.name;
        const value = this.state[name]
        let popoverOutput = Object.assign({}, super.state, {[name]: value})
        console.log(popoverOutput)
    }

    render() {
        return(
            <Form
                sendRenderQualifications = {this.renderQualifications}
                sendRenderMaritalStatus = {this.renderMartialStatus}
                sendHandleInputChange = {this.handleInputChange}
                sendOnSubmit = {this.onFormSubmit}
            />
        ) 
    }
}

class Form extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.sendOnSubmit.bind(this)}>
                    <label>First Name:
                        <input
                            id='fname' 
                            name='fname'
                            type="text"
                            placeholder="Enter your first name"
                            onChange={this.props.sendHandleInputChange}
                            required
                        >
                        </input>
                    </label>
                    <br />
                    <label>Last Name:
                        <input 
                            id='lname'
                            name='lname'
                            type="text" 
                            placeholder="Enter your last name"
                            onChange={this.props.sendHandleInputChange}
                            required
                        >
                        </input>
                    </label>
                    <br />
                    <label>Email:
                        <input 
                            type="email" 
                            name='email'
                            placeholder="Enter your email"
                            onChange={this.props.sendHandleInputChange}
                            required
                        >
                        </input>
                    </label>
                    <br />
                    <label>Gender:
                        <select 
                            name='gender'
                            onChange={this.props.sendHandleInputChange}
                        >
                            <option value="Select">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                    <br />
                    <label>Age:
                        <input
                            type="number"
                            name="age"
                            min="1"
                            max="120"
                            onChange={this.props.sendHandleInputChange}
                            required
                        >
                        </input>
                    </label>
                    <br />
                    <label>Marital Status:
                        {this.props.sendRenderMaritalStatus()}
                    </label>
                    <br />
                    <label>Qualifications:
                        {this.props.sendRenderQualifications()}
                    </label>
                    <br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

class Popover extends React.Component {
    constructor(props) {
        super(props);
        this.state=this.props.sendState;
    }
    render() {
        return (
            <div>
                {this.props.sendRenderButtons()}
            </div>
        )
    }
}

ReactDom.render (
    <Initial />,
    document.getElementById('root')
)