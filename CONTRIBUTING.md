# Contributing

## Standards Process

All changes to canonical definitions follow the UGTP specification governance process.

1. Open an RFC in the ugtp-specification repository
2. Reach consensus via review
3. Implement the change in this repository as EXPERIMENTAL
4. Promote to CANDIDATE after validation
5. Promote to FROZEN only by governance decision

## Development

```bash
pnpm install
pnpm check
```

## Rules

- JSON Schemas are the single source of truth
- TypeScript types are generated — never hand-edit files in `dist/`
- Every schema change must include fixture updates
- All definitions must carry a stability marker (FROZEN, CANDIDATE, EXPERIMENTAL)
- Use RFC 8785 JSON Canonicalization Scheme for signed/hashable JSON
- Represent large integers and token amounts as canonical decimal strings
- Use RFC 3339 UTC timestamps with explicit Z
- Use lower-case canonical textual IDs
