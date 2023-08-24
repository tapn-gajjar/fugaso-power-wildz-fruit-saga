import {GameConstStatic} from "../../GameConstStatic";
import {AppG} from "../../../casino/AppG";
import {SlotSymbolActorBase} from "../../../casino/display/reels/SlotSymbolActorBase";
import { AppConst } from "../../../casino/AppConst";

export class SlotSymbol extends SlotSymbolActorBase {
    constructor(reelIndex, reelParent, symbolIndex) {
        super(reelIndex, reelParent, symbolIndex);
        AppG.emit.on(GameConstStatic.OFF_WAIT_SYMB_EFFECT, this._offWaitEffect, this);
    }

    //-------------------------------------------------------------------------
    // PRIVATE
    //-------------------------------------------------------------------------
    playWildWaitEffect() {
        this._symbolS.visible = false;
        const onActiveWait = this._reelIndex === AppG.state.mainView.activeWaitReelIndex;
        OMY.Omy.sound.play((onActiveWait) ? GameConstStatic.S_wild_coins : GameConstStatic.S_wild_drop);
        // const effect = (onActiveWait) ?
        //     this._gdConf["wild_second"] : this._gdConf["wild"];
        const effect =  this._gdConf["wild"];
        /** @type {OMY.OActorSpine} */
        this._effect = OMY.Omy.add.actorJson(this, effect);
        this._effect.gotoAndPlay(0);
        this._effect.addComplete(this._playWin, this, true);
    }

    /**     * @private     */
    _playWin() {
        if (this._effect) {
            this._effect.gotoAndPlay(0, true, this._effect.json["win"]);
        }
    }

    holdSymbol() {
        this.updateStateImg(AppConst.SLOT_SYMBOL_NO_WIN);
        this._isHold = true;
        if (OMY.OMath.inArray(AppG.gameConst.getData("longReelSymbol"), this._imageName)) {
            this._symbolS.visible = false;
            /** @type {OMY.OActorSpine} */
            this._effect = OMY.Omy.add.actorJson(this, this._gdConf["wait"]);
            this._effect.play(true);
        }
    }

    unHoldSymbol() {
        this._isHold = false;
        this._removeEffect();
        this.updateStateImg(AppConst.SLOT_SYMBOL_NONE);
    }

    /**     * @private     */
    _removeEffect() {
        if (this._effect) {
            this._effect.stop();
            this._effect.kill();
            this._effect = null;
            this._symbolS.visible = true;
        }
    }

    respinSymbol(spine) {
        this._removeEffect();
        this._isRespinHold = true;
        /** @type {OMY.OActorSpine} */
        this._respinSpine = spine;
        // this.updateStateImg(AppConst.SLOT_SYMBOL_NO_WIN);
        // this._symbolS.visible = false;
        // /** @type {OMY.OActorSpine} */
        // this._effect = OMY.Omy.add.actorJson(this, this._gdConf["wild"]);
        // this._effect.play(true);
        this.visible = false;
    }

    restartAnimation() {
        // this._effect.gotoAndPlay(0, true);
    }

    unRespinSymbol() {
        if (this._isRespinHold) {
            this._respinSpine = null;
            if (this.alpha !== 1) {
                this._symbState = AppConst.SLOT_SYMBOL_WIN;
            }
            this._isRespinHold = false;
            this.visible = true;
            this._symbolS.visible = true;
            // this.updateStateImg(AppConst.SLOT_SYMBOL_NONE);
        }
    }

    _startSpin() {
        this.parentGroup && OMY.Omy.remove.removeFromLayer(this);
        // SlotSymbol.SANTA_MAP.fill(0);
        // SlotSymbol.SCATTER_COUNT = 0;
        super._startSpin();
    }

    /**     * @private     */
    _onCheckIdleEffect() {
        if (this._isFocus) {
            if (!this.parentGroup && this._symbolName === "H") OMY.Omy.add.addToLayer(this, AppG.stage.symbol);
        }
        // if (this._symbolS.userData === "drop") return;
        // if (this._isFocus) {
        //     if (!this.parentGroup && this._symbolName === "C") OMY.Omy.add.addToLayer(this, AppG.stage.symbols);
        //     else if (!this.parentGroup && this._symbolName === "B") OMY.Omy.add.addToLayer(this, AppG.stage.topSymbols);
        // }
        // if (this._isFocus && this._gdConf["idle"][this._symbolName] && this._symbolS.userData !== "idle") {
        //     this._updateSymbolImg();
        // } else if (!this._isFocus && this._symbolS.userData === "idle") {
        //     this._symbolS.userData = "static";
        //     this._symbolS.gotoAndPlay(0, false, this._gdConf["symbols"][this._symbolName]);
        // }
    }

    checkSymbolOnTop() {
        // if (this._symbolName === "@" && this.parent) this.parent.addChild(this);
    }

    _playStopEffect() {
        super._playStopEffect();
        if (this._isFocus) {
            if (!this.parentGroup && this._symbolName === "H") OMY.Omy.add.addToLayer(this, AppG.stage.symbol);
        }
        // if (this._isFocus) {
            // if (!this.parentGroup && this._symbolName === "C") OMY.Omy.add.addToLayer(this, AppG.stage.symbols);
            // else if (!this.parentGroup && this._symbolName === "B") OMY.Omy.add.addToLayer(this, AppG.stage.topSymbols);
            // if (this._gdConf["drop"][this._symbolName]) {
            //     this._symbolS.userData = "drop";
            //     this._symbolS.gotoAndPlay(0, false, this._gdConf["drop"][this._symbolName]);
            //     this._symbolS.addComplete(this._updateSymbolImg, this, true);
                // OMY.Omy.sound.play(GameConstStatic.S_wild_drop);
                // AppG.emit.emit(GameConstStatic.E_WILD_ON_SCREEN, this._reelIndex, this);
                /*if (this._symbolName === "@") {
                    if (!SlotSymbol.SANTA_MAP[this._reelIndex]) {
                        SlotSymbol.SANTA_MAP[this._reelIndex] = 1;
                        let count = SlotSymbol.SANTA_MAP.reduce((acc, a) => acc + a);
                        count = (count > 5) ? 5 : count;
                        OMY.Omy.sound.play(GameConstStatic["S_drop_santa" + String(count)]);
                    }
                }*/
                /*if (this._symbolName === "H") {
                    SlotSymbol.SCATTER_COUNT = (SlotSymbol.SCATTER_COUNT > 3) ? 3 : SlotSymbol.SCATTER_COUNT + 1;
                    OMY.Omy.sound.play(GameConstStatic["S_drop_scatter" + String(SlotSymbol.SCATTER_COUNT)]);
                }*/
            // }
        // }
    }

    /**     * @private     */
    _offWaitEffect() {
        /*if (this._activeWaitOnIdle) {
            if (this._effect) {
                if (this._effect.json["idle"]) this._effect.gotoAndPlay(0, true, this._effect.json["idle"]);
                else OMY.Omy.game.addNextTickUpdate(this._removeEffect, this);
            }
            this._activeWaitOnIdle = false;
        }*/
    }

    activeWait(symbolChar, newOnReel = false) {
        /*if (this._effect && !newOnReel) {
            this._effect.gotoAndPlay(0, true, this._effect.json["wait"]);
        }
        this._activeWaitOnIdle = true;*/
    }

    _blurState() {
        super._blurState();
        // this._blurS.tint = (this._symbolName === "H" || this._symbolName === "@") ? 0xFFFFFF : 0x5C5C5C;
    }

    _blurOffState() {
        super._blurOffState();
    }

    _winEffectState() {
        super._winEffectState();
    }

    _noWinState() {
        super._noWinState();
        if(this._symbolName !== "H"){
            if (this._respinSpine && this._respinSpine.alpha === 1) {
                OMY.Omy.remove.tween(this._respinSpine);
                OMY.Omy.add.tween(this._respinSpine, {alpha: this.blockAlpha}, 0.3);
            }
            // if (this.alpha === 1) {
            //     OMY.Omy.remove.tween(this);
            //     OMY.Omy.add.tween(this, {alpha: this.blockAlpha}, 0.3);
            // }
            this._symbolS.userData = "static";
            this._symbolS.gotoAndPlay(0, false, this._gdConf["symbols"][this._symbolName]);
        }
    }

    _defeatState() {
        if(this._symbolName !== "H"){
            if (this._respinSpine) {
                OMY.Omy.remove.tween(this._respinSpine);
                if (this._respinSpine.alpha !== 1)
                    OMY.Omy.add.tween(this._respinSpine, {alpha: 1}, 0.3);
            }
            // if (this.alpha !== 1) {
            //     OMY.Omy.remove.tween(this);
            //     OMY.Omy.add.tween(this, {alpha: 1}, 0.3);
            // }
            if (this._symbolBg) {
                this._symbolBg.destroy();
                this._symbolBg = null;
            }
            super._defeatState();
            this._updateSymbolImg();
        }
        
    }

    _hideState() {
        super._hideState();
    }

    setSymbol(sName = null) {
        super.setSymbol(sName);
        Boolean(this._gdConf["skins"][this._symbolName]) ? this._symbolS.setSkin(this._gdConf["skins"][this._symbolName]) : this._symbolS.setSkin("default");
    }

    _updateSymbolImg() {
        super._updateSymbolImg();
        if (this._symbolS.userData === "drop") this._symbolS.removeComplete(this._updateSymbolImg, this);
        if (this._isFocus && !this._spinning && this._gdConf["idle"][this._symbolName]) {
            this._symbolS.userData = "idle";
            this._symbolS.gotoAndPlay(0, true, this._gdConf["idle"][this._symbolName]);
        } else {
            this._symbolS.userData = "static";
            this._symbolS.gotoAndPlay(0, false, this._gdConf["symbols"][this._symbolName]);
        }
    }

    updateStateImg(st) {
        if (this._isHold || this._isRespinHold) {
            if (st === AppConst.SLOT_SYMBOL_NO_WIN)
                this._noWinState();
            if (st === AppConst.SLOT_SYMBOL_NONE || st === AppConst.SLOT_SYMBOL_WIN) {
                this._defeatState();
            }
            return;
        }
        return super.updateStateImg(st);
    }

//-------------------------------------------------------------------------
    // PUBLIC
    //-------------------------------------------------------------------------

    set isFocus(value) {
        this._isFocus = value;
    }

    get isFocus() {
        return super.isFocus;
    }

    set onReel(value) {
        /*if (this._symbolName === "@") {
            // this._checkSymbolPos = true;
            AppG.emit.emit(GameConstStatic.SYMBOL_ON_REEL, this._reelIndex, value);
        }*/
    }

    get needBlur() {
        return Boolean(this._gdConf["blur"][this._symbolName]);
    }
}

// SlotSymbol.SANTA_MAP = [0, 0, 0, 0, 0];
// SlotSymbol.SCATTER_COUNT = 0;
