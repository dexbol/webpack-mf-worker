export default function log(msg) {
    var container = document.createElement('h2');
    container.textContent = msg;
    document.body.appendChild(container);
}