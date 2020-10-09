import { inject, injectable } from "inversify";
import { TYPES } from "../../types";

@injectable()
export class DBSchemaInitMigrationTool{
    private DB : IDBConnection;
    constructor(@inject(TYPES.Mysql_Object) connection : IDBConnection){
        this.DB = connection;
    }
    public executeDBSchemaMigration() : void{
        this.upnHentaiBookmark();
        this.upBookmarkDoujinItem();

    }
    private upnHentaiBookmark(){
        this.DB.executeNonQuery(`DROP TABLE IF EXISTS \`nhentai_bookmarks\`;`, []);
        this.DB.executeNonQuery(`CREATE TABLE \`nhentai_bookmarks\` (
        \`bookmark_id\` varchar(200) NOT NULL,
        \`bookmark_name\` varchar(200) NOT NULL,
        \`owned_by\` varchar(200) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, []);

      this.DB.executeNonQuery(`ALTER TABLE \`nhentai_bookmarks\`
      ADD PRIMARY KEY (\`bookmark_id\`);`, []);

      this.DB.executeNonQuery(`ALTER TABLE \`nhentai_bookmarks\` 
      ADD INDEX \`bookmark_id_index\` (\`bookmark_id\`, \`bookmark_name\`);`, []);
    }
    
    private upBookmarkDoujinItem(){
        this.DB.executeNonQuery(`DROP TABLE IF EXISTS \`nhentai_bookmark_doujin_item_list\`;`, []);
        this.DB.executeNonQuery(`CREATE TABLE \`nhentai_bookmark_doujin_item_list\` (
        \`doujin_data_id\` varchar(200) NOT NULL,
        \`bookmark_id\` varchar(200),
        \`nhentai_doujin_code\` varchar(200) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, []);

      this.DB.executeNonQuery(`ALTER TABLE \`nhentai_bookmark_doujin_item_list\`
      ADD PRIMARY KEY (\`doujin_data_id\`);`, []);
    }
}