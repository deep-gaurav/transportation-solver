import React, {Component} from 'react'
import * as Material from '@material-ui/core'
import './main.css'

class TitleBar extends Component{

    constructor(props){
        super(props)
        this.state={
            dests:0,
            ori:0,
            buts:[]
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

    render(){

        var ori=[]
        for(var i=0;i<this.state.ori;i++)
            //ori.push(<Material.TableCell><input type="number" style={{width:"100%"}}/> </Material.TableCell>)
            ori.push(<Material.TableCell>Origin {i+1}</Material.TableCell>)
        ori.push(<Material.TableCell>b<sub>j</sub></Material.TableCell>)
        return(
        <div className="root">
        <Material.MuiThemeProvider theme={this.theme}>
        <Material.AppBar position="static" >
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

                    </Material.TableBody>
                </Material.Table>

            </Material.Paper>
        </Material.MuiThemeProvider>
        </div>
        )
    }

    updatebuts(){
        var bu=this.state.buts[];
        for(var i=0;i<this.state.dests)
        {
            var tempb=[];
            

        }
    }

    update(){
        this.setState(this.state);
    }
}

class Destori extends Component{
    render(){
        return(
            <Material.TextField
                type="number"
                variant="outlined"
                helperText="0"

            />
        )
    }

}

export default TitleBar;