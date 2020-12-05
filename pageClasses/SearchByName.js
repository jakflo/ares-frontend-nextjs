import React, { Component } from 'react';
import SendRequest from '../SendRequest.js';
import DisplayError from './DisplayError.js';
import ThSortable from './ThSortable.js';
import {sortObjectArray} from '../functions.js';
import conf from '../conf.js';

export default class SearchByName extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [], 
                dataLoaded: false, 
                error: null
            };
            this.defaultData = [];
            this.markedThSortable = null;
        }
        
        render () {
            var backButton = <button type="button" onClick={this.goBack}>zpět</button>;            
            if (this.state.error !== null) {
                return (
                        <div id="error_page">
                            <DisplayError error={this.state.error} />
                            {backButton}
                        </div>
                        );
            }
            if (!this.state.dataLoaded) {
                this.loadData();
                return <h1>Hledám...</h1>;
            }
            
            var hideEmptyTable = this.state.data.recordsFound === 0 ? 'hidden' : '';
            var tableData = [];
            var k;
            for (k in this.state.data.records) {
                let item = this.state.data.records[k];
                let row = (
                        <tr key={k}>
                            <td>{item.n}</td>
                            <td>{item.ico}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>
                                <a href={'detail/' + item.ico} target="_blank" rel="noopener noreferrer">
                                    <button type="button">detail</button>
                                </a>
                            </td>
                        </tr>                        
                        );
                tableData.push(row);                
            }
            return (
                    <div id="search_result">
                        <h1>Výsledky hledání výrazu {this.props.name}</h1>
                        <p className="notice">Počet nalezených záznamů: {this.state.data.recordsFound}</p>
                        <table className={'normTab ' + hideEmptyTable}>
                            <tbody>
                                <tr>
                                    <ThSortable name="#" sortBy="n" parent={this} />
                                    <ThSortable name="IČO" sortBy="ico" parent={this} />
                                    <ThSortable name="Jméno firmy" sortBy="name" parent={this} />
                                    <ThSortable name="adresa" sortBy="address" parent={this} />
                                    <th></th>
                                </tr>
                                {tableData}
                            </tbody>
                        </table>
                        <br />
                        {backButton}
                    </div>
                    );
        }
        
        loadData = () => {
            var sendRequest = new SendRequest();
            var toto = this;
            sendRequest.fullReq('GET', conf.serverUrl + '/search', {q: this.props.name})
                    .then((data) => {
                        toto.defaultData = data;
                        toto.setState({data: data, dataLoaded: true});
                
                    })
                    .catch((err) => {
                        toto.setState({error: err});
                    })
            ;
        }
        
        sortData = (columnName, sortByDesc) => {
            var dataRecords = this.defaultData.records;
            sortObjectArray(dataRecords, columnName, sortByDesc ? 'DESC' : 'ASC');
            var data = this.state.data;
            data.records = dataRecords;
            this.setState({data: data});
        }
        setMarkedThSortable = (thSortable) => {
            this.markedThSortable = thSortable;
        }
        unmarkMarkedThSortable = () => {
            if (this.markedThSortable !== null) {
                this.markedThSortable.unmark();
            }
        }
        
        goBack = () => {
            this.props.parent.goHome();
        }
}

