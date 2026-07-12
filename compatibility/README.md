# Compatibility

This directory contains compatibility declarations for `@ugtp/standard` releases.

Each file describes the stability classification, breaking-change surface, and
consumption rules for a specific version.

## Files

| File | Version | Description |
|------|---------|-------------|
| [0.1.0-candidate.1.md](0.1.0-candidate.1.md) | 0.1.0-candidate.1 | Initial candidate synchronized with Session 2A architecture freeze |

## Stability Levels

| Level | Consumption Rule |
|-------|-----------------|
| FROZEN | May be consumed by all implementation tracks |
| CANDIDATE_LOW | May be consumed with normal compatibility tests |
| CANDIDATE_MEDIUM | May be used only behind an explicit experimental flag |
| EXPERIMENTAL | Must not be required by the first vertical slice |

## Using Compatibility Data

### Programmatic Access

```typescript
import { getDefinitionMetadata, getAllMetadata, STABILITY_RULES } from '@ugtp/standard'

// Look up a specific definition
const uciMeta = getDefinitionMetadata('object', 'UCI')
console.log(uciMeta?.stabilityLevel)   // 'FROZEN'
console.log(uciMeta?.breakingChangeRisk) // 'none'

// Get all metadata
const all = getAllMetadata()
for (const [category, items] of Object.entries(all)) {
  for (const [name, meta] of Object.entries(items)) {
    if (meta.stabilityLevel !== 'FROZEN') {
      console.log(`${category}/${name}: ${meta.stabilityLevel}`)
    }
  }
}

// Check consumption rules
console.log(STABILITY_RULES.FROZEN)
// 'May be consumed by all implementation tracks'
```

### JSON Schema Access

Every JSON Schema file includes an `x-ugtp-architecture` extension:

```json
{
  "x-ugtp-architecture": {
    "source": "UGTP-ARCH-001",
    "classification": "FROZEN",
    "stabilityLevel": "FROZEN",
    "breakingChangeRisk": "none",
    "relatedADR": ["ADR-0001"],
    "relatedCapability": ["ugtp:capability:identity:create"],
    "relatedProfile": ["ugtp:profile:core"],
    "relatedFeature": ["FEAT-RECOVERY"]
  }
}
```
