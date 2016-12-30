export class Job {
    constructor(
        public $key: string,
        public jobTitle: string,
        public companyName: string,
        public city: string,
        public jobType: string,
        public wage: string,
        public address: string,
        public description: string,
        public applyMethod: string,
        public deadline: string,
        public url: string,
        public companyDescription?: string,
        public logo?: string,
    ) {}

    static fromJsonList(array): Job[] {
        return array.map(Job.fromJson);
    }

    static fromJson({$key, jobTitle, companyName, city,
        jobType, wage, address, description, applyMethod,
        deadline, url, companyDescription, logo}): Job {
        return new Job(
            $key,
            jobTitle,
            companyName,
            city,
            jobType,
            wage,
            address,
            description,
            applyMethod,
            deadline,
            url,
            companyDescription,
            logo
        )
    }
}