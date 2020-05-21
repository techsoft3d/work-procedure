// GET ENDPOINT
// This function is a one-size-fits-all solution for retrieving session tokens from the 
// Communicator service and returning them to the frontend. It expects a single object as its argument,
// the contents of which determine how the API will respond. It returns a promise containing, if the
// parameters were correct, the response from CaaS.
// 
// FOR A SINGLE MODEL:
// Your object to getEndpoint should have two data members, type: "model", and model: <model-name>. 
// ex. getEndpoint({type: "model", model: "microengine.scz"}).then((data) => { ... });
//
// FOR A MODEL COLLECTION:
// Your object should have three arguments. type: "collection", models: [list, of, models], and initial: <any>.
// The "initial" parameter is not important, but must be a valid model that exists for the CaaS API call to succeed.
// ex. getEndpoint({type: "collection", models: ["modelOne.scz", "modelTwo.scz"], initial: "modelOne.scz"}).then((data) => { ... });

export const getEndpoint = (args) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", "/api/request_session");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = () => {
            if (request.status != 200) {
                reject(`ERROR: ${request.responseText}`)
            }
            resolve(JSON.parse(request.responseText));
        }
        request.send(JSON.stringify(args));
    });
}