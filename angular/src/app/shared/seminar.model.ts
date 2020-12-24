import { Person } from './person.model';

export class Seminar {
	public teacherID: string;
	public teacher: Person;
	public attendeeIDs: string[] = [];
	public attendees: Person[] = [];

	constructor(
		public id: string,
		public name: string,
		public description: string) { }
}