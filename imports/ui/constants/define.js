/* Constants */
export const ISLA_SITE_ID = "ISLA_SITE_ID";

/* Estated API */
export const ESTATED_API_ADDRESS = "https://apis.estated.com/v4/property";
export const ESTATED_TOKEN = "ZdazQ7ljLuBbSvbaJ4rwvQPem0uG3m";

/* AccuWeather API */
export const ACCUWEATHER_LOCATION_KEY_API_ADDRESS =
    "http://dataservice.accuweather.com/locations/v1/search";
export const ACCUWEATHER_CURRENT_API_ADDRESS =
    "http://dataservice.accuweather.com/currentconditions/v1/";
export const ACCUWEATHER_API_KEY = "I6MwcKqGflK92rOvD5HxGL6in78jLCei";

/* AZURE Blob */
// export const AZURE_ACCOUNT = "consilienceanalytics";
export const AZURE_ACCOUNT = "arcadiaisla";
// export const AZURE_ACCOUNT_KEY ="1mz5nmTf0ufgkYHpc1KFf+UHTIjxDpAHmIMpKxXmLILLx4jUn4osXfeeS+5arP0UquBU7EYe5ku8w1kEHIBYeA==";
export const AZURE_ACCOUNT_KEY ="5A5Jmtzb+jRMPIcVJaGA04l4aqxDXcATk9M/lII6hUemF7Xc7+aGPQ6BCq4SJ7LjpG00l2J7FoOsrkgBSbDv0Q==";

export const FILE_UPLOAD_URL = "http://localhost:3000/fileupload";

/* Mapbox */
// export const MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoibmFzdGlhNzIzIiwiYSI6ImNrNWIxY2NrMTE1bGEzZXBjcTk3YWhoNWIifQ.1my5B-_4UQxQYqClNE7u4Q";
export const MAPBOX_ACCESSTOKEN = "pk.eyJ1IjoibXNoZXNrZXkiLCJhIjoiY2sxMnh4cTkxMDNxMjNodGNyMXNoa2RvdCJ9.4cngTMdgxAGYGOqEbwRCQQ";

export function generateUUID() {
    const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return pattern.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function ConvertEpochToDateFormat(unixtimestamp) {
    if (unixtimestamp === 0) return 0;

    // Unixtimestamp   : epoch

    // Months array
    var months_arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    // Convert timestamp to milliseconds
    if (unixtimestamp.toString().length > 10) {
        unixtimestamp = unixtimestamp / 1000;
    }
    var date = new Date(unixtimestamp * 1000);

    // Year
    var year = date.getFullYear();

    // Month
    var monthAbbr = months_arr[date.getMonth()];
    var month = date.getMonth() + 1;

    // Day
    var day = date.getDate();

    //day of week
    var weekdayAbbr = new Array(7);
    weekdayAbbr[0] = "Sun";
    weekdayAbbr[1] = "Mon";
    weekdayAbbr[2] = "Tue";
    weekdayAbbr[3] = "Wed";
    weekdayAbbr[4] = "Thu";
    weekdayAbbr[5] = "Fri";
    weekdayAbbr[6] = "Sat";

    var weekday = weekdayAbbr[date.getDay()];

    // Hours
    var hours = date.getHours();

    var ampm = "AM";
    var ampmhours = hours;
    if (hours > 12) {
        ampm = "PM";
        ampmhours = hours - 12;
    }

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    // var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return {
        year,
        month,
        monthAbbr,
        day,
        weekday,
        hours,
        minutes: minutes.substr(-2),
        seconds: seconds.substr(-2),
        jsdate: date,
        ampm,
        ampmhours
    };
}

export function ConvertDateToEpoch(date) {
    // var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
    var myEpoch = Math.round(date.getTime() / 1000.0);  //remove millisecond
    return myEpoch;
}

export function GetStandardDate(date) {
    const epochtime = ConvertDateToEpoch(date);
    const dataObj = ConvertEpochToDateFormat(epochtime);
    const sday = ("0" + dataObj.day).substr(-2);
    const smonth = ("0" + dataObj.month).substr(-2);
    const result = `${sday}.${smonth}.${dataObj.year}`;
    return result;
}