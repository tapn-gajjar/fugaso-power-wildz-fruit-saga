import {ServerWorkBase} from "../../casino/server/ServerWorkBase";
import {AppG} from "../../casino/AppG";
import {AppConst} from "../../casino/AppConst";

export class ServerWork extends ServerWorkBase {
    constructor() {
        super();
    }


    gameConfHandler(e) {
        let packet = e.data;
        packet.wins.map((a, index, array) => array[index].factor *= 0.1);
        return super.gameConfHandler(e);
    }

    _updateRespinData(packet) {
        if (AppG.isRespin || this._nextAct === AppConst.API_RESPIN) {
            this._oldHoldReel = this._holdMatrix;
            if (this._oldHoldReel) {
                var resultArray = this._oldHoldReel.map((value, index) => {
                    if (value === 1 && packet.result.holds[index] === 0) {
                        return 1;
                    } else {
                        return packet.result.holds[index];
                    }
                });
                packet.result.holds = resultArray;
            }

            this._holdMatrix = packet.result?.holds;
            this._totalRespinWin = packet.result.total;

            if (this._nextAct === AppConst.API_RESPIN) {
                if (!AppG.isRespin) {
                    AppG.isBeginRespin = true;
                    this._newHoldReel = this._holdMatrix.concat();
                    AppG.serverConsole && OMY.Omy.log("begin respin game");
                } else {
                    this._holdMatrix.map((a, index, array) => {
                        this._newHoldReel[index] = (this._holdMatrix[index] === this._oldHoldReel[index]) ? 0 : 1;
                    });
                    AppG.serverConsole && OMY.Omy.log("next respin game");
                }
            } else {
                this._holdMatrix.map((a, index, array) => {
                    this._newHoldReel[index] = (this._holdMatrix[index] === this._oldHoldReel[index]) ? 0 : 1;
                });
                if (this._nextAct === AppConst.API_COLLECT
                    || this._nextAct === AppConst.API_FREE_COLLECT
                    || this._nextAct === AppConst.API_BET 
                    || this._nextAct === AppConst.API_GAMBLE_END) {
                    AppG.isEndRespin = true;
                    AppG.serverConsole && OMY.Omy.log("end respin game");
                } else {
                    AppG.serverConsole && OMY.Omy.error("not nextAcation is take. Cann`t finish respin!!!");
                }
            }
        } else {
            this._holdMatrix = null;
        }
    }

//---------------------------------------
/// ACCESSOR
//---------------------------------------
}
