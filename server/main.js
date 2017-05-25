import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import './../imports/startup/simple-schema-configuration';
import './../imports/api/users';
import { Links } from './../imports/api/links';

Meteor.startup(() => {

  let momentNow = moment(new Date());
  console.log(momentNow.fromNow());

  WebApp.connectHandlers.use((req, res, next) => {
    // console.log(req.method, req.url, req.headers, req.query);
    // res.statusCode = 404;
    // res.setHeader('my-custom-header', 'Nathan');
    // res.write('<h1>My Middleware</>');
    // If using res.end there is no need to call next
    // res.end();
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});
    
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);

    } else {
      next();
    }
  });
 
  // code to run on server at startup
  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 5,
  //     min: 1
  //   },
  //   age: {
  //     type: Number,
  //     min: 0,
  //     optional: true
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });

  // petSchema.validate({
  //   name: 'Andrew',
  //   contactNumber: '12x4#'
  // });

  // employeeSchema
  // name is a required string between 1 and 200 chars
  // hourly wage - number greater than zero
  // email - should be a valid email format.

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0,
  //     optional: true
  //   },
  //   email: {
  //     regEx: SimpleSchema.RegEx.Email,
  //     type: String,
  //     optional: true
  //   }
  // });

  // employeeSchema.validate({
  //   name: 'Nathan',
  //   email: 'me@gmail'
  // })
});
