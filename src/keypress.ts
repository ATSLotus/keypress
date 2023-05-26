import combination from "./combination"
import judgeComb from "./judgeComb"

// const KeyType = new Set(['keydown', 'keyup', 'keypress'])

type Keys = string
interface KEYEVENT {
    type: 'keydown'|'keyup'|'keypress'
    key: Keys, 
    callback: () => void, 
    useCombination?: "alt"|"shift"|"ctrl"|"mate"
    isDestroy?: boolean
}
interface LISTENNER {
    event: 'keydown'|'keyup'|'keypress',
    callback: (event: KeyboardEvent) => void
}

export default class keypress {
    #listenners: Map<string, LISTENNER>
    constructor() {
        this.#listenners = new Map<string, LISTENNER>()
    }
    listen(keyevents: KEYEVENT | Array<KEYEVENT>) {
        const listenner = (keyevent: KEYEVENT) => {
            const listener = (event: KeyboardEvent) => {
                if(keyevent.useCombination) {
                    const comb = combination.get(keyevent.useCombination) as string
                    if(judgeComb(comb, event) && event.key.toLowerCase() === keyevent.key.toLowerCase()) 
                        keyevent.callback()
                } else {
                    if(judgeComb(false, event) && event.key.toLowerCase() === keyevent.key.toLowerCase()) 
                        keyevent.callback()
                }
                if(keyevent.isDestroy) 
                    document.removeEventListener(keyevent.type, listener)
            }
            return listener
        }
        try {
            if(keyevents instanceof Array) {
                keyevents.forEach(item => {
                    let lisn = listenner(item)
                    const comb = item.useCombination ? `${item.useCombination} ` : ''
                    this.#listenners.set(`${comb}${item.key}`, {
                        event: item.type,
                        callback: lisn
                    })
                    document.addEventListener(item.type, lisn)
                })
            } else {
                let lisn = listenner(keyevents)
                const comb = keyevents.useCombination ? `${keyevents.useCombination} ` : ''
                this.#listenners.set(`${comb}${keyevents.key}`, {
                    event: keyevents.type,
                    callback: lisn
                })
                document.addEventListener(keyevents.type, lisn)
            }
        } catch (error) {
            throw Error(`Use the correct parameters: {key: string | number, callback: () => void, isDestroy?: boolean}, please!`)
        }
    }
    clean(key?: string) {
        if(key) {
            const value = this.#listenners.get(key)
            if(value) {
                this.#listenners.delete(key)
                document.removeEventListener(value.event, value.callback)
            }
        } else {
            this.#listenners.forEach((value, key) => {
                document.removeEventListener(value.event, value.callback)
            })
            this.#listenners.clear()
        }
    }
}