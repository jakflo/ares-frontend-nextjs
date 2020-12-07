import React, { Component } from 'react';
import { useRouter } from 'next/router';
import SendRequest from '../../SendRequest.js';
import DisplayError from '../../pageClasses/DisplayError.js';
import conf from '../../conf.js';
import $ from 'jquery';

export default function Detail() {
        var router = useRouter();
        var ico = router.query.ico;
        if (ico !== undefined) {
            return <DetailClass ico={ico} />;
        }
        return null;
};

class DetailClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: {}, 
                dataLoaded: false, 
                error: null                
            };
        }
        
        render () {
            var homeButton = <a href="/"><button type="button">domů</button></a>;            
            if (this.state.error !== null) {
                return (
                        <div id="error_page">
                            <DisplayError error={this.state.error} />
                            {homeButton}
                        </div>
                        );
            }
            if (!this.state.dataLoaded) {
                this.loadData();
                return <h1>Nahrávám...</h1>;
            }
            
            var data = this.state.data;
            var dataSource = data.source;
            if (data.source === 'localDb') {
                dataSource = 'Místní databáze (uloženo ' + data.dataSaved + ' )';
            }
            return (                    
                    <div id="company_detail">
                        <h1>Detail Firmy</h1>
                        <div id="basic_info_wrap">
                            <h2>Základní informace</h2>
                            <table id="basic_info" className="list">
                                <tbody>
                                    <RowIfValueNotEmpty label="Zdroj dat" value={dataSource} />
                                    <RowIfValueNotEmpty label="Název firmy" value={data.name} />
                                    <RowIfValueNotEmpty label="IČO" value={data.ico} />
                                    <RowIfValueNotEmpty label="DIČ" value={data.dic} />
                                    <RowIfValueNotEmpty label="Datum vzniku" value={data.datumVzniku} />
                                    <RowIfValueNotEmpty label="Datum zániku" value={data.datumZaniku} />
                                </tbody>
                            </table>
                        </div>
                        <div id="address_wrap">
                            <h2>Adresa</h2>
                            <table id="address" className="list">
                                <tbody>
                                    <RowIfValueNotEmpty label="Ulice" value={data.address.ulice} />
                                    <RowIfValueNotEmpty label="Číslo popisné" value={data.address.cisloPopisne} />
                                    <RowIfValueNotEmpty label="Číslo orientační" value={data.address.cisloOrientacni} />
                                    <RowIfValueNotEmpty label="Obec" value={data.address.obec} />
                                    <RowIfValueNotEmpty label="Okres" value={data.address.okres} />
                                    <RowIfValueNotEmpty label="Část obce" value={data.address.nazevCastiObce} />
                                    <RowIfValueNotEmpty label="městská část" value={data.address.mestskaCast} />
                                    <RowIfValueNotEmpty label="PSČ" value={data.address.psc} />
                                    <RowIfValueNotEmpty label="Stát" value={data.address.stat} />
                                </tbody>
                            </table>
                        </div>
                        <ActivitiesList activitiesListArray={data.fieldOfActivity} />
                        <button type="button" onClick={this.persist}>Uložit do databáze</button>
                        {homeButton}
                    </div>
                    );
        }
        
        loadData = (forceAres = false) => {
            var sendRequest = new SendRequest();
            var toto = this;
            var reqParam = {};
            if (forceAres) {
                reqParam = {forceAres: 1};
            }
            sendRequest.fullReq('GET', conf.serverUrl + '/getDetail/' + this.props.ico, reqParam)
                    .then((data) => {
                        toto.setState({data: data, dataLoaded: true});                
                    })
                    .catch((err) => {
                        toto.setState({error: err});
                    })
            ;            
        }
        
        persist = () => {
            var sendRequest = new SendRequest();
            var toto = this;
            sendRequest.fullReq('POST', conf.serverUrl + '/persist/' + this.props.ico, {})
                    .then((data) => {
                        console.log(data);                                        
                    })
                    .catch((err) => {
                        toto.setState({error: err});
                    });
        }
}

function RowIfValueNotEmpty({label, value}) {
    if (value === null || value === undefined) {
        return null;
    }
    return (
            <tr>
                <th>{label}</th>
                <td>{value}</td>
            </tr>
            );
}

function ActivitiesList({activitiesListArray}) {
    if (activitiesListArray.length === 0) {
        return null;
    }
    var actList = [];
    var k;
    for (k in activitiesListArray) {
        let item = <li key={k}>{activitiesListArray[k].name}</li>;
        actList.push(item);
    }
    return (
            <div id="field_of_activity_wrap">
                <h2>Seznam činností</h2>
                <ul id="field_of_activity">
                    {actList}
                </ul>
            </div>
            );
}
