export class Job {
    constructor(
        public $key: string,
        public jobTitle: string,
        public companyName: string,
        public jobType: any,
        public jobDescription: string,
        public applyMethod: string,
        public deadline: string,
        public contact:string,
        public companyDescription: string,
        public website: string,
        public logo: string
    ) {}

    static fromJsonList(array): Job[] {
        return array.map(Job.fromJson);
    }

    static fromJson({$key, jobTitle, companyName,
        jobType, jobDescription, applyMethod,
        deadline, contact, companyDescription, website, logo}): Job {
        return new Job(
            $key,
            jobTitle,
            companyName,
            jobType,
            jobDescription,
            applyMethod,
            deadline,
            contact,
            companyDescription,
            website,
            logo
        )
    }
}