import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Reddit } from './Reddit';
import { TodoForm } from './TodoForm';
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  createTodo(todo) {
    dispatch({type: CREATE_TODO, payload: todo})
  }
});

export class Todo extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/todos',{
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(todos => this.setState({todos}))
  }

  handleChange(text) {
    this.setState({newTodo: text});
  }

  handlePress() {
    fetch('http://localhost:3000/todos', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.newTodo
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      const todos = [data,...this.state.todos];
      this.setState({todos, newTodo: ''});
    });
  }

  render() {
    return (
      <View>
        <TodoForm
          handlePress={this.handlePress.bind(this)}
          handleChange={this.handleChange.bind(this)}
          value={this.state.newTodo}
        />
        <View style={styles.todos}>
          {this.state.todos.map((todo, i) => (
            <View key={i} style={styles.todo}>
              <Text style={styles.todoText} key={i}>{todo.name}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
todos: {
    marginTop: 60
  },
  todo: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  todoText: {
    fontSize: 24
  }
})
