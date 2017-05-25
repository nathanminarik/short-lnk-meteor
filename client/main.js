import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from './../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});
/*
Stateless component example
import React from 'react';
const MyComponent = (props) => {
  return (
    <div>
      <h1>Mycomponent is here</h1>
      <p>Hi {props.name}</p>
    </div>
  )
}*/


// Example of using session for hosting a reactive state
// Session.set('name', 'Nathan');


// Tracker.autorun(() => {
//   const name = Session.get('name');

//   console.log('Name: ', name);
// });

Meteor.startup(() => {
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'));
  // Stateless call
  // ReactDOM.render(<MyComponent name="Mike" />, document.getElementById('app'));

  // Meteor.call('greetUser', 'Mike', (err, res) => {
  //   console.log(`Greet user arguments ${err}, ${res}`)
  // });
  
  // Meteor.call('addNumbers', "2", 3, (err, res) => {
  //   console.log(`Add Numbers: ${err}, ${res}`)
  // });

  // Meteor.call('links.insert', 'hey', (err) => {
  //   console.log('Error', err) 
  // });

});
