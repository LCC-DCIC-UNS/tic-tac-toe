class PengineClient {

    queryId = -1;
    queryCallbacks = {};

    /**
    * handleCreate is the callback for Pengine server creation
    */
    constructor(handleCreate) {
        this.query = this.query.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.pengine = new window.Pengine({
            server: "http://localhost:3030/pengine",
            application: "proylcc",
            oncreate: handleCreate,
            onsuccess: this.handleSuccess,
            onfailure: this.handleFailure,
            onerror: this.handleError,
            destroy: false
        });
    }

    /**
    * Callback for successful response received from Pengines server.
    */

    handleSuccess(response) {
        // console.log(response);
        const queryId = response.data[0]["QueryId"];
        const success = response.data[0]["Success"] === 1;
        if (this.queryCallbacks[queryId]) {
            this.queryCallbacks[queryId](success, response.data[0], response.more);
            delete this.queryCallbacks[queryId];
        }
    }

    /**
    * Called when the pengine fails to find a solution.
    */

    handleFailure() {
        console.log("Failure");
    }

    handleError(response) {
        throw response.data;
    }

    /**
     * Build a prolog query based on input query that:
     *  - tracks an id for the query through a variable QueryId, so it also comes with the response and we can
     *    call the corresponding callback, recorded in queryCallbacks under the id.
     *  - always succeeds so we ensure QueryId is bound, but the success state of the original query is determined 
     *    by the value bound to Success variable.
     * @param {*} query 
     * @param {*} callback 
     */

    query(query, callback) {
        this.queryId++;
        this.queryCallbacks[this.queryId] = callback;
        this.pengine.ask("QueryId=" + this.queryId + ",((" + query + ", Success = 1) ; Success = 0)");
    }

    next(callback) {
        this.pengine.next();
        this.queryCallbacks[this.queryId] = callback;
    }

    static stringify(obj) {
        return window.Pengine.stringify(obj);
    }

}

export default PengineClient;