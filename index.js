const
    DataBase = require("./database/src/index.js"),
    db = new DataBase("./database/data/data.sqlite"),
    Client = require("./utils/client.js"),
    client = new Client(),
    handler = require("./utils/handler.js"),
    config = require("./utils/config.json");
handler(client, db, config).then(() => client.go())
MTM4NjMzNTA3MDA4Mzc0Nzk0MA.G7JEvl.PqSNFBolCFt-bMD9puATdnbDdsUUMqK4-zW5kk
