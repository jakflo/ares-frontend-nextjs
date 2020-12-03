import React, { Component } from 'react';
import { useRouter } from 'next/router'
import $ from 'jquery';

export default function Detail() {
        var router = useRouter();
        var { ico } = router.query;
        return <DetailClass ico={ico} />
}

class DetailClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                
            };
        }
        
        render () {
            return (
                    <div id="company_detail">
                        <h1>Detail Firmy {this.props.ico}</h1>
                    </div>
                    );
        }
}




