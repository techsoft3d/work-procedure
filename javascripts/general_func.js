function browserLanguage() {
    try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
    }
        catch(e) {
        return undefined;
    }
}

function incrementQty(obj) {
    let tr = obj.parentNode.parentNode;
    let children = tr.childNodes;
    let qty = children[2].innerHTML;
    qty++;
    children[2].innerHTML = qty;
}

function decrementQty(obj) {
    let tr = obj.parentNode.parentNode;
    let children = tr.childNodes;
    let qty = children[2].innerHTML;
    if (qty == 1) {
        tr.parentNode.deleteRow(tr.sectionRowIndex);
    } else {
        qty--;
        children[2].innerHTML = qty;
    }
}