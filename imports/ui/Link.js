import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
    return (
        <div>
            <PrivateHeader title="Required PropType"/>
            <div className="page-content">
                <LinksListFilters />
                <AddLink />
                <LinksList />
            </div>
        </div>
    )
}

// This is a container component. We're changing it to a stateless functional component
// export default class Link extends React.Component {

    // logout () {
    //     Accounts.logout();
    // }

    // onSubmit (e) {
    //     const url = this.refs.url.value.trim();

    //     e.preventDefault();

    //     if (url) {
    //         Meteor.call('links.insert', url);
    //         // Links.insert({url, userId: Meteor.userId()});
    //         this.refs.url.value = "";
    //     }
    // }

    
    /*render () {
        return (
            <div>
                {/*<h1>Links</h1>
                <button onClick={this.logout.bind(this)}>Logout</button>}
                <PrivateHeader title="Hello Required" />
                <LinksList />
                {/*<p>Add Link</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="Url"/>
                    <button>Add Link</button>
                </form>}
                <AddLink />
            </div>
        )
    }*/
// }
