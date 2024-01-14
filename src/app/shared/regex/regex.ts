export enum REGEX {
    EMAIL = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}',
    PHONE = '[0-9]{10}$',
    PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
    ZIP = '^[0-9]{4,7}$',
    NUMBER = '^[0-9]*$',
    URL = '^(http:\/\/www\.|https:\/\/www\.|www\.|http:\/\/|https:\/\/)[a-zA-Z0-9\.\-]+\\.[a-zA-Z]{2,5}[\.]{0,1}',
    CHARACTER = '^[a-zA-Z \-\']+',
    SPECIAL_PHONE = '^[+|0-9]+[0-9]{1,}$',
    ADDRESS = '^[a-zA-Z0-9\s,\'-]*$',
}