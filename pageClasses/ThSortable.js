import React, { Component } from 'react';

export default class ThSortable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isMarked: false, 
                sortOrder: null //null, 'ASC', or 'DESC'
            };            
        }
        
        render () {
            var className = "sortable" + (this.state.isMarked ? ' marked' : '');
            var orderByIcon = '';
            if (this.state.isMarked) {
                orderByIcon = this.state.sortOrder === 'ASC' ? ' ▲' : ' ▼';
            }
            return <th 
                className={className} 
                onClick={this.sort}
                >
                {this.props.name + orderByIcon}
            </th>
        }
        
        sort = () => {
            if (!this.state.isMarked) {
                this.props.parent.unmarkMarkedThSortable();
            }
            var sortOrder = this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
            this.props.parent.setMarkedThSortable(this);
            this.props.parent.sortData(this.props.sortBy, sortOrder === 'DESC');
            this.setState({isMarked: true, sortOrder: sortOrder});
        }
        unmark = () => {
            this.setState({isMarked: false, sortOrder: null});
        }
}