//==================================================================================================
//  Library for Maix common functions
//==================================================================================================
//import {console_log} from "./mxlog";
const console_log = console.log;

export const sFTime = (): string => {
    let oDateNow = new Date();
    return oDateNow.toISOString().replace(/[A-Z]/g, " "); // + '.' + add3Zero(oDateNow.getMilliseconds());
};
const add3Zero = (n: number): string => ("000" + n).slice(-3);
//--------------------------------------------------------------------------------------------------
export const getRandomInt = (max: number): number => (Math.floor(Math.random() * Math.floor(max)));

// Useful for tests
export const f = async (msg: string, ms: number) => {
    let shablon = `delay "${msg}" with ${ms}`;
    //console.log(sFTime()+`: ${shablon} starts...`);
    console_log(sFTime()+`: ${shablon} starts...`);
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve(msg), ms)
    });
    let result = await promise;
    console_log(sFTime()+`: ${shablon} ends with result: "${result}".`);
};

export const lObj  = (obj: any) => console.log(JSON.stringify(obj, null, '    '));
export const lObj_ = (obj: any) => console_log(JSON.stringify(obj, null, '    '));

const lSort = (a:string, b:string): number => a.localeCompare(b, undefined, {sensitivity: 'base'});
const logMapElements = (value: any, key: any) => {
        console.log(`{${key}} => "${value}"`);
}
export const lHash = (hash: any) => hash.forEach(logMapElements);

export const aArrayUnion = (arr1: string[], arr2: string[]): string[] => {
    return arr1.concat(arr2);
};

export const sGetByREx = (str: string, re: string): string => {
    const regex = new RegExp(re, 'g');
    let match: any;
    match = regex.exec(str);
    return (match && match.length >= 2) ? match[1] : "";
};

export const aGetByREx = (str: string, re: string): string[] => {
    let aRes: string[] = [];
    const regex = new RegExp(re, 'g');
    let match: any;
    while (match = regex.exec(str)) {
        if (match.length >= 2) aRes.push(match[1]);
    };
    return aRes;
};

//==================================================================================================
// classes...
export class MMap extends Map<string, string> {    // simulate perl's string map
    get(key: string) { 
        return this.has(key) ? super.get(key) : "";
    };
};
