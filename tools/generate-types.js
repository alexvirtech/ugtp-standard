import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, basename, relative } from 'node:path'
import { compileFromFile } from 'json-schema-to-typescript'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const SCHEMAS_DIR = join(ROOT, 'schemas', 'json')
const OUT_DIR = join(ROOT, 'src', 'generated')

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function generateFromDir(subdir, outSubdir) {
  const dir = join(SCHEMAS_DIR, subdir)
  const outDir = join(OUT_DIR, outSubdir)
  await ensureDir(outDir)

  let files
  try {
    files = await readdir(dir)
  } catch {
    return []
  }

  const jsonFiles = files.filter(f => f.endsWith('.json'))
  const generated = []

  for (const file of jsonFiles) {
    const filePath = join(dir, file)
    const outName = basename(file, '.json') + '.d.ts'
    const outPath = join(outDir, outName)

    try {
      const ts = await compileFromFile(filePath, {
        cwd: dir,
        bannerComment: '/* Generated from canonical JSON Schema — do not edit */',
        style: { semi: false, singleQuote: true },
        declareExternallyReferenced: false,
      })
      await writeFile(outPath, ts)
      generated.push(outName)
    } catch (err) {
      console.error(`  WARN: skipping ${file}: ${err.message}`)
    }
  }

  return generated
}

async function generateTypes() {
  const outDir = join(OUT_DIR, 'types')
  await ensureDir(outDir)

  const typesPath = join(SCHEMAS_DIR, 'types.json')
  try {
    const ts = await compileFromFile(typesPath, {
      cwd: SCHEMAS_DIR,
      bannerComment: '/* Generated from canonical JSON Schema — do not edit */',
      style: { semi: false, singleQuote: true },
      declareExternallyReferenced: false,
    })
    await writeFile(join(outDir, 'types.d.ts'), ts)
  } catch (err) {
    console.error(`  WARN: skipping types.json: ${err.message}`)
  }
}

async function main() {
  console.log('Generating TypeScript types from JSON Schemas...')

  await ensureDir(OUT_DIR)

  await generateTypes()
  console.log('  ✓ types')

  const objects = await generateFromDir('objects', 'objects')
  console.log(`  ✓ objects (${objects.length} files)`)

  const messages = await generateFromDir('messages', 'messages')
  console.log(`  ✓ messages (${messages.length} files)`)

  const events = await generateFromDir('events', 'events')
  console.log(`  ✓ events (${events.length} files)`)

  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
