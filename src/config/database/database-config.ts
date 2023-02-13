import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs('db-config', () => {
  let filename = 'dev.yaml';
  if (process.env.NODE_ENV === 'production') {
    filename = 'prod.yaml';
  }
  console.log(filename);
  return yaml.load(readFileSync(join(__dirname, filename), 'utf-8')) as Record<
    string,
    any
  >;
});
