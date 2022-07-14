import env from '@main/config/env'
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

  static async getCollection<T>(name: string): Promise<Collection<T>> {
    if (this.client !== null) {
      return this.client.db().collection(name)
    } else {
      this.client = await MongoClient.connect(env.mongoUrl)
      return this.client.db().collection(name)
    }
  }

  static map(document: any): any {
    const { _id, ...documentWithoutId } = document
    return Object.assign({}, documentWithoutId, { id: _id })
  }

  static mapArray (documents: any[]): any[] {
    return documents.map(doc => MongoHelper.map(doc))
  }
}