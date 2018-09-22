import React, {Component} from 'react'
import * as Material from '@material-ui/core'
import './main.css'

class TitleBar extends Component{

    butsval=[]
    cjval=[]
    bjval=[]

    constructor(props){
        super(props)
        this.state={
            dests:0,
            ori:0,
            buts:[],
            cj:[],
            bj:[],


            answerShow:false,
            solution:0
        }
    }
    theme=Material.createMuiTheme({
            palette: {
                primary: {
                    light: '#757ce8',
                    main: '#3f50b5',
                    dark: '#002884',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#ff7961',
                    main: '#f44336',
                    dark: '#ba000d',
                    contrastText: '#000',
                },
            },
        }
        )

    render() {

        var ori = []
        for (var i = 0; i < this.state.dests; i++)
            //ori.push(<Material.TableCell><input type="number" style={{width:"100%"}}/> </Material.TableCell>)
            ori.push(<Material.TableCell>Destination {i + 1}</Material.TableCell>)
        ori.push(<Material.TableCell>b<sub>j</sub></Material.TableCell>)

        this.state.bj = []
        this.state.cj = []


        if (this.cjval.length==0)
            this.cjval = []

        for (var i = 0; i < this.state.ori; i++) {
            this.state.bj.push(<Material.TableCell><input type="number" data-i={i} style={{width: "100%"}} onChange={
                event => {
                    var t = parseInt(event.target.value)
                    if (isNaN(t))
                        this.bjval[event.target.dataset.i] = 0
                    else
                        this.bjval[event.target.dataset.i] = t
                }
            }/></Material.TableCell>)
        }
        for(var i=0;i<this.state.dests;i++) {
            this.state.cj.push(<Material.TableCell><input type="number" data-i={i} style={{width: "100%"}} onChange={
                event => {
                    var t =parseInt(event.target.value)
                    if(isNaN(t))
                        this.cjval[event.target.dataset.i]=0
                    else
                        this.cjval[event.target.dataset.i]=t
                }
            }/></Material.TableCell>)
        }
        return(
        <div className="root">
        <Material.MuiThemeProvider theme={this.theme}>
        <Material.AppBar position="sticky" >
            <Material.Toolbar>
                <Material.Typography variant="title" color="inherit">
                    Transportation Solver
                </Material.Typography>
            </Material.Toolbar>
        </Material.AppBar>
        <Material.Grid container spacing={0}>
        <Material.Grid item xs>
            <Material.TextField
                type="number"
                variant="outlined"
                label="Origins"
                margin="normal"
                fullWidth
                onChange={event => { this.state.ori=event.target.value;this.update()}}
            />
        </Material.Grid>
        <Material.Grid item xs>
            <Material.TextField
                type="number"
                variant="outlined"
                label="Destinations"
                margin="normal"
                fullWidth
                onChange={event => {this.state.dests=event.target.value;this.update()}}
            />
        </Material.Grid>
        </Material.Grid>

            <Material.Paper style={{height:'100%',overflow:'auto'}}>

                <Material.Table>
                    <Material.TableHead>
                        <Material.TableCell/>
                        {ori}

                    </Material.TableHead>
                    <Material.TableBody>
                        {this.state.buts.map((value,index) => <Material.TableRow><Material.TableCell variant="head">Origin {index+1}</Material.TableCell>{value.map(v=>(<Material.TableCell>{v}</Material.TableCell>))}{this.state.bj[index]}</Material.TableRow>)}
                        <Material.TableRow>
                            <Material.TableCell variant="head">
                                c<sub>j</sub>
                            </Material.TableCell>
                            {this.state.cj}
                            <Material.TableCell>
                                <input type="number" style={{width:"100%"}}/>
                            </Material.TableCell>
                        </Material.TableRow>
                    </Material.TableBody>
                </Material.Table>

            </Material.Paper>
            <Material.Button variant="extendedFab" style={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
            }} onClick={event=>this.solve()}>Solve</Material.Button>
            <Material.Dialog
                fullScreen
                open={this.state.answerShow}
                onClose={this.closedialog}

            >
                <Material.AppBar color="primary" position="sticky">
                    <Material.Toolbar>
                        <Material.IconButton color="inherit" onClick={this.closedialog} aria-label="Close">
                            X
                        </Material.IconButton>
                        <Material.Typography variant="title" color="inherit"> Solution</Material.Typography>
                    </Material.Toolbar>
                </Material.AppBar>
                {this.state.solution}
            </Material.Dialog>
        </Material.MuiThemeProvider>
        </div>
        )
    }

    closedialog=()=>{
        this.state.answerShow=false;
        this.setState(this.state)
    }
    updatebuts(){
        this.state.buts=[];
        this.butsval=[]
        for(var i=0;i<this.state.ori;i++)
        {
            var tempb=[];
            var tmpval=[]
            for (var j=0;j<this.state.dests;j++)
            {
                tmpval.push(0)
                tempb.push(<input type='number' data-x={i} data-y={j} style={{width:"100%"}} onChange={event =>{
                    var t=parseInt(event.target.value)
                    if(isNaN(t))
                        this.butsval[event.target.dataset.x][event.target.dataset.y]=0
                    else
                        this.butsval[event.target.dataset.x][event.target.dataset.y]=t
                    console.log(event.target.value)
                }}/>)
            }
            this.state.buts.push(tempb)
            this.butsval.push(tmpval)
        }
    }

    update(){
        this.updatebuts();
        this.setState(this.state);
    }

    solve(){
        let matr=Array.from(this.butsval)
        let cj=Array.from(this.cjval);
        let bj=Array.from(this.bjval);
        let solv=[]

        let curi=0
        let curj=0
        console.log(bj,cj,this.cjval,this.bjval)
        const len=cj.length+bj.length-1
        for(let x=0;x<(cj.length+bj.length-1);x++){
            if(bj[curj]>=cj[curi]){
                solv.push([curj,curi,cj[curi]])
                bj[curj]-=cj[curi]
                cj[curi]=0
                curi++
            }
            else {
                solv.push([curj,curi,bj[curj]])
                //solv[curi.toString()+','+curj.toString()]=bj[curj]
                cj[curi]-=bj[curj]
                bj[curj]=0
                curj++
            }

        }
        console.log("solv ",solv, "bj ",bj, "cj ",cj)
        let fsol=0
        let c=''
        let s=[]
        for(let f=0;f<solv.length;f++){
            let curs=solv[f][2]*(matr[solv[f][0]][solv[f][1]])
            s.push(<p>x<sub>{solv[f][0]}{solv[f][1]}</sub> = {solv[f][2]}</p>)
            c+=solv[f][2].toString()+"x"+matr[solv[f][0]][solv[f][1]].toString()+" + "
            fsol+=curs
        }
        c=c.substr(0,c.length-2)
        s.push(<br/>)
        s.push(<p>Initial bfs is {c} = {fsol}</p>)
        this.state.solution=s
        this.state.answerShow=true;
        this.setState(this.state)

        console.log(solv,fsol)
    }

    MODI(){
        let tabl=[]
        let ui=[]
        let vj=[]
        for(let i=0;i<tabl.length;i++){}
    }
}


export default TitleBar;