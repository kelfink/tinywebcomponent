const template = document.createElement('template');
template.innerHTML = `
<span id="outerNode"> YELP:<span id="textHere">${this.textColor}</span></span>
`;

class MultiProgress extends HTMLElement {
   constructor() {
        // always call super() first
        super(); 
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        // this.multiProgress = this._shadowRoot.querySelector('ul');
	console.log("constructor: this attributes item", this.attributes, this);
	// console.log("constructor: this attributes item", this.attributes[0]);
        this.$textHere = this._shadowRoot.querySelector('#textHere');
        this.$outerNode = this._shadowRoot.querySelector('#outerNode');
        console.log("constructor", this.properties());
    }

    connectedCallback() {
        console.log("Callback!");

        if(!this.hasAttribute('textColor')) {
            console.log("set default to black");
            this.setAttribute('textColor', 'black');
        }
        this.textColor = this.attributes['textcolor'].value;
	console.log("in callback: color = ", this.textColor);

        // We set a default attribute here; if our end user hasn't provided one,
        // our element will display a "black" color instead.
       this._renderMultiProgress();
    }

    _renderMultiProgress() {
      this.$textHere.innerHTML = this.textColor;
      this.$outerNode.style = `color:${this.textColor}`;
    }

    properties() {
        return {
	"textColor": { type: "String" },
        }
    }

    static get observedAttributes() {
        return ['textColor'];
    }

    disconnectedCallback() {
        console.log('disconnected!');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`, newVal);
    }

    adoptedCallback() {
        console.log('adopted!');
    } 


    static get observedAttributes() {
        return ['textColor'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
	console.log("Callback attribute changed", name);
        this._textColor = newValue;
    }
}
window.customElements.define('multi-progress', MultiProgress);
