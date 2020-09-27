import React, { Fragment, Component } from 'react';
import './App.css';
import Person from '../lecture5/OutputingLists';
import axios from 'axios';
//Navigation
// import AppNavbar from './components/navigation/AppNavbar';


class Main extends Component {

    componentDidMount() {
        axios.get('/api/items')
            .then(res => console.log(res));
    }

    state = {
        persons: [
            {id: '1', name: 'Paolo', age: 20},
            {id: '2', name: 'Bello', age: 21},
            {id: '3', name: 'Laura', age: 22}
        ],
        showPersons: false
    }

    deletePersonHandler = (index) => {
        //const show = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons});
    }

    togglePersonHandler = () => {
        this.setState({showPersons: !this.state.showPersons});
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        })

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    }

    render() {

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (<Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={index}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>)
                    })}
                </div>
            )
        }

        return (
            <div className="App">
                <button onClick={this.togglePersonHandler}>Click to toggle persons</button>
                {persons}
            </div>
        );
    }
}

export default Main;
