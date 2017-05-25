import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

    constructor (props) {
        super (props)

        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit (e) {
        // const url = this.refs.url.value.trim();
        // const url = this.state.url;
        const { url } = this.state;

        e.preventDefault();

        // no need for if statement since the error handling on the server will send a message
        // if (url) {
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({
                    error: err.reason
                })
            }
        });
            // Links.insert({url, userId: Meteor.userId()});
            // this.refs.url.value = "";
        // }
    }

    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    handleModalClose () {
        this.setState({
            isOpen: false,
            url: "",
            error: ''
        });
    }

    render () {
        return (
            <div>
                <button className="button" onClick={() => {
                    this.setState({
                        isOpen: true
                    })
                }}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Link"
                    onAfterOpen={()=>{this.refs.url.focus()}}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add a Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="text" ref="url" placeholder="Url" value={this.state.url} onChange={this.onChange.bind(this)}/>
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}