import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


const unathenticatePages = ['/', '/signup'];
const athenticatePages = ['/links'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) browserHistory.replace('/links');
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) browserHistory.replace('/');
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;

  const isUnAuthenticatedPage = unathenticatePages.includes(pathname);
  const isAuthenticatedPage = athenticatePages.includes(pathname);

  // If on an unathenticated page and logged in - redirect them /links
  // If on an unathenticated page - redirect them to /
  if(isAuthenticated && isUnAuthenticatedPage) browserHistory.replace('/links');
  if(!isAuthenticated && isAuthenticatedPage) browserHistory.replace('/');
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="/*" component={NotFound}/>
  </Router>
)

