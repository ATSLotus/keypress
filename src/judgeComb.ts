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

export default judgeComb