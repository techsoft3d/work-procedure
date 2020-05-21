function browserLanguage() {
    try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
    }
        catch(e) {
        return undefined;
    }
}