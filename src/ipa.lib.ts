//==================================================================================================
import * as mx from "./mxlib";
export class MMap {
    _h: Map<string, string> = new Map();
    size(): number { return this._h.size };
    set(k: string, v: string): void { this._h.set(k, v) };
    get(key: string): string {
        //let sR = this._h.get(key) || "";
        //return sR;
        let sK = this._h.get("" + key);
        return this._h.get("" + key) || "";
    };
};

export const hReadIPA = (aIPA: string[]): MMap => {
    const hIPA: MMap = new MMap();
    let nCounter = 0;
    for(let sIPARow of aIPA) { //}.split("\n")) {
        // delete comments in the file 
        if (sIPARow.startsWith("//")) continue;
        if (sIPARow.startsWith("#")) continue;
        sIPARow = sIPARow.replace(/\#.*/g, "");
        sIPARow = sIPARow.replace(/\/\/.*/g, "");
        sIPARow = sIPARow.trim();
        if (sIPARow.length) {
            nCounter++;
            let rx = /^([^\[]+)\s+\[(.+)\]$/g.exec(sIPARow) || [""];
            if (rx.length >= 3) {
                if (hIPA.get(rx[1])) console.log("Warn. key exists: " + rx[1]);
                hIPA.set(rx[1], rx[2]);
            } else {
                console.log(`Error in line:${nCounter} with "${sIPARow}"`);
            };
            //if (nCounter >= 100) break;
        };
    };
    return hIPA;
};

export const ipa2cyr = (sText: string): string => { 
// on note:  ᚏ ¨ з ȝ љ ѳ ѹ ҏ ҩ ӈ α ς υ ϙ ᵝ ᾱ ª ę ȩ ŏ ǫ ɘ ʊ ᴮ ᴬ ᴱ ᴴ ᴶ ᴿ ᵁ ᵂ ᵃ ᵅ ᵖ ᵘ ᶣ ⁱ
    if (sText) {
        let lineFr = "bdfghjklmnprstvwŋðθʧʃɡ";
      //let lineTo = "бдфгхйклмнпрствўҥӟċчшг"; // ßβ ʒƷǯҙӟ ċҫςĉ ӈ ʳ ˢ ˣ ˠ ʷ diphthong ⁰⁴⁵⁶⁷⁸⁹₀ₐ ѫ
        let lineTo = "бдфгхйклмнпрствßҥҙҫчшг"; // ßβ ʒƷǯҙӟ ċҫςĉ ӈ ʳ ˢ ˣ ˠ ʷ diphthong ⁰⁴⁵⁶⁷⁸⁹₀ₐ
        lineFr += "aeiuæʌəɔʋзzɒ";
        lineTo += "аеіуæȧəоуӛзɒ"; // ɐ ᵉ ɑ ɒ ɘ ѧ ұ ӫ ӛ ȧ ą ė ţ ͽ ѳ ѹ ў ѝ ѐ θ ε ӱ ӯ ᴀ ȧ ᴬ ᵊ
        let diftFr = "juaieieʋaʋiəəʋeəjojɔjajiiiз:";
        let diftTo = "|юайейеʸаʸіᵊоʸеᵃ|ë|ë|я|ї|ї|ӛ"; // ʸ ʲ ᵉ ª
        sText = sText.replace(/iə/g, "іᵊ");
        sText = sText.replace(/əʋ/g, "оʸ");
        sText = sText.replace(/ai/g, "ай");
        sText = sText.replace(/ʤ/g, "дж");
        sText = sText.replace(/ii/g, "ї");
        sText = sText.replace(/ji/g, "ї");
        sText = sText.replace(/ie/g, "є");
        sText = sText.replace(/je/g, "є");
        sText = sText.replace(/a:/g, "ɑ:");
        sText = sText.replace(/\(r\)/g, "ʳ");
        sText = mx.tr2by2(sText, diftFr, diftTo);
        sText = sText.replace(/\|/g, "");
        sText = mx.tr(sText, lineFr, lineTo);
    };
    return sText.replace(/[:']/g, "");
    // return sText;
}; 
