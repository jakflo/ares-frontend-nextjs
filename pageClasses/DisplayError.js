import React, { Component } from 'react';

export default function DisplayError({error}) {
        console.log(error);
        var msg;
        switch (error.error) {
            case 'server connection error':
                msg = 'Nepodařilo se připojit k serveru';
                break;
            case 'invalid input':
            case 'empty query':
                msg = 'Neplatná data pro server';
                break;
            case 'server error':
                msg = 'Server vrátil neplatná data';
                break;
            case 'too much records returned':
                msg = 'Server vrátil příliš mnoho výsledků';
                break;
            case 'no records found':
                msg = 'Nebyl nalezen žádný záznam';
                break;
            case 'database connection error':
                msg = 'Nepodařilo se připojit k místní databázy.';
                break;
            default:
                msg = 'Neznámá chyba serveru';
        }
        return <p className="error">{msg}</p>;
}

