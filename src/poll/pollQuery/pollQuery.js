import React from 'react'
import QueryItem from './queryItem'

import './pollQuery.css';


class PollQuery extends React.Component{

    
    constructor(props){
        super(props)
        this.state = {
            items: this.props.pollItem,
            selectedItemID :-1,
            selectedItemNAME :""
        }

        this.handleRbOnChangeCallback = this.handleRbOnChangeCallback.bind(this);
        this.vote = this.vote.bind(this)
    }

    vote(){
        fetch('http://localhost:8675/vote', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id : this.state.selectedItemID,
                    name : this.state.selectedItemNAME
                })
            }).then(function(response) {
                return response.json()
            }).then(function(data) {})
    }


    handleRbOnChangeCallback(id, name){
        this.setState({selectedItemID: id,
                        selectedItemNAME: name
                    })
    }

    render() {
        const {pollItems, loading} = this.props
        if (loading){
            return(
                <div> 
                    <h2>Loading...</h2>
                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <h1 className = "valiLemmik">
                            Vali lemmik loom.
                        </h1>
                    </div>
                    <div className = "pollList">
                        {pollItems.map((jsonDetail, index)=>{
                            return <QueryItem 
                                    pollItem = {jsonDetail} 
                                    key = {index} 
                                    dataCallback = {this.handleRbOnChangeCallback}
                                />
                        })}
                    </div>
                    <button className = "voteBtn" onClick={this.vote}>Vote!</button>
                </div>
            )
        }
    }
}

export default PollQuery