import { Collection, MongoClient } from 'mongodb'

export const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
}

export class MongoHelper {
  static client: MongoClient = null

  static async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  static async disconnect(): Promise<void> {
    await this.client.close()
  }

  static getCollection<T>(name: string): Collection<T> {
    return this.client.db().collection(name)
  }

  static map(document: any): any {
    const { _id, ...documentWithoutId } = document
    return Object.assign({}, documentWithoutId, { id: _id })
  }

  static mapArray (documents: any[]): any[] {
    return documents.map(doc => MongoHelper.map(doc))
  }
}