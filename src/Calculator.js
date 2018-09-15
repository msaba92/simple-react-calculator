import React, { Component } from 'react';
import './Calculator.css';
import math from 'mathjs';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            screenValue: "",
            resultValue: 0
        }
    }

    createButtons = () => {
        let button_values = [
            {"cos": "cos()"},
            {"sin": "sin()"},

            {"+": "+"},
            {"1": "1"},
            {"2": "2"},
            {"3": "3"},

            {"tan": "tan()"},
            {"sqrt": "sqrt()"},

            {"-": "-"},
            {"4": "4"},
            {"5": "5"},
            {"6": "6"},

            {"^": "^"},
            {"!": "!"},

            {"/": "/"},
            {"7": "7"},
            {"8": "8"},
            {"9": "9"},

            {"log": "log()"},
            {"ln": "ln()"},

            {"*": "*"},
            {"0": "0"},
            {"del": "del"},
            {"=": "="}

        ]
        let buttons = []
        for (let row = 0; row < 4; row++) {
            let children = []
            for (let column = 0; column < 6; column++) {
                let index = (row)*6 + (column);
                let value = Object.keys(button_values[index]);

                let mybutton = <button class='operator'
                                       onClick={this.handleClick}
                                       row={`${row+1}`}
                                       column={`${column+1}`}
                                       value={`${value}`}>
                                       {`${button_values[index][value]}`}
                                       </button>
                children.push(mybutton);
            }
            buttons.push(<tr>{children}</tr>)
        }
        return buttons;
    }

    handleClick = (event) => {
        let value = event.target.getAttribute("value");
        let operators = ["+", "-", "/", "*", "!", "^"];
        if (!isNaN(value) || operators.includes(value)) {
            this.setState({
                screenValue: this.state.screenValue + value
            })
        } else if (value === "=") {
            this.executeExpression();
        } else if (value === "del") {
            this.setState({
                screenValue: this.state.screenValue.slice(0, -1)
            })
        } else {
            this.setState({
                screenValue: value + "(" + this.state.screenValue + ")"
            })
        }
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.executeExpression();
        }
    }

    updateValue = (event) => {
        this.setState({
            screenValue: event.target.value
        })
    }


    executeExpression = () => {
        try {
            this.setState({
                resultValue: math.eval(this.state.screenValue)
            })
        } catch (e) {
            this.setState({
                resultValue: "Error!"
            })
        }
    }

    render() {
        return (
          <div id="calculator">
            <div id="screenContainer">
                <input id="screen" value={this.state.screenValue}
                    onChange={(e) => this.updateValue(e)}
                    onKeyPress={(e) => this.handleKeyPress(e)}>
                </input>
                <div id="results">={this.state.resultValue}</div>
            </div>
            <div id="buttons">
                {this.createButtons()}
            </div>
          </div>
        );
    }
}

export default Calculator;
