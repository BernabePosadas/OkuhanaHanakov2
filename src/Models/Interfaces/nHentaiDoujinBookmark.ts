import { nHentaiDoujinDataItem } from "./nHentaiDoujinDetaiItem";

export interface nHentaiDoujinBookmark{ 
    bookmark_id : string;
    bookmark_name : string 
    owned_by : string; 
    doujins : nHentaiDoujinDataItem[];
}