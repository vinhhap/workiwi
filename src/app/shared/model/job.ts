export class Job {
    constructor(
        public $key: string,
        public jobTitle: string,
        public companyName: string,
        public city: string,
        public jobType: string,
        public wage: string,
        public description: string,
        public applyMethod: string,
        public deadline: string,
        public url: string,
        public logo?: string,
        public companyDescription?: string,
        public companyKey?: string
    ) {}

    static fromJsonList(array): Job[] {
        return array.map(Job.fromJson);
    }

    static fromJson({$key, jobTitle, companyName, city,
        jobType, wage, description, applyMethod,
        deadline, url, logo, companyDescription, companyKey}): Job {
        return new Job(
            $key,
            jobTitle,
            companyName,
            city,
            jobType,
            wage,
            description,
            applyMethod,
            deadline,
            url,
            logo,
            companyDescription,
            companyKey
        )
    }
}