const template = document.createElement("template")

template.innerHTML = `
    <style>
        label {
            color: green;
            dispaly: block;
        }

        .description{
            font-size: .65rem;
            color: #777;
            font-weight: lighter;
        }
    </style>
    <label>
        <input type="checkbox" />
        <slot></slot>
        <span class="description">
            <slot name="description></slot>
        </span>
    </label>    
`
class TodoItem extends HTMLElement {
    constructor () {
        super();
        const shadow = this.attachShadow({ mode: "open" })
        shadow.append(template.content.cloneNode(true))
        this.checkbox = shadow.querySelector("input")
    }

    static get observedAttributes() {
        return ["checked"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") this.updateCheck(newValue)
    }

    updateCheck(value) {
        this.checkbox.checked = value != null && value !== "false"
    }

    connectedCallback() {
        console.log("connected")
    }

    disconnectedCallback() { //called Anytime, when remove any element
        console.log("disconnected")
    }

}

customElements.define("todo-item", TodoItem);

