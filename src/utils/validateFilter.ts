import Ajv, { JSONSchemaType } from 'ajv';
import { INewsFilter } from '../types';

const schema: JSONSchemaType<INewsFilter> = {
  type: 'object',
  properties: {
    newspapers: { type: 'array', uniqueItems: true, items: { type: 'string' } },
    keywords: { type: 'array', uniqueItems: true, items: { type: 'string' } },
    timerange: { type: 'integer', enum: [2, 120, 720] },
    visualize: { type: 'string', enum: ['newspaper', 'cloud'] },
  },
  required: ['newspapers', 'keywords', 'timerange', 'visualize'],
};

const ajv = new Ajv();
export const validate = ajv.compile(schema);
