const COMB = ["altKey", "ctrlKey", "shiftKey", "metaKey"]

const judgeComb = (comb: string | false, event: KeyboardEvent): boolean => {
    let res = true
    let com = [...COMB]
    if(comb) {
        res = res && event[comb]
        com = com.filter(item => item !== comb)
        com.forEach(item => {
            res = res && !(event[item])
        })
    } else {
        com.forEach(item => {
            res = res && !(event[item])
        })
    }
    return res
}

const getComb = (event: KeyboardEvent): string => {
    switch (true) {
        case event.altKey:
            return 'alt'
        case event.shiftKey:
            return 'shift'
        case event.ctrlKey:
            return 'ctrl'
        case event.metaKey:
            return 'meta'
        default:
            return ''
    }
}

export { 
    judgeComb,
    getComb
}