import React, {Component} from 'react'
import './body.css'

class Main extends Component{

    constructor(props){
        super(props)
        this.rows=0
        this.cols=0
        this.state={
            'buts':[]
        }
        this.makeinputs()
    }

    makeinputs(){
        this.state.buts=[]
        for(var r=0;r<this.rows;r++){
            var tmpar=[]
            for (var c=0;c<this.cols;c++){
                tmpar.push(<td className='tablecell'><input className='tablein' type='number'/></td>)
            }
            this.state.buts.push(tmpar)
        }
        console.log(this.state.buts)
        this.setState(this.state)
    }

    render(){
        return(
            <div className='main'>
                <div className='relmain'>
                <div className="headbuts">
                    <div className="destori">Destinations : </div>
                    <input className="inputdestori" type="number" onChange={event => {
                        if(event.target.value>=0)
                            this.cols=event.target.value
                        this.makeinputs()
                    }}/>
                    <div className="destori">Origins : </div>
                    <input className="inputdestori" type="number" onChange={event => {
                        if(event.target.value>=0)
                            this.rows=event.target.value
                        this.makeinputs()
                    }}/>
                </div>
            <div className='bodymain'>
            <table className="inputtable">
                <tr className='tablehead' >
                    <th>

                    </th>
                    {this.state.buts.length>0 &&
                        this.state.buts[0].map((value,index) => (
                            <th> <div className='tableinh'>Destination {index+1}</div></th>
                        ))
                    }
                    <th><div className='tableinh'>b<sub>j</sub></div></th>
                </tr>
                {this.state.buts.map((value,index) => (
                    <tr>
                        <td> Origin {index+1}</td>
                        {value}
                        <td className='tablecell'><input className='tablein' type='number'/></td>
                    </tr>
                ))}
            </table>
            </div>
                </div>
            </div>
        )
    }
}

export default Main