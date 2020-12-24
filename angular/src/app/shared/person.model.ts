export class Person {
	constructor(
		public id:string, 
		public salutation:string, 
		public firstname:string, 
		public lastname:string, 
		public email:string) 
	{ 
	}

	toString() {
		return (this.salutation == "mr" ? "Mr. " : "Mrs. ") + this.firstname + " " + this.lastname;
	}
}