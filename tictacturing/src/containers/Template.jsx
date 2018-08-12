import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

class Template extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <header>
                        <h1>TicTacTuring</h1>                    
                        <RaisedButton
                            label={"Test Button"}
                            primary={true}
                            onClick={() => { console.log("hello, I work"); }}
                        />
                    </header>
                    <main>
                        {this.props.children}
                    </main>
                </div>                
            </MuiThemeProvider>
        );
    }
}

export default Template;