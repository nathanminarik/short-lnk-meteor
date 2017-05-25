import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinkListItem extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            copied: false
        }
    }

    componentDidMount () {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({
                copied: true
            });
            
            setTimeout(() => {
                this.setState({
                    copied: false
                });
            }, 1000);
        }).on('error', () => {
            this.setState({
                copied: 'error'
            });
            
            setTimeout(() => {
                this.setState({
                    copied: false
                });                
            }, 1000)
        });
    }

    componentWillUnmount () {
        this.clipboard.destroy
    }

    renderStats() {

        const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
        let visitedMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visted ${moment(this.props.lastVisitedAt).fromNow()})`
        }

        return (
            <div>
                <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
            </div>
        )
    }

    render () {
        return (
            <div className="item">
                <h2>Link: {this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {/*<p>Visible: {this.props.visible.toString()}</p>*/}
                {this.renderStats()}
                <a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied === true ? 'Copied' : this.state.copied === 'error' ? 'Error' : 'Copy'}</button>
                <button className="button button--pill" ref="visible" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
                    {this.props.visible === true ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}

LinkListItem.propTypes = {
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    lastVisitedAt: PropTypes.number,
    visitedCount: PropTypes.number.isRequired,
}