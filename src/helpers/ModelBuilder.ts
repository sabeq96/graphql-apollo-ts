import { knex } from '../db';
import { omit } from 'lodash';

interface IModelBuilder<T> {
  create(props: T): Promise<T>
  findAll(): Promise<T[]> 
  find(filters: T, offset: number, limit: number): Promise<T[]>
  findById(id: number): Promise<T>
  update(id: number, props: T): Promise<boolean>
  destroy(id: number): Promise<boolean>
}

interface BaseModel {
  id: number
  created_at: number
  updated_at: number
}

class ModelBuilder<T extends BaseModel> implements IModelBuilder<T> {
  protected db = knex;
  protected modelName: string;
  protected tableName;
  protected selectableProps;
  protected timeout;

  constructor ({
    modelName = 'ModelName',
    tableName = 'tablename',
    selectableProps = [],
    timeout = 1000,
  }) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.selectableProps = selectableProps;
    this.timeout = timeout;
  }

  async create(props: Partial<T>): Promise<T> {
    const propsWithoutId = omit(props, 'id');

    const result = await knex.insert(propsWithoutId)
      .into(this.tableName);

    const createdUser = await this.findById(result[0])
    
    return createdUser; 
  }

  async findAll(): Promise<T[]> {
    const result = await knex.select(this.selectableProps)
      .from(this.tableName);

    return result;
  }

  async find(filters: Partial<T>, offset: number = 0, limit: number = 10): Promise<T[]> {
    const result = await knex.select(this.selectableProps)
      .from(this.tableName)
      .where(filters)
      .offset(offset)
      .limit(limit)

    return result;
  }

  async findOne(filters: Partial<T>): Promise<T> {
   const result = await this.find(filters)
    .then(results => {
      return !Array.isArray(results) ? results : results[0]
    });

    return result;
  }

  async findById(id: number): Promise<T> {
    const result = await knex.select(this.selectableProps)
      .from(this.tableName)
      .where({ id })
      .then(results => {
        return !Array.isArray(results) ? results : results[0]
      });
    
    return result;
  }

  async update(id: number, props: Partial<T>): Promise<boolean> {
    const propsWithoutId = omit(props, 'id');

    const result = await knex.update(propsWithoutId)
      .from(this.tableName)
      .where({ id })

    return Boolean(result);
  }

  async destroy(id: number): Promise<boolean> {
    const result = await knex.del()
      .from(this.tableName)
      .where({ id });
  
    return Boolean(result);
  }
}

export { ModelBuilder };
