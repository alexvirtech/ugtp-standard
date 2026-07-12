import SwaggerParser from '@apidevtools/swagger-parser'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const OPENAPI_PATH = join(ROOT, 'schemas', 'openapi', 'ugtp-v1.yaml')

async function main() {
  console.log('Validating OpenAPI specification...')
  try {
    const api = await SwaggerParser.validate(OPENAPI_PATH)
    console.log(`  ✓ ${api.info.title} v${api.info.version}`)
    const paths = Object.keys(api.paths || {})
    console.log(`  ${paths.length} paths defined`)
  } catch (err) {
    console.error(`  ✗ OpenAPI validation failed: ${err.message}`)
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
