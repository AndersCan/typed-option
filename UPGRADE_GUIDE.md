# Upgrade guide

## v2 -> v3

Option.from can no longer return `undefined` as a `Some` (valid value).

## v1 -> v2

Replace all `new None()` with `None`.

The exported `None`is now a singleton.
