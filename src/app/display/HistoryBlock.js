import {HistoryBlockBase} from "../../casino/display/gui/HistoryBlockBase";
import {AppG} from "../../casino/AppG";
import {GameConstStatic} from "../GameConstStatic";

export class HistoryBlock extends HistoryBlockBase {
    constructor(soundBtn = null) {
        super(soundBtn);
    }

    /**
     * Draw win symbols at history view block
     * @param {HistoryActionData} data
     */
    _drawSymbols(data) {
        let stopList = data.stopList;
        if (!stopList || !stopList.length) {
            return;
        }

        let totalReel = AppG.totalReel;
        let countSlot = AppG.gameConst.countSlot;
        let dx = this._gdConf["symbol_dx"];
        let dy = this._gdConf["symbol_dy"];
        let reels = AppG.serverWork.getReelsByCategory(data.category);

        for (let i = 0; i < totalReel; i++) {
            let reel = reels[i];
            let stopIndex = stopList[i];
            for (let j = 0; j < countSlot; j++) {
                let symbolKey = reel.charAtExt(stopIndex + j);
                /*if (data.rawData.special?.feature === "W" && i === 1 && j === 1)
                    symbolKey = "H";*/
                /** @type {OMY.OSprite} */
                let symbol = OMY.Omy.add.spriteJson(this._view.canvas, this._gdConf["symbol"]);
                symbol.texture = this._gdConf["symbol_map"][symbolKey];
                symbol.updateTransform();
                symbol.x = i * (symbol.width + dx);
                symbol.y = j * (symbol.height + dy);
                symbol.name = "s_" + String(i) + "_" + String(j);
                symbol.userData = symbolKey;
            }
        }
        this._view.alignContainer();
    }

    /**     * @private     */
    _clearExtraGraphic() {
    }

    _onActionOverHandler() {
        OMY.Omy.sound.play(GameConstStatic.S_btn_over_on);
        super._onActionOverHandler();
    }

    _onActionHandler(item) {
        this._clearExtraGraphic();
        return super._onActionHandler(item);
    }

    _onItemOverHandler() {
        OMY.Omy.sound.play(GameConstStatic.S_btn_over_on);
        super._onItemOverHandler();
    }

    _onItemHandler(item) {
        this._clearExtraGraphic();
        return super._onItemHandler(item);
    }

    _onCloseHandler() {
        this._clearExtraGraphic();
        super._onCloseHandler();
    }

    kill() {
        this._clearExtraGraphic();
        super.kill();
    }

//---------------------------------------
/// ACCESSOR
//---------------------------------------
}
