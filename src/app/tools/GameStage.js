export class GameStage extends PIXI.display.Stage {
    constructor() {
        super();

        this.addChild(new PIXI.display.Layer((this._mainView = new PIXI.display.Group(1, false))));
        this.addChild(new PIXI.display.Layer((this._symbol = new PIXI.display.Group(2, false))));
        this.addChild(new PIXI.display.Layer((this._topSymbols = new PIXI.display.Group(3, false))));
        this.addChild(new PIXI.display.Layer((this._mainViewUpper = new PIXI.display.Group(4, false))));
        this.addChild(new PIXI.display.Layer((this._gui = new PIXI.display.Group(5, false))));
    }

    get mainView() {
        return this._mainView;
    }

    get symbol() {
        return this._symbol;
    }

    get topSymbols() {
        return this._topSymbols;
    }

    get mainViewUpper() {
        return this._mainViewUpper;
    }

    get gui() {
        return this._gui;
    }
}
