import React, { Component } from 'react';

export class Track extends Component {
  constructor(props) {
    super(props)

    this.handleOnClickAction = this.handleOnClickAction.bind(this)
  }

  handleOnClickAction() {
    this.props.trackAction(this.props.track)
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleOnClickAction}>
          { this.props.actionContent }
        </a>
      </div>
    );
  }
}
