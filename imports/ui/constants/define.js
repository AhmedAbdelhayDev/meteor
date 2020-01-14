/* Constants */
export const ISLA_SITE_ID = "ISLA_SITE_ID";

/* Estated API */
export const ESTATED_API_ADDRESS = "https://apis.estated.com/v4/property";
export const ESTATED_TOKEN = "ZdazQ7ljLuBbSvbaJ4rwvQPem0uG3m";

export function generateUUID() {
    const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return pattern.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
