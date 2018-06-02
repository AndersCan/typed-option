# Upgrade guide

## v3 -> next

`Option.from` can no longer return `null` as a `Some`.

## v2 -> v3

`Option.from` can no longer return `undefined` as a `Some`.

`Option.from` predicate now defaults to `Predicate.ANY` where it previously was `Predicate.THRUTHY`.

## v1 -> v2

Replace all `new None()` with `None`.

The exported `None`is now a singleton.
