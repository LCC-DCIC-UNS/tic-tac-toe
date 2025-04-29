class PengineClient {

    queryId:any = -1;
    queryCallbacks: any = {};

    static instance: any;
    static instancePromise: any;

    static create() {
        if (!this.instancePromise) {
            this.instancePromise = new Promise(resolve => {
                this.instance = new PengineClient(() => {
                    resolve(this.instance);
                });
            });
        }
        return this.instancePromise;
    }

    pengine;

    /**
    * oncreate is the callback for Pengine server creation
    */
    constructor(oncreate: any) {
        this.query = this.query.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.pengine = new (window as any).Pengine({
            server: "http://localhost:3030/pengine",
            application: "proylcc",
            oncreate,
            onsuccess: this.handleSuccess,
            onfailure: this.handleFailure,
            onerror: this.handleError,
            destroy: false
        });
    }

    /**
    * Callback for successful response received from Pengines server.
    */

    handleSuccess(response: any) {
        const { QueryId, Success, Error, ...queryAnswerData } = response.data[0];
        const success = Success === 1;
        if (this.queryCallbacks[QueryId]) {
            const { resolve, reject } = this.queryCallbacks[QueryId];
            if (Error !== "_") {
                reject(Error);
            } else if (success) {
                resolve({ ...queryAnswerData, more: response.more });
            } else {
                resolve(false);
            }
            delete this.queryCallbacks[QueryId];
        }
    }

    /**
    * Called when the pengine fails to find a solution.
    */

    handleFailure() {
        console.log("Failure");
    }

    handleError(error: any) {
        throw error;
    }

    /**
     * Build a prolog query based on input query that:
     *  - tracks an id for the query through a variable QueryId, so it also comes with the response and we can
     *    call the corresponding callback, recorded in queryCallbacks under the id.
     *  - always succeeds so we ensure QueryId is bound, but the success state of the original query is determined 
     *    by the value bound to Success variable.
     *  - catches any prolog error and rejects the promise with it. 
     * @param {*} query      
     */
    query(query: any) {
        return new Promise((resolve, reject) => {
            this.queryId++;
            this.queryCallbacks[this.queryId] = { resolve, reject };
            this.pengine.ask(`catch((QueryId=${this.queryId},((${query}, Success = 1) ; Success = 0)), error(Error, _), (QueryId=${this.queryId}, Success = 0))`);
        });
    }

    next() {
        return new Promise((resolve, reject) => {
            this.queryCallbacks[this.queryId] = { resolve, reject };
            this.pengine.next();
        });
    }

    static stringify(obj: any) {
        return (window as any).Pengine.stringify(obj);
    }

}

export interface PrologTerm {
    functor: string;
    args: any[];
}

export default PengineClient;