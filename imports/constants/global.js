
/* File */
export const FILE_TYPE_LASER = "laser";
export const FILE_TYPE_EXCEL = "excel";
export const FILE_TYPE_WORD = "word";
export const FILE_TYPE_PDF = "pdf";
export const FILE_TYPE_TOWER = "tower";
export const FILE_TYPE_AUTOCAD = "autocad";
export const FILE_TYPE_PHOTO = "photo";
export const FILE_TYPE_VIDEO = "video";
export const FILE_TYPE_MESHGUN = "meshgun";
export const FILE_TYPE_3DASSETS = "3dassets";
export const FILE_TYPE_OTHERS = "others";

export const FILE_EXT_LASER = ['.las', '.e57', '.pts', '.xyz'];
export const FILE_EXT_EXCEL = ['.xls', '.xlsx', '.xlxb'];
export const FILE_EXT_WORD = ['.txt', '.doc', '.docx', '.odf'];
export const FILE_EXT_PDF = ['.pdf'];
export const FILE_EXT_TOWER = ['.txn'];
export const FILE_EXT_AUTOCAD = ['.dwg', '.dxf'];
export const FILE_EXT_PHOTO = ['.jpg', '.png'];
export const FILE_EXT_VIDEO = ['.mp4', '.avi', '.mov'];
export const FILE_EXT_MESHGUN = ['.mkv', '.mjpeg'];
export const FILE_EXT_3DASSETS = ['.obj', '.fbx', '.ply', '.gltf', '.3ds', '.maya', '.usd'];

const FILE_TYPE_NAMES = {
    'laser' : "Laser Scan",
    'excel' : "Excel",
    'word' : "Word",
    'pdf' : "PDF",
    'tower' : "Tower",
    'autocad' : "AutoCAD",
    'photo' : "Photos",
    'video' : "Video",
    'meshgun' : "MeshGun",
    '3dassets' : "3D Assets",
    'others' : "Others"
}

export function GetFileTypeName(filetype) {
    return FILE_TYPE_NAMES[filetype];
}