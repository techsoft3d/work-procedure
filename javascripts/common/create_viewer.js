import { getEndpoint } from "./get_endpoint.js";

const createViewer = (modelName, models, containerId) => {
    return new Promise(function (resolve, reject) {
        getEndpoint({ type: "collection", models: models, initial: models[0] }).then((data) => {
            if (data === 'error: 429 - Too many requests') {
                window.location.replace("/error/too-many-requests");
            }
            const viewer = new Communicator.WebViewer({
                containerId: containerId,
                endpointUri: data.endpoint,
                model: modelName,
                boundingPreviewMode: "none"
            });
            resolve(viewer);
            if (data.collection_id) window.onbeforeunload = () => { $.get('/api/delete_collection?collection=' + [data.collection_id]); };
        });
    })
}

export default createViewer;
