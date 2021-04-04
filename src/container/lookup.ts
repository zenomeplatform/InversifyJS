import * as ERROR_MSGS from "../constants/error_msgs";
import { interfaces } from "../interfaces/interfaces";
//import { Delegates } from "../utils/delegator";

function assertNotUndefinedOrNull(serviceIdentifier: any) {
    if (serviceIdentifier === null)
        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
    if (serviceIdentifier === undefined)
        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
}

class Lookup<T extends interfaces.Clonable<T>>
implements interfaces.Lookup<T> {

    // dictionary used store multiple values for each key <key>
    readonly map = new Map<interfaces.ServiceIdentifier<any>, T[]>()


    // adds a new entry to map
    public add(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T): this {
        assertNotUndefinedOrNull(serviceIdentifier);
        assertNotUndefinedOrNull(value);

        const entry = this.map.get(serviceIdentifier) || [];
        entry.push(value);

        this.map.set(serviceIdentifier, entry);

        return this;
    }

    // gets the value of a entry by its key (serviceIdentifier)
    public get(serviceIdentifier: interfaces.ServiceIdentifier<any>): T[] {
        assertNotUndefinedOrNull(serviceIdentifier);

        if (!this.map.has(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }

        return this.map.get(serviceIdentifier)!;
    }

    // removes a entry from map by its key (serviceIdentifier)
    public delete(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean {
        assertNotUndefinedOrNull(serviceIdentifier);

        if (!this.map.has(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }

        return this.map.delete(serviceIdentifier)
    }

    // returns true if map contains a key (serviceIdentifier)
    public has(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean {
        assertNotUndefinedOrNull(serviceIdentifier);
        return this.map.has(serviceIdentifier);
    }


    public removeByCondition(condition: (item: T) => boolean): void {
        this.map.forEach((entries, key) => {
            const updatedEntries = entries.filter((entry) => !condition(entry));
            if (updatedEntries.length > 0) {
                this.map.set(key, updatedEntries);
            } else {
                this.map.delete(key);
            }
        });
    }

    // returns a new Lookup instance; note: this is not a deep clone, only Lookup related data structure (dictionary) is
    // cloned, content remains the same
    public clone(): interfaces.Lookup<T> {
        const copy = new Lookup<T>();
        this.map.forEach((value, key) => {
            value.forEach((b) => copy.add(key, b.clone()));
        });
        return copy;
    }

}


export { Lookup };
