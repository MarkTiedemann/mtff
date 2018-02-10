# MTFF

**Mark's Translation File Format.**

```
~ hello
  en: Hello!
  de: Hallo!
  es: ¡Hola!
```

MTFF aims to be a minimal translation file format that's **easy to read and write** due to obvious semantics:

```
! This is a comment
```

```
~ and_this_is_a_translation_key
  en: With a translation in English!
```

```
~ trailing_spaces
  en: Will be cut off automatically.
```

```
~ but_i_need_trailing_spaces
  en: In this case, end the line with a caret:  ^
  ! Now, the above line ends with two spaces.
```

```
~ but_i_need_carets
  en: Well, use \\ to escape them, e.g.: \^
  ! The above translations now ends with a caret
  ! instead of a space.
```

```
~ multi_line_strings
  en: [
‎    ...are supported, too.
‎    Note that each line will end with a \\n.
    Except for the last line.
‎  ]
```

```
~ but_thats_annoying
  en: (
    Well, if you use round brackets,
    your lines will wrap smoothly,
    joined by a single space.
  )
```

For more details, check out the [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) grammar in `grammar.ebnf`.

```
! A typical `.mtff` file may look somewhat like this:

~ hello
  en: Hello!
  de: Hallo!
  es: ¡Hola!

~ see_you
  en: See you!
  de: Wir sehen uns!
  es: ¡Te veo!
```

MTFF is designed to map unambiguously to the following JSON structure:

```json
{
  "en": {
    "hello": "Hello!",
    "see_you": "See you!"
  },
  "de": {
    "hello": "Hallo!",
    "see_you": "Wir sehen uns!"
  },
  "es": {
    "hello": "¡Hola!",
    "see_you": "¡Te veo!"
  }
}
```

This intermediate JSON representation can be used in further build steps.

In a frontend application, for example, language specific translations files could be generated that can then be lazy-loaded whenever the user switches the application language:

* `en.json`: `{"hello":"Hello!","see_you":"See you!"}`
* `de.json`: `{"hello":"Hallo!","see_you":"Wir sehen uns!"}`
* `es.json`: `{"hello":"¡Hola!","see_you":"¡Te veo!"}`

It can also be used to generate static types, for example, to make sure that only available languages and translation keys are used within the code so that the translation files and the code don't get out of sync:

```ts
// i18n.ts
export type Language = 'en' | 'de' | 'es'
export type MessageKey = 'hello' | 'see_you'
```

It is recommended that any tool that parses MTFF checks that...

* ...the number of translation keys are equal in each file to avoid missing translations. If missing translations are desirable, for example, during development, `?` can be used to mark a missing translation, e.g. `de: ?`.
* ...the keys of each translation in a translation file appear in the same order.
