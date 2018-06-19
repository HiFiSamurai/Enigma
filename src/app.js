import {View} from '@HiFiSamurai/ui-toolkit';
import html from './app.html';
import './app.scss';

import Enigma from './machine/Enigma';

const enigma = new Enigma();

class App extends View {
    static get name() { return 'enigma-app'; }
    static get html() { return html; }

    connectedCallback() {
        this.querySelector('#submitTrigger').addEventListener('click', () => {
            const inputText = this.querySelector('#inputText').value;
            const mode = this.querySelector('#machineMode').checked ? 'decode' : 'encode';
            const outputText = enigma[mode](inputText);
            this.querySelector('#outputText').innerHTML = outputText;
        });
    }
};

App.wrapped();
