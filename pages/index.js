import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { Component } from 'react';
import Search from '../pageClasses/Search.js';
import SearchByName from '../pageClasses/SearchByName.js';

export default class Home extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            error: null, 
            companyName: '', 
            page: <Search parent={this} />
        };
    }
    
    render() {        
        return (
            <div className={styles.container}>
              <Head>
                <title>Seznam firem|Hledání</title>
              </Head>
              {this.state.page}
            </div>
          )
    }
    
    searchByName = (name) => {
        this.setState({page: <SearchByName name={name} />});
    }
}
