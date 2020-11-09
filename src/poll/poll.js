import React from 'react'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import PollQuery from './pollQuery/pollQuery'
import PollResults from './pollResults/pollResults'

import './poll.css';

class Poll extends React.Component{
    
    
    constructor(props){
        super(props)

        const sock = new SockJS('http://localhost:8674/results');
        const stomp = Stomp.over(sock);

        this.state = {
            items: [],
            stompSoc : stomp,
            loading : true
        }

        stomp.connect({}, (frame) =>{
            console.log('Connected: ' + frame);
            stomp.subscribe('/pollResults/poll', (msg)=>{
                var parsedData = JSON.parse(msg.body)
                if (parsedData){
                    this.setState({items: parsedData,
                                    loading: false})
                }
            })
        })
    }

    render() {

        const {items, loading} = this.state
        return (
            <div className="Poll">
                <div className="PollQuery">
                    <PollQuery pollItems={items} loading={loading}/>
                </div>
                <div className="PollResult">
                    <PollResults pollItems={items}/>
                </div>
            </div>
        )
    }
}

export default Poll