import { grey, green, blue, red, orange } from "@ant-design/colors";

export const SKILLS_LIST = [
    { label: "Javascript", value: "JAVASCRIPT" },
    { label: "React.JS", value: "REACT.JS" },
    { label: "React Native", value: "REACT_NATIVE" },
    { label: "Vue.JS", value: "VUE.JS" },
    { label: "Angular", value: "ANGULAR" },
    { label: "Nest.JS", value: "NEST.JS" },
    { label: "TypeScript", value: "TYPESCRIPT" },
    { label: "Java", value: "JAVA" },
    { label: "Frontend", value: "FRONTEND" },
    { label: "Backend", value: "BACKEND" },
    { label: "Fullstack", value: "FULLSTACK" },
    { label: "Next.JS", value: "NEXT.JS" },
    { label: "Node.JS", value: "NODE.JS" },
    { label: "Express.JS", value: "EXPRESS.JS" },
    { label: "Python", value: "PYTHON" },
    { label: "Django", value: "DJANGO" },
    { label: "Flask", value: "FLASK" },
    { label: "C#", value: "C#" },
    { label: ".NET", value: ".NET" },
    { label: "C++", value: "C++" },
    { label: "Go", value: "GO" },
    { label: "PHP", value: "PHP" },
    { label: "WordPress", value: "WORDPRESS" },
    { label: "Flutter", value: "FLUTTER" },
    { label: "Swift", value: "SWIFT" },
    { label: "Kotlin", value: "KOTLIN" },
    { label: "Dart", value: "DART" },
    { label: "Ruby", value: "RUBY" },
    { label: "Rails", value: "RAILS" },
    { label: "Spring Boot", value: "SPRING_BOOT" },
    { label: "Laravel", value: "LARAVEL" },
    { label: "MySQL", value: "MYSQL" },
    { label: "PostgreSQL", value: "POSTGRESQL" },
    { label: "MongoDB", value: "MONGODB" },
    { label: "GraphQL", value: "GRAPHQL" },
    { label: "REST API", value: "REST API" },
    { label: "Docker", value: "DOCKER" },
    { label: "Kubernetes", value: "KUBERNETES" },
    { label: "CI/CD", value: "CI/CD" },
    { label: "AWS", value: "AWS" },
    { label: "Azure", value: "AZURE" },
    { label: "Firebase", value: "FIREBASE" },
    { label: "Linux", value: "LINUX" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "SASS/SCSS", value: "SASS/SCSS" },
    { label: "Tailwind CSS", value: "TAILWIND_CSS" },
    { label: "Bootstrap", value: "BOOTSTRAP" },
    { label: "Jest", value: "JEST" },
    { label: "Mocha", value: "MOCHA" },
    { label: "Cypress", value: "CYPRESS" },
    { label: "Testing Library", value: "TESTING_LIBRARY" },
    { label: "Machine Learning", value: "MACHINE_LEARNING" },
    { label: "Data Science", value: "DATA_SCIENCE" },
    { label: "DevOps", value: "DEVOPS" },
    { label: "Agile/Scrum", value: "AGILE/SCRUM" },
];

export const LEVEL_LIST = [
    { label: "Intern", value: "INTERN" },
    { label: "Fresher", value: "FRESHER" },
    { label: "Junior", value: "JUNIOR" },
    { label: "Middle", value: "MIDDLE" },
    { label: "Senior", value: "SENIOR" },
    { label: "All Levels", value: "ALL" },
];

export const TYPE_CONTRACT_LIST = [
    { label: "Full-time", value: "FULL_TIME" },
    { label: "Part-time", value: "PART_TIME" },
    { label: "Freelance", value: "FREELANCE" },
];

export const TYPE_WORK_LIST = [
    { label: "In Office", value: "IN_OFFICE" },
    { label: "Hybrid", value: "HYBRID" },
    { label: "Remote", value: "REMOTE" },
    { label: "Onsite", value: "ONSITE" },
];

export const LOCATION_LIST = [
    { label: "Hà Nội", value: "HANOI" },
    { label: "Hồ Chí Minh", value: "HOCHIMINH" },
    { label: "Đà Nẵng", value: "DANANG" },
    { label: "Cần Thơ", value: "CANTHO" },
    { label: "Tất cả thành phố", value: "ALL" },
];

export const nonAccentVietnamese = (str: string) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
};

export const convertSlug = (str: string) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
        "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
        "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

    return str;
};

export const getLocationName = (value: string) => {
    const locationFilter = LOCATION_LIST.filter((item) => item.value === value);
    if (locationFilter.length) return locationFilter[0].label;
    return "unknown";
};

export function colorMethod(
    method: "POST" | "PUT" | "GET" | "DELETE" | string
) {
    switch (method) {
        case "POST":
            return green[6];
        case "PUT":
            return orange[6];
        case "GET":
            return blue[6];
        case "DELETE":
            return red[6];
        default:
            return grey[10];
    }
}
