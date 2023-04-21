export default class Section {
    constructor(renderer, templateSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(templateSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    rendererItems(items) {
        this._items = items;
        this._items.forEach(item => {
            this._container.append(this._renderer(item));
        });
    }

}
