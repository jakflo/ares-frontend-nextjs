import React, { Component } from 'react';
import $ from 'jquery';

export default class AutosizeInput extends React.Component {        
        constructor(props) {
            super(props);
            this.state = {
                cellSize: 20
            };
        }
        
        render () {
            return (
                <input 
                    id={this.props.name} 
                    type="text" 
                    name={this.props.name}                      
                    size={this.state.cellSize}
                    onChange={this.resize}
                />
                );
        }
        
        resize = () => {
            var textLen = $('#' + this.props.name).val().length;
            var betterTextLen = textLen + 2;
            this.setState({cellSize: (betterTextLen > 20? betterTextLen : 20)});
        }
}
