const MongoClient = require('mongodb').MongoClient;

class AgendaModel {
  
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }

  async getSetores() {
    const client = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(this.dbName);
    const collection = db.collection('AGENDA');
    const result = await collection.distinct('setor');
    client.close();
    return result;
  }


}

module.exports = AgendaModel;