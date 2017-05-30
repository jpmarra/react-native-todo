import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Reddit } from './Reddit';

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
        <View style={styles.form}>
          <Reddit />
          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={this.handleChange.bind(this)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePress.bind(this)}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
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
  form: {
    padding: 30,
    flexDirection: 'row'
  },
  input: {
    flex: 0.7,
    fontSize: 24
  },
  button: {
    flex: 0.3,
    height: 50,
    borderWidth:  1,
    borderColor: 'blue',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
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
