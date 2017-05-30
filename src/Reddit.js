import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ADD_POST } from './reducers';
const _Reddit = (props) => (
  <View>
    {props.posts.map(post => <Text>{post.name}</Text>)}
    <TouchableOpacity onPress={props.addReditPost}>
      <Text>Add</Text>
    </TouchableOpacity>
  </View>
);
const mapStateToProps = (state) => ({
  posts: state.reddit
})

const mapActionsToProps = (dispatch) => ({
  addRedditPost(post={name: 'new post'}) {
    dispatch({type: ADD_POST, payload: post})
  }
})
export const Reddit = connect(mapStateToProps, mapActionsToProps)(_Reddit)

// componentWillMount() {
//   fetch('https://www.reddit.com/.json', {
//     Accept: 'application/json'
//   })
//   .then(res => res.json())
//   .then((data) => {
//     this.setState({posts: data.data.children});
//   });
// }

// render() {
//   return(
//     <View style={{padding: 20}}>
//       <Text>Reddit</Text>
//       <View>
//         {this.state.posts.map((post) => {
//           <Text style={{fontSize: 16}}>{post.data.author}</Text>
//         })}
//       </View>
//     </View>
//   )
// }
