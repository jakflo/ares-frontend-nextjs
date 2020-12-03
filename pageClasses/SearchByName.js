import React, { Component } from 'react';
import $ from 'jquery';

export default class SearchByName extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                
            };
        }
        
        render () {
            return (
                    <h1>Výsledky hledání{this.props.name}</h1>
                    );
        }
}

