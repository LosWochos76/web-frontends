import { Person } from "./person";

export class Seminar {
    teacher:Person = null;
    attendees:Person[] = [];
    
    constructor(
        public id:string,
        public name:string,
        public venue:string,
        public date:Date
    ) { }
}