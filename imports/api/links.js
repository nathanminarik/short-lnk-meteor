import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import ShortId from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({userId: this.userId});
    });
}

Meteor.methods({
    
    // convention for naming methods is resource.action
    // links.insert for example -- links isn't connected to the Links collection and can be named anything
    // similar to the 'links' in the publish function. it simply needs to be matched with the call to that method.

    'links.insert' (url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'Must be logged in.') 
        }

        // No longer need a try catch block since the configuration is set for simple server in the startup folder
        // try {
        //     new SimpleSchema({
        //         url: {
        //             type: String,
        //             label: 'Your Link',
        //             regEx: SimpleSchema.RegEx.Url,
        //         }
        //     }).validate({url})
        // } catch (e) {
        //     throw new Meteor.Error(400, e.message)
        // }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your Link',
                regEx: SimpleSchema.RegEx.Url,
            }
        }).validate({url})

        return Links.insert({
            url,
            userId: this.userId,
            _id: ShortId.generate(),
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },

    'links.setVisibility' (_id, visible) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'Must be logged in.')
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1,
            },
            visible: {
                type: Boolean,
            }
        }).validate({_id, visible});

        return Links.update({_id, userId: this.userId}, {$set: {visible}});
    },

    'links.trackVisit' (_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1,
            }
        }).validate({_id});

        return Links.update({_id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            
            $inc: {
                visitedCount: 1
            }
        });
    }


    // greetUser (name) {
    //     console.log('greet user is running');
    //     if (!name) throw new Meteor.Error('invalid-arguments', 'Name is required');
    //     return `Hello ${name}`;
    // },

    // addNumbers (num, num2) {
    //     if (typeof num !== 'number' || typeof num2 !== 'number') {
    //         throw new Meteor.Error('invalid-arguments', 'Arguments must be a number');
    //     }

    //     return num + num2;
    // }
});
