import React, { Component } from 'react';
import AutosizeInput from './AutosizeInput.js';
import $ from 'jquery';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBy: 'ico', 
            formError: ''
        };
    }
        
    render () {
        var searchField;
        if (this.state.searchBy === 'ico') {
            searchField = <input type="text" name="queryByIco" id="queryByIco" />;
        }
        else if (this.state.searchBy === 'name') {
            searchField = <AutosizeInput name="queryByName" />;
        }
        else {
            searchField = '';
        }
        
        return (
                <div id="searcher">
                    <h1>Vyhledávání firem</h1>
                    {this.state.formError}
                    <form onSubmit={this.submit}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Vyhledat dle:</th>
                                    <td>
                                        <select name="search_by" id="search_by" onChange={this.changeSearchBy}>
                                            <option value="ico">Ičo</option>
                                            <option value="name">Jméno firmy</option>
                                        </select>
                                    </td>
                                    <td>{searchField}</td>
                                    <td><input type="submit" name="sent" value="hledat" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                );
    }
    
    changeSearchBy = () => {
        this.setState({searchBy: $('#search_by').val()});
    }
    
    submit = (event) => {
        event.preventDefault();
        if (this.state.searchBy === 'ico') {
            if (this.checkIco()) {
                window.location.replace("detail/" + $('#queryByIco').val().trim());
            }
        }
        else if (this.state.searchBy === 'name') {
            if (this.checkName()) {
                this.props.parent.searchByName($('#queryByName').val().trim());
            }
        }
        else {
            return false;
        }        
    }
    
    checkIco = () => {
        var query = $('#queryByIco').val().trim();
        if (query === '') {
            this.setError('Zadejte IČO');
            return false;
        }
        if (isNaN(query) || parseInt(query) != query || query <= 0) {
            this.setError('IČO musí být číslo');
            return false;
        }
        return true;
    }
    checkName = () => {
        var query = $('#queryByName').val().trim();
        if (query === '') {
            this.setError('Zadejte název firmy');
            return false;
        }
        else if (query.length > 100) {
            this.setError('Název firmy může být nenejvýš 100 znaků dlouhý');
            return false;
        }
        else {
            return true;
        }
    }    
    setError = (error) => {
        this.setState({formError: <span className="form_error">{error}</span>});
    }
    
};

